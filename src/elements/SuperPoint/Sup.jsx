import React, {useState} from 'react';
import s from "./Sup.module.css";
import compassUp from "../../img/ConstructorSVG/compassArrow.svg";

const Sup = (props) => {

    const [compassVisible, setCompassVisible] = useState(false);

    return (
        <div>
            {props.children}
            <div className={s.compass}
                 style={{
                     top: 0,
                     left: 0,
                     visibility: (compassVisible) ? "visible" : "hidden"
                 }}>
                <div className={s.compassArrow}
                     style={{
                         backgroundImage: `url(${compassUp})`,
                         top: -19,
                         left: -6
                     }}>
                </div>
                <div className={s.compassArrow}
                     style={{
                         backgroundImage: `url(${compassUp})`,
                         top: -6,
                         left: 7,
                         transform: "rotate(90deg)",
                     }}>
                </div>
                <div className={s.compassArrow}
                     style={{
                         backgroundImage: `url(${compassUp})`,
                         top: 7,
                         left: -6,
                         transform: "rotate(180deg)",
                     }}>
                </div>
                <div className={s.compassArrow}
                     style={{
                         backgroundImage: `url(${compassUp})`,
                         top: -6,
                         left: -19,
                         transform: "rotate(270deg)",
                     }}>
                </div>
            </div>
        </div>
    );
};

export default Sup;
