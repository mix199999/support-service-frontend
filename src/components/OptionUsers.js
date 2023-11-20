import React from "react";
import {request, setAuthHeader, setRole, deleteRecord} from "./axios_helper"
import {Button, Container, Table} from "react-bootstrap";
import "../styles/option-user.scss"

export default class OptionUsers extends React.Component{

    constructor(props) {
        super(props);
        this.state={
        data:[]
        }
    };



    componentDidMount() {
        request(
            "GET",
            "/option-users",
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
    onClickDelete = (id) => {
        deleteRecord( id, '/option-users/delete/')
            .then(() => {
                // After successful deletion, refresh the data
                this.refreshData();
            })
            .catch((error) => {
                console.error('Deletion failed:', error);
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



    render() {
        return(
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
                                    <td>{<Button className={"btn btn-danger"}
                                     onClick={() => this.onClickDelete(user.userId)}
                                    >Delete</Button>}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Container>

            </>

        );
    };
}