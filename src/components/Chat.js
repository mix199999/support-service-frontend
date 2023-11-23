import React, { useState, useEffect } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import { getId } from "./axios_helper";

import '../styles/chat.scss'; // Import custom styles for the chat

const Chat = ({ ticketId, onBackClick }) => {
    const [messages, setMessages] = useState([]);
    const [messageInput, setMessageInput] = useState('');
    const [stompClient, setStompClient] = useState(null);

    useEffect(() => {
        const socket = new SockJS('http://localhost:8080/ws');
        const stomp = Stomp.over(socket);

        stomp.connect({}, () => {
            setStompClient(stomp);

            stomp.subscribe(`/topic/${ticketId}`, (message) => {
                const receivedMessage = JSON.parse(message.body);

                if (Array.isArray(receivedMessage)) {
                    setMessages((prevMessages) => [...prevMessages, ...receivedMessage]);
                } else {
                    setMessages((prevMessages) => [...prevMessages, receivedMessage]);
                }
            });

            stomp.send(`/app/getMessages/${ticketId}`, {}, JSON.stringify({ ticketId: ticketId }));
        });

        return () => {
            if (stomp.connected) {
                stomp.disconnect();
            }
        };
    }, [ticketId]);

    const sendMessage = () => {
        if (stompClient && messageInput.trim() !== '') {
            const message = {
                ticketId: ticketId,
                message: messageInput,
                senderId: getId(),
                messageDate: new Date(),
            };

            stompClient.send(`/app/sendMessage/${ticketId}`, {}, JSON.stringify(message));
            setMessageInput('');
        }
    };

    return (
        <>
            <div className={"navigation-messages"}>
                <Button onClick={() => onBackClick()} variant="outline-primary">Back </Button>
            </div>

            <div className="chat-container">
                <div className="message-container">
                    {messages.map((msg) => (
                        <div
                            key={msg.id}
                            className={msg.senderId === parseInt(getId(), 10) ? 'own-message' : 'user-message'}
                        >
                            {msg.message}
                        </div>
                    ))}
                </div>

            </div>

            <Form className="message-input-form">
                <Form.Group controlId="messageInput"   className={"message-input-text"}>
                    <Form.Control
                        type="text"
                        placeholder="Type your message..."
                        value={messageInput}
                        onChange={(e) => setMessageInput(e.target.value)}

                    />
                </Form.Group>
                <Button variant="primary" onClick={sendMessage}>
                    Send
                </Button>
            </Form>


        </>
    );
};

export default Chat;
