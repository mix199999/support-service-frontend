import React, { useEffect, useState } from "react";
import { Modal, Table } from "react-bootstrap";
import { request, setAuthHeader } from "./axios_helper";

const OrderDetailsModal = ({ showModal, closeModal, orderId }) => {
    const [orderDetailsData, setOrderDetailsData] = useState([]);

    useEffect(() => {
        if (orderId) {
            userGetOrderDetailsData(orderId);
        }
    }, [orderId]);

    const userGetOrderDetailsData = (orderId) => {
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

    return (
        <Modal show={showModal} onHide={closeModal}>
            <Modal.Header closeButton>
                <Modal.Title>Order Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Table className={"option-faq-table"} striped borderless hover variant="white">
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Product Name</th>
                        <th>Unit Price</th>
                        <th>Quantity</th>
                    </tr>
                    </thead>
                    <tbody>
                    {orderDetailsData.map((detail, index) => (
                        <tr key={detail.id}>
                            <td>{index + 1}</td>
                            <td>{detail.productName}</td>
                            <td>{detail.unitPrice}</td>
                            <td>{detail.quantity}</td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
            </Modal.Body>
        </Modal>
    );
};

export default OrderDetailsModal;
