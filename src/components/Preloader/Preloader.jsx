import React from 'react';
import preloader from "../../img/Preloader/spinner.svg"
import s from "./Preloader.module.css"
import {useTranslation} from "react-i18next";

const Preloader = () => {

    const {t} = useTranslation();

    return (
        <div className={s.preloader}>
            <img src={preloader} alt={"Preloader"}/>
            <div><b>{t("calculating")}</b></div>
        </div>
    );
};

export default Preloader;