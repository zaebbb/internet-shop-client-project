import React, {useState} from 'react';
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import {createType} from "../../http/deviceAPI";

const ModalNewType = ({show, onHide}) => {

    const [value, setValue] = useState('')

    const addType = () => {
        createType({name: value}).then(data => setValue('Данные отправлены'))
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
                    Добавить тип устройства
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        value={value}
                        onChange={e => setValue(e.target.value)}
                        placeholder="Введите название типа устройства"
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-dark" onClick={onHide}>Закрыть</Button>
                <Button variant="outline-dark" onClick={addType}>Добавить</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalNewType;
