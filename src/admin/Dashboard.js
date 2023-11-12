import React from 'react';
import Sidebar from '../Sidebar';

const Dashboard = () => {
  return (
    <div>
      <Sidebar />
      <div className="dashboard-content">
        <h1>Dashboard</h1>
        {/* Dodaj tutaj zawartość panelu bocznego */}
      </div>
    </div>
  );
}

export default Dashboard;
