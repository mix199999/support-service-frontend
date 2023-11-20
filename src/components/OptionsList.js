import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {solid} from "@fortawesome/fontawesome-svg-core/import.macro";
import "../styles/options-list.scss"
import {Row,Col, Container} from "react-bootstrap";


export default function (props) {

    const options = [];
    const optionStyle = {
        border: `2px solid ${props.color}`,
        borderRadius: '10px',
    };

    for (let i = 0; i < props.numberOfOptions; i++) {
        options.push(
            <Row className={"option-row"} onClick={props.onClick[i]} style={optionStyle} >
                <Col className={"option-icon-col"} >
                    {props.icons[i]}
                </Col>
                <Col className={"option-text-col"} >
                    <label>{props.optionText[i]}</label>
                </Col>
            </Row>
        );
    }

    return(
        <>
        <Container style={{color: props.color}} className={"options-list-container"}>
           <Col sm={12} md={12} lg={12}>
               {options}

           </Col>


        </Container>
        </>
    );

}