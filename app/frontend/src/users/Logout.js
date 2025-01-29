import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';

const Logout = ({onLogout}) => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            const refreshToken = localStorage.getItem('refresh_token');
            await axios.post('/token/delete/', { refresh_token: refreshToken });
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            onLogout();
            navigate('/login');
        }
    };

    return (
        <button onClick={ handleLogout } className="nav-item nav-link ms-auto me-auto">
            LOGOUT
        </button>
    );
};

export default Logout;
