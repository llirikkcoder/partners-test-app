import React from 'react';
import { useNavigate } from 'react-router-dom';
import './header.css';

const Header = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Implement your logout logic here (e.g., clearing the user data)
        localStorage.removeItem('user'); // Example: Clear user from local storage
        navigate('/'); // Redirect to the homepage or login page
    };

    return (
        <header className="app-header">
            <h1>My Application</h1>
            <nav className='app-header--nav'>
                <button onClick={() => navigate('/account')}>My Profile</button>
                <button onClick={() => navigate('/people')}>View People</button>
                <button onClick={handleLogout}>Logout</button>
            </nav>
        </header>
    );
};

export default Header;
