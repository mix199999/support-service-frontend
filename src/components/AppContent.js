import * as React from 'react';
import WelcomeContent from './WelcomeContent';
import AuthContent from "./AuthContent";
import LoginForm from "./LoginForm";
import {getAuthToken, request, setAuthHeader, setRole } from './axios_helper';
import Buttons from "./Buttons";
import DashboardRoutes from "./DashboardRoutes";
import Header from "./Header";
export default class AppContent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            componentToShow: getAuthToken() ? "dashboard" : "login"
        }
    };

    login = () => {
        this.setState({ componentToShow: "login" });
    };

    logout = () => {
        this.setState({ componentToShow: "login" });
        setAuthHeader(null);
        setRole(null);
    };

    onLogin = (e, username, password) => {
        e.preventDefault();
        request(
            "POST",
            "/login",
            {
                username: username,
                password: password
            }).then(
            (response) => {
                console.log('Login successful!');
                setAuthHeader(response.data.token);
                setRole(response.data.role);
                console.log(response.data.role);
                console.log(response.data.token);
                this.setState({ componentToShow: "dashboard" });

               // this.setState({ componentToShow: "messages" });
            }).catch(
            (error) => {
                console.error('Login failed:', error);
                setAuthHeader(null);
                this.setState({ componentToShow: "welcome" });
            }
        );
    };

    render() {


        return (
            <>
                {this.state.componentToShow === "login" && <LoginForm onLogin={this.onLogin}  />}
                {this.state.componentToShow === "messages" && <AuthContent />}
                {this.state.componentToShow === "dashboard" && <DashboardRoutes onLogout={this.logout}
                                                                                onLogin={this.onLogin}/> }

            </>
        );
    };
}
