import React from 'react';
import '../../styles/main.css';
import '../../styles/modals.css';
import veria from "../../img/veria-logo.png";

const Header = () => {
    return (
        <div>
            <div className="brand-section">
                <div>
                    <h1 className="app-name"><b>Easy</b>Plan<span>&trade;</span> Clickmat</h1>
                    <h1 className="app-name-mirror"><b>Easy</b>Plan<span>&trade;</span> Clickmat</h1>
                </div>
                <div>
                    <img src={veria} alt="veria logo"/>
                </div>
            </div>
        </div>
    );
};

export default Header;
