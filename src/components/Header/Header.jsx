import React, {useEffect, useState} from 'react';
import ReactFlagsSelect from 'react-flags-select';
import s from "./Header.module.css"

import '../../styles/main.css';
import '../../styles/modals.css';
import veria from "../../img/veria-logo.png";

import {useTranslation} from "react-i18next";

const Header = () => {

    const {i18n} = useTranslation();

    const changeLanguage = lng => {
        i18n.changeLanguage(lng);
    };

    const [selected, setSelected] = useState('GB');

    useEffect(() => {
        switch (selected) {
            case "GB":
                changeLanguage("en")
                break;
            case "NO":
                changeLanguage("no")
                break;
            default:
                changeLanguage("en")
        }
    }, [selected])

    return (
        <div>
            <div className="brand-section">
                <div>
                    <h1 className="app-name"><b>Easy</b>Plan<span>&trade;</span> Clickmat</h1>
                    <h1 className="app-name-mirror"><b>Easy</b>Plan<span>&trade;</span> Clickmat</h1>
                </div>
                <ReactFlagsSelect
                    className={s.flags}
                    selected={selected}
                    onSelect={code => setSelected(code)}
                    countries={["GB", "NO"]}
                    customLabels={{"GB": "EN", "NO": "NO"}}
                    selectedSize={12}
                    optionsSize={12}/>
                <div>
                    <img src={veria} alt="veria logo"/>
                </div>
            </div>
        </div>
    );
};

export default Header;
