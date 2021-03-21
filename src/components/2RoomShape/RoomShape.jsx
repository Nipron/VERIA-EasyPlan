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

const RoomShape = () => {

    const dispatch = useDispatch();

    let shapes = useSelector(state => state.shapes);
    let buttons = useSelector(state => state.buttons);


    const handleClick = (page, shape) => {
        dispatch(updateButton(page))
        dispatch(updateShape(shape))
    }

    if (!buttons[2]) return <Redirect to="/"/>

    return (
        <div>
            <div className="info-section">
                <div>
                    <h2>Select Room Shape</h2>
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
                        <Link to="/roomsize" onClick={() => handleClick(3,"R")}
                              className={`${s.btnShapeSelection} ${shapes.R && s.active}`}
                        >
                            Rectangular
                        </Link>
                    </div>
                    <div className="object-container">
                        <div className="rectangular"><img src={shapeL} alt="rectangular-l"/></div>
                        <Link to="/roomsize" onClick={() => handleClick(3,"L")}
                              className={`${s.btnShapeSelection} ${shapes.L && s.active}`}
                        >
                            L-Shaped
                        </Link>
                    </div>
                    <div className="object-container">
                        <div className="rectangular"><img src={shapeT} alt="rectangular-t"/></div>
                        <Link to="/roomsize" onClick={() => handleClick(3,"T")}
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
