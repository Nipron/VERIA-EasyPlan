import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {updateButton} from "../../redux/buttonsReducer";
import {Redirect} from "react-router";
import s from "../2RoomShape/RoomShape.module.css";
import {HashLink as Link} from "react-router-hash-link";
import {MatFinder} from "../7Result/MatFinder";
import {updateResult} from "../../redux/resultReducer";

const Thermostat = () => {

  /*  const [modalActive, setModalActive] = useState(false);*/

    const buttons = useSelector(state => state.buttons);
   /* const dispatch = useDispatch();*/

   /* const handleClick = (page) => {
        dispatch(updateResult(massGroup))
        dispatch(updateButton(page))
    }*/

    if (!buttons[5]) return <Redirect to="/"/>

    return (
        <div>
            <div className="info-section">
                <div>
                    <h2>Add Thermostat</h2>
                    <p>You need this thermostat kit to connect to the 1st mat and to a socket. The kit also has a wired
                        floor sensor.
                        With Veria Wireless Clickkit you will be able to control the temperature quickly and precisely.
                        You may also program
                        4 different time zones during the weekdays and weekend.
                    </p>
                </div>
                <div className="ellipse-faq-btn">?</div>
            </div>

            <div className="content-section-grid">
                <div className="constructor-box">
                    <div className="product-box">
                        <Link to="/placement" className="btn-accept-product">
                            Wireles Clickkit
                        </Link>
                    </div>
                </div>
                <div className="button-box">
                    <div className="info-area-thermostat">
                        <span>Select please...</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Thermostat;
