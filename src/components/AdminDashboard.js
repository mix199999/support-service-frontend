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
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {solid} from "@fortawesome/fontawesome-svg-core/import.macro";

// Define title
const title = "Admin Dashboard";
class AdminDashboard extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            onLogout:props.onLogout,
            numberOfOptions: 4,
            optionText: [
                "New Ticket",
                "Your Tickets",
                "FAQ",
                "Users",

            ],
            onClick: [
                this.handleOptionClick.bind(this, "New Ticket"),
                this.handleOptionClick.bind(this, "Your Tickets"),
                this.handleOptionClick.bind(this, "FAQ"),
                this.handleOptionClick.bind(this, "Users"),
                this.handleOptionClick.bind(this, "Option 5"),
            ],
            backgroundImage: [
                Img1,
                Img2,
                Img3,
                Img4
            ],
            componentToShow:"options",
            color:"white",
            selectedOption:"users",
            icons:[
                <FontAwesomeIcon icon={solid("plus")} style={{color: this.color,}} />,
                <FontAwesomeIcon icon={solid("align-justify")} style={{color:this.color,}} />,
                <FontAwesomeIcon icon={solid("question")} style={{color: this.color,}} />,
                <FontAwesomeIcon icon={solid("user")} style={{color: this.color,}} />



            ]


        };
    }

    handleSearch = (e) => {
        this.setState({ searchTerm: e.target.value });
    };

    handleOptionSelect = (option) => {
        this.setState({ searchTerm: option.value });
    };

    handleReturn = () => {
        this.setState({ componentToShow: "dashboard" });
    };


    handleOptionClick = (option) => {
        this.setState({componentToShow:"options", selectedOption:option});

        console.log(option);

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

                            {this.state.componentToShow ==="options" && <AdminDashboardContentList
                                optionText = {this.state.optionText}
                                numberOfOptions = {this.state.numberOfOptions}
                                componentToShow ={this.state.selectedOption}
                                icons ={this.state.icons}
                                color={this.state.color}
                                onClick={this.state.onClick}
                                handleReturn={this.handleReturn}/>}









                    </Row>

                </Container>



            </>
        );
    }
}

export default AdminDashboard;


