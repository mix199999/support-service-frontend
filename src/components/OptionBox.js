// OptionBox.js
import React from 'react';
import "../styles/option-box.scss"
import {Container, Row, Col, Button} from "react-bootstrap";

const OptionBox = ({ number, text, onClick, backgroundImage }) => {
    return (
        <Container className="container-option-box" style={{ backgroundImage: `url(${backgroundImage})` }} onClick={onClick}>
            <Row className={"content-option-box"}>
            <Col sm={12} md={12} lg={12}>
                <div  >

                </div>
            </Col>

            </Row>


        </Container>
        );

};

export default OptionBox;