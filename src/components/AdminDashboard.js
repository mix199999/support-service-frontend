// importy
import React from 'react';
import Header from "./Header";
import logo from "../logo.svg";
import Buttons from "./Buttons";
import {Container, Row, Col, InputGroup, Button, FormControl} from 'react-bootstrap';
import { Animated } from 'react-animated-css';
import styles from '../styles/adminDashboard.scss';
import AdminDashboardContent from "./AdminDashboardContent";
import OptionBox from "./OptionBox";
import Img1 from '../images/option-1.jpg';
import Img2 from '../images/option-2.jpg';
import Img3 from '../images/option-3.jpg';
import Img4 from '../images/option-4.jpg';
import Img5 from '../images/option-5.jpg';
import AdminDashboardContentList from "./AdminDashboardContentList";

// Define title
const title = "Admin Dashboard";
class AdminDashboard extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            onLogout:props.onLogout,
            numberOfOptions: 4,
            optionText: [
                "newTicket",
                "yourTicket",
                "fAQ",
                "Users",
                "Option 5"
            ],
            onClick: [
                this.handleOptionClick.bind(this, "New case"),
                this.handleOptionClick.bind(this, "Your Tickets"),
                this.handleOptionClick.bind(this, "Option 3"),
                this.handleOptionClick.bind(this, "Option 4"),
                this.handleOptionClick.bind(this, "Option 5"),
            ],
            backgroundImage: [
                Img1,
                Img2,
                Img3,
                Img4
            ],
            componentToShow:"test"


        };
    }

    handleSearch = (e) => {
        this.setState({ searchTerm: e.target.value });
    };

    handleOptionSelect = (option) => {
        this.setState({ searchTerm: option.value });
    };

    handleOptionClick = (option) => {
        // Handle the click event for each option
        console.log(`Option ${option} clicked`);
        //switch case zzrob
    };

    render() {
        return (
            <>
                <Header logoSrc={logo} pageTitle={title} onLogout={this.props.onLogout} />
                <Container fluid={true} className="containerStyleAdmin">
                    <Row  className="contentPanelAdmin">



                            {this.state.componentToShow === "dashboard"&&
                                <AdminDashboardContent
                                numberOfOptions={this.state.numberOfOptions}
                                optionText={this.state.optionText}
                                onClick={this.state.onClick}
                                backgroundImage={this.state.backgroundImage}
                            />}

                            {this.state.componentToShow ==="test" && <AdminDashboardContentList />}









                    </Row>

                </Container>



            </>
        );
    }
}

export default AdminDashboard;


