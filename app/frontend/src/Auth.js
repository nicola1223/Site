import React, { useState } from 'react';
import axios from 'axios';

const Auth = () => {
    const [formData, setFormData] = useState({ username: ', password: ' })

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/token/', formData);
            localStorage.setItem('access_token', response.data.access);
            localStorage.setItem('refresh_token', response.data.refresh);
            window.location.href = '/'
        } catch (error) {
            console.error('Login error:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <input className="form-control" id="username" type="text" placeholder="Имя пользователя" onChange={(e) => setFormData({...formData, username: e.target.value})} required/>  
                <input className="form-control" id="password" type="password" placeholder="Пароль" onChange={(e) => setFormData({...formData, password: e.target.value})} required/>
                <div className="submit">
                    <input className="btn btn-primary" type="submit" value="Войти" />
                </div>
            </div>
        </form>
    );
}