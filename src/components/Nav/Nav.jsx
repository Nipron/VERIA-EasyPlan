import React from 'react';
import {useSelector, useDispatch} from "react-redux";
import {HashLink as Link} from 'react-router-hash-link';

import {updateButton} from "../../redux/buttonsReducer";

import '../../styles/main.css';
import '../../styles/modals.css';
import s from './Nav.module.css';

const Nav = () => {

    const dispatch = useDispatch();

    let buttons = useSelector(state => state.buttons);

    const handleClick = (page) => {
        //dispatch(updateButton(page))
    }

    return (
        <div className="controler-section">
            <Link to="/" onClick={() => handleClick(1)} className={`${s.btn} ${s.btnStart}`}>
                    Start here
            </Link>
            <Link to="/roomshape" onClick={() => handleClick(2)} className={`${s.btn} ${buttons[2] && s.active}`}>
                Room Shape
            </Link>
            <Link to="/roomsize" onClick={() => handleClick(3)} className={`${s.btn} ${buttons[3] && s.active}`}>
                Room Size
            </Link>
            <Link to="/coldspots" onClick={() => handleClick(4)} className={`${s.btn} ${buttons[4] && s.active}`}>
                Cold Spots
            </Link>
            <Link to="/thermostat" onClick={() => handleClick(5)} className={`${s.btn} ${buttons[5] && s.active}`}>
                Thermostat
            </Link>
            <Link to="/floortype" onClick={() => handleClick(6)} className={`${s.btn} ${buttons[6] && s.active}`}>
                Floor Type
            </Link>
            <Link to="/result" onClick={() => handleClick(7)} className={`${s.btn} ${s.btnResult} ${buttons[7] && s.activeResult}`}>
                Result
            </Link>
        </div>
    );
};

export default Nav;
