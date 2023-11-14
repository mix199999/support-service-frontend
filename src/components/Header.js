import * as React from "react";
import "../styles/header.scss"
import { Row, Col } from 'react-bootstrap';
import {setAuthHeader} from "./axios_helper";



export default function Header(props) {

    return (
        <Row className="App-header">
            <Col sm={2} className="App-logo">
                <img src={props.logoSrc} alt="logo" className="App-logo-img" />
            </Col>
            <Col sm={8} className="App-title">
                <h1>{props.pageTitle}</h1>
            </Col>
            <Col sm={2} className="App-button">
                <button className="btn btn-danger" onClick={props.onLogout}>logout</button>
            </Col>
        </Row>
    );
}