import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Redirect} from "react-router";

import laminate from '../../img/laminate.jpg';
import parquet from '../../img/parquet.jpg';
import veria from "../../img/veria-logo.png";
import unburnable from "../../img/unburnable.jpg";
import burnable from "../../img/burnable-wood.jpg";
import {updateButton} from "../../redux/buttonsReducer";

import s from "./FloorType.module.css";
import {HashLink as Link} from "react-router-hash-link";
import Modal from "../0Modal/Modal";
import {updateChecks} from "../../redux/floorChecksReducer";
import {MatFinder} from "../7Result/MatFinder";
import {updateResult} from "../../redux/resultReducer";

const FloorType = () => {

    const [modalActive, setModalActive] = useState(false);

    const room = useSelector(state => state.room);
    const thermostat = useSelector(state => state.thermostat);
    const spotsArray = useSelector(state => state.points);

    const buttons = useSelector(state => state.buttons);
    const dispatch = useDispatch();

    const checks = useSelector(state => state.checks);

    const [topLaminate, setTopLaminate] = useState(checks.topLaminate);
    const [topParquet, setTopParquet] = useState(checks.topParquet);
    const [subUnburnable, setSubUnburnable] = useState(checks.subUnburnable);
    const [subBurnable, setSubBurnable] = useState(checks.subBurnable);

    const massGroup = MatFinder(spotsArray, room, [thermostat.x, thermostat.y], subUnburnable)

    const [selectColor, setSelectColor] = useState(((topLaminate || topParquet) && (subUnburnable || subBurnable) && "#DBDADA") || "#E82B2B");
    const [continueVisible, setContinueVisible] = useState(((topLaminate || topParquet) && (subUnburnable || subBurnable) && "visible") || "hidden");

    const handleTopLaminate = () => {
        setTopLaminate(!topLaminate)
        if (topParquet) setTopParquet(false)
    }
    const handleTopParquet = () => {
        setTopParquet(!topParquet)
        if (topLaminate) setTopLaminate(false)
    }
    const handleSubUnburnable = () => {
        setSubUnburnable(!subUnburnable)
        if (subBurnable) setSubBurnable(false)
    }
    const handleSubBurnable = () => {
        setSubBurnable(!subBurnable)
        if (subUnburnable) setSubUnburnable(false)
    }

    const handleClick = (page) => {
        dispatch(updateResult(massGroup))
        dispatch(updateButton(page))
        dispatch(updateChecks({
            topLaminate,
            topParquet,
            subUnburnable,
            subBurnable
        }))
    }

    useEffect(() => {
        setSelectColor(((topLaminate || topParquet) && (subUnburnable || subBurnable) && "#DBDADA") || "#E82B2B")
        setContinueVisible(((topLaminate || topParquet) && (subUnburnable || subBurnable) && "visible") || "hidden")
        if (continueVisible === "hidden") dispatch(updateButton(6))
    }, [topLaminate, topParquet, subUnburnable, subBurnable, continueVisible])

    if (!buttons[6]) return <Redirect to="/"/>

    return (
        <div>
            <div className="info-section">
                <div>
                    <h2>Select Floor Type</h2>
                    <p>Top floor covering is the type of surface that you wish to lay on top of the floor after
                        installing the floor heating.

                        Subfloor construction is the surface that the heating elements will be laid out on.
                    </p>
                </div>
                <div className="ellipse-faq-btn">?</div>
            </div>


            <div className="content-section-grid">
                <div className="constructor-box">
                    <form className="floor-type-form" id="cover-form" action="" method="get">
                        <div className="top-covering">
                            <h2>Top floor covering</h2>
                            <ul>
                                <li>
                                    <img src={laminate} alt="laminate"/>
                                    <input type="checkbox" name="laminate" checked={topLaminate}
                                           onChange={handleTopLaminate}/>
                                    <label htmlFor="laminate">laminate</label>
                                </li>
                                <li>
                                    <img src={parquet} alt="laminate"/>
                                    <input type="checkbox" name="parquet" checked={topParquet}
                                           onChange={handleTopParquet}/>
                                    <label htmlFor="parquet">parquet</label>
                                </li>
                            </ul>
                        </div>
                        <span className="form-logo">
              <img src={veria} alt="form-logo"/>
              <hr/>
            </span>
                        <div className="subfloor-covering">
                            <h2>Subfloor covering</h2>
                            <ul>
                                <li>
                                    <span className="icon_unburnuble"></span>
                                    <img className="unburnable-icon" src={unburnable} alt="unburnable"/>
                                    <input type="checkbox" name="unburnable" checked={subUnburnable}
                                           onChange={handleSubUnburnable}/>
                                    <label htmlFor="unburnable">unburnable</label>
                                </li>
                                <li>
                                    <span className="icon_burnable"></span>
                                    <img className="burnuble-icon" src={burnable} alt="burnable"/>
                                    <input type="checkbox" name="burnable" checked={subBurnable}
                                           onChange={handleSubBurnable}/>
                                    <label htmlFor="burnable">burnable</label>
                                </li>
                            </ul>
                        </div>
                    </form>
                </div>
                <div className="button-box">
                    <div id="btn-help-floor-type" className="box_btn-style-black"
                         onClick={() => setModalActive(true)}>Need help?
                    </div>
                    <div className="info-area">
                        <span style={{color: selectColor}}>Select please top and subfloor...</span>
                    </div>
                    <Link to="/result"
                          onClick={() => handleClick(7)}
                          className={s.btnNextStep}
                          style={{visibility: continueVisible}}>
                        Continue
                    </Link>
                </div>
            </div>
            <Modal active={modalActive} setActive={setModalActive}>

                <div className="modal-window-floor-type">
                    <h1 className="modal-title">About Floor Types</h1>
                    <span className="modal-btn-close" onClick={() => setModalActive(false)}></span>
                    <div className="modal-ft-left-content-box"></div>
                    <div className="modal-ft-right-content-box">
                        <p className="modal-container-description">An important part of the calculation is weather
                            it is e.g. wood or tiles that goes on top of the heated floor.</p>
                    </div>
                    <div className="modal-btn-ok" onClick={() => setModalActive(false)}>
                        ok
                    </div>
                </div>

            </Modal>
        </div>
    );
};

export default FloorType;
