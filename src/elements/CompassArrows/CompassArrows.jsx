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
                     top: -17,
                     left: -4
                 }}/>
            <div className={s.compassArrow}
                 style={{
                     backgroundImage: `url(${compassArrow})`,
                     top: -4, left: 9,
                     transform: "rotate(90deg)",
                 }}/>

            <div className={s.compassArrow}
                 style={{
                     backgroundImage: `url(${compassArrow})`,
                     top: 9,
                     left: -4,
                     transform: "rotate(180deg)",
                 }}>
            </div>
            <div className={s.compassArrow}
                 style={{
                     backgroundImage: `url(${compassArrow})`,
                     top: -4,
                     left: -17,
                     transform: "rotate(270deg)",
                 }}>
            </div>
        </div>
    );
};

export default CompassArrows;
