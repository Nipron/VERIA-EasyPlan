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
import {useTranslation} from "react-i18next";
import Preloader from "../Preloader/Preloader";

const FloorType = () => {

    const {t} = useTranslation();

  //  const room = useSelector(state => state.room);
  //  const thermostat = useSelector(state => state.thermostat);
  //  const spotsArray = useSelector(state => state.points);
    const buttons = useSelector(state => state.buttons);
    const dispatch = useDispatch();
    const checks = useSelector(state => state.checks);

    const [modalActive, setModalActive] = useState(false);
    const [topLaminate, setTopLaminate] = useState(checks.topLaminate);
    const [topParquet, setTopParquet] = useState(checks.topParquet);
    const [subUnburnable, setSubUnburnable] = useState(checks.subUnburnable);
    const [subBurnable, setSubBurnable] = useState(checks.subBurnable);
    const [selectColor, setSelectColor] = useState(((topLaminate || topParquet) && (subUnburnable || subBurnable) && "#DBDADA") || "#E82B2B");
    const [continueVisible, setContinueVisible] = useState(((topLaminate || topParquet) && (subUnburnable || subBurnable) && "visible") || "hidden");

   // const massGroup = MatFinder(spotsArray, room, [thermostat.x, thermostat.y], subBurnable)

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
      //  dispatch(updateResult(massGroup))
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
                    <h2>{t("select_floor_type")}</h2>
                    <p>{t("select_floor_type_text")}
                    </p>
                </div>
                <div className="ellipse-faq-btn">?</div>
            </div>
            <div className="content-section-grid">
                <div className="constructor-box">
                    <form className="floor-type-form" id="cover-form" action="" method="get">
                        <div className="top-covering">
                            <h2>{t("top_floor_covering")}</h2>
                            <ul>
                                <li>
                                    <img src={laminate} alt="laminate"/>
                                    <input type="checkbox" name="laminate" checked={topLaminate}
                                           onChange={handleTopLaminate}/>
                                    <label htmlFor="laminate">{t("laminate")}</label>
                                </li>
                                <li>
                                    <img src={parquet} alt="laminate"/>
                                    <input type="checkbox" name="parquet" checked={topParquet}
                                           onChange={handleTopParquet}/>
                                    <label htmlFor="parquet">{t("parquet")}</label>
                                </li>
                            </ul>
                        </div>
                        <span className="form-logo">
              <img src={veria} alt="form-logo"/>
              <hr/>
            </span>
                        <div className="subfloor-covering">
                            <h2>{t("subfloor_covering")}</h2>
                            <ul>
                                <li>
                                    <span className="icon_unburnuble"></span>
                                    <img className="unburnable-icon" src={unburnable} alt="unburnable"/>
                                    <input type="checkbox" name="unburnable" checked={subUnburnable}
                                           onChange={handleSubUnburnable}/>
                                    <label htmlFor="unburnable">{t("unburnable")}</label>
                                </li>
                                <li>
                                    <span className="icon_burnable"></span>
                                    <img className="burnuble-icon" src={burnable} alt="burnable"/>
                                    <input type="checkbox" name="burnable" checked={subBurnable}
                                           onChange={handleSubBurnable}/>
                                    <label htmlFor="burnable">{t("burnable")}</label>
                                </li>
                            </ul>
                        </div>
                    </form>
                </div>
                <div className="button-box">
                    <div id="btn-help-floor-type" className="box_btn-style-black"
                         onClick={() => setModalActive(true)}>{t("need_help")}
                    </div>
                    <div className="info-area">
                        <span style={{color: selectColor}}>{t("please_select_subfloor")}</span>
                    </div>
                    <Link to="/result"
                          onClick={() => handleClick(7)}
                          className={s.btnNextStep}
                          style={{visibility: continueVisible}}>
                        {t("continue")}
                    </Link>
                </div>
            </div>
            <Modal active={modalActive} setActive={setModalActive}>

                <div className="modal-window-floor-type">
                    <h1 className="modal-title">{t("about_floor_types")}</h1>
                    <span className="modal-btn-close" onClick={() => setModalActive(false)}></span>
                    <div className="modal-ft-left-content-box"></div>
                    <div className="modal-ft-right-content-box">
                        <p className="modal-container-description">{t("about_floor_types_text")}</p>
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
