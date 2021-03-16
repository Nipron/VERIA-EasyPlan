import React from 'react';
import s from "./CompassArrows.module.css";
import compassArrow from "./CompassArrows.svg";

const CompassArrows = (props) => {
    return (
        <div className={s.compass}
             style={{
                 top: (props.point.y),
                 left: (props.point.x),
                 visibility: (props.visible) ? "visible" : "hidden"
             }}>
            <div className={s.compassArrow}
                 style={{
                     backgroundImage: `url(${compassArrow})`,
                     top: -19,
                     left: -6
                 }}/>
            <div className={s.compassArrow}
                 style={{
                     backgroundImage: `url(${compassArrow})`,
                     top: -6, left: 7,
                     transform: "rotate(90deg)",
                 }}/>

            <div className={s.compassArrow}
                 style={{
                     backgroundImage: `url(${compassArrow})`,
                     top: 7,
                     left: -6,
                     transform: "rotate(180deg)",
                 }}>
            </div>
            <div className={s.compassArrow}
                 style={{
                     backgroundImage: `url(${compassArrow})`,
                     top: -6,
                     left: -19,
                     transform: "rotate(270deg)",
                 }}>
            </div>
        </div>
    );
};

export default CompassArrows;
