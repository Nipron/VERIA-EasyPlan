import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {updateButton} from "../../redux/buttonsReducer";
import {Redirect} from "react-router";

import s from "./ColdSpots.module.css";
import {HashLink as Link} from "react-router-hash-link";

const ColdSpots = () => {

    const buttons = useSelector(state => state.buttons);
    const dispatch = useDispatch();

    const handleClick = (page) => {
        dispatch(updateButton(page))
    }

    if (!buttons[4]) return <Redirect to="/"/>

    return (
        <div>
            <div className="info-section">
                <div>
                    <h2>Cold spots</h2>
                    <p>Here you can add 'cold spots' for areas where underfloor heating should not be placed due to
                        obstacles or certain types of furniture.
                        Note that you can only place the cold spot within the exterior walls (cold spot is yellow). If
                        the cold spot crosses the exterior wall (cold spot is red) it must be moved with the room again.
                    </p>
                </div>
                <div className="ellipse-faq-btn">?</div>
            </div>

            <div className="content-section-grid">
                <div className="constructor-box">
                    <span id="square"></span>
                </div>
                <div className="button-box">
                    <div id="btn-add-cold-spot" className="box_btn-style">Add Cold Spot</div>
                    <div id="btn-help-cold-spot" className="box_btn-style-black">Need help?</div>

                    <div className="bin-area">
                        <span>Drag here to delete</span>
                    </div>
                    <Link to="/floortype" onClick={() => handleClick(5)} className={s.btnNextStep}>
                        Continue
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ColdSpots;
