import * as React from 'react';
import { Container, Form, Button, Col,Row } from 'react-bootstrap';
import "../styles/login_form_styles.scss";
import contentImg from  "../images/login-form-right-content-img.jpg"
export default class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            onLogin: props.onLogin,
        };

        // Bind the method to the correct context
        this.onChangeHandler = this.onChangeHandler.bind(this);
    }

    onChangeHandler(event) {
        let name = event.target.name;
        let value = event.target.value;
        this.setState({ [name]: value });
    }

    onSubmitLogin = (e) => {
        e.preventDefault(); // Prevent the default form submission
        this.state.onLogin(e, this.state.username, this.state.password);
    };

    render() {
        return (
            <Container className="containerStyle">
                <div className="col-8 contentPanel">
                    <div className="col-6 contentLeft">
                        <Form className="formStyle" onSubmit={this.onSubmitLogin}>
                            <Form.Group >
                                <Form.Label>Username</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="username"
                                    value={this.state.username}
                                    onChange={this.onChangeHandler}
                                />
                            </Form.Group>

                            <Form.Group >
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    name="password"
                                    value={this.state.password}
                                    onChange={this.onChangeHandler}
                                />
                            </Form.Group>

                            <div className="buttonElement"> {/* Center the button */}
                                <Button className="submitBtn col-5" type="submit">Submit</Button>
                            </div>
                            <div className="footer col-12"  >
                                <div className='text-center p-4' >
                                    © 2023 Copyright:
                                    <a className='text-reset fw-bold' href='https://twojastara.com/'>
                                        twojastara.com
                                    </a>
                                </div>
                            </div>
                        </Form>

                    </div>
                    <div className="col-6  contentRight">
                        <img src={contentImg} alt="img"/>
                    </div>

                </div>

            </Container>
        );
    }
}
