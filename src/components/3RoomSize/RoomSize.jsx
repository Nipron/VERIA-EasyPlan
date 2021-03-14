import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Redirect} from "react-router";
import {HashLink as Link} from "react-router-hash-link";

import '../../styles/main.css';
import '../../styles/modals.css';
import s from "./RoomSize.module.css";

import {updateButton} from "../../redux/buttonsReducer";
import PlanMaker from "../PlanMaker/PlanMaker";
import PlanMakerL from "../PlanMaker/PlanMakerL";
import ModalRoomSize from "../0Modal/ModalRoomSize";

const RoomSize = () => {

    const [modalActive, setModalActive] = useState(false);


    const buttons = useSelector(state => state.buttons);
    const shapes = useSelector(state => state.shapes);

    const dispatch = useDispatch();

    if (!buttons[3]) return <Redirect to="/"/>;

    return (
        <div>
            <div className="info-section">
                <div>
                    <h2>Adjust Room Size</h2>
                    <p>Adjust the dimensions to match your actual room measurements.
                        Make sure to be as accurate as possible when dimensioning the room to ensure reliable results.
                        If you right-click anywhere on the room you can zoom in and thus make it easier to adjust the
                        room's exact size. Remember to zoom out when finished.
                    </p>
                </div>
                <div className="ellipse-faq-btn">?</div>
            </div>

            <PlanMaker/>

        </div>
    );
};

export default RoomSize;
