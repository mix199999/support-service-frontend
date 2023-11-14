// importy
import React from 'react';
import Header from "./Header";
import logo from "../logo.svg";
import Buttons from "./Buttons";
import {Container, Row, Col, InputGroup, Button, FormControl} from 'react-bootstrap';
import { Animated } from 'react-animated-css';
import styles from '../styles/adminDashboard.scss';

// Define title
const title = "Admin Dashboard";
class AdminDashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

            searchTerm: '',
            options: [
                { label: 'Option 1', value: 1 },
                { label: 'Option 2', value: 2 },
                { label: 'Option 3', value: 3 },
                { label: 'Option 4', value: 4 },
                { label: 'Option 5', value: 5 },
                { label: 'Option 6', value: 6 },
                { label: 'Option 7', value: 7 },
                { label: 'Option 8', value: 8 },
                { label: 'Option 9', value: 9 },
            ],
            onLogout:props.onLogout
        };
    }

    handleSearch = (e) => {
        this.setState({ searchTerm: e.target.value });
    };

    handleOptionSelect = (option) => {
        this.setState({ searchTerm: option.value });
    };

    render() {
        return (
            <>
                <Header logoSrc={logo} pageTitle={title} onLogout={this.props.onLogout} />


            </>
        );
    }
}

export default AdminDashboard;