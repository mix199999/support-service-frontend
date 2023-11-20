import React from "react";
import { getRole, getId, setAuthHeader, request } from "./axios_helper";
import { Row, Col, Button, Container, Modal } from "react-bootstrap";
import Orders from "./Orders";
import NewTicketModal from "./NewTicketModal";
import TicketsTable from "./TicketsTable";

class NewTicket extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            componentToShow: "",
            showNewTicketModal: false,
            orderId: "",

        };
    }

    componentDidMount() {
        getRole() === "USER" ? this.loadUserContent() : this.loadAdminContent();
    }

    loadUserContent = () => {

        this.setState({componentToShow : "orders"})

    };

    loadAdminContent = () => {

        this.setState({componentToShow : "takeTicket"})
    };


    onClickNewTicket = ( orderId) => {
        // Pass orderId to the onClick function provided as a prop
        //this.props.onClick(orderId);

        this.setState({ showNewTicketModal: true , orderId:orderId});
        console.log(orderId);
    };




    render() {
        // Tutaj możesz korzystać ze stanu komponentu (this.state.data) w renderowaniu
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
                                // Handle the new ticket submission (e.g., send data to the server)
                                console.log("New Ticket Data:", ticketData);
                            }}
                        />


                    </>
                )}

                {this.state.componentToShow==="takeTicket" && <TicketsTable
                    obtainNew={true}
                />}
            </>
        );
    }
}

export default NewTicket;
