import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {updateButton} from "../../redux/buttonsReducer";
import {Redirect} from "react-router";
import s from "./Thermostat.module.css";
import {HashLink as Link} from "react-router-hash-link";

const Placement = () => {

    const [modalActive, setModalActive] = useState(false);

    const buttons = useSelector(state => state.buttons);
    const dispatch = useDispatch();

    const handleClick = (page) => {
        dispatch(updateButton(page))
    }

    if (!buttons[6]) return <Redirect to="/"/>

    return (
        <div>
            <div className="info-section">
                <div>
                    <h2>Place Thermostat</h2>
                    <p>Drag the thermostat along the edges of the room, so it matches the placement in the actual room.
                    </p>
                </div>
                <div className="ellipse-faq-btn">?</div>
            </div>

            <div className="content-section-grid">
                <div className="constructor-box">
                </div>
                <div className="button-box">
                    <Link to="/result" onClick={() => handleClick(7)} className={s.btnNextStep}>
                        Continue
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Placement;
