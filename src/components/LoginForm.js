import React, { Component } from 'react';
import axios from 'axios';
// '../styles/login_form_styles.scss'; // Dodaj ten import

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            error: null,
        };
    }

    handleInputChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    handleLogin = async () => {
        const { username, password } = this.state;

        try {
            // Wyślij dane logowania do API Spring Boot
            const response = await axios.post('http://localhost:8080/loginForm', {
                username,
                password,
            });

            // Po poprawnym zalogowaniu, możesz dodać logikę przekierowania lub wyświetlenia komunikatu sukcesu
            console.log('Zalogowano pomyślnie:', response.data);

            // Dodać logikę przekierowania lub innych działań po zalogowaniu
        } catch (error) {
            // Obsłuż błędy logowania
            this.setState({ error: 'Niepoprawne dane logowania.' });
        }
    }



    render() {
        const { username, password, error } = this.state;

        return (
            <div className="col-4 shadow rounded-2" id="panel">
                <div className = " col-12  p-2" id="form-panel">

                    {error && <div className="error">{error}</div>}
                    <div className="form-group">
                        <label htmlFor="name" className="form-label align-middle">Username:</label>
                        <input
                            type="text"
                            className="form-control"
                            name="username"
                            value={username}
                            onChange={this.handleInputChange}
                           // required={username.toString()}
                            placeholder='username'
                        />
                    </div>
                    <div className="form-group" >
                        <label className="form-label" htmlFor="password">Password:</label>
                        <input
                            type="password"
                            className="form-control"
                            name="password"
                            value={password}
                            onChange={this.handleInputChange}
                            //required={password.toString()}
                            placeholder=''
                        />
                    </div>
                    <button className="btn btn-primary m-2" onClick={this.handleLogin}>Sign in</button>
                </div>
                <div className="page-footer font-small col-12 rounded-bottom-2" id="loginFooter">

                    <div className="text-center p-3" >
                        <label>© 2023 Copyright:</label>
                        <a className="text-dark" href="https://twojastara.com/">twojastara.com</a>
                    </div>
                </div>
            </div>
        );
    }
}

export default LoginForm;
