import React from "react";
import { getRole, getId, request } from "./axios_helper";
import { Row, Col, Button, Container } from "react-bootstrap";
import Orders from "./Orders";
import NewTicketModal from "./NewTicketModal";
import TicketsTable from "./TicketsTable";
import InfoModal from "./InfoModal";
import Chat from "./Chat";

class NewTicket extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            componentToShow: "",
            showNewTicketModal: false,
            orderId: "",
            infoTitle: "",
            infoDuration: 0,
            infoText: "",
            showInfoModal: false,
            ticketId: 0,
            obtainNew: props.obtainNew,
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
            this.setState({ ticketId: ticketId });
            this.ticketsTableRef.fetchData(); // Trigger data fetch in TicketsTable
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
        this.setState({ componentToShow: "chat", ticketId: ticketId });
    };

    updateTicketStatus = async (ticketId) => {
        const url = `/ticket/update/status-to-true/${ticketId}`;

        try {
            await request('POST', url);
            console.log('Ticket status update successful');
            this.showInfoModal('Success', 'Ticket status updated successfully');
            this.ticketsTableRef.fetchData();
            // Set the componentToShow state to "chat" after updating the ticket status
            this.setState({  ticketId: null });
        } catch (error) {
            console.error('Ticket status update failed:', error);
            this.showInfoModal('Error', 'Ticket status update failed');
        }
    };

    onBackClick = () => {
        if(getRole() === "ADMIN"){
            this.setState({ componentToShow: "takeTicket", ticketId: null });

        }
        else if(getRole()==="USER"){
            this.setState({ componentToShow: "orders", ticketId: null });

        }
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
                            ref={(ref) => (this.ticketsTableRef = ref)}
                            onClickAdd={this.onClickAdd}
                            onClickShow={this.onClickShow}
                            obtainNew={this.state.obtainNew}
                            updateTicketStatus={this.updateTicketStatus}
                        />

                        <InfoModal
                            title={this.state.infoTitle}
                            text={this.state.infoText}
                            duration={this.state.infoDuration}
                            showModal={this.state.showInfoModal}
                            onHide={() => {
                                if (this.state.ticketId !== null) {
                                    this.setState({ showInfoModal: false, componentToShow: "chat" });
                                } else {
                                    this.setState({ showInfoModal: false });
                                }
                            }}

                        />
                    </>
                )}

                {this.state.componentToShow === "chat" && (
                    <Chat ticketId={this.state.ticketId} onBackClick={this.onBackClick} />
                )}
            </>
        );
    }
}

export default NewTicket;
