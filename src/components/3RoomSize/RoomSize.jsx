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
import PlanMakerT from "../PlanMaker/PlanMakerT";
import PlanMakerR from "../PlanMaker/PlanMakerR";

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
                        You can also enter dimensions in centimeter by double clicking the box on a wall.
                        If dimesion labels are on your way,
                        you may hide them by clicking "Show/hide labels" button.
                    </p>
                </div>
                <div className="ellipse-faq-btn">?</div>
            </div>
            {shapes.R && <PlanMakerR/>}
            {shapes.L && <PlanMakerL/>}
            {shapes.T && <PlanMakerT/>}
        </div>
    );
};

export default RoomSize;
