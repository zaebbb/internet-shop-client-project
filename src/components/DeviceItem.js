import React from 'react';
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import stars from './../assets/ratingStars.svg'
import {useHistory} from 'react-router-dom';
import {DEVICE_ROUTE} from "../utils/consts";

const DeviceItem = ({device}) => {
    const history = useHistory()

    return (
        <Col md={3} onClick={() => history.push(DEVICE_ROUTE + '/' + device.id)}>
            <Card style={{width: "200px", padding: "15px"}} className="mt-3">
                <Card.Img style={{"object-fit": "cover"}} width={150} height={150} variant="top" src={process.env.REACT_APP_API_URL + device.img} />
                <Card.Body>
                    <div className="mt-3 d-flex justify-content-between align-items-center">
                        <div className="text-black-50">Samsung...</div>
                        <div className="d-flex">
                            <div>{device.rating}</div>
                            <Card.Img variant="top" src={stars} />
                        </div>
                    </div>
                    <div>{device.name}</div>

                </Card.Body>
            </Card>
        </Col>
    );
};

export default DeviceItem;
