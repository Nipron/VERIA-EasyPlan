import React from 'react';
import {useSelector, useDispatch} from "react-redux";
import {HashLink as Link} from 'react-router-hash-link';

import {updateButton} from "../../redux/buttonsReducer";

import '../../styles/main.css';
import '../../styles/modals.css';
import s from './Nav.module.css';
import {useTranslation} from "react-i18next";

const Nav = () => {

    const dispatch = useDispatch();
    const {t} = useTranslation();

    let buttons = useSelector(state => state.buttons);

    const handleClick = (page) => {
        //dispatch(updateButton(page))
    }

    return (
        <div className="controler-section">
            <Link to="/" onClick={() => handleClick(1)} className={`${s.btn} ${s.btnStart}`}>
                {t("start")}
            </Link>
            <Link to="/roomshape" onClick={() => handleClick(2)} className={`${s.btn} ${buttons[2] && s.active}`}>
                {t("room_shape")}
            </Link>
            <Link to="/roomsize" onClick={() => handleClick(3)} className={`${s.btn} ${buttons[3] && s.active}`}>
                {t("room_size")}
            </Link>
            <Link to="/coldspots" onClick={() => handleClick(4)} className={`${s.btn} ${buttons[4] && s.active}`}>
                {t("cold_spots")}
            </Link>
            <Link to="/thermostat" onClick={() => handleClick(5)} className={`${s.btn} ${buttons[5] && s.active}`}>
                {t("thermostat")}
            </Link>
            <Link to="/floortype" onClick={() => handleClick(6)} className={`${s.btn} ${buttons[6] && s.active}`}>
                {t("floor_type")}
            </Link>
            <Link to="/result" onClick={() => handleClick(7)} className={`${s.btn} ${s.btnResult} ${buttons[7] && s.activeResult}`}>
                {t("result")}
            </Link>
        </div>
    );
};

export default Nav;
