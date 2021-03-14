import React, {useRef, useEffect, useState} from 'react';
import s from './PlanMaker.module.css';
import Draggable from 'react-draggable';
import {useMousePosition} from "../hooks/useMousePosition";
import LineTo, {Line} from 'react-lineto';
import {L, P} from "../PointsLines/PointsLines";

function PlanMaker() {
    const position = useMousePosition();


    let [pos01, setPos01] = useState({x: 200, y: 0});
    let [pos02shadow, setPos02shadow] = useState({x: 200, y: 200})
    let [pos02, setPos02] = useState({x: 200, y: 200});
    let [pos03, setPos03] = useState({x: 0, y: 200});
    let [pos04, setPos04] = useState({x: 200, y: 200});

    let [pos02angled, setPos02angled] = useState(false)


    const handleDrag01 = (e, d) => {
        const {x, y} = pos01;
        setPos01({x: x + d.deltaX, y: y + d.deltaY,});

        if (pos02angled) {
            setPos02shadow({x: x, y: pos02shadow.y,});
        } else {
            setPos02({x: x, y: pos02.y,});
            setPos02shadow({x: pos02.x, y: pos02.y});
        }
    };

    const handleDrag02shadow = (e, d) => {
        const {x, y} = pos02shadow;
        setPos02shadow({x: x + d.deltaX, y: y + d.deltaY});
        setPos01({x, y: pos01.y});
    };

    const handleDrag02 = (e, d) => {
        const {x, y} = pos02;
        setPos02({x: x + d.deltaX, y: y + d.deltaY});

        if (pos02angled) {
            setPos03({x: pos03.x, y: y});
        } else {
            setPos02shadow({x: pos02.x, y: pos02.y})
            setPos01({x: x, y: pos01.y});
            setPos03({x: pos03.x, y: y});
        }
    };


    const handleDrag03 = (e, d) => {
        const {x, y} = pos03;
        setPos03({x: x + d.deltaX, y: y + d.deltaY});

        setPos02({x: pos02.x, y: y});
        if (!pos02angled) setPos02shadow({x: pos02.x, y: pos02.y})
    };


    const magic = () => {
        setPos02({x: pos02.x - 40, y: pos02.y});
        setPos02shadow({x: pos02shadow.x, y: pos02shadow.y - 40});
        setPos02angled(true);
    }

    const notMagic = () => {
        setPos02({x: pos02shadow.x, y: pos02.y});
        setPos02shadow({x: pos02shadow.x, y: pos02.y});
        setPos02angled(false);
    }

    return (
        <div className={s.planMaker}>
            <div className={s.lines}>
                <L from={s.pointStart} to={s.point01}/>
                <L from={s.point01} to={s.point02shadow}/>
                <L from={s.point02shadow} to={s.point02}/>
                <L from={s.point02} to={s.point03}/>
                <L from={s.point03} to={s.pointStart}/>
            </div>
            <div className={s.points}>
                <div className={s.pointStart}/>
                <Draggable onDrag={handleDrag01}
                           position={{x: pos01.x, y: pos01.y}}
                           bounds={{left: 50, top: 0, right: 720, bottom: 0}}
                >
                    <div className={s.point01}/>
                </Draggable>
                {/*<Draggable axis="both"
                           position={{x: pos04.x, y: pos04.y}}>
                    <div className={s.point04} style={{visibility: 'hidden'}}/>
                </Draggable>*/}

                <Draggable onDrag={handleDrag02shadow}
                           position={{x: pos02shadow.x, y: pos02shadow.y}}
                           bounds={pos02angled
                               ? {left: pos02.x + 30, top: 60, right: 720, bottom: pos02.y - 30}
                               : {left: 60, top: 60, right: 720, bottom: 320}}
                >
                    <div className={s.point02shadow}
                         style={pos02angled ? {visibility: 'visible', background: 'red'} : {visibility: 'hidden'}}/>
                </Draggable>

                <Draggable onDrag={handleDrag02}
                           position={{x: pos02.x, y: pos02.y}}
                           bounds={pos02angled
                               ? {left: 60, top: pos02shadow.y + 30, right: pos02shadow.x - 30, bottom: 320}
                               : {left: 60, top: 60, right: 720, bottom: 320}}
                >
                    <div className={s.point02}/>
                </Draggable>

                <Draggable onDrag={handleDrag03}
                           position={{x: pos03.x, y: pos03.y}}
                           bounds={{left: 0, top: 20, right: 0, bottom: 320}}>
                    <div className={s.point03}/>
                </Draggable>
            </div>

            <button onClick={magic}>
                Angle
            </button>

            <button onClick={notMagic}>
                Back
            </button>


            <div className={s.dimensions}>

                <div className={s.dimContainer}
                     style={{top: (pos01.y - 2), left: Math.round((pos01.x - 44) / 2 + 100)}}>
                    <span>{`${pos02.x * 2}cm`}</span>
                </div>

                <div className={s.dimContainer}
                     style={{
                         top: ((pos01.y + pos02shadow.y) / 2 - 4),
                         left: Math.round((pos01.x + pos02shadow.x) / 2 - 24 + 100)
                     }}>
                    <span>{`${pos02.y * 2}cm`}</span>
                </div>

                <div className={s.dimContainer}
                     style={pos02angled ? {
                         visibility: 'visible',
                         top: ((pos02.y + pos02shadow.y) / 2 - 4),
                         left: ((pos02.x + pos02shadow.x) / 2 + 77)
                     } : {visibility: 'hidden'}}>
                    <span>{`${pos02.x * 2}cm`}</span>
                </div>


                <div className={s.dimContainer}
                     style={{top: ((pos02.y + pos03.y) / 2 - 6), left: Math.round((pos02.x - 44) / 2 + 100)}}>
                    <span>{`${pos02.x * 2}cm`}</span>
                </div>

                <div className={s.dimContainer} style={{top: ((pos03.y + 0) / 2 - 4), left: -20 + 100}}>
                    <span>{`${pos02.y * 2}cm`}</span>
                </div>
            </div>
        </div>
    );
}

export default PlanMaker;
