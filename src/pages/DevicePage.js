import React, {useEffect, useState} from 'react';
import Container from "react-bootstrap/cjs/Container";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import BgStar from './../assets/BgStar.png'
import Button from "react-bootstrap/Button";
import {useParams} from 'react-router-dom';
import {fetchDeviceOne} from "../http/deviceAPI";

const DevicePage = () => {
    const [device, setDevice] = useState({info: []})

    const {id} = useParams()

    useEffect(() => {
        fetchDeviceOne(id).then(data => setDevice(data))
    }, [])

    return (
        <Container>
            <Row>
                <Col md={4} className="mt-3">
                    <Card.Img width={300} height={300} style={{"object-fit": "cover"}} src={process.env.REACT_APP_API_URL + device.img} />
                </Col>
                <Col md={4} className="mt-3">
                    <Row className="d-flex flex-column justify-content-center">
                        <h2>{device.name}</h2>
                        <div
                            style={{background: `url(${BgStar}) no-repeat center center`, 'background-size': 'cover' ,width: 240, height: 240, fontSize: "64px"}}
                            className="d-flex align-items-center justify-content-center"
                        >
                            {device.rating}
                        </div>
                    </Row>
                </Col>
                <Col md={4} className="mt-3">
                    <Card className="d-flex justify-content-center align-items-center p-2"
                            style={{width: 300, height: 300, fontSize: 32, border: "5px solid lightgray"}}>
                        <h3 className="mb-5">От: {device.price} руб.</h3>
                        <Button variant="outline-dark">Добавить в корзину</Button>
                    </Card>
                </Col>
            </Row>
            <Row className="d-flex flex-column mt-4">
                <h1>Характеристики</h1>
                {device.info.map((info, index) =>
                    <Row className="p-2 d-block" key={info.id} style={{background: index % 2 === 0 ? "lightgray" : "transparent"}}>
                        <span style={{"margin-right": "25px"}}>{info.title}</span> - {info.description}
                    </Row>
                )}
            </Row>
        </Container>
    );
};

export default DevicePage;
