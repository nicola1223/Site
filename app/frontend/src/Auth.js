import React, { useState } from 'react';
import axios from './axios';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
    const [formData, setFormData] = useState({ username: '', password: '' })
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        e.preventDefault();
        setIsLoading(true);
        setErrorMessage('');

        try {
            const response = await axios.post('/token/', formData);
            localStorage.setItem('access_token', response.data.access);
            localStorage.setItem('refresh_token', response.data.refresh);
            navigate('/'); // Используем навигацию React Router
        } catch (error) {
            if (error.response) {
                // Обработка различных статус-кодов
                switch (error.response.status) {
                    case 400:
                        setErrorMessage('Неверные данные для входа');
                        break;
                    case 401:
                        setErrorMessage('Неверный логин или пароль');
                        break;
                    case 404:
                        setErrorMessage('Страница не найдена');
                        break;
                    case 500:
                        setErrorMessage('Ошибка сервера');
                        break;
                    default:
                        setErrorMessage('Произошла ошибка');
                }
            } else {
                setErrorMessage('Ошибка соединения с сервером');
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <input className="form-control" id="username" type="text" placeholder="Имя пользователя" onChange={(e) => setFormData({...formData, username: e.target.value})} required/>  
                <input className="form-control" id="password" type="password" placeholder="Пароль" onChange={(e) => setFormData({...formData, password: e.target.value})} required/>
                {errorMessage && (
                    <div className="alert alert-danger mt-2">
                        {errorMessage}
                    </div>
                )}
                <div className="submit mt-3">
                    <input className="btn btn-primary" type="submit" value="Войти" />
                </div>
            </div>
        </form>
    );
}

export default Auth;