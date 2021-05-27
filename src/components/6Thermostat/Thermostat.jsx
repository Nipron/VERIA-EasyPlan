import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {updateButton} from "../../redux/buttonsReducer";
import {Redirect} from "react-router";
import s from "../2RoomShape/RoomShape.module.css";
import {HashLink as Link} from "react-router-hash-link";
import {MatFinder} from "../7Result/MatFinder";
import {updateResult} from "../../redux/resultReducer";
import {useTranslation} from "react-i18next";

const Thermostat = () => {

    const {t} = useTranslation();
    const buttons = useSelector(state => state.buttons);

    if (!buttons[5]) return <Redirect to="/"/>

    return (
        <div>
            <div className="info-section">
                <div>
                    <h2>{t("add_thermostat")}</h2>
                    <p>{t("add_thermostat_text")}
                    </p>
                </div>
                <div className="ellipse-faq-btn">?</div>
            </div>

            <div className="content-section-grid">
                <div className="constructor-box">
                    <div className="product-box">
                        <Link to="/placement" className="btn-accept-product">
                            {t("wireless_click_kit")}
                        </Link>
                    </div>
                </div>
                <div className="button-box">
                    <div className="info-area-thermostat">
                        <span>{t("select_please")}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Thermostat;
