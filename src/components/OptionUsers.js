import React from "react";
import { request, setAuthHeader, deleteRecord } from "./axios_helper";
import { Button, Container, Table, Modal } from "react-bootstrap";
import "../styles/option-user.scss";

class OptionUsers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            showInfoModal: false,
            infoModalTitle: "",
            infoModalText: "",
        };
    }

    componentDidMount() {
        this.refreshData();
    }

    onClickDelete = (id) => {
        deleteRecord(id, "/option-users/delete/")
            .then(() => {
                // After successful deletion, refresh the data and show InfoModal
                this.refreshData();
                this.showInfoModal("Success", "User deleted successfully");
            })
            .catch((error) => {
                console.error("Deletion failed:", error);
                this.showInfoModal("Error", "Failed to delete user");
            });
    };

    refreshData = () => {
        // Fetch updated data and update the state
        request("GET", "/option-users", {})
            .then((response) => {
                this.setState({ data: response.data });
            })
            .catch((error) => {
                if (error.response.status === 401) {
                    setAuthHeader(null);
                } else {
                    this.setState({ data: error.response.code });
                }
            });
    };

    showInfoModal = (title, text) => {
        this.setState({
            showInfoModal: true,
            infoModalTitle: title,
            infoModalText: text,
        });
    };

    hideInfoModal = () => {
        this.setState({
            showInfoModal: false,
            infoModalTitle: "",
            infoModalText: "",
        });
    };

    render() {
        return (
            <>
                <Container className={"option-user-container"}>
                    <Table className={"option-user-table"} striped borderless hover variant="dark">
                        <thead>
                        <tr>
                            <th>Id</th>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.data.map((user) => (
                            <tr key={user.userId}>
                                <td>{user.userId}</td>
                                <td>{user.username}</td>
                                <td>{user.emailAddr}</td>
                                <td>{user.role}</td>
                                <td>
                                    {
                                        <Button
                                            className={"btn btn-danger"}
                                            onClick={() => this.onClickDelete(user.userId)}
                                        >
                                            Delete
                                        </Button>
                                    }
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                </Container>

                {/* InfoModal */}
                <Modal show={this.state.showInfoModal} onHide={this.hideInfoModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>{this.state.infoModalTitle}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>{this.state.infoModalText}</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.hideInfoModal}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
}

export default OptionUsers;
