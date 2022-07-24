import React, {useState} from 'react';
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import ModalNewBrand from "../components/modals/ModalNewBrand";
import ModalNewType from "../components/modals/ModalNewType";
import ModalNewDevice from "../components/modals/ModalNewDevice";

const Admin = () => {
    const [brandVisible, setBrandVisible] = useState(false)
    const [typeVisible, setTypeVisible] = useState(false)
    const [deviceVisible, setDeviceVisible] = useState(false)

    return (
        <Container className="d-flex flex-column">
            <h1 className="mt-4 mb-5">Панель администратора</h1>
            <Button onClick={() => setTypeVisible(true)} variant="outline-dark" className="w-50 mb-3">Добавить тип</Button>
            <Button onClick={() => setBrandVisible(true)} variant="outline-dark" className="w-50 mb-3">Добавить бренд</Button>
            <Button onClick={() => setDeviceVisible(true)} variant="outline-dark" className="w-50 mb-3">Добавить девайс</Button>
            <ModalNewBrand show={brandVisible} onHide={() => setBrandVisible(false)} />
            <ModalNewType show={typeVisible} onHide={() => setTypeVisible(false)} />
            <ModalNewDevice show={deviceVisible} onHide={() => setDeviceVisible(false)} />
        </Container>
    );
};

export default Admin;
