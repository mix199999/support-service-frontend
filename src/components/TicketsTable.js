import React, { useEffect, useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import { request, getId, getRole } from './axios_helper';

const TicketsTable = ({ obtainNew }) => {
    const [ticketsData, setTicketsData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const role = getRole();
            const userId = getId();

            let url = '';

            if (role === 'ADMIN') {
                url = obtainNew ? '/tickets/not-handled' : `/tickets/by-handler/${userId}`;
            } else if (role === 'USER') {
                url = `/tickets/by-user/${userId}`;
            }

            try {
                const response = await request('GET', url);
                setTicketsData(response.data);
            } catch (error) {
                console.error('Error fetching tickets data:', error);
            }
        };

        fetchData();
    }, [obtainNew]);

    const handleTakeClick = (ticketId) => {
        // Handle 'Take' button click
        console.log(`Take button clicked for ticket ID ${ticketId}`);
    };

    const handleShowClick = (ticketId) => {
        // Handle 'Show' button click
        console.log(`Show button clicked for ticket ID ${ticketId}`);
    };

    const handleCloseClick = (ticketId) => {
        // Handle 'Close' button click
        console.log(`Close button clicked for ticket ID ${ticketId}`);
    };

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
            {ticketsData.map((ticket, index) => (
                <tr key={ticket.idTicket}>
                    <td>{index + 1}</td>
                    <td>{ticket.titleTicket}</td>
                    <td>
                        {getRole() === 'USER' && (
                            <Button variant="primary" onClick={() => handleShowClick(ticket.idTicket)}>
                                Show
                            </Button>
                        )}
                        {getRole() === 'ADMIN' && obtainNew && (
                            <Button variant="success" onClick={() => handleTakeClick(ticket.idTicket)}>
                                Take
                            </Button>
                        )}
                        {getRole() === 'ADMIN' && obtainNew && (
                            <Button variant="primary" onClick={() => handleShowClick(ticket.idTicket)}>
                                Show
                            </Button>
                        )}
                        {getRole() === 'ADMIN' && !obtainNew && (
                            <Button variant="primary" onClick={() => handleShowClick(ticket.idTicket)}>
                                Show
                            </Button>
                        )}
                        {getRole() === 'ADMIN' && !obtainNew && (
                            <Button variant="danger" onClick={() => handleCloseClick(ticket.idTicket)}>
                                Close
                            </Button>
                        )}
                    </td>
                </tr>
            ))}
            </tbody>
        </Table>
    );
};

export default TicketsTable;
