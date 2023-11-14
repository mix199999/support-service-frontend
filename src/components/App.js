import * as React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AppContent from './AppContent';
import DashboardRoutes from "./DashboardRoutes";

function App() {
    return (
        <div>
            <div className='container-fluid'>
                <div className='row'>
                    <div className='col'>
                        <Router>
                            <Routes>
                                <Route
                                    path="/"
                                    element={<AppContent />}
                                />
                                {/* DashboardRoutes should not be nested inside another Routes */}
                                <Route path="/dashboard/*" element={<DashboardRoutes />} />
                            </Routes>
                        </Router>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
