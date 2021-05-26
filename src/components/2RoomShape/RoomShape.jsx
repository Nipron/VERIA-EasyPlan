import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Redirect} from "react-router";
import {HashLink as Link} from "react-router-hash-link";

import shapeR from '../../img/ractangular.svg';
import shapeL from '../../img/ractangular-l-type.svg';
import shapeT from '../../img/ractangular-t-type.svg';
import s from "./RoomShape.module.css";

import {updateShape} from "../../redux/shapesReducer";
import {updateButton} from "../../redux/buttonsReducer";
import {updateRoom} from "../../redux/roomReducer";
import {updateAngles} from "../../redux/anglesReducer";
import {useTranslation} from "react-i18next";

const RoomShape = () => {

    const dispatch = useDispatch();
    const {t} = useTranslation();

    let shapes = useSelector(state => state.shapes);
    let buttons = useSelector(state => state.buttons);


    const handleClick = (page, shape) => {
        dispatch(updateButton(page))
        dispatch(updateShape(shape))
        dispatch(updateAngles([false, false, false, false, false, false, false, false]))
        if (shapes.R) dispatch(updateRoom([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 350, 0, 350, 0, 350, 300, 350, 300, 0, 300, 0, 300, 0, 300, 0, 300, 0, 300, 0, 300]))
        if (shapes.L) dispatch(updateRoom([0, 0, 150, 0, 150, 0, 150, 110,
            150, 110, 350, 110, 350, 110, 350, 300,
            350, 300, 0, 300, 0, 300, 0, 300, 0, 300, 0, 300, 0, 300]))
        if (shapes.T) dispatch(updateRoom([0, 0, 150, 0, 150, 0, 150, 110,
            150, 110, 350, 110, 350, 110, 350, 240,
            350, 240, 180, 240, 180, 240, 180, 300,
            180, 300, 0, 300, 0, 300]))
    }

    if (!buttons[2]) return <Redirect to="/"/>

    return (
        <div>
            <div className="info-section">
                <div>
                    <h2>{t("select_room_shape")}</h2>
                    <p>Please choose a shape similar to the room where you will be installing underfloor heating.
                        <br/>
                        The size of the room will be adjusted at a later step.</p>
                </div>
                <div className="ellipse-faq-btn">?</div>
            </div>
            <div className="content-section">
                <div className="content-box">
                    <div className="object-container">
                        <div className="rectangular"><img src={shapeR} alt="rectangular"/></div>
                        <Link to="/roomsize" onClick={() => handleClick(3, "R")}
                              className={`${s.btnShapeSelection} ${shapes.R && s.active}`}
                        >
                            Rectangular
                        </Link>
                    </div>
                    <div className="object-container">
                        <div className="rectangular"><img src={shapeL} alt="rectangular-l"/></div>
                        <Link to="/roomsize" onClick={() => handleClick(3, "L")}
                              className={`${s.btnShapeSelection} ${shapes.L && s.active}`}
                        >
                            L-Shaped
                        </Link>
                    </div>
                    <div className="object-container">
                        <div className="rectangular"><img src={shapeT} alt="rectangular-t"/></div>
                        <Link to="/roomsize" onClick={() => handleClick(3, "T")}
                              className={`${s.btnShapeSelection} ${shapes.T && s.active}`}
                        >
                            T-Shaped
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RoomShape;
