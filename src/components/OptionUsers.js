import React from "react";
import {request, setAuthHeader} from "./axios_helper"
import {Container, Table} from "react-bootstrap";

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
            "/messages",
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


    render() {
        return(
            <>
                <Container>
                    <Table>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Username</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Options</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.data.map((user) => (
                                <tr key={user.id}>
                                    <td>{user.id}</td>
                                    <td>{user.username}</td>
                                    <td>{user.email}</td>
                                    <td>{user.role}</td>
                                    <td>{/* Dodaj opcje, jeśli potrzebujesz */}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Container>

            </>

        );
    };
}