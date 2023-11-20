import React, { useState } from "react";
import { getRole, getId, setAuthHeader, request } from "./axios_helper";
import {Row, Col, Button, Container, Modal, Table, Alert} from "react-bootstrap";
import OrderDetailsModal from "./OrderDetailsModal";

export default class Orders extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            componentToShow: "",
            ordersData: [],
            orderId: "",
            selectedOrderId: null,
            showModal: false,
            alertText:"",
            ticket:props.newTicket,
            onClick: props.onClick,
        };
    }

    componentDidMount() {
        const userId = getId();

        if (this.ticket) {
            this.userGetOrdersData();
            this.setState({ alertText: "You must have any order if you want to create a ticket" });
        } else {
            this.userGetOrdersData();
            this.setState({ alertText: "You don't have any orders" });
        }


    }


    userGetOrdersData = () => {
        let userId = getId();
        request("GET", `/orders/get-user-orders/${userId}`)
            .then((response) => {
                this.setState({ ordersData: response.data });
                this.setState({ componentToShow: "ordersTable" });
                console.log(response.data);
            })
            .catch((error) => {
                if (error.response.status === 401) {
                    setAuthHeader(null);
                } else if (error.response.status === 404) {

                    this.setState({ ordersData: [] });
                    this.setState({ componentToShow: "noOrders" });
                } else {
                    this.setState({ ordersData: error.response.data });
                    this.setState({ componentToShow: "noOrders" });
                }
            });
    };


    onNewTicketClick = (event, orderId) => {
        event.preventDefault();
        this.state.onClick(orderId);
    };



    closeModal = () => {
        this.setState({ showModal: false });
    };

    render() {


        return (
            <>
                <Container className="d-flex justify-content-center align-items-center">
                    {this.state.componentToShow === "ordersTable" && (
                        <Table className={"option-faq-table"} striped borderless hover variant="dark">
                            <thead>
                            <tr>
                                <th>#</th>
                                <th>Order Date</th>
                                <th>Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {this.state.ordersData.map((order, index) => (
                                <tr key={order.orderId}>
                                    <td>{index + 1}</td>
                                    <td>{new Date(order.orderDate).toLocaleDateString()}</td>
                                    <td>
                                        {this.state.ticket && (
                                            <Button
                                                variant="success"
                                                onClick={(event) => this.onNewTicketClick(event, order.orderId)}
                                            >
                                                New Ticket
                                            </Button>




                                        )}
                                        <Button
                                            variant="info"
                                            onClick={() => this.setState({ orderId: order.orderId, showModal: true })}
                                        >
                                            Details
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </Table>
                    )}
                    {this.state.componentToShow === "noOrders" && (
                        <Alert variant="danger" className="text-center">
                            You don't have any orders yet...
                        </Alert>
                    )}
                </Container>

                {/* Modal for Order Details */}
                <OrderDetailsModal
                    showModal={this.state.showModal}
                    closeModal={this.closeModal}
                    orderId={this.state.orderId}
                />
            </>
        );
    }
}


