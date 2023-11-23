import React, { useState } from "react";
import { Container, Col, Row } from "react-bootstrap";
import OptionUsers from "./OptionUsers.js";
import "../styles/admin_dashboard_content_list.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import OptionsList from "./OptionsList";
import OptionAdminFaq from "./OptionAdminFaq";
import Orders from "./Orders";
import NewTicket from "./NewTicket";
import TicketsTable from "./TicketsTable";
import Chat from "./Chat"; // Import the Chat component

export default function UserDashboardContentList(props) {
    console.log("UserContentList");
    console.log(props.componentToShow);

    const [componentState, setComponentState] = useState({
        componentToShow: null,
        ticketId: null,
    });

    let onClickShowTest = (ticketId) => {
        console.log("Ticket user show id: " + ticketId);
        setComponentState({ componentToShow: "chat", ticketId: ticketId });
    };

    const onBackClick = () => {
        setComponentState({ componentToShow: "Your Tickets", ticketId: null });
    };

    return (
        <>
            <Container className={"content-dashboard-list-container"}>
                <Row className={"content-dashboard-list-navigation"}>
                    <FontAwesomeIcon
                        icon={solid("arrow-left")}
                        style={{ color: "#ffffff" }}
                        onClick={props.handleReturn}
                    />
                </Row>
                <Row className={"content-dashboard-list-row"}>
                    <Col className={"content-dashboard-list-list"} sm={2} md={2} lg={2}>
                        <OptionsList
                            numberOfOptions={props.numberOfOptions}
                            optionText={props.optionText}
                            icons={props.icons}
                            color={props.color}
                            onClick={props.onClick}
                        />
                    </Col>
                    <Col className={"content-dashboard-list-content-panel"} sm={10} md={10} lg={10}>
                        {props.componentToShow === "Users" && <OptionUsers />}
                        {props.componentToShow === "FAQ" && <OptionAdminFaq />}
                        {props.componentToShow === "Your orders" && <Orders newTicket={false} />}
                        {props.componentToShow === "New Ticket" && <NewTicket />}
                        {props.componentToShow === "Your Tickets" && (
                            componentState.componentToShow === "chat" ? (
                                <Chat ticketId={componentState.ticketId} onBackClick={onBackClick} />
                            ) : (
                                <TicketsTable onClickShow={onClickShowTest} />
                            )
                        )}
                    </Col>
                </Row>
                <Row className={"content-dashboard-list-footer"}>
                    <Col sm={12} md={12} lg={12}>
                        <p> {props.componentToShow}</p>
                    </Col>
                </Row>
            </Container>
        </>
    );
}
