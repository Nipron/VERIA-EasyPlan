import React, {useRef, useEffect, useState} from 'react';
import s from './PlanMaker.module.css';
import Draggable from 'react-draggable';
import {useMousePosition} from "../hooks/useMousePosition";
import LineTo, {Line} from 'react-lineto';

function PlanMaker() {
    const position = useMousePosition();

    let [pos01, setPos01] = useState({x: 200, y: -13});
    let [pos02, setPos02] = useState({x: 200, y: 213});
    let [pos03, setPos03] = useState({x: 0, y: 200});

    const handleDrag01 = (e, d) => {
        const {x, y} = pos01;
        setPos01({
            x: x + d.deltaX,
            y: y + d.deltaY,
        });
    };

    const handleDrag02 = (e, d) => {
        const {x, y} = pos02;
        setPos02({
            x: x + d.deltaX,
            y: y + d.deltaY,
        });
        setPos01({
            x: x,
            y: pos01.y
        });
        setPos03({
            x: pos03.x,
            y: y - 14
        });
    };

    return (
        <div className={s.planMaker}>
            <div className={s.lines}>
                <LineTo from={s.pointStart} to={s.point01}
                        borderWidth={4}
                        borderColor={"#868686"}
                        zIndex={0}/>
                <LineTo from={s.point01} to={s.point02}
                        borderWidth={4} borderColor={"#868686"}
                        zIndex={0}/>
                <LineTo from={s.point02} to={s.point03}
                        borderWidth={4} borderColor={"#868686"}
                        zIndex={0}
                  />
                <LineTo from={s.point03} to={s.pointStart}
                        borderWidth={4} borderColor={"#868686"}
                        zIndex={0}/>
            </div>
            <div className={s.points}>
                <div id="start" className={s.pointStart}/>
                <Draggable axis="both" onDrag={handleDrag01} position={{x: pos01.x, y: pos01.y}}>
                    <div className={s.point01}/>
                </Draggable>
                <Draggable axis="both"
                           onDrag={handleDrag02}
                           position={{x: pos02.x, y: pos02.y}}>
                    <div className={s.point02}/>
                </Draggable>
                <Draggable axis="both" position={{x: pos03.x, y: pos03.y}}>
                    <div className={s.point03}/>
                </Draggable>
            </div>
            <div className={s.dimensions}>
                <div className={s.dimContainer} style={{top: (pos01.y + 13), left: Math.round((pos01.x-40)/2 +100)}}>
                    <span>{pos02.x}</span>
                </div>
                <div className={s.dimContainer} style={{top: ((pos01.y + pos02.y)/2 + 16), left: Math.round((pos01.x + pos02.x)/2 - 24 +100)}}>
                    <span>{pos02.y}</span>
                </div>
                <div className={s.dimContainer} style={{top: ((pos02.y + pos03.y)/2 + 26), left: Math.round((pos01.x-40)/2 +100)}}>
                    <span>{pos02.x}</span>
                </div>
                <div className={s.dimContainer} style={{top: ((pos03.y + 0)/2 + 16), left: -20 +100}}>
                    <span>{pos02.y}</span>
                </div>
            </div>
        </div>
    );
}

export default PlanMaker;
