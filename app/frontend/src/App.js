import React, { Component } from 'react';
import { BrowserRouter, Routes } from 'react-router-dom';
import { Route} from 'react-router-dom';
import TracksList from './TrucksList';
import TruckCreateUpdate from './TruckCreateUpdate';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const BaseLayout = () => (
    <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <a className="navbar-brand" href="#"><img className="navbar-logo" src="./logo192.png"/></a>
            <a className="navbar-brand" href="#">Site React Demo</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false"  aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div className="navbar-nav">
                    <a className="nav-item nav-link" href="/">TRUCKS</a>
                    <a className="nav-item nav-link" href="/truck">CREATE TRUCK</a>
                </div>
            </div>
        </nav>
        <div className="container-fluid">
                <div className="content">
                    <Routes>
                        <Route path='/' element={<TracksList/>}/>
                        <Route path='/truck/:pk' element={<TruckCreateUpdate/>}/>
                        <Route path='/truck' element={<TruckCreateUpdate/>}/>
                    </Routes>
                </div>
        </div>
    </div>
)

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