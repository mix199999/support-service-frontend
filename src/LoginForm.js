import React, { Component } from 'react';
import axios from 'axios';
import '../styles/login_form_styles.scss'; // Dodaj ten import

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
        <div class="form-group">
          <label for="name" class="form-label align-middle">Username:</label>
          <input
            type="text"
            class="form-control"
            name="username"
            value={username}
            onChange={this.handleInputChange}
            requided={username.toString()}
            placeholder='username'
          />
        </div>
        <div class="form-group" >
          <label class="form-label" for="password">Password:</label>
          <input
            type="password"
            class="form-control"
            name="password"
            value={password}
            onChange={this.handleInputChange}
            requided={password.toString()}
            placeholder=''
          />
        </div>
        <button class="btn btn-primary m-2" onClick={this.handleLogin}>Sign in</button>
      </div>
      <div class="page-footer font-small col-12 rounded-bottom-2" id="loginFooter">

      <div class="text-center p-3" >
    <label>© 2023 Copyright:</label>
      <a class="text-dark" href="https://twojastara.com/">twojastara.com</a>
  </div>
      </div>
      </div>
    );
  }
}

export default LoginForm;
