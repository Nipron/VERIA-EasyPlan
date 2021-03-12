import React, {useRef, useEffect, useState} from 'react';
import s from './PlanMaker.module.css';
import Draggable from 'react-draggable';
import {useMousePosition} from "../hooks/useMousePosition";
import LineTo, {Line} from 'react-lineto';
import {L, P} from "../PointsLines/PointsLines";

function PlanMaker() {
    const position = useMousePosition();


    let [pos01, setPos01] = useState({x: 121, y: -13});
    let [pos02, setPos02] = useState({x: 121, y: 113});
    let [pos03, setPos03] = useState({x: 181, y: 100});
    let [pos04, setPos04] = useState({x: 181, y: 213});
    let [pos05, setPos05] = useState({x: 0, y: 200});

    const handleDrag01 = (e, d) => {
        const {x, y} = pos01;
        setPos01({
            x: x + d.deltaX,
            y: y + d.deltaY,
        });
        setPos02({
            x: x,
            y: pos02.y,
        });
    };

    const handleDrag02 = (e, d) => {
        const {x, y} = pos02;
        setPos02({
            x: x + d.deltaX,
            y: y + d.deltaY,
        });
        setPos04({
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

    const handleDrag03 = (e, d) => {
        const {x, y} = pos03;
        setPos03({
            x: x + d.deltaX,
            y: y + d.deltaY,
        });
        setPos02({
            x: pos02.x,
            y: y + 14,
        });
    };

    const handleDrag04 = (e, d) => {}
    const handleDrag05 = (e, d) => {}


    return (
        <div className={s.planMaker}>
            <div className={s.lines}>
                <L from={s.pointStart} to={s.point01}/>
                <L from={s.point01} to={s.point02}/>
                <L from={s.point02} to={s.point03}/>
                <L from={s.point03} to={s.point04}/>
                <L from={s.point04} to={s.point05}/>
                <L from={s.point05} to={s.pointStart}/>
            </div>
            <div className={s.points}>
                <div className={s.pointStart}/>
                <Draggable onDrag={handleDrag01}
                           position={{x: pos01.x, y: pos01.y}}
                           bounds={{left: 50, top: -13, right: 720, bottom: -13}}
                >
                    <div className={s.point01}/>
                </Draggable>

                <Draggable onDrag={handleDrag02}
                           position={{x: pos02.x, y: pos02.y}}
                           bounds={{left: 50, top: 24, right: 720, bottom: 320}}
                >
                    <div className={s.point02}/>
                </Draggable>

                <Draggable onDrag={handleDrag03}
                           position={{x: pos03.x, y: pos03.y}}
                           bounds={{left: 50, top: 24, right: 720, bottom: 320}}>
                    <div className={s.point03}/>
                </Draggable>

                <Draggable onDrag={handleDrag04}
                           position={{x: pos04.x, y: pos04.y}}
                           bounds={{left: 50, top: 24, right: 720, bottom: 320}}
                >
                    <div className={s.point04}/>
                </Draggable>

                <Draggable onDrag={handleDrag05}
                           position={{x: pos05.x, y: pos05.y}}
                           bounds={{left: 0, top: 24, right: 0, bottom: 320}}>
                    <div className={s.point05}/>
                </Draggable>




            </div>


            <div className={s.dimensions}>

                <div className={s.dimContainer}
                     style={{top: (pos01.y + 13), left: Math.round((pos01.x - 40) / 2 + 100)}}>
                    <span>{`${pos02.x * 2}cm`}</span>
                </div>

                <div className={s.dimContainer}
                     style={{
                         top: ((pos01.y + pos02.y) / 2 + 16), left: Math.round((pos01.x + pos02.x) / 2 - 24 + 100)
                     }}>
                    <span>{`${pos02.y * 2 + 52}cm`}</span>
                </div>

                <div className={s.dimContainer}
                     style={{top: ((pos02.y + pos03.y) / 2 + 26), left: Math.round((pos01.x - 40) / 2 + 100)}}>
                    <span>{`${pos02.x * 2}cm`}</span>
                </div>

                <div className={s.dimContainer} style={{top: ((pos03.y + 0) / 2 + 16), left: -20 + 100}}>
                    <span>{`${pos02.y * 2 + 52}cm`}</span>
                </div>
            </div>
        </div>
    );
}

export default PlanMaker;
