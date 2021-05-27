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
import {useTranslation} from "react-i18next";

const RoomSize = () => {

    const {t} = useTranslation();

    const [modalActive, setModalActive] = useState(false);


    const buttons = useSelector(state => state.buttons);
    const shapes = useSelector(state => state.shapes);

    const dispatch = useDispatch();



    if (!buttons[3]) return <Redirect to="/"/>;

    return (
        <div>
            <div className="info-section">
                <div>
                    <h2>{t("adjust_room_size")}</h2>
                    <p>{t("adjust_room_size_text_p1")}
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
