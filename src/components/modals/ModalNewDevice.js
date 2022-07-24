import React, {useContext, useEffect, useState} from 'react';
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import {Context} from "../../index";
import Dropdown from "react-bootstrap/Dropdown";
import Col from "react-bootstrap/Col";
import {createDevice, fetchBrand, fetchDevice, fetchType} from "../../http/deviceAPI";
import {observer} from "mobx-react-lite";

const ModalNewDevice = observer(({show, onHide}) => {
    const {device} = useContext(Context)
    const [info, setInfo] = useState([])

    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [file, setFile] = useState(null)
    const [type, setType] = useState(null)
    const [brand, setBrand] = useState(null)

    useEffect(() => {
        fetchType().then(data => device.setTypes(data))
        fetchBrand().then(data => device.setBrands(data))
    }, [])

    const addInfo = () => {
        setInfo([...info, {title: "", description: "", number: Date.now()}])
    }

    const removeInfo = (number) => {
        setInfo(info.filter(i => i.number !== number))
    }

    const changeInfo = (key, value, number) => {
        setInfo(info.map(i => i.number === number ? {...i, [key]: value} : i))
    }

    const selectFile = e => {
        setFile(e.target.files[0])
    }

    const addDevice = () => {
        const formData = new FormData()
        formData.append('name', name)
        formData.append('price', `${price}`)
        formData.append('img', file)
        formData.append('brandId', device.selectedBrand.id)
        formData.append('typeId', device.selectedType.id)
        formData.append('info', JSON.stringify(info))
        createDevice(formData).then(data => onHide())
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Добавить тип устройства
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Dropdown>
                        <Dropdown.Toggle
                            className="w-50 mb-3"
                            variant="outline-dark">{device.selectedType.name || "Выберите тип"}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {device.types.map(type =>
                                <Dropdown.Item
                                    onClick={() => device.setSelectedType(type)}
                                    key={type.id}>
                                    {type.name}</Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown >
                    <Dropdown>
                        <Dropdown.Toggle
                            className="w-50 mb-3"
                            variant="outline-dark">{device.selectedBrand.name || "Выберите брэнд"}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {device.brands.map(brand =>
                                <Dropdown.Item
                                    onClick={() => device.setSelectedBrand(brand)}
                                    key={brand.id}>
                                    {brand.name}</Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Form.Control
                        value={name}
                        onChange={e => setName(e.target.value)}
                        className="w-50 mb-3"
                        placeholder="Введите название устройства" />
                    <Form.Control
                        value={price}
                        onChange={e => setPrice(Number(e.target.value))}
                        className="w-50 mb-3"
                        placeholder="Введите цену устройства"
                        type="number" />
                    <Form.Control
                        onChange={selectFile}
                        className="w-50 mb-3"
                        placeholder="Введите изображение устройства"
                        type="file" />
                    <Button
                        onClick={addInfo}
                        variant="outline-dark"
                        className="d-block w-50 mb-3">Добавить новое свойство</Button>
                    {info.map(i =>
                        <Col className="d-flex flex-column" key={i.number}>
                            <Form.Control
                                value={i.title}
                                onChange={(e) => changeInfo('title', e.target.value, i.number)}
                                className="w-50 mb-3"
                                placeholder="Введите название свойства" />
                            <Form.Control
                                value={i.description}
                                onChange={(e) => changeInfo('description', e.target.value, i.number)}
                                className="w-50 mb-3"
                                placeholder="Введите описание свойства" />
                            <Button
                                className="w-50 mb-3"
                                variant="outline-dark"
                                onClick={() => removeInfo(i.number)}>Удалить</Button>
                        </Col>

                        )}
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-dark" onClick={onHide}>Закрыть</Button>
                <Button variant="outline-dark" onClick={addDevice}>Добавить</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default ModalNewDevice;
