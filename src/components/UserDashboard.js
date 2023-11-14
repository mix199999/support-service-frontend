import React from 'react';

class UserDashboard extends React.Component {
    componentDidMount() {
        this.checkUserRole();
    }

    checkUserRole() {
        const userRole = window.localStorage.getItem('role');

        if (userRole !== 'USER') {
            // Tutaj możesz przekierować użytkownika na inną stronę lub wyświetlić komunikat o braku dostępu
            console.log('Brak dostępu!');
        }
    }

    render() {
        // Treść komponentu UserDashboard
        return (
            <div>
                <h1>User Dashboard</h1>
                {/* Treść dashboarda */}
            </div>
        );
    }
}

export default UserDashboard;
