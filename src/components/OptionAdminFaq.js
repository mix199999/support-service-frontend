import React, { useState } from "react";
import { Row, Col, Container, Form, Button , Table, Modal} from "react-bootstrap";
import "../styles/option-admin-faq.scss";
import {request, setAuthHeader , getAuthToken, deleteRecord, getRole} from "./axios_helper";
import axios from "axios";

export default class OptionAdminFaq extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            componentToShow: "",
            selectedProduct: null,
            faqTitle: "",
            faqDescription: "",
        };
    }

    componentDidMount() {
        getRole() === "USER" ? this.displayAllFAQ() : this.selectOption();
    }


    handleProductChange = (event) => {
        const productId = event.target.value;
        const selectedProduct = this.state.data.find(product => product.id == productId);
        this.setState({ selectedProduct });
    };

    selectOption = () => {
        this.setState({ componentToShow: "selectOption" });
    };

    displayAllFAQ = () => {
        this.getFAQData();
        this.setState({ componentToShow: "displayAllFAQ" });
    };

    addNewFAQ = () => {
        this.getProductsData();
        this.setState({ componentToShow: "addNewFAQ" });
    };

   getFAQData = () =>{
       request(
           "GET",
           "/option-faq-show-all",
           {}).then(
           (response) => {
               this.setState({data: response.data})
           }).catch(
           (error) => {
               if (error.response.status === 401) {
                   setAuthHeader(null);
               } else {
                   this.setState({data: error.response.code})
               }

           }
       );
   };


    getProductsData = () =>{
        request(
            "GET",
            "/option-products",
            {}).then(
            (response) => {
                this.setState({data: response.data})
            }).catch(
            (error) => {
                if (error.response.status === 401) {
                    setAuthHeader(null);
                } else {
                    this.setState({data: error.response.code})
                }

            }
        );
    };

    handleTitleChange = (event) => {
        this.setState({ faqTitle: event.target.value });
    };

    handleDescriptionChange = (event) => {
        this.setState({ faqDescription: event.target.value });
    };

    onClickShow = (faq) => {
        this.setState({
            selectedFAQ: faq,
            showModal: true,
        });
    };

    // Updated the method to close the modal
    closeModal = () => {
        this.setState({
            showModal: false,
        });
    };

    deleteFAQ = (faqId) => {
        // Specify the API endpoint for deleting FAQs
        const deleteEndpoint = '/delete-faq/';

        // Call the deleteRecord function
        deleteRecord(faqId, deleteEndpoint)
            .then(() => {
                console.log('FAQ deletion successful');
                this.getFAQData();
                this.setState({ componentToShow: "displayAllFAQ" });
                // If needed, perform any additional actions after successful deletion
            })
            .catch((error) => {
                console.error('FAQ deletion failed:', error);
                // Handle the error or display a notification to the user
            });
    };



    handleSubmit = (event) => {
        event.preventDefault();

        // Add your logic here to handle the form submission
        const formData = {
            productId: this.state.selectedProduct.id,
            title: this.state.faqTitle,
            description: this.state.faqDescription,
        };
        console.log(formData);

        // Use your existing request function to send the form data to the server
        request("POST", "/submit-faq", formData)
            .then((response) => {
                console.log("Form submitted successfully", response);

                // Optionally, reset form fields or navigate to a different page
                this.setState({
                    selectedProduct: null,
                    faqTitle: "",
                    faqDescription: "",
                });
               this.displayAllFAQ();

            })
            .catch((error) => {
                console.error("Form submission failed", error);
                // Handle errors or display a notification to the user
            });
    };



    render() {
        return (
            <Container className={"option-admin-faq-container"}>
                <Row className={"option-admin-faq-row"}>
                    {this.state.componentToShow === "selectOption" && (
                        <>
                            <Col xs={6} md={6} lg={6} className={"option-admin-faq-col-left"}>
                                <Button onClick={this.displayAllFAQ}>Show</Button>
                            </Col>
                            <Col xs={6} md={6} lg={6} className={"option-admin-faq-col-right"}>
                                <Button onClick={this.addNewFAQ}>Add</Button>
                            </Col>
                        </>
                    )}

                    {this.state.componentToShow === "displayAllFAQ" &&

                    <>
                    <div className={"option-faq-table-container"}>
                        <Table className={"option-faq-table"} striped borderless hover variant="dark">
                            <thead>
                            <tr>
                                <th>ID</th>
                                <th>Product Name</th>
                                <th>Info Title</th>
                                <th>Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {this.state.data.map((faq) => (
                                <tr key={faq.id}>
                                    <td>{faq.id}</td>
                                    <td>{faq.productName}</td>
                                    <td>{faq.title}</td>
                                    <td>
                                        <Button className={"btn btn-info mr-2"} onClick={() => this.onClickShow(faq)}>
                                            Show
                                        </Button>
                                        {getRole() !== "USER" && (
                                            <Button className={"btn btn-danger"} onClick={() => this.deleteFAQ(faq.id)}>
                                                Delete
                                            </Button>
                                        )}
                                    </td>

                                </tr>
                            ))}
                            </tbody>
                        </Table>
                    </div>
                        <Modal show={this.state.showModal} onHide={this.closeModal}>
                            <Modal.Header closeButton>
                                <Modal.Title>FAQ Information</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                {this.state.selectedFAQ && (
                                    <>
                                        <p>ID: {this.state.selectedFAQ.id}</p>
                                        <p>Product Name: {this.state.selectedFAQ.productName}</p>
                                        <p>Info Title: {this.state.selectedFAQ.title}</p>
                                        <p>Info Text: {this.state.selectedFAQ.text}</p>
                                    </>
                                )}
                            </Modal.Body>
                        </Modal>
                    </>
                    }
                    {this.state.componentToShow === "addNewFAQ" && (
                        <div className={"add-faq-form-container"}>
                            <Form onSubmit={this.handleSubmit}>
                                <Form.Group controlId="productName">
                                    <Form.Label>Product Name</Form.Label>
                                    <Form.Control as="select" onChange={this.handleProductChange}>
                                        <option value="" disabled selected>Select a product</option>
                                        {this.state.data.map((product) => (
                                            <option key={product.id} value={product.id}>
                                                {product.name}
                                            </option>
                                        ))}
                                    </Form.Control>
                                </Form.Group>

                                <Form.Group controlId="faqTitle">
                                    <Form.Label>Title</Form.Label>
                                    <Form.Control
                                        onChange={this.handleTitleChange}
                                        type="text"
                                        placeholder="Enter FAQ title"
                                        // Add any necessary event handlers or validations
                                    />
                                </Form.Group>

                                <Form.Group controlId="faqDescription">
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control
                                        onChange={this.handleDescriptionChange}
                                        as="textarea"
                                        rows={3}
                                        placeholder="Enter FAQ description"
                                        // Add any necessary event handlers or validations
                                    />
                                </Form.Group>

                                {/* Add other form fields as needed */}

                                <Button variant="primary" type="submit" >
                                    Submit
                                </Button>
                            </Form>
                        </div>
                    )}


                </Row>
            </Container>
        );
    }
}
