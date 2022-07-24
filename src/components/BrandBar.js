import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import Row from "react-bootstrap/Row";
import {Card} from "react-bootstrap";

const BrandBar = observer(() => {
    const {device} = useContext(Context)

    return (
        <Row className="d-flex mt-3">
            {device.brands.map(brand =>
                <Card
                    style={{"border": "1px solid #ccc",padding: "5px 15px", "margin-right": "5px", "margin-bottom": "5px", cursor: "pointer"}}
                    border={brand.id === device.selectedBrand.id ? 'dark' : "gray"}
                    onClick={() => device.setSelectedBrand(brand)}
                    className="w-auto"
                    key={brand.id}>
                    {brand.name}
                </Card>
            )}
        </Row>
    );
});

export default BrandBar;
