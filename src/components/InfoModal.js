import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';

const InfoModal = ({ title, text, duration, showModal, onHide }) => {
    const [show, setShow] = useState(showModal);

    useEffect(() => {
        setShow(showModal);

        // Auto-hide modal after a specified duration
        if (duration && duration > 0) {
            const timeoutId = setTimeout(() => {
                onHide();
            }, duration);

            return () => clearTimeout(timeoutId);
        }
    }, [showModal, onHide, duration]);

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>{text}</p>
            </Modal.Body>

        </Modal>
    );
};

export default InfoModal;
