import React from 'react';
import {Route} from "react-router";

import './styles/main.css';
import './styles/modals.css';
import './styles/normalize.css';

import Header from "./components/Header/Header";
import Nav from "./components/Nav/Nav";
import Start from "./components/1Start/Start";
import RoomShape from "./components/2RoomShape/RoomShape";
import RoomSize from "./components/3RoomSize/RoomSize";
import ColdSpots from "./components/4ColdSpots/ColdSpots";
import FloorType from "./components/5FloorType/FloorType";
import Thermostat from "./components/6Thermostat/Thermostat";
import Result from "./components/7Result/Result";

const App = () => {

    return (
        <div className="page-bg">
            <div className="app-grid">
                <Header/>
                <Nav/>
                <Route exact path='/' component={Start}/>
                <Route path='/roomshape' component={RoomShape}/>
                <Route path='/roomsize' component={RoomSize}/>
                <Route path='/coldspots' component={ColdSpots}/>
                <Route path='/floortype' component={FloorType}/>
                <Route path='/thermostat' component={Thermostat}/>
                <Route path='/result' component={Result}/>
            </div>
        </div>
    );
};

export default App;