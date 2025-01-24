import React, { Component, useState, useEffect } from 'react';
import { BrowserRouter, Routes, Link } from 'react-router-dom';
import { Route } from 'react-router-dom';

import TracksList from './TrucksList';
import TruckCreateUpdate from './TruckCreateUpdate';
import Auth from './Auth';
import ProtectedRoute from './ProtectedRoute';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './App.css';
import logo from './logo192.png'

const BaseLayout = () => {
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollTop, setLastScrollTop] = useState(0);

    const handleScroll = () => {
        const currentScrollTop = window.scrollY || document.documentElement.scrollTop;

        if (currentScrollTop > lastScrollTop) {
            // Прокрутка вниз
            setIsVisible(false);
        } else {
            // Прокрутка вверх
            const navbar = document.getElementById('navbarNavAltMarkup');
            if (navbar.classList.contains('show')) {
                navbar.classList.remove('show');
            }
            setIsVisible(true);
        }

        setLastScrollTop(currentScrollTop);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll); 
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [lastScrollTop]);

    return (
        <div>
            <nav className={`navbar navbar-expand-lg navbar-dark bg-dark fixed-top ${isVisible ? 'visible' : 'hidden'}`}>
                <Link className="navbar-brand" to="/">
                    <img className="navbar-logo" src={logo} alt="Logo" />
                </Link>
                <span className="navbar-brand" href="#">Trucks</span>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <Link className="nav-item nav-link ms-auto me-auto" to="/login">LOGIN</Link>
                        <Link className="nav-item nav-link ms-auto me-auto" to="/">TRUCKS</Link>
                        <Link className="nav-item nav-link ms-auto me-auto" to="/truck">CREATE TRUCK</Link>
                    </div>
                </div>
            </nav>
            <div className="container-fluid">
                    <div className="content">
                        <Routes>
                            <Route path="/login" element={<Auth/>} />
                            <Route element={<ProtectedRoute/>}/>
                            <Route path='/' element={<TracksList/>}/>
                            <Route path='/truck/:pk' element={<TruckCreateUpdate/>}/>
                            <Route path='/truck' element={<TruckCreateUpdate/>}/>
                        </Routes>
                    </div>
                    <div className="big"></div>
            </div>
        </div>
    )
}

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <BaseLayout/>
            </BrowserRouter>
        );
    }
}
export default App;