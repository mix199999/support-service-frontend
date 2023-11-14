import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import AdminDashboard from './AdminDashboard';
import UserDashboard from './UserDashboard';
import LoginForm from "./LoginForm";

export default function DashboardRoutes(props) {
    const userRole = window.localStorage.getItem('role');

    return (
        <Routes>
            {userRole === 'ADMIN' ? (
                <Route path="/" element={<AdminDashboard onLogout={props.onLogout} />} />
            ) : userRole === 'USER' ? (
                <Route path="/" element={<UserDashboard onLogout={props.onLogout}  />} />
            ) : (
                <Route path="/" element={<LoginForm onLogin={props.onLogin} onLogout={props.onLogout}  />} />

            )}
        </Routes>
    );
}


