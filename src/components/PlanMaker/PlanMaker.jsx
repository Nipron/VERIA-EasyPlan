import React, {useRef, useEffect, useState} from 'react';
import s from './PlanMaker.module.css';
import Draggable from 'react-draggable';
import {useMousePosition} from "../hooks/useMousePosition";
import {L} from "../PointsLines/PointsLines";
import {HashLink as Link} from "react-router-hash-link";
import ModalRoomSize from "../0Modal/ModalRoomSize";
import {useDispatch} from "react-redux";
import {updateButton} from "../../redux/buttonsReducer";
import Xarrow from "react-xarrows";

const PlanMaker = () => {

    const position = useMousePosition();

    const [modalActive, setModalActive] = useState(false);

    const dispatch = useDispatch();

    const handleClick = (page) => {
        dispatch(updateButton(page))
    };

    let [pos01, setPos01] = useState({x: 200, y: 0});
    let [pos02shadow, setPos02shadow] = useState({x: 200, y: 200})
    let [pos02, setPos02] = useState({x: 200, y: 200});
    let [pos03, setPos03] = useState({x: 0, y: 200});
    let [pos04, setPos04] = useState({x: 200, y: 200});

    let [pos02angled, setPos02angled] = useState(false);
    let [labVis, setLabVis] = useState(true);


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

    const handleAngles = (ang) => {
        setPos02angled(ang);
        if (ang) {
            setPos02({x: pos02.x - 30, y: pos02.y});
            setPos02shadow({x: pos02shadow.x, y: pos02shadow.y - 30});
        } else {
            setPos02({x: pos02shadow.x, y: pos02.y});
            setPos02shadow({x: pos02shadow.x, y: pos02.y});
        }
    }

    const handleLabVis = (labVis) => {
        setLabVis(labVis);
    }

    useEffect(() => {
    }, []);

    return (
        <div className="content-section-grid">
            <div className="constructor-box">
                <div className={s.planMaker}>
                    <div className={s.lines}>
                        <L from={"pStart"} to={"p01"}/>
                        <L from={"p01"} to={"p02s"}/>
                        <L from={"p02s"} to={"p02"}/>
                        <L from={"p02"} to={"p03"}/>
                        <L from={"p03"} to={"pStart"}/>

                    </div>
                    <div className={s.points}>
                        <div className={`${s.point} ${s.pointStart}`} id="pStart"/>
                        <Draggable onDrag={handleDrag01}
                                   position={{x: pos01.x, y: pos01.y}}
                                   bounds={pos02angled
                                       ? {left: pos02.x + 30, top: 0, right: 720, bottom: 0}
                                       : {left: 60, top: 0, right: 720, bottom: 0}}
                        >
                            <div className={s.point} id="p01"/>
                        </Draggable>
                        {/*<Draggable axis="both"
                           position={{x: pos04.x, y: pos04.y}}>
                    <div className={s.point04} style={{visibility: 'hidden'}}/>
                </Draggable>*/}

                        <Draggable onDrag={handleDrag02shadow}
                                   position={{x: pos02shadow.x, y: pos02shadow.y}}
                                   bounds={pos02angled
                                       ? {left: pos02.x + 30, top: 30, right: 720, bottom: pos02.y - 30}
                                       : {left: 60, top: 60, right: 720, bottom: 320}}
                        >
                            <div className={s.point} id="p02s"
                                 style={pos02angled ? {
                                     visibility: 'visible',
                                     background: 'red'
                                 } : {visibility: 'hidden'}}/>
                        </Draggable>

                        <Draggable onDrag={handleDrag02}
                                   position={{x: pos02.x, y: pos02.y}}
                                   bounds={pos02angled
                                       ? {left: 30, top: pos02shadow.y + 30, right: pos02shadow.x - 30, bottom: 320}
                                       : {left: 60, top: 60, right: 720, bottom: 320}}
                        >
                            <div className={s.point} id="p02"/>
                        </Draggable>

                        <Draggable onDrag={handleDrag03}
                                   position={{x: pos03.x, y: pos03.y}}
                                   bounds={pos02angled
                                       ? {left: 0, top: pos02shadow.y + 30, right: 0, bottom: 320}
                                       : {left: 0, top: 60, right: 0, bottom: 320}}>
                            <div className={s.point} id="p03"/>
                        </Draggable>
                    </div>
                    <div className={s.dimensions}>

                        <div className={s.dimContainer}
                             style={{
                                 top: (pos01.y - 10), left: Math.round((pos01.x) / 2 + 72),
                                 visibility: labVis ? 'visible' : 'hidden'
                             }}>
                            <span>{`${pos02shadow.x * 2}cm`}</span>
                        </div>

                        <div className={s.dimContainer}
                             style={{
                                 top: ((pos01.y + pos02shadow.y) / 2 - 10),
                                 left: Math.round((pos01.x + pos02shadow.x) / 2 + 72),
                                 visibility: labVis ? 'visible' : 'hidden'
                             }}>
                            <span>{`${pos02shadow.y * 2}cm`}</span>
                        </div>

                        <div className={s.dimContainer}
                             style={{
                                 top: ((pos02.y + pos02shadow.y) / 2 - 8),
                                 left: ((pos02.x + pos02shadow.x) / 2 + 72),
                                 visibility: labVis && pos02angled ? 'visible' : 'hidden'
                             }}>
                    <span>{`${Math.round(Math.sqrt(
                        Math.pow(pos02.x - pos02shadow.x, 2)
                        + Math.pow(pos02.y - pos02shadow.y, 2))) * 2}cm`}
                    </span>
                        </div>


                        <div className={s.dimContainer}
                             style={{
                                 top: ((pos02.y + pos03.y) / 2 - 6),
                                 left: Math.round((pos02.x) / 2 + 72),
                                 visibility: labVis ? 'visible' : 'hidden'
                             }}>
                            <span>{`${pos02.x * 2}cm`}</span>
                        </div>

                        <div className={s.dimContainer} style={{
                            top: ((pos03.y) / 2 - 10), left: 72,
                            visibility: labVis ? 'visible' : 'hidden'
                        }}>
                            <span>{`${pos02.y * 2}cm`}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="button-box">
                <div id="btn-create-angle" className="box_btn-style" onClick={() => handleAngles(!pos02angled)}>Create
                    angled wall
                </div>
                <div id="bnt-labels" className="box_btn-style" onClick={() => setLabVis(!labVis)}>Show/hide labels</div>
                <div id="btn-help-room-size" className="box_btn-style-black"
                     onClick={() => setModalActive(true)}>Need help?
                </div>
                <div id="room-size-count">15,3 m<sup>2</sup></div>
            </div>
            <Link to="/coldspots" onClick={() => handleClick(4)} className={s.btnNextStep}>
                Continue
            </Link>
            <ModalRoomSize active={modalActive} setActive={setModalActive}/>
        </div>


    );
}

export default PlanMaker;
