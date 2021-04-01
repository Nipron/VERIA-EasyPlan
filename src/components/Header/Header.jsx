import React, {useState} from 'react';
import ReactFlagsSelect from 'react-flags-select';
import s from "./Header.module.css"

import '../../styles/main.css';
import '../../styles/modals.css';
import veria from "../../img/veria-logo.png";

const Header = () => {

    const [selected, setSelected] = useState('GB');

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
                    customLabels={{"GB": "EN","NO": "NO"}}
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
