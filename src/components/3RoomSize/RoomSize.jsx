import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Redirect} from "react-router";
import {HashLink as Link} from "react-router-hash-link";

import '../../styles/main.css';
import '../../styles/modals.css';
import s from "./RoomSize.module.css";

import {updateButton} from "../../redux/buttonsReducer";
import Modal from "../0Modal/Modal";
import PlanMaker from "../PlanMaker/PlanMaker";

const RoomSize = () => {

    const [modalActive, setModalActive] = useState(false);

    const buttons = useSelector(state => state.buttons);
    const dispatch = useDispatch();

    const handleClick = (page) => {
        dispatch(updateButton(page))
    };

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

            <div className="content-section-grid">

                <div className="constructor-box">
                    <PlanMaker/>
                </div>


                <div className="button-box">
                    <div id="btn-create-angle" className="box_btn-style">Create angled wall</div>
                    <div id="bnt-labels" className="box_btn-style">Show/hide labels</div>
                    <div id="btn-help-room-size" className="box_btn-style-black"
                         onClick={() => setModalActive(true)}>Need help?
                    </div>
                    <div id="room-size-count">15,3 m<sup>2</sup></div>
                    <Link to="/coldspots" onClick={() => handleClick(4)} className={s.btnNextStep}>
                        Continue
                    </Link>
                </div>
            </div>
            <Modal active={modalActive} setActive={setModalActive}>
                <div className="modal-window-room-size">
                    <h1 className="modal-title">Adjusting the room size</h1>
                    <span className="modal-btn-close" onClick={() => setModalActive(false)}></span>
                    <div className="modal-left-content-box"></div>
                    <div className="modal-right-content-box">
                        <h1 className="modal-container-content-title">How to adjust the dimensions:</h1>
                        <p className="modal-container-description">Press and drag the corner handles until the
                            dimensions match your actual room measurements.</p>
                        <h1 className="modal-container-content-title">How to add an angled wall:</h1>
                        <p className="modal-container-description">If your room has an angled wall or other obstacle
                            simply click the "Create angled wall" button. Click once on the corner you need to
                            change, then press and drag the corner handle to adjust the dimensions. Repeat to add
                            more angled walls.</p>
                    </div>
                    <div className="modal-btn-ok" onClick={() => setModalActive(false)}>ok</div>
                </div>
            </Modal>
        </div>
    );
};

export default RoomSize;
