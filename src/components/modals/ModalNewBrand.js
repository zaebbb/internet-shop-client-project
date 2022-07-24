import React, {useState} from 'react';
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import {createBrand} from "../../http/deviceAPI";

const ModalNewBrand = ({show, onHide}) => {

    const [value, setValue] = useState('')

    const addBrand = () => {
        createBrand({name: value}).then(data => setValue('Данные отправлены'))
        setTimeout(() => onHide(), 500)
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
                    Добавить брэнд устройства
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        value={value}
                        onChange={e => setValue(e.target.value)}
                        placeholder="Введите название брэнда устройства"
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-dark" onClick={onHide}>Закрыть</Button>
                <Button variant="outline-dark" onClick={addBrand}>Добавить</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalNewBrand;
