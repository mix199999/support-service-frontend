import React, { Component } from 'react';
import { Table, Button } from 'react-bootstrap';
import { request, getId, getRole } from './axios_helper';
import {wait} from "@testing-library/user-event/dist/utils";

class TicketsTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ticketsData: [],
            onClickAdd : props.onClickAdd,
            onClickShow : props.onClickShow,

        };
    }

    componentDidMount() {
        console.log(this.props.obtainNew);
        this.fetchData();
    }

    componentDidUpdate(prevProps) {
        if (this.props.obtainNew !== prevProps.obtainNew) {


            this.fetchData();
        }
    }

    fetchData = async () => {
        const role = getRole();
        const userId = getId();

        let url = '';

        if (role === 'ADMIN') {
            url = this.props.obtainNew ? '/tickets/not-handled' : `/tickets/by-handler/${userId}`;
        } else if (role === 'USER') {
            url = `/tickets/by-user/${userId}`;
        }

        try {
            const response = await request('GET', url);
            this.setState({ ticketsData: response.data });
        } catch (error) {
            console.error('Error fetching tickets data:', error);
        }
    };

    handleTakeClick = (e,ticketId, titleTicket) => {
        // Handle 'Take' button click
        console.log(`Take button clicked for ticket ID ${ticketId}`);
        e.preventDefault();
        this.state.onClickAdd(ticketId, titleTicket);
    };

    handleShowClick =  (e, ticketId) => {
        // Handle 'Show' button click
        console.log(`Show button clicked for ticket ID ${ticketId}`);
        e.preventDefault();
        this.state.onClickShow(ticketId);



    };

    handleCloseClick = ( ticketId) => {
        // Handle 'Close' button click
        console.log(`Close button clicked for ticket ID ${ticketId}`);

    };

    render() {
        return (
            <Table className={"option-faq-table"} striped borderless hover variant="dark">
                <thead>
                <tr>
                    <th>#</th>
                    <th>Title</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {this.state.ticketsData.map((ticket, index) => (
                    <tr key={ticket.idTicket}>
                        <td>{index + 1}</td>
                        <td>{ticket.titleTicket}</td>
                        <td>
                            {getRole() === 'USER' && (
                                <Button variant="primary" onClick={() => this.handleShowClick(ticket.idTicket)}>
                                    Show
                                </Button>
                            )}
                            {getRole() === 'ADMIN' && this.props.obtainNew && (
                                <Button variant="success"
                                        onClick={(event) => this.handleTakeClick(event , ticket.idTicket , ticket.titleTicket)}
                                >
                                    Take
                                </Button>
                            )}
                            {getRole() === 'ADMIN' && this.props.obtainNew && (
                                <Button variant="primary"
                                        onClick={(event) => this.handleShowClick(event , ticket.idTicket , ticket.titleTicket)}

                                >
                                    Show
                                </Button>
                            )}
                            {getRole() === 'ADMIN' && !this.props.obtainNew && (
                                <Button variant="primary" onClick={(event) => this.handleShowClick(event, ticket.idTicket)}>
                                    Show
                                </Button>
                            )}
                            {getRole() === 'ADMIN' && !this.props.obtainNew && (
                                <Button variant="danger" onClick={() => this.handleCloseClick(ticket.idTicket)}>
                                    Close
                                </Button>
                            )}
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>
        );
    }
}

export default TicketsTable;
