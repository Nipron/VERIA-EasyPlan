import React, {useRef, useEffect, useState} from 'react';
import s from './PlanMaker.module.css';
import Draggable from 'react-draggable';
import {HashLink as Link} from "react-router-hash-link";
import ModalRoomSize from "../0Modal/ModalRoomSize";
import {useDispatch, useSelector} from "react-redux";
import {updateButton} from "../../redux/buttonsReducer";
import imgDiagonal from '../../img/CornerButtons/CornerLine.svg';
import imgCorner from '../../img/CornerButtons/SEcorner.svg';
import CompassArrows from "../../elements/CompassArrows/CompassArrows";
import DimInput from "../../elements/DimInput/DimInput";
import {Stage, Layer, Star, Text, Line} from 'react-konva';
import {updateRoom} from "../../redux/roomReducer";
import {updateAngles} from "../../redux/anglesReducer";

const PlanMakerL = () => {

    const ratio = 2; //ratio = cm / pixels
    const minDist = 10; //minimum distance between points/lines
    const maxWidth = 600; //constructor max width
    const maxHeight = 315; //constructor max height

    const dispatch = useDispatch();
    const room = useSelector(state => state.room);
    const shapes = useSelector(state => state.shapes);
    const angles = useSelector(state => state.angles);
    const state = useSelector(state => state);
    const buttons = useSelector(state => state.buttons);

    const [modalActive, setModalActive] = useState(!buttons[4]);

    const [angIcon01, setAngIcon01] = useState(imgDiagonal);
    const [angIcon02, setAngIcon02] = useState(imgDiagonal);
    const [angIcon03, setAngIcon03] = useState(imgDiagonal);
    const [angIcon04, setAngIcon04] = useState(imgDiagonal);
    const [angIcon07, setAngIcon07] = useState(imgDiagonal);

    const [labVis, setLabVis] = useState(true);
    const [anglesMode, setAnglesMode] = useState(false);
    const [compassVisible, setCompassVisible] = useState(false);
    const [compassPoint, setCompassPoint] = useState({x: 0, y: 0});
    const [square, setSquare] = useState(0);

    const pos00 = {x: room[0], y: room[1]};
    const [pos01shadow, setPos01shadow] = useState({x: room[2], y: room[3]});
    const [pos01, setPos01] = useState({x: room[4], y: room[5]});
    const [pos02shadow, setPos02shadow] = useState({x: room[6], y: room[7]});
    const [pos02, setPos02] = useState({x: room[8], y: room[9]});
    const [pos03shadow, setPos03shadow] = useState({x: room[10], y: room[11]});
    const [pos03, setPos03] = useState({x: room[12], y: room[13]});
    const [pos04shadow, setPos04shadow] = useState({x: room[14], y: room[15]});
    const [pos04, setPos04] = useState({x: room[16], y: room[17]});
    const [pos07shadow, setPos07shadow] = useState({x: room[26], y: room[27]});
    const [pos07, setPos07] = useState({x: room[28], y: room[29]});

    const pos00angled = angles[0];
    const [pos01angled, setPos01angled] = useState(angles[1]);
    const [pos02angled, setPos02angled] = useState(angles[2]);
    const [pos03angled, setPos03angled] = useState(angles[3]);
    const [pos04angled, setPos04angled] = useState(angles[4]);
    const [pos07angled, setPos07angled] = useState(angles[7]);

    const [dim00to01SeditMode, setDim00to01SeditMode] = useState(false);
    const [dim01to02SeditMode, setDim01to02SeditMode] = useState(false);
    const [dim02to03SeditMode, setDim02to03SeditMode] = useState(false);
    const [dim03to04SeditMode, setDim03to04SeditMode] = useState(false);
    const [dim04to07SeditMode, setDim04to07SeditMode] = useState(false);
    const [dim07to00editMode, setDim07to00editMode] = useState(false);

    const [dim00to01Svalue, setDim00to01Svalue] = useState(0);
    const [dim01to02Svalue, setDim01to02Svalue] = useState(0);
    const [dim02to03Svalue, setDim02to03Svalue] = useState(0);
    const [dim03to04Svalue, setDim03to04Svalue] = useState(0);
    const [dim04to07Svalue, setDim04to07Svalue] = useState(0);

    const [dim07to00value, setDim07to00value] = useState(0);

    const handleAngle01 = (ang) => {
        setAnglesMode(false);
        setPos01angled(ang);
        if (ang) {
            setAngIcon01(imgCorner);
            setPos01({x: pos01.x, y: pos01.y + minDist});
            setPos01shadow({x: pos01shadow.x - minDist, y: pos01shadow.y});
        } else {
            setAngIcon01(imgDiagonal);
            setPos01({x: pos01.x, y: pos01shadow.y});
            setPos01shadow({x: pos01.x, y: pos01shadow.y});
        }
    }
    const handleAngle02 = (ang) => {
        setAnglesMode(false);
        setPos02angled(ang);
        if (ang) {
            setAngIcon02(imgCorner);
            setPos02({x: pos02.x + minDist, y: pos02.y});
            setPos02shadow({x: pos02shadow.x, y: pos02shadow.y - minDist});
        } else {
            setAngIcon02(imgDiagonal);
            setPos02({x: pos02shadow.x, y: pos02.y});
            setPos02shadow({x: pos02shadow.x, y: pos02.y});
        }
    }
    const handleAngle03 = (ang) => {
        setAnglesMode(false);
        setPos03angled(ang);
        if (ang) {
            setAngIcon03(imgCorner);
            setPos03({x: pos03.x, y: pos03.y + minDist});
            setPos03shadow({x: pos03shadow.x - minDist, y: pos03shadow.y});
        } else {
            setAngIcon03(imgDiagonal);
            setPos03({x: pos03.x, y: pos03shadow.y});
            setPos03shadow({x: pos03.x, y: pos03shadow.y});
        }
    }
    const handleAngle04 = (ang) => {
        setAnglesMode(false);
        setPos04angled(ang);
        if (ang) {
            setAngIcon04(imgCorner);
            setPos04({x: pos04.x - minDist, y: pos04.y});
            setPos04shadow({x: pos04shadow.x, y: pos04shadow.y - minDist});
        } else {
            setAngIcon04(imgDiagonal);
            setPos04({x: pos04shadow.x, y: pos04.y});
            setPos04shadow({x: pos04shadow.x, y: pos04.y});
        }
    }
    const handleAngle07 = (ang) => {
        setAnglesMode(false);
        setPos07angled(ang);
        if (ang) {
            setAngIcon07(imgCorner);
            setPos07({x: pos07.x, y: pos07.y - minDist});
            setPos07shadow({x: pos07shadow.x + minDist, y: pos07shadow.y});
        } else {
            setAngIcon07(imgDiagonal);
            setPos07({x: pos07.x, y: pos07shadow.y});
            setPos07shadow({x: pos07.x, y: pos07shadow.y});
        }
    }

    const handleClick = (page) => {
        dispatch(updateButton(page))
        dispatch(updateRoom([pos00.x, pos00.y,
            pos01shadow.x, pos01shadow.y,
            pos01.x, pos01.y,
            pos02shadow.x, pos02shadow.y,
            pos02.x, pos02.y,
            pos03shadow.x, pos03shadow.y,
            pos03.x, pos03.y,
            pos04shadow.x, pos04shadow.y,
            pos04.x, pos04.y,
            pos04shadow.x, pos04shadow.y,
            pos04.x, pos04.y,
            pos04shadow.x, pos04shadow.y,
            pos04.x, pos04.y,
            pos07shadow.x, pos07shadow.y,
            pos07.x, pos07.y,
        ]))
        dispatch(updateAngles([pos00angled, pos01angled,
            pos02angled, pos03angled,
            pos04angled, false, false, pos07angled
        ]))
    };

    useEffect(() => {

        setDim00to01Svalue(pos01shadow.x - pos00.x);
        setDim02to03Svalue(pos03shadow.x - pos02.x);
        setDim04to07Svalue(pos04.x - pos07shadow.x);

        setDim01to02Svalue(pos02shadow.y - pos01.y);
        setDim03to04Svalue(pos04shadow.y - pos03.y);
        setDim07to00value(pos07.y - pos00.y);

        setSquare((
            (pos01.y - pos01shadow.y) * (pos01.x + pos01shadow.x) / 2 +
            (pos02shadow.y - pos01.y) * (pos02shadow.x + pos01.x) / 2 +
            (pos02.y - pos02shadow.y) * (pos02.x + pos02shadow.x) / 2 +
            (pos03shadow.y - pos02.y) * (pos03shadow.x + pos02.x) / 2 +
            (pos03.y - pos03shadow.y) * (pos03.x + pos03shadow.x) / 2 +
            (pos04shadow.y - pos03.y) * (pos04shadow.x + pos03.x) / 2 +
            (pos04.y - pos04shadow.y) * (pos04.x + pos04shadow.x) / 2 +
            (pos07.y - pos07shadow.y) * pos07shadow.x / 2) / 10000 * ratio * ratio
        )

    }, [pos01, pos01shadow, pos02, pos02shadow, pos03, pos03shadow, pos04, pos04shadow,
        pos07, pos07shadow]);

    const top = 14;
    const left = 86;

    return (
        <div className="content-section-grid">
            <div className="constructor-box">
                <div className={s.planMaker}>
                    {/* Angle buttons */}
                    <div>
                        <div className={s.butT}
                             onClick={() => handleAngle01(!pos01angled)}
                             style={{
                                 backgroundImage: `url(${angIcon01})`,
                                 top: ((pos01.y + pos01shadow.y) / 2 - top),
                                 left: ((pos01.x + pos01shadow.x) / 2 + left),
                                 visibility: anglesMode ? 'visible' : 'hidden'
                             }}>
                        </div>

                        <div className={s.butT}
                             onClick={() => handleAngle02(!pos02angled)}
                             style={{
                                 backgroundImage: `url(${angIcon02})`,
                                 top: ((pos02.y + pos02shadow.y) / 2 - top),
                                 left: ((pos02.x + pos02shadow.x) / 2 + left),
                                 transform: "rotate(180deg)",
                                 visibility: anglesMode ? 'visible' : 'hidden'
                             }}>
                        </div>

                        <div className={s.butT}
                             onClick={() => handleAngle03(!pos03angled)}
                             style={{
                                 backgroundImage: `url(${angIcon03})`,
                                 top: ((pos03.y + pos03shadow.y) / 2 - top),
                                 left: ((pos03.x + pos03shadow.x) / 2 + left),
                                 visibility: anglesMode ? 'visible' : 'hidden'
                             }}>
                        </div>

                        <div className={s.butT}
                             onClick={() => handleAngle04(!pos04angled)}
                             style={{
                                 backgroundImage: `url(${angIcon04})`,
                                 top: ((pos04.y + pos04shadow.y) / 2 - top),
                                 left: ((pos04.x + pos04shadow.x) / 2 + left),
                                 transform: "rotate(90deg)",
                                 visibility: anglesMode ? 'visible' : 'hidden'
                             }}>
                        </div>

                        <div className={s.butT}
                             onClick={() => handleAngle07(!pos07angled)}
                             style={{
                                 backgroundImage: `url(${angIcon07})`,
                                 top: ((pos07.y + pos07shadow.y) / 2 - top),
                                 left: ((pos07.x + pos07shadow.x) / 2 + left),
                                 transform: "rotate(180deg)",
                                 visibility: anglesMode ? 'visible' : 'hidden'
                             }}>
                        </div>
                    </div>

                    {/* Points */}
                    <div className={s.points}>

                        {/*    Point START    */}

                        <div className={`${s.point} ${s.pointStart}`} id="pStart"/>

                        {/*    Point 01    */}

                        <Draggable onDrag={(e, d) => {
                            const {x, y} = pos01shadow;
                            setCompassPoint(pos01shadow);
                            setPos01shadow({x: x + d.deltaX, y: y + d.deltaY});
                        }}
                                   position={{x: pos01shadow.x, y: pos01shadow.y}}
                                   onStart={() => {
                                       setCompassVisible(true);
                                       setCompassPoint(pos01shadow);
                                   }}
                                   onStop={() => {
                                       setCompassVisible(false);
                                       setCompassPoint({});
                                   }}
                                   bounds={pos01angled
                                       ? {
                                           left: 2 * minDist,
                                           top: 0,
                                           right: pos01.x - minDist,
                                           bottom: 0
                                       }
                                       : {left: 0, top: 0, right: maxWidth, bottom: maxHeight}}
                        >
                            <div className={s.point} id="p01s"
                                 style={pos01angled ? {visibility: 'visible'} : {visibility: 'hidden'}}/>
                        </Draggable>


                        <Draggable onDrag={(e, d) => {
                            const {x, y} = pos01;
                            setCompassPoint(pos01);
                            setPos01({x: x + d.deltaX, y: y + d.deltaY,});
                            setPos02shadow({x: x, y: pos02shadow.y});

                            if (!pos01angled) {
                                setPos01shadow({x: x, y: y})
                            }
                            if (!pos02angled) {
                                setPos02({x: x, y: pos02.y})
                            }

                        }}
                                   position={{x: pos01.x, y: pos01.y}}
                                   onStart={() => {
                                       setCompassVisible(true);
                                       setCompassPoint(pos01);
                                   }}
                                   onStop={() => {
                                       setCompassVisible(false);
                                       setCompassPoint({});
                                   }}
                                   bounds={
                                       {
                                           left: (pos01angled && pos01shadow.x + minDist) || minDist * 3,
                                           top: (pos01angled && minDist) || 2,
                                           right: (pos02angled && pos02.x - minDist) || (pos03angled && pos03shadow.x - 2 * minDist) || pos03shadow.x - 3 * minDist,
                                           bottom: (!pos01angled && 2) || (pos02angled && pos02shadow.y - minDist) || (pos02.y - 2 * minDist)
                                       }
                                   }
                        >
                            <div className={s.point} id="p01"/>
                        </Draggable>

                        {/*    Point 02    */}

                        <Draggable onDrag={(e, d) => {
                            const {x, y} = pos02shadow;
                            setCompassPoint(pos02shadow);
                            setPos02shadow({x: x + d.deltaX, y: y + d.deltaY});
                            setPos01({x: x, y: pos01.y});
                            if (!pos01angled) {
                                setPos01shadow({x: x, y: pos01shadow.y})
                            }

                        }}
                                   position={{x: pos02shadow.x, y: pos02shadow.y}}
                                   onStart={() => {
                                       setCompassVisible(true);
                                       setCompassPoint(pos02shadow);
                                   }}
                                   onStop={() => {
                                       setCompassVisible(false);
                                       setCompassPoint({});
                                   }}
                                   bounds={
                                       {
                                           left: (pos01angled) ? pos01shadow.x + (minDist) : minDist * 3,
                                           top: pos01.y + minDist + (!pos01angled && minDist),
                                           right: (pos02angled) ? pos02.x - minDist : maxWidth,
                                           bottom: (pos02angled) ? pos02.y - minDist : maxHeight
                                       }
                                   }
                        >
                            <div className={s.point} id="p02s"
                                 style={pos02angled ? {visibility: 'visible'} : {visibility: 'hidden'}}/>
                        </Draggable>

                        <Draggable onDrag={(e, d) => {
                            const {x, y} = pos02;
                            setCompassPoint(pos02);
                            setPos02({x: x + d.deltaX, y: y + d.deltaY});
                            if (!pos02angled) {
                                setPos02shadow({x: x, y: y})
                                setPos01({x: x, y: pos01.y});
                                if (!pos01angled) {
                                    setPos01shadow({x: x, y: pos01shadow.y});
                                }
                            }
                            setPos03shadow({x: pos03shadow.x, y: y});
                            if (!pos03angled) {
                                setPos03({x: pos03.x, y: y});
                            }


                        }}
                                   position={{x: pos02.x, y: pos02.y}}
                                   onStart={() => {
                                       setCompassVisible(true);
                                       setCompassPoint(pos02);
                                   }}
                                   onStop={() => {
                                       setCompassVisible(false);
                                       setCompassPoint({});
                                   }}
                                   bounds={
                                       {
                                           left: (pos02angled && pos02shadow.x + minDist) || (pos01angled && pos01shadow.x + minDist) || 3 * minDist,
                                           top: (pos02angled && pos02shadow.y + minDist) || (pos01angled && pos01.y + 2 * minDist) || 3 * minDist,
                                           right: pos03shadow.x - minDist - (!pos02angled && minDist) - (!pos03angled && minDist),
                                           bottom: (pos03angled && pos03.y - minDist) || (pos04angled && pos04shadow.y - 2 * minDist) || pos04.y - 3 * minDist
                                       }
                                   }
                        >
                            <div className={s.point} id="p02"/>
                        </Draggable>

                        {/*    Point 03    */}

                        <Draggable onDrag={(e, d) => {
                            const {x, y} = pos03shadow;
                            setCompassPoint(pos03shadow);
                            setPos03shadow({x: x + d.deltaX, y: y + d.deltaY});
                            if (pos03angled) {
                                setPos02({x: pos02.x, y: y})
                                if (!pos02angled) {
                                    setPos02shadow({x: pos02shadow.x, y: y})
                                }
                            }
                        }}
                                   position={{x: pos03shadow.x, y: pos03shadow.y}}
                                   onStart={() => {
                                       setCompassVisible(true);
                                       setCompassPoint(pos03shadow);
                                   }}
                                   onStop={() => {
                                       setCompassVisible(false);
                                       setCompassPoint({});
                                   }}
                                   bounds={
                                       {
                                           left: (pos02angled && pos02.x + minDist) || pos02.x + 2 * minDist,
                                           top: (pos02angled && pos02shadow.y + minDist) || (pos01angled && pos01.y + 2 * minDist) || pos01.y + 3 * minDist,
                                           right: (pos03angled && pos03.x - minDist) || maxWidth,
                                           bottom: (pos03angled && pos03.y - minDist) || (pos04angled && pos04shadow.y - 2 * minDist) || pos04.y - 3 * minDist
                                       }
                                   }
                        >
                            <div className={s.point} id="p03s"
                                 style={pos03angled ? {visibility: 'visible'} : {visibility: 'hidden'}}/>
                        </Draggable>


                        <Draggable onDrag={(e, d) => {
                            const {x, y} = pos03;
                            setCompassPoint(pos03);
                            setPos03({x: x + d.deltaX, y: y + d.deltaY,});
                            setPos04shadow({x: x, y: pos04shadow.y});
                            if (!pos04angled) {
                                setPos04({x: x, y: pos04.y})
                            }

                            if (!pos03angled) {
                                setPos03shadow({x: x, y: y})
                                setPos02({x: pos02.x, y: y})
                                if (!pos02angled) {
                                    setPos02shadow({x: pos02shadow.x, y: y})
                                }
                            }


                        }}
                                   position={{x: pos03.x, y: pos03.y}}
                                   onStart={() => {
                                       setCompassVisible(true);
                                       setCompassPoint(pos03);
                                   }}
                                   onStop={() => {
                                       setCompassVisible(false);
                                       setCompassPoint({});
                                   }}
                                   bounds={
                                       {
                                           left: (pos03angled && pos03shadow.x + minDist) || (pos02angled && pos02.x + 2 * minDist) || pos02.x + 3 * minDist,
                                           top: (pos03angled && pos03shadow.y + minDist) || (pos02angled && pos02shadow.y + minDist) || (pos01angled && pos01.y + 2 * minDist) || 3 * minDist,
                                           right: maxWidth,
                                           bottom: (pos04angled && pos04shadow.y - minDist) || (pos04.y - 2 * minDist)
                                       }
                                   }
                        >
                            <div className={s.point} id="p03"/>
                        </Draggable>

                        {/*    Point 04    */}

                        <Draggable onDrag={(e, d) => {
                            const {x, y} = pos04shadow;
                            setCompassPoint(pos04shadow);
                            setPos04shadow({x: x + d.deltaX, y: y + d.deltaY});
                            setPos03({x: x, y: pos03.y});
                            if (!pos03angled) {
                                setPos03shadow({x: x, y: pos03shadow.y})
                            }

                        }}
                                   position={{x: pos04shadow.x, y: pos04shadow.y}}
                                   onStart={() => {
                                       setCompassVisible(true);
                                       setCompassPoint(pos04shadow);
                                   }}
                                   onStop={() => {
                                       setCompassVisible(false);
                                       setCompassPoint({});
                                   }}
                                   bounds={
                                       {
                                           left: (pos04angled && Math.max(pos04.x + minDist,
                                               (pos03angled && pos03shadow.x + minDist) ||
                                               (pos02angled && (pos02.x + 2 * minDist)
                                                   || pos02.x + 3 * minDist))) || 0,
                                           top: (pos04angled && (pos03angled && (pos03.y + minDist) || pos03.y + 2 * minDist)) || 0,
                                           right: maxWidth,
                                           bottom: (pos04angled && pos04.y - minDist) || maxHeight
                                       }
                                   }
                        >
                            <div className={s.point} id="p04s"
                                 style={pos04angled ? {visibility: 'visible'} : {visibility: 'hidden'}}/>
                        </Draggable>

                        <Draggable onDrag={(e, d) => {
                            const {x, y} = pos04;
                            setCompassPoint(pos04);
                            setPos04({x: x + d.deltaX, y: y + d.deltaY});
                            if (!pos04angled) {
                                setPos04shadow({x: x, y: y})
                                setPos03({x: x, y: pos03.y});
                                if (!pos03angled) {
                                    setPos03shadow({x: x, y: pos03shadow.y});
                                }
                            }
                            setPos07shadow({x: pos07shadow.x, y: y});
                            if (!pos07angled) {
                                setPos07({x: pos07.x, y: y});
                            }


                        }}
                                   position={{x: pos04.x, y: pos04.y}}
                                   onStart={() => {
                                       setCompassVisible(true);
                                       setCompassPoint(pos04);
                                   }}
                                   onStop={() => {
                                       setCompassVisible(false);
                                       setCompassPoint({});
                                   }}
                                   bounds={
                                       {
                                           left: (pos04angled && ((pos07angled && pos07shadow.x + minDist) || pos07shadow.x + 2 * minDist))
                                               || (pos03angled && Math.max(pos03shadow.x, pos07shadow.x + 2 * minDist))
                                               || (pos02angled && Math.max(pos02.x, pos07shadow.x + 2 * minDist))
                                               || Math.max(pos02.x + 3 * minDist, pos07shadow.x + 2 * minDist),
                                       top: Math.max((pos07angled && pos07.y + minDist), (pos04angled && pos04shadow.y + minDist), (pos03angled && pos03.y + 2 * minDist), pos03.y + 3 * minDist),
                                       right: (pos04angled && (pos04shadow.x - minDist)) || maxWidth,
                                       bottom: maxHeight
                                   }
                                   }
                        >
                            <div className={s.point} id="p04"/>
                        </Draggable>

                        {/*    Point 05    */}
                        {/*    Point 06    */}
                        {/*    Point 07    */}

                        <Draggable onDrag={(e, d) => {
                            const {x, y} = pos07shadow;
                            setCompassPoint(pos07shadow);
                            setPos07shadow({x: x + d.deltaX, y: y + d.deltaY});
                            setPos04({x: pos04.x, y: y})
                            if (!pos04angled) {
                                setPos04shadow({x: pos04shadow.x, y: y})
                            }
                        }}
                                   position={{x: pos07shadow.x, y: pos07shadow.y}}
                                   onStart={() => {
                                       setCompassVisible(true);
                                       setCompassPoint(pos07shadow);
                                   }}
                                   onStop={() => {
                                       setCompassVisible(false);
                                       setCompassPoint({});
                                   }}
                                   bounds={
                                       {
                                           left: (pos07angled && pos07.x + minDist) || 0,
                                           top: (pos07angled && (pos04angled && (Math.max(pos07.y + minDist, pos04shadow.y + minDist))
                                               || (pos03angled && (Math.max(pos07.y + minDist, pos03.y + 2 * minDist)))
                                               || Math.max(pos07.y + minDist, pos03.y + 3 * minDist)))
                                               || 0,
                                           right: (pos04angled && pos04.x - minDist) || pos04.x - 2 * minDist,
                                           bottom: maxHeight
                                       }
                                   }
                        >
                            <div className={s.point} id="p07s"
                                 style={pos07angled ? {visibility: 'visible'} : {visibility: 'hidden'}}/>
                        </Draggable>


                        <Draggable onDrag={(e, d) => {
                            const {x, y} = pos07;
                            setCompassPoint(pos07);
                            setPos07({x: x + d.deltaX, y: y + d.deltaY});

                            if (!pos07angled) {
                                setPos07shadow({x: x, y: y});
                                setPos04({x: pos04.x, y: y})
                                if (!pos04angled) {
                                    setPos04shadow({x: pos04shadow.x, y: y})
                                }
                            }
                        }}
                                   position={{x: pos07.x, y: pos07.y}}
                                   onStart={() => {
                                       setCompassVisible(true);
                                       setCompassPoint(pos07);
                                   }}
                                   onStop={() => {
                                       setCompassVisible(false);
                                       setCompassPoint({});
                                   }}
                                   bounds={
                                       {
                                           left: 0,
                                           top: (pos07angled && 2 * minDist) || (pos04angled && pos04shadow.y + minDist) || (pos03angled && pos03.y + 2 * minDist) || pos03.y + 3 * minDist,
                                           right: 0,
                                           bottom: (pos07angled && pos07shadow.y - minDist) || maxHeight
                                       }
                                   }
                        >
                            <div className={s.point} id="p07"/>
                        </Draggable>


                    </div>

                    {/* Dimensions */}
                    <div className={s.dimensions}>

                        {/* X horizontal dimensions */}
                        <div className={s.dimContainer} style={{
                            top: (pos00.y + pos01shadow.y) / 2 - 8,
                            left: (pos00.x + pos01shadow.x) / 2 + 20 + 53,
                            visibility: labVis ? 'visible' : 'hidden'
                        }}>
                            {dim00to01SeditMode
                                ? <DimInput value={dim00to01Svalue}
                                            setter={setDim00to01Svalue}
                                            action={() => {
                                                setDim00to01SeditMode(false);
                                                let newValue = dim00to01Svalue;
                                                let oldValue = pos01shadow.x - pos00.x;
                                                let maxDelta = maxWidth - pos03.x;
                                                let min0to1 = pos00.x - pos01shadow.x + 2 * minDist - 1 + (pos01angled && minDist)
                                                let min4to7 = pos07shadow.x - pos04.x + minDist - 1 + (pos04angled && minDist) + (pos07angled && minDist)
                                                let minDelta = Math.max(min0to1, min4to7)
                                                ;

                                                let delta = newValue - oldValue;

                                                if (delta < minDelta + 1) delta = minDelta + 1
                                                if (delta > maxDelta + 1) delta = maxDelta + 1
                                                setDim00to01Svalue(oldValue + delta);

                                                setPos01shadow({x: pos01shadow.x + delta, y: pos01shadow.y});
                                                setPos01({x: pos01.x + delta, y: pos01.y});
                                                setPos02shadow({x: pos02shadow.x + delta, y: pos02shadow.y});
                                                setPos02({x: pos02.x + delta, y: pos02.y});
                                                setPos03shadow({x: pos03shadow.x + delta, y: pos03shadow.y});
                                                setPos03({x: pos03.x + delta, y: pos03.y});
                                                setPos04shadow({x: pos04shadow.x + delta, y: pos04shadow.y});
                                                setPos04({x: pos04.x + delta, y: pos04.y});
                                            }
                                            }/>
                                : <span onDoubleClick={() => setDim00to01SeditMode(true)}>
                                    {`${Math.round(dim00to01Svalue) * 2}cm`}
                                  </span>}
                        </div>


                        <div className={s.dimContainer} style={{
                            top: (pos02.y + pos03shadow.y) / 2 - 8,
                            left: (pos02.x + pos03shadow.x) / 2 + 20 + 53,
                            visibility: labVis ? 'visible' : 'hidden'
                        }}>
                            {dim02to03SeditMode
                                ? <DimInput value={dim02to03Svalue}
                                            setter={setDim02to03Svalue}
                                            action={() => {
                                                setDim02to03SeditMode(false);
                                                let newValue = dim02to03Svalue;
                                                let oldValue = pos03shadow.x - pos02.x;
                                                let maxDelta = maxWidth - pos03.x;
                                                let min2to3 = pos02.x - pos03shadow.x + minDist - 1 + (pos02angled && minDist) + (pos03angled + minDist)
                                                let min4to7 = pos07shadow.x - pos04.x + minDist - 1 + (pos07angled && minDist) + (pos04angled + minDist)
                                                let minDelta = Math.max(min2to3, min4to7)
                                                ;

                                                let delta = newValue - oldValue;

                                                if (delta < minDelta + 1) delta = minDelta + 1
                                                if (delta > maxDelta + 1) delta = maxDelta + 1
                                                setDim02to03Svalue(oldValue + delta);

                                                setPos03shadow({x: pos03shadow.x + delta, y: pos03shadow.y});
                                                setPos03({x: pos03.x + delta, y: pos03.y});
                                                setPos04shadow({x: pos04shadow.x + delta, y: pos04shadow.y});
                                                setPos04({x: pos04.x + delta, y: pos04.y});
                                            }
                                            }/>
                                : <span onDoubleClick={() => setDim02to03SeditMode(true)}>
                                    {`${Math.round(dim02to03Svalue) * 2}cm`}
                                  </span>}
                        </div>

                        <div className={s.dimContainer} style={{
                            top: (pos04.y + pos07shadow.y) / 2 - 8,
                            left: (pos04.x + pos07shadow.x) / 2 + 20 + 53,
                            visibility: labVis ? 'visible' : 'hidden'
                        }}>
                            {dim04to07SeditMode
                                ? <DimInput value={dim04to07Svalue}
                                            setter={setDim04to07Svalue}
                                            action={() => {
                                                setDim04to07SeditMode(false);
                                                let newValue = dim04to07Svalue;
                                                let oldValue = pos04.x - pos07shadow.x;
                                                let maxDelta = maxWidth - pos03.x;
                                                let min0to1 = pos00.x - pos01shadow.x + 2 * minDist - 1 + (pos01angled && minDist)
                                                let min4to7 = pos07shadow.x - pos04.x + minDist - 1 + (pos04angled && minDist) + (pos07angled && minDist)
                                                let minDelta = Math.max(min0to1, min4to7)
                                                ;

                                                let delta = newValue - oldValue;

                                                if (delta < minDelta + 1) delta = minDelta + 1
                                                if (delta > maxDelta + 1) delta = maxDelta + 1
                                                setDim00to01Svalue(oldValue + delta);

                                                setPos01shadow({x: pos01shadow.x + delta, y: pos01shadow.y});
                                                setPos01({x: pos01.x + delta, y: pos01.y});
                                                setPos02shadow({x: pos02shadow.x + delta, y: pos02shadow.y});
                                                setPos02({x: pos02.x + delta, y: pos02.y});
                                                setPos03shadow({x: pos03shadow.x + delta, y: pos03shadow.y});
                                                setPos03({x: pos03.x + delta, y: pos03.y});
                                                setPos04shadow({x: pos04shadow.x + delta, y: pos04shadow.y});
                                                setPos04({x: pos04.x + delta, y: pos04.y});
                                            }
                                            }/>
                                : <span onDoubleClick={() => setDim04to07SeditMode(true)}>
                                    {`${Math.round(dim04to07Svalue) * 2}cm`}
                                  </span>}
                        </div>


                        {/* Y vertical dimensions */}

                        <div className={s.dimContainer} style={{
                            top: (pos01.y + pos02shadow.y) / 2 - 8,
                            left: (pos01.x + pos02shadow.x) / 2 + 20 + 53,
                            visibility: labVis ? 'visible' : 'hidden'
                        }}>
                            {dim01to02SeditMode
                                ? <DimInput value={dim01to02Svalue}
                                            setter={setDim01to02Svalue}
                                            action={() => {
                                                setDim01to02SeditMode(false);
                                                let newValue = dim01to02Svalue;
                                                let oldValue = pos02shadow.y - pos01.y;
                                                let maxDelta = maxHeight - pos04.y;
                                                let min1to2 = pos01.y - pos02shadow.y + minDist - 1 + (pos01angled && minDist) + (pos02angled && minDist)
                                                let min7to0 = pos00.y - pos07.y + 2 * minDist - 1 + (pos07angled && minDist)
                                                let minDelta = Math.max(min1to2, min7to0)
                                                let delta = newValue - oldValue;

                                                if (delta < minDelta + 1) delta = minDelta + 1
                                                if (delta > maxDelta) delta = maxDelta
                                                setDim01to02Svalue(oldValue + delta);

                                                setPos02shadow({x: pos02shadow.x, y: pos02shadow.y + delta});
                                                setPos02({x: pos02.x, y: pos02.y + delta});
                                                setPos03shadow({x: pos03shadow.x, y: pos03shadow.y + delta});
                                                setPos03({x: pos03.x, y: pos03.y + delta});
                                                setPos04shadow({x: pos04shadow.x, y: pos04shadow.y + delta});
                                                setPos04({x: pos04.x, y: pos04.y + delta});
                                                setPos07shadow({x: pos07shadow.x, y: pos07shadow.y + delta});
                                                setPos07({x: pos07.x, y: pos07.y + delta});
                                            }
                                            }/>
                                : <span onDoubleClick={() => setDim01to02SeditMode(true)}>
                                    {`${Math.round(dim01to02Svalue) * 2}cm`}
                                  </span>}
                        </div>


                        <div className={s.dimContainer} style={{
                            top: (pos03.y + pos04shadow.y) / 2 - 8,
                            left: (pos03.x + pos04shadow.x) / 2 + 20 + 53,
                            visibility: labVis ? 'visible' : 'hidden'
                        }}>
                            {dim03to04SeditMode
                                ? <DimInput value={dim03to04Svalue}
                                            setter={setDim03to04Svalue}
                                            action={() => {
                                                setDim03to04SeditMode(false);
                                                let newValue = dim03to04Svalue;
                                                let oldValue = pos04shadow.y - pos03.y;
                                                let maxDelta = maxHeight - pos04.y;
                                                let min3to4 = pos03.y - pos04shadow.y + minDist - 1 + (pos03angled && minDist) + (pos04angled && minDist)
                                                let min7to0 = pos00.y - pos07.y + 2 * minDist - 1 + (pos07angled && minDist)
                                                let minDelta = Math.max(min3to4, min7to0)
                                                let delta = newValue - oldValue;

                                                if (delta < minDelta + 1) delta = minDelta + 1
                                                if (delta > maxDelta) delta = maxDelta
                                                setDim03to04Svalue(oldValue + delta);

                                                setPos04shadow({x: pos04shadow.x, y: pos04shadow.y + delta});
                                                setPos04({x: pos04.x, y: pos04.y + delta});
                                                setPos07shadow({x: pos07shadow.x, y: pos07shadow.y + delta});
                                                setPos07({x: pos07.x, y: pos07.y + delta});
                                            }
                                            }/>
                                : <span onDoubleClick={() => setDim03to04SeditMode(true)}>
                                    {`${Math.round(dim03to04Svalue) * 2}cm`}
                                  </span>}
                        </div>


                        <div className={s.dimContainer} style={{
                            top: (pos07.y + pos00.y) / 2 - 8,
                            left: (pos07.x + pos00.x) / 2 + 20 + 53,
                            visibility: labVis ? 'visible' : 'hidden'
                        }}>
                            {dim07to00editMode
                                ? <DimInput value={dim07to00value}
                                            setter={setDim07to00value}
                                            action={() => {
                                                setDim07to00editMode(false);
                                                let newValue = dim07to00value;
                                                let oldValue = pos07.y - pos00.y;
                                                let maxDelta = maxHeight - pos04.y;
                                                let min3to4 = pos03.y - pos04shadow.y + minDist - 1 + (pos03angled && minDist) + (pos04angled && minDist)
                                                let min7to0 = pos00.y - pos07.y + 2 * minDist - 1 + (pos07angled && minDist)
                                                let minDelta = Math.max(min3to4, min7to0)
                                                let delta = newValue - oldValue;

                                                if (delta < minDelta + 1) delta = minDelta + 1
                                                if (delta > maxDelta) delta = maxDelta
                                                setDim07to00value(oldValue + delta);

                                                setPos04shadow({x: pos04shadow.x, y: pos04shadow.y + delta});
                                                setPos04({x: pos04.x, y: pos04.y + delta});
                                                setPos07shadow({x: pos07shadow.x, y: pos07shadow.y + delta});
                                                setPos07({x: pos07.x, y: pos07.y + delta});
                                            }
                                            }/>
                                : <span onDoubleClick={() => setDim07to00editMode(true)}>
                                    {`${Math.round(dim07to00value) * 2}cm`}
                                  </span>}
                        </div>

                        {/* XY diagonal dimensions */}

                        <div className={s.dimContainer}
                             style={{
                                 top: ((pos01.y + pos01shadow.y) / 2 - 8),
                                 left: ((pos01.x + pos01shadow.x) / 2 + 20 + 53),
                                 visibility: labVis && pos01angled && !anglesMode ? 'visible' : 'hidden'
                             }}>
                    <span>{`${Math.round(Math.sqrt(
                        Math.pow(pos01.x - pos01shadow.x, 2)
                        + Math.pow(pos01.y - pos01shadow.y, 2))) * 2}cm`}
                    </span>
                        </div>

                        <div className={s.dimContainer}
                             style={{
                                 top: ((pos02.y + pos02shadow.y) / 2 - 8),
                                 left: ((pos02.x + pos02shadow.x) / 2 + 20 + 53),
                                 visibility: labVis && pos02angled && !anglesMode ? 'visible' : 'hidden'
                             }}>
                    <span>{`${Math.round(Math.sqrt(
                        Math.pow(pos02.x - pos02shadow.x, 2)
                        + Math.pow(pos02.y - pos02shadow.y, 2))) * 2}cm`}
                    </span>
                        </div>

                        <div className={s.dimContainer}
                             style={{
                                 top: ((pos03.y + pos03shadow.y) / 2 - 8),
                                 left: ((pos03.x + pos03shadow.x) / 2 + 20 + 53),
                                 visibility: labVis && pos03angled && !anglesMode ? 'visible' : 'hidden'
                             }}>
                    <span>{`${Math.round(Math.sqrt(
                        Math.pow(pos03.x - pos03shadow.x, 2)
                        + Math.pow(pos03.y - pos03shadow.y, 2))) * 2}cm`}
                    </span>
                        </div>

                        <div className={s.dimContainer}
                             style={{
                                 top: ((pos04.y + pos04shadow.y) / 2 - 8),
                                 left: ((pos04.x + pos04shadow.x) / 2 + 20 + 53),
                                 visibility: labVis && pos04angled && !anglesMode ? 'visible' : 'hidden'
                             }}>
                    <span>{`${Math.round(Math.sqrt(
                        Math.pow(pos04.x - pos04shadow.x, 2)
                        + Math.pow(pos04.y - pos04shadow.y, 2))) * 2}cm`}
                    </span>
                        </div>

                        <div className={s.dimContainer}
                             style={{
                                 top: ((pos07.y + pos07shadow.y) / 2 - 8),
                                 left: ((pos07.x + pos07shadow.x) / 2 + 20 + 53),
                                 visibility: labVis && pos07angled && !anglesMode ? 'visible' : 'hidden'
                             }}>
                    <span>{`${Math.round(Math.sqrt(
                        Math.pow(pos07.x - pos07shadow.x, 2)
                        + Math.pow(pos07.y - pos07shadow.y, 2))) * 2}cm`}
                    </span>
                        </div>

                    </div>

                    <CompassArrows point={compassPoint} visible={compassVisible}/>

                    <Stage width={maxWidth + 4} height={maxHeight + 4}>
                        <Layer>
                            <Line
                                x={2}
                                y={2}
                                points={[pos00.x, pos00.y,
                                    pos01shadow.x, pos01shadow.y,
                                    pos01.x, pos01.y,
                                    pos02shadow.x, pos02shadow.y,
                                    pos02.x, pos02.y,
                                    pos03shadow.x, pos03shadow.y,
                                    pos03.x, pos03.y,
                                    pos04shadow.x, pos04shadow.y,
                                    pos04.x, pos04.y,
                                    pos07shadow.x, pos07shadow.y,
                                    pos07.x, pos07.y]}
                                closed
                                stroke="#868686"
                                strokeWidth={5}
                                fillLinearGradientStartPoint={{x: -50, y: -50}}
                                fillLinearGradientEndPoint={{x: 250, y: 250}}
                                fillLinearGradientColorStops={[0, 'white', 1, 'lightgrey']}
                            />
                        </Layer>
                    </Stage>

                </div>

            </div>

            <div className="button-box">
                <div id="btn-create-angle" className="box_btn-style"
                     onClick={() => {
                         setAnglesMode(!anglesMode);
                     }}
                     style={anglesMode ? {background: "lightgreen"} : {}}
                >Create
                    angled wall
                </div>
                <div id="bnt-labels" className="box_btn-style"
                     onClick={() => setLabVis(!labVis)}
                >Show/hide labels
                </div>
                <div id="btn-help-room-size" className="box_btn-style-black"
                     onClick={() => setModalActive(true)}>Need help?
                </div>
                <div id="room-size-count">{square.toFixed(2)} m<sup>2</sup></div>
            </div>
            <Link to="/coldspots" onClick={() => handleClick(4)} className={s.btnNextStep}>
                Continue
            </Link>
            <ModalRoomSize active={modalActive} setActive={setModalActive}/>
        </div>


    )
        ;
}

export default PlanMakerL;

