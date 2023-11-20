import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { request, setAuthHeader, getId } from "./axios_helper";

const NewTicketModal = ({ showModal, closeModal, onSubmit, orderId }) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [orderDetailsData, setOrderDetailsData] = useState(null);

    const getOrderDetailsData = (orderId) => {
        request("GET", `/order-details/by-order-id/${orderId}`)
            .then((response) => {
                setOrderDetailsData(response.data);
            })
            .catch((error) => {
                if (error.response.status === 401) {
                    setAuthHeader(null);
                } else {
                    console.error("Error fetching order details:", error);
                }
            });
    };

    useEffect(() => {
        // Fetch order details when orderId changes
        if (orderId) {
            getOrderDetailsData(orderId);
        }
    }, [orderId]);

    const handleSubmit = () => {
        // Prepare the ticket data
        const ticketData = {
            titleTicket: title,
            userId: getId(),
            orderId: orderId,
            handlerId: 0, // Assuming default handler ID is 0
            status: false, // Assuming default status is false
        };

        // Make a POST request to add the ticket
        request("POST", "/ticket/add", ticketData)
            .then((response) => {
                // Handle success if needed
                console.log("Ticket added successfully:", response.data);

                // Extract the ticketId from the response
                const { ticketId } = response.data;

                // Prepare the message data
                const messageData = {
                    ticketId: ticketId,
                    message: description, // Assuming description is the message content
                    senderId: parseInt(getId()), // Convert senderId to integer
                    messageDate: new Date().toISOString(), // Use the current date and time
                };

                // Make a POST request to add the message
                request("POST", "/message/add", messageData)
                    .then((messageResponse) => {
                        // Handle success if needed
                        console.log("Message added successfully:", messageResponse.data);
                    })
                    .catch((messageError) => {
                        // Handle error if needed
                        console.error("Error adding message:", messageError);
                    });
            })
            .catch((error) => {
                // Handle error if needed
                console.error("Error adding ticket:", error);
            });

        // Perform any additional actions if needed
        onSubmit({ orderId, title, description });

        // Close the modal
        closeModal();
    };

    return (
        <Modal show={showModal} onHide={closeModal}>
            <Modal.Header closeButton>
                <Modal.Title>New Ticket</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {/* Display order details here */}
                {orderDetailsData && (
                    <>
                        <p>Order ID: {orderId}</p>
                        {/* Display other order details based on orderDetailsData */}
                    </>
                )}

                {/* Form for entering Title and Description */}
                <Form>
                    <Form.Group controlId="title">
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId="description">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            as="textarea"
                            placeholder="Enter description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={closeModal}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleSubmit}>
                    Submit
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default NewTicketModal;
