import React from 'react';
import {useDispatch} from "react-redux";
import {HashLink as Link} from 'react-router-hash-link';

import {updateButton} from "../../redux/buttonsReducer";

import s from './Start.module.css';

const Start = () => {

    const dispatch = useDispatch();

    const handleClick = (page) => {
        dispatch(updateButton(page))
    }

    return (
        <div>
            <div className="info-section">
                <div>
                    <h2>Plan your installation</h2>
                    <p>EasyPlan makes it easy to plan your new Veria system.
                        <br/>
                        The application guides you through a few selections and provides a design and layout plan
                        for achieving maximum heated floor area based on your input.
                    </p>
                </div>
                <div className="ellipse-faq-btn">?</div>
            </div>
            <div className="content-section">
                <div className="content-section-banner">

                </div>
                <Link to="/roomshape" onClick={() => handleClick(2)} className={s.btnNextStep}>
                    Room Shape
                </Link>
            </div>
        </div>
    );
};

export default Start;
