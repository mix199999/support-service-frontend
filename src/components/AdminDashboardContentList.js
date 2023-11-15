import React from "react";
import {Container, Col, Row} from "react-bootstrap"
import OptionUsers from "./OptionUsers.js"
import "../styles/admin_dashboard_content_list.scss"


export default function AdminDashboardContentList(props) {

    return(
        <>
        <Container className={"content-dashboard-list-container"}>
            <Row className={"content-dashboard-list-row"}>
                <Col className={"content-dashboard-list-list"}>

                </Col>
                <Col className={"content-dashboard-list-content-panel"}>
                    {props.componentToShow === "users" && <OptionUsers/>}
                </Col>
            </Row>
        </Container>
        </>
    );

}



