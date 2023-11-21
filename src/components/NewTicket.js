import React from "react";
import {getRole, getId, request} from "./axios_helper";
import { Row, Col, Button, Container } from "react-bootstrap";
import Orders from "./Orders";
import NewTicketModal from "./NewTicketModal";
import TicketsTable from "./TicketsTable";
import InfoModal from "./InfoModal";

class NewTicket extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            componentToShow: "",
            showNewTicketModal: false,
            orderId: "",
            infoTitle: "",
            infoDuration: 0,
            infoText: '',
            showInfoModal: false,
        };
    }

    componentDidMount() {
        getRole() === "USER" ? this.loadUserContent() : this.loadAdminContent();
    }

    loadUserContent = () => {
        this.setState({ componentToShow: "orders" });
    };

    loadAdminContent = () => {
        this.setState({ componentToShow: "takeTicket" });

    };

    onClickNewTicket = (orderId) => {
        this.setState({ showNewTicketModal: true, orderId: orderId });
    };





    onClickAdd = async (ticketId, titleTicket) => {
        try {
            await this.updateTicketHandler(ticketId);
            this.showInfoModal("Success", `Ticket ${titleTicket} successfully added`);
        } catch (error) {
            console.error('Error updating ticket handler:', error);
            this.showInfoModal("Error", `Cannot add ticket: ${titleTicket}`);
            throw error;
        }
    };

    updateTicketHandler = async (ticketId) => {
        const payload = {
            ticketId: ticketId,
            newHandlerId: parseInt(getId(), 10),
        };

        console.log('Request Payload:', payload);

        const response = await request('POST', '/ticket/update/handler', payload, {'Content-Type': 'application/json'});
        return response.data;
    };


    showInfoModal = (title, text) => {
        this.setState({
            infoTitle: title,
            infoDuration: 2000,
            infoText: text,
            showInfoModal: true,
        });
    };



    onClickShow = (ticketId) => {
        console.log("new show id: " + ticketId);
    };

    render() {
        return (
            <>
                {this.state.componentToShow === "orders" && (
                    <>
                        <Orders newTicket={true} onClick={this.onClickNewTicket} />
                        <NewTicketModal
                            showModal={this.state.showNewTicketModal}
                            closeModal={() => this.setState({ showNewTicketModal: false })}
                            orderId={this.state.orderId}
                            onSubmit={(ticketData) => {
                                console.log("New Ticket Data:", ticketData);
                            }}
                        />

                    </>
                )}

                {this.state.componentToShow === "takeTicket" && (
                    <>
                        <TicketsTable
                            onClickAdd={this.onClickAdd}
                            onClickShow={this.onClickShow}
                            obtainNew={true}
                        />

                        <InfoModal
                            title={this.state.infoTitle}
                            text={this.state.infoText}
                            duration={this.state.infoDuration}
                            showModal={this.state.showInfoModal}
                            onHide={() => this.setState({ showInfoModal: false })}
                        />
                    </>


                )}
            </>
        );
    }
}

export default NewTicket;
