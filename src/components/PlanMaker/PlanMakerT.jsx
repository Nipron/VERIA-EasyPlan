import React, {useRef, useEffect, useState} from 'react';
import s from './PlanMaker.module.css';
import Draggable from 'react-draggable';
import {HashLink as Link} from "react-router-hash-link";
import ModalRoomSize from "../0Modal/ModalRoomSize";
import {useDispatch} from "react-redux";
import {updateButton} from "../../redux/buttonsReducer";
import imgDiagonal from '../../img/CornerButtons/CornerLine.svg';
import imgCorner from '../../img/CornerButtons/SEcorner.svg';
import CompassArrows from "../../elements/CompassArrows/CompassArrows";
import DimInput from "../../elements/DimInput/DimInput";
import {Stage, Layer, Star, Text, Line} from 'react-konva';

const PlanMakerT = () => {

    const ratio = 2; //ratio = cm / pixels
    const minDist = 18; //minimum distance between points/lines
    const maxWidth = 720; //constructor max width
    const maxHeight = 320; //constructor max height

    const [modalActive, setModalActive] = useState(false);
    const dispatch = useDispatch();
    const handleClick = (page) => {
        dispatch(updateButton(page))
    };

    const [angIcon01, setAngIcon01] = useState(imgDiagonal);
    const [angIcon02, setAngIcon02] = useState(imgDiagonal);
    const [angIcon03, setAngIcon03] = useState(imgDiagonal);
    const [angIcon04, setAngIcon04] = useState(imgDiagonal);
    const [angIcon05, setAngIcon05] = useState(imgDiagonal);
    const [angIcon06, setAngIcon06] = useState(imgDiagonal);
    const [angIcon07, setAngIcon07] = useState(imgDiagonal);

    const [labVis, setLabVis] = useState(true);
    const [anglesMode, setAnglesMode] = useState(false);
    const [compassVisible, setCompassVisible] = useState(false);
    const [compassPoint, setCompassPoint] = useState({x: 0, y: 0});
    const [square, setSquare] = useState(0);

    const pos00 = {x: 0, y: 0};
    const [pos01shadow, setPos01shadow] = useState({x: 150, y: 0});
    const [pos01, setPos01] = useState({x: 150, y: 0});
    const [pos02shadow, setPos02shadow] = useState({x: 150, y: 120});
    const [pos02, setPos02] = useState({x: 150, y: 120});
    const [pos03shadow, setPos03shadow] = useState({x: 320, y: 120});
    const [pos03, setPos03] = useState({x: 320, y: 120});
    const [pos04shadow, setPos04shadow] = useState({x: 320, y: 220});
    const [pos04, setPos04] = useState({x: 320, y: 220});
    const [pos05shadow, setPos05shadow] = useState({x: 180, y: 220});
    const [pos05, setPos05] = useState({x: 180, y: 220});
    const [pos06shadow, setPos06shadow] = useState({x: 180, y: 300});
    const [pos06, setPos06] = useState({x: 180, y: 300});
    const [pos07shadow, setPos07shadow] = useState({x: 0, y: 300});
    const [pos07, setPos07] = useState({x: 0, y: 300});

    const pos00angled = false;
    const [pos01angled, setPos01angled] = useState(false);
    const [pos02angled, setPos02angled] = useState(false);
    const [pos03angled, setPos03angled] = useState(false);
    const [pos04angled, setPos04angled] = useState(false);
    const [pos05angled, setPos05angled] = useState(false);
    const [pos06angled, setPos06angled] = useState(false);
    const [pos07angled, setPos07angled] = useState(false);

    const [dim00to01SeditMode, setDim00to01SeditMode] = useState(false);
    const [dim01to02SeditMode, setDim01to02SeditMode] = useState(false);
    const [dim02to03SeditMode, setDim02to03SeditMode] = useState(false);
    const [dim03to04SeditMode, setDim03to04SeditMode] = useState(false);
    const [dim04to05SeditMode, setDim04to05SeditMode] = useState(false);
    const [dim05to06SeditMode, setDim05to06SeditMode] = useState(false);
    const [dim06to07SeditMode, setDim06to07SeditMode] = useState(false);
    const [dim07to00editMode, setDim07to00editMode] = useState(false);

    const [dim00to01Svalue, setDim00to01Svalue] = useState(0);
    const [dim01to02Svalue, setDim01to02Svalue] = useState(0);
    const [dim02to03Svalue, setDim02to03Svalue] = useState(0);
    const [dim03to04Svalue, setDim03to04Svalue] = useState(0);
    const [dim04to05Svalue, setDim04to05Svalue] = useState(0);
    const [dim05to06Svalue, setDim05to06Svalue] = useState(0);
    const [dim06to07Svalue, setDim06to07Svalue] = useState(0);
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
    const handleAngle05 = (ang) => {
        setAnglesMode(false);
        setPos05angled(ang);
        if (ang) {
            setAngIcon05(imgCorner);
            setPos05({x: pos05.x, y: pos05.y + minDist});
            setPos05shadow({x: pos05shadow.x + minDist, y: pos05shadow.y});
        } else {
            setAngIcon05(imgDiagonal);
            setPos05({x: pos05.x, y: pos05shadow.y});
            setPos05shadow({x: pos05.x, y: pos05shadow.y});
        }
    }
    const handleAngle06 = (ang) => {
        setAnglesMode(false);
        setPos06angled(ang);
        if (ang) {
            setAngIcon06(imgCorner);
            setPos06({x: pos06.x - minDist, y: pos06.y});
            setPos06shadow({x: pos06shadow.x, y: pos06shadow.y - minDist});
        } else {
            setAngIcon06(imgDiagonal);
            setPos06({x: pos06shadow.x, y: pos06.y});
            setPos06shadow({x: pos06shadow.x, y: pos06.y});
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

    useEffect(() => {

        setDim00to01Svalue(pos01shadow.x - pos00.x);
        setDim02to03Svalue(pos03shadow.x - pos02.x);
        setDim04to05Svalue(pos04.x - pos05shadow.x);
        setDim06to07Svalue(pos06.x - pos07shadow.x);

        setDim01to02Svalue(pos02shadow.y - pos01.y);
        setDim03to04Svalue(pos04shadow.y - pos03.y);
        setDim05to06Svalue(pos06shadow.y - pos05.y);
        setDim07to00value(pos07.y - pos00.y);

        setSquare((
            (pos01.y - pos01shadow.y) * (pos01.x + pos01shadow.x) / 2 +
            (pos02shadow.y - pos01.y) * (pos02shadow.x + pos01.x) / 2 +
            (pos02.y - pos02shadow.y) * (pos02.x + pos02shadow.x) / 2 +
            (pos03shadow.y - pos02.y) * (pos03shadow.x + pos02.x) / 2 +
            (pos03.y - pos03shadow.y) * (pos03.x + pos03shadow.x) / 2 +
            (pos04shadow.y - pos03.y) * (pos04shadow.x + pos03.x) / 2 +
            (pos04.y - pos04shadow.y) * (pos04.x + pos04shadow.x) / 2 +
            (pos05shadow.y - pos04.y) * (pos05shadow.x + pos04.x) / 2 +
            (pos05.y - pos05shadow.y) * (pos05.x + pos05shadow.x) / 2 +
            (pos06shadow.y - pos05.y) * (pos06shadow.x + pos05.x) / 2 +
            (pos06.y - pos06shadow.y) * (pos06.x + pos06shadow.x) / 2 -
            (pos07.y - pos07shadow.y) * pos07.x / 2) / 10000 * ratio * ratio
        )

    }, [pos01, pos01shadow, pos02, pos02shadow, pos03, pos03shadow, pos04, pos04shadow,
        pos05, pos05shadow, pos06, pos06shadow, pos07, pos07shadow]);

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
                                 top: ((pos01.y + pos01shadow.y) / 2 - 20),
                                 left: ((pos01.x + pos01shadow.x) / 2 + 31),
                                 visibility: anglesMode ? 'visible' : 'hidden'
                             }}>
                        </div>

                        <div className={s.butT}
                             onClick={() => handleAngle02(!pos02angled)}
                             style={{
                                 backgroundImage: `url(${angIcon02})`,
                                 top: ((pos02.y + pos02shadow.y) / 2 - 20),
                                 left: ((pos02.x + pos02shadow.x) / 2 + 31),
                                 transform: "rotate(180deg)",
                                 visibility: anglesMode ? 'visible' : 'hidden'
                             }}>
                        </div>

                        <div className={s.butT}
                             onClick={() => handleAngle03(!pos03angled)}
                             style={{
                                 backgroundImage: `url(${angIcon03})`,
                                 top: ((pos03.y + pos03shadow.y) / 2 - 20),
                                 left: ((pos03.x + pos03shadow.x) / 2 + 31),
                                 visibility: anglesMode ? 'visible' : 'hidden'
                             }}>
                        </div>

                        <div className={s.butT}
                             onClick={() => handleAngle04(!pos04angled)}
                             style={{
                                 backgroundImage: `url(${angIcon04})`,
                                 top: ((pos04.y + pos04shadow.y) / 2 - 20),
                                 left: ((pos04.x + pos04shadow.x) / 2 + 31),
                                 transform: "rotate(90deg)",
                                 visibility: anglesMode ? 'visible' : 'hidden'
                             }}>
                        </div>

                        <div className={s.butT}
                             onClick={() => handleAngle05(!pos05angled)}
                             style={{
                                 backgroundImage: `url(${angIcon05})`,
                                 top: ((pos05.y + pos05shadow.y) / 2 - 20),
                                 left: ((pos05.x + pos05shadow.x) / 2 + 31),
                                 transform: "rotate(270deg)",
                                 visibility: anglesMode ? 'visible' : 'hidden'
                             }}>
                        </div>

                        <div className={s.butT}
                             onClick={() => handleAngle06(!pos06angled)}
                             style={{
                                 backgroundImage: `url(${angIcon06})`,
                                 top: ((pos06.y + pos06shadow.y) / 2 - 20),
                                 left: ((pos06.x + pos06shadow.x) / 2 + 31),
                                 transform: "rotate(90deg)",
                                 visibility: anglesMode ? 'visible' : 'hidden'
                             }}>
                        </div>

                        <div className={s.butT}
                             onClick={() => handleAngle07(!pos07angled)}
                             style={{
                                 backgroundImage: `url(${angIcon07})`,
                                 top: ((pos07.y + pos07shadow.y) / 2 - 20),
                                 left: ((pos07.x + pos07shadow.x) / 2 + 31),
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
                                           left: (pos01angled) ? pos01shadow.x + (minDist) : minDist * 2,
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
                                           left: (pos03angled && Math.max(pos03shadow.x + minDist,
                                               (pos04angled && pos04.x + minDist)))
                                               || Math.max((pos02angled && pos02.x + 2 * minDist)
                                                   || pos02.x + 3 * minDist, (pos05angled && pos05shadow.x + 2 * minDist)
                                                   || pos05.x + 3 * minDist),
                                           top: (pos03angled && pos03shadow.y + minDist) || (pos02angled && pos02shadow.y + minDist) || pos01.y + 2 * minDist,
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
                                               (pos02angled && pos02.x + 2 * minDist
                                                   || pos02.x + 3 * minDist))) || 0,
                                           top: (pos04angled && (pos03angled && pos03.y + minDist || pos03.y + 2 * minDist)) || 0,
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
                            setPos05shadow({x: pos05shadow.x, y: y});
                            if (!pos05angled) {
                                setPos05({x: pos05.x, y: y});
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
                                           left: (pos04angled && (pos05angled
                                               && pos05shadow.x + minDist
                                               || pos05shadow.x + 2 * minDist))
                                               || Math.max((pos05angled
                                                   && pos05shadow.x + 2 * minDist
                                                   || pos05shadow.x + 3 * minDist),
                                                   (pos02angled && pos02.x + 2 * minDist
                                                       || pos02.x + 3 * minDist),
                                                   (pos03angled && pos03shadow.x + minDist)),
                                           top: (pos04angled && pos04shadow.y + minDist) || (pos03angled && pos03.y + 2 * minDist) || pos03.y + 3 * minDist,
                                           right: (pos04angled && pos04shadow.x - minDist) || maxWidth,
                                           bottom: (pos05angled && pos05.y - minDist) || (pos06angled && pos06shadow.y - 2 * minDist) || pos06.y - 3 * minDist
                                       }
                                   }
                        >
                            <div className={s.point} id="p04"/>
                        </Draggable>

                        {/*    Point 05    */}

                        <Draggable onDrag={(e, d) => {
                            const {x, y} = pos05shadow;
                            setCompassPoint(pos05shadow);
                            setPos05shadow({x: x + d.deltaX, y: y + d.deltaY});
                            setPos04({x: pos04.x, y: y})
                            if (!pos04angled) {
                                setPos04shadow({x: pos04shadow.x, y: y})
                            }
                        }}
                                   position={{x: pos05shadow.x, y: pos05shadow.y}}
                                   onStart={() => {
                                       setCompassVisible(true);
                                       setCompassPoint(pos05shadow);
                                   }}
                                   onStop={() => {
                                       setCompassVisible(false);
                                       setCompassPoint({});
                                   }}
                                   bounds={
                                       {
                                           left: (pos05angled && pos05.x + minDist) || 0,
                                           top: (pos04angled && pos04shadow.y + minDist) || (pos03angled && pos03.y + 2 * minDist) || pos03.y + 3 * minDist,
                                           right: (pos04angled && pos04.x - minDist) || pos04.x - 2 * minDist,
                                           bottom: (pos05angled && pos05.y - minDist) || maxHeight
                                       }
                                   }
                        >
                            <div className={s.point} id="p05s"
                                 style={pos05angled ? {visibility: 'visible'} : {visibility: 'hidden'}}/>
                        </Draggable>


                        <Draggable onDrag={(e, d) => {
                            const {x, y} = pos05;
                            setCompassPoint(pos05);
                            setPos05({x: x + d.deltaX, y: y + d.deltaY,});
                            setPos06shadow({x: x, y: pos06shadow.y});

                            if (!pos05angled) {
                                setPos05shadow({x: x, y: y})
                                setPos04({x: pos04.x, y: y})
                                if (!pos04angled) {
                                    setPos04shadow({x: pos04shadow.x, y: y})
                                }
                            }
                            if (!pos06angled) {
                                setPos06({x: x, y: pos06.y})
                            }

                        }}
                                   position={{x: pos05.x, y: pos05.y}}
                                   onStart={() => {
                                       setCompassVisible(true);
                                       setCompassPoint(pos05);
                                   }}
                                   onStop={() => {
                                       setCompassVisible(false);
                                       setCompassPoint({});
                                   }}
                                   bounds={
                                       {
                                           left: (pos06angled && pos06.x + minDist) || (pos07angled && pos07shadow.x + 2 * minDist) || pos07shadow.x + 3 * minDist,
                                           top: (pos05angled && pos05shadow.y + minDist) || (pos04angled && pos04shadow.y + minDist) || (pos03angled && pos03.y + 2 * minDist) || pos03.y + 3 * minDist,
                                           right: (pos05angled && pos05shadow.x - minDist) || (pos04angled && pos04.x - 2 * minDist) || pos04.x - 3 * minDist,
                                           bottom: (pos05angled && ((pos06angled && pos06shadow.y - minDist) || pos06shadow.y - 2 * minDist)) || (pos06angled && pos06shadow.y - 2 * minDist) || (pos06shadow.y - 3 * minDist)
                                       }
                                   }
                        >
                            <div className={s.point} id="p05"/>
                        </Draggable>

                        {/*    Point 06    */}

                        <Draggable onDrag={(e, d) => {
                            const {x, y} = pos06shadow;
                            setCompassPoint(pos06shadow);
                            setPos06shadow({x: x + d.deltaX, y: y + d.deltaY});
                            setPos05({x: x, y: pos05.y});
                            if (!pos05angled) {
                                setPos05shadow({x: x, y: pos05shadow.y})
                            }

                        }}
                                   position={{x: pos06shadow.x, y: pos06shadow.y}}
                                   onStart={() => {
                                       setCompassVisible(true);
                                       setCompassPoint(pos06shadow);
                                   }}
                                   onStop={() => {
                                       setCompassVisible(false);
                                       setCompassPoint({});
                                   }}
                                   bounds={
                                       {
                                           left: (pos06angled && pos06.x + minDist) || 0,
                                           top: (pos06angled && (pos05angled && pos05.y + minDist || pos05.y + 2 * minDist)) || 0,
                                           right: (pos05angled && pos05shadow.x - minDist) || (pos04angled && pos04.x - 2 * minDist) || pos04.x - 3 * minDist,
                                           bottom: (pos06angled && pos06.y - minDist) || maxHeight
                                       }
                                   }
                        >
                            <div className={s.point} id="p06s"
                                 style={pos06angled ? {visibility: 'visible'} : {visibility: 'hidden'}}/>
                        </Draggable>

                        <Draggable onDrag={(e, d) => {
                            const {x, y} = pos06;
                            setCompassPoint(pos06);
                            setPos06({x: x + d.deltaX, y: y + d.deltaY});
                            setPos07shadow({x: pos07shadow.x, y: y})
                            if (!pos06angled) {
                                setPos06shadow({x: x, y: y})
                                setPos05({x: x, y: pos05.y})
                                if (!pos05angled) {
                                    setPos05shadow({x: x, y: pos05shadow.y})
                                }
                            }
                            if (!pos07angled) {
                                setPos07({x: pos07.x, y: y})
                            }


                        }}
                                   position={{x: pos06.x, y: pos06.y}}
                                   onStart={() => {
                                       setCompassVisible(true);
                                       setCompassPoint(pos06);
                                   }}
                                   onStop={() => {
                                       setCompassVisible(false);
                                       setCompassPoint({});
                                   }}
                                   bounds={
                                       {
                                           left: ((pos07angled && pos07shadow.x + minDist) || pos07shadow.x + 2 * minDist) + (!pos06angled && minDist),
                                           top: (pos06angled && pos06shadow.y + minDist) || (pos05angled && pos05.y + 2 * minDist) || pos05.y + 3 * minDist,
                                           right: (pos06angled && pos06shadow.x - minDist) || (pos05angled && pos05shadow.x - minDist) || (pos04angled && pos04.x - 2 * minDist) || pos04.x - 3 * minDist,
                                           bottom: maxHeight
                                       }
                                   }
                        >
                            <div className={s.point} id="p06"/>
                        </Draggable>

                        {/*    Point 07    */}

                        <Draggable onDrag={(e, d) => {
                            const {x, y} = pos07shadow;
                            setCompassPoint(pos07shadow);
                            setPos07shadow({x: x + d.deltaX, y: y + d.deltaY});
                            setPos06({x: pos06.x, y: y})
                            if (!pos06angled) {
                                setPos06shadow({x: pos06shadow.x, y: y})
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
                                           top: (pos07angled && Math.max(pos07.y + minDist, (pos06angled && pos06shadow.y + minDist) || (pos05angled && pos05.y + 2 * minDist) || pos05.y + 3 * minDist))
                                               || 0,
                                           right: (pos06angled && pos06.x - minDist) || pos06.x - 2 * minDist,
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
                                setPos06({x: pos06.x, y: y})
                                if (!pos06angled) {
                                    setPos06shadow({x: pos06shadow.x, y: y})
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
                                           top: (pos07angled && 2 * minDist) || (pos06angled && pos06shadow.y + minDist) || (pos05angled && pos05.y + 2 * minDist) || pos05.y + 3 * minDist,
                                           right: 0,
                                           bottom: (pos07angled && pos07shadow.y - minDist) || maxHeight
                                       }
                                   }
                        >
                            <div className={s.point} id="p07"/>
                        </Draggable>


                    </div>


                    <div className={s.dimensions}>

                        {/* X horizontal dimensions */}
                        <div className={s.dimContainer} style={{
                            top: (pos00.y + pos01shadow.y) / 2 - 8,
                            left: (pos00.x + pos01shadow.x) / 2 + 20,
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
                                                let minDelta = ((pos01.x < pos06shadow.x)
                                                        && ((pos00angled && (pos01angled && (pos00.x - pos01shadow.x) + minDist - 1
                                                        || (pos00.x - pos01shadow.x) + 2 * minDist - 1))
                                                        || (pos01angled && (pos00.x - pos01shadow.x) + 2 * minDist - 1)
                                                        || ((pos00.x - pos01shadow.x) + 3 * minDist - 1))
                                                    ) || ((pos06angled && (pos07angled && (pos07shadow.x - pos06.x) + minDist - 1
                                                    || (pos07shadow.x - pos06.x) + 2 * minDist - 1))
                                                    || (pos07angled && (pos07shadow.x - pos06.x) + 2 * minDist - 1)
                                                    || (pos07shadow.x - pos06.x) + 3 * minDist - 1)
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
                                                setPos05shadow({x: pos05shadow.x + delta, y: pos05shadow.y});
                                                setPos05({x: pos05.x + delta, y: pos05.y});
                                                setPos06shadow({x: pos06shadow.x + delta, y: pos06shadow.y});
                                                setPos06({x: pos06.x + delta, y: pos06.y});
                                            }
                                            }/>
                                : <span onDoubleClick={() => setDim00to01SeditMode(true)}>
                                    {`${Math.round(dim00to01Svalue) * 2}cm`}
                                  </span>}
                        </div>


                        <div className={s.dimContainer} style={{
                            top: (pos02.y + pos03shadow.y) / 2 - 8,
                            left: (pos02.x + pos03shadow.x) / 2 + 20,
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
                                                let minDelta = ((pos02.x > pos05shadow.x)
                                                        && ((pos02angled && (pos03angled && (pos02.x - pos03shadow.x) + minDist - 1
                                                        || (pos02.x - pos03shadow.x) + 2 * minDist - 1))
                                                        || (pos03angled && (pos02.x - pos03shadow.x) + 2 * minDist - 1)
                                                        || ((pos02.x - pos03shadow.x) + 3 * minDist - 1))
                                                    ) || (pos04angled && (pos05angled && (pos05shadow.x - pos04.x) + minDist - 1
                                                    || (pos05shadow.x - pos04.x) + 2 * minDist - 1))
                                                    || (pos05angled && (pos05shadow.x - pos04.x) + 2 * minDist - 1)
                                                    || (pos05shadow.x - pos04.x) + 3 * minDist - 1
                                                ;

                                                let delta = newValue - oldValue;

                                                if (delta < minDelta + 1) delta = minDelta + 1
                                                if (delta > maxDelta + 1) delta = maxDelta + 1
                                                setDim02to03Svalue(oldValue + delta);

                                                console.log(delta)

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
                            top: (pos04.y + pos05shadow.y) / 2 - 8,
                            left: (pos04.x + pos05shadow.x) / 2 + 20,
                            visibility: labVis ? 'visible' : 'hidden'
                        }}>
                            {dim04to05SeditMode
                                ? <DimInput value={dim04to05Svalue}
                                            setter={setDim04to05Svalue}
                                            action={() => {
                                                setDim04to05SeditMode(false);
                                                let newValue = dim04to05Svalue;
                                                let oldValue = pos04.x - pos05shadow.x;
                                                let maxDelta = maxWidth - pos03.x;
                                                let minDelta = ((pos02.x > pos05shadow.x)
                                                        && ((pos02angled && (pos03angled && (pos02.x - pos03shadow.x) + minDist - 1
                                                        || (pos02.x - pos03shadow.x) + 2 * minDist - 1))
                                                        || (pos03angled && (pos02.x - pos03shadow.x) + 2 * minDist - 1)
                                                        || ((pos02.x - pos03shadow.x) + 3 * minDist - 1))
                                                    ) || (pos04angled && (pos05angled && (pos05shadow.x - pos04.x) + minDist - 1
                                                    || (pos05shadow.x - pos04.x) + 2 * minDist - 1))
                                                    || (pos05angled && (pos05shadow.x - pos04.x) + 2 * minDist - 1)
                                                    || (pos05shadow.x - pos04.x) + 3 * minDist - 1
                                                ;

                                                let delta = newValue - oldValue;

                                                if (delta < minDelta + 1) delta = minDelta + 1
                                                if (delta > maxDelta + 1) delta = maxDelta + 1
                                                setDim02to03Svalue(oldValue + delta);

                                                console.log(delta)

                                                setPos03shadow({x: pos03shadow.x + delta, y: pos03shadow.y});
                                                setPos03({x: pos03.x + delta, y: pos03.y});
                                                setPos04shadow({x: pos04shadow.x + delta, y: pos04shadow.y});
                                                setPos04({x: pos04.x + delta, y: pos04.y});
                                            }
                                            }/>
                                : <span onDoubleClick={() => setDim04to05SeditMode(true)}>
                                    {`${Math.round(dim04to05Svalue) * 2}cm`}
                                  </span>}
                        </div>


                        <div className={s.dimContainer} style={{
                            top: (pos06.y + pos07shadow.y) / 2 - 8,
                            left: (pos06.x + pos07shadow.x) / 2 + 20,
                            visibility: labVis ? 'visible' : 'hidden'
                        }}>
                            {dim06to07SeditMode
                                ? <DimInput value={dim06to07Svalue}
                                            setter={setDim06to07Svalue}
                                            action={() => {
                                                setDim06to07SeditMode(false);
                                                let newValue = dim06to07Svalue;
                                                let oldValue = pos06.x - pos07shadow.x;
                                                let maxDelta = maxWidth - pos03.x;
                                                let minDelta = ((pos01.x < pos06shadow.x)
                                                        && ((pos00angled && (pos01angled && (pos00.x - pos01shadow.x) + minDist - 1
                                                        || (pos00.x - pos01shadow.x) + 2 * minDist - 1))
                                                        || (pos01angled && (pos00.x - pos01shadow.x) + 2 * minDist - 1)
                                                        || ((pos00.x - pos01shadow.x) + 3 * minDist - 1))
                                                    ) || ((pos06angled && (pos07angled && (pos07shadow.x - pos06.x) + minDist - 1
                                                    || (pos07shadow.x - pos06.x) + 2 * minDist - 1))
                                                    || (pos07angled && (pos07shadow.x - pos06.x) + 2 * minDist - 1)
                                                    || (pos07shadow.x - pos06.x) + 3 * minDist - 1)
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
                                                setPos05shadow({x: pos05shadow.x + delta, y: pos05shadow.y});
                                                setPos05({x: pos05.x + delta, y: pos05.y});
                                                setPos06shadow({x: pos06shadow.x + delta, y: pos06shadow.y});
                                                setPos06({x: pos06.x + delta, y: pos06.y});
                                            }
                                            }/>
                                : <span onDoubleClick={() => setDim06to07SeditMode(true)}>
                                    {`${Math.round(dim06to07Svalue) * 2}cm`}
                                  </span>}
                        </div>


                        {/* Y vertical dimensions */}

                        <div className={s.dimContainer} style={{
                            top: (pos01.y + pos02shadow.y) / 2 - 8,
                            left: (pos01.x + pos02shadow.x) / 2 + 20,
                            visibility: labVis ? 'visible' : 'hidden'
                        }}>
                            {dim01to02SeditMode
                                ? <DimInput value={dim01to02Svalue}
                                            setter={setDim01to02Svalue}
                                            action={() => {
                                                setDim01to02SeditMode(false);
                                                let newValue = dim01to02Svalue;
                                                let oldValue = pos02shadow.y - pos01.y;
                                                let maxDelta = maxHeight - pos06.y;
                                                let minDelta = (pos02angled && (pos01angled && (pos01.y - pos02shadow.y) + minDist - 1
                                                    || (pos01.y - pos02shadow.y) + 2 * minDist - 1))
                                                    || (pos01angled && (pos01.y - pos02shadow.y) + 2 * minDist - 1)
                                                    || (pos01.y - pos02shadow.y) + 3 * minDist - 1;
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
                                                setPos05shadow({x: pos05shadow.x, y: pos05shadow.y + delta});
                                                setPos05({x: pos05.x, y: pos05.y + delta});
                                                setPos06shadow({x: pos06shadow.x, y: pos06shadow.y + delta});
                                                setPos06({x: pos06.x, y: pos06.y + delta});
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
                            left: (pos03.x + pos04shadow.x) / 2 + 20,
                            visibility: labVis ? 'visible' : 'hidden'
                        }}>
                            {dim03to04SeditMode
                                ? <DimInput value={dim03to04Svalue}
                                            setter={setDim03to04Svalue}
                                            action={() => {
                                                setDim03to04SeditMode(false);
                                                let newValue = dim03to04Svalue;
                                                let oldValue = pos04shadow.y - pos03.y;
                                                let maxDelta = maxHeight - pos06.y;
                                                let minDelta = (pos04angled && (pos03angled && (pos03.y - pos04shadow.y) + minDist - 1
                                                    || (pos03.y - pos04shadow.y) + 2 * minDist - 1))
                                                    || (pos03angled && (pos03.y - pos04shadow.y) + 2 * minDist - 1)
                                                    || (pos03.y - pos04shadow.y) + 3 * minDist - 1;
                                                let delta = newValue - oldValue;

                                                if (delta < minDelta + 1) delta = minDelta + 1
                                                if (delta > maxDelta) delta = maxDelta
                                                setDim03to04Svalue(oldValue + delta);

                                                setPos04shadow({x: pos04shadow.x, y: pos04shadow.y + delta});
                                                setPos04({x: pos04.x, y: pos04.y + delta});
                                                setPos05shadow({x: pos05shadow.x, y: pos05shadow.y + delta});
                                                setPos05({x: pos05.x, y: pos05.y + delta});
                                                setPos06shadow({x: pos06shadow.x, y: pos06shadow.y + delta});
                                                setPos06({x: pos06.x, y: pos06.y + delta});
                                                setPos07shadow({x: pos07shadow.x, y: pos07shadow.y + delta});
                                                setPos07({x: pos07.x, y: pos07.y + delta});
                                            }
                                            }/>
                                : <span onDoubleClick={() => setDim03to04SeditMode(true)}>
                                    {`${Math.round(dim03to04Svalue) * 2}cm`}
                                  </span>}
                        </div>


                        <div className={s.dimContainer} style={{
                            top: (pos05.y + pos06shadow.y) / 2 - 8,
                            left: (pos05.x + pos06shadow.x) / 2 + 20,
                            visibility: labVis ? 'visible' : 'hidden'
                        }}>
                            {dim05to06SeditMode
                                ? <DimInput value={dim05to06Svalue}
                                            setter={setDim05to06Svalue}
                                            action={() => {
                                                setDim05to06SeditMode(false);
                                                let newValue = dim05to06Svalue;
                                                let oldValue = pos06shadow.y - pos05.y;
                                                let maxDelta = maxHeight - pos06.y;
                                                let minDelta = (pos06angled && (pos05angled && (pos05.y - pos06shadow.y) + minDist - 1
                                                    || (pos05.y - pos06shadow.y) + 2 * minDist - 1))
                                                    || (pos05angled && (pos05.y - pos06shadow.y) + 2 * minDist - 1)
                                                    || (pos05.y - pos06shadow.y) + 3 * minDist - 1;
                                                let delta = newValue - oldValue;

                                                if (delta < minDelta + 1) delta = minDelta + 1
                                                if (delta > maxDelta) delta = maxDelta
                                                setDim05to06Svalue(oldValue + delta);

                                                setPos06shadow({x: pos06shadow.x, y: pos06shadow.y + delta});
                                                setPos06({x: pos06.x, y: pos06.y + delta});
                                                setPos07shadow({x: pos07shadow.x, y: pos07shadow.y + delta});
                                                setPos07({x: pos07.x, y: pos07.y + delta});
                                            }
                                            }/>
                                : <span onDoubleClick={() => setDim05to06SeditMode(true)}>
                                    {`${Math.round(dim05to06Svalue) * 2}cm`}
                                  </span>}
                        </div>


                        <div className={s.dimContainer} style={{
                            top: (pos07.y + pos00.y) / 2 - 8,
                            left: (pos07.x + pos00.x) / 2 + 20,
                            visibility: labVis ? 'visible' : 'hidden'
                        }}>
                            {dim07to00editMode
                                ? <DimInput value={dim07to00value}
                                            setter={setDim07to00value}
                                            action={() => {
                                                setDim07to00editMode(false);
                                                let newValue = dim07to00value;
                                                let oldValue = pos07.y - pos00.y;
                                                let maxDelta = maxHeight - pos06.y;
                                                let minDelta = (pos06angled && (pos05angled && (pos05.y - pos06shadow.y) + minDist - 1
                                                    || (pos05.y - pos06shadow.y) + 2 * minDist - 1))
                                                    || (pos05angled && (pos05.y - pos06shadow.y) + 2 * minDist - 1)
                                                    || (pos05.y - pos06shadow.y) + 3 * minDist - 1;
                                                let delta = newValue - oldValue;

                                                if (delta < minDelta + 1) delta = minDelta + 1
                                                if (delta > maxDelta) delta = maxDelta
                                                setDim07to00value(oldValue + delta);

                                                setPos06shadow({x: pos06shadow.x, y: pos06shadow.y + delta});
                                                setPos06({x: pos06.x, y: pos06.y + delta});
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
                                 left: ((pos01.x + pos01shadow.x) / 2 + 20),
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
                                 left: ((pos02.x + pos02shadow.x) / 2 + 20),
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
                                 left: ((pos03.x + pos03shadow.x) / 2 + 20),
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
                                 left: ((pos04.x + pos04shadow.x) / 2 + 20),
                                 visibility: labVis && pos04angled && !anglesMode ? 'visible' : 'hidden'
                             }}>
                    <span>{`${Math.round(Math.sqrt(
                        Math.pow(pos04.x - pos04shadow.x, 2)
                        + Math.pow(pos04.y - pos04shadow.y, 2))) * 2}cm`}
                    </span>
                        </div>

                        <div className={s.dimContainer}
                             style={{
                                 top: ((pos05.y + pos05shadow.y) / 2 - 8),
                                 left: ((pos05.x + pos05shadow.x) / 2 + 20),
                                 visibility: labVis && pos05angled && !anglesMode ? 'visible' : 'hidden'
                             }}>
                    <span>{`${Math.round(Math.sqrt(
                        Math.pow(pos05.x - pos05shadow.x, 2)
                        + Math.pow(pos05.y - pos05shadow.y, 2))) * 2}cm`}
                    </span>
                        </div>

                        <div className={s.dimContainer}
                             style={{
                                 top: ((pos06.y + pos06shadow.y) / 2 - 8),
                                 left: ((pos06.x + pos06shadow.x) / 2 + 20),
                                 visibility: labVis && pos06angled && !anglesMode ? 'visible' : 'hidden'
                             }}>
                    <span>{`${Math.round(Math.sqrt(
                        Math.pow(pos06.x - pos06shadow.x, 2)
                        + Math.pow(pos06.y - pos06shadow.y, 2))) * 2}cm`}
                    </span>
                        </div>

                        <div className={s.dimContainer}
                             style={{
                                 top: ((pos07.y + pos07shadow.y) / 2 - 8),
                                 left: ((pos07.x + pos07shadow.x) / 2 + 20),
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
                                    pos05shadow.x, pos05shadow.y,
                                    pos05.x, pos05.y,
                                    pos06shadow.x, pos06shadow.y,
                                    pos06.x, pos06.y,
                                    pos07shadow.x, pos07shadow.y,
                                    pos07.x, pos07.y]}
                                closed
                                draggable
                                stroke="#868686"
                                strokeWidth={5}
                                fillLinearGradientStartPoint={{x: -50, y: -50}}
                                fillLinearGradientEndPoint={{x: 250, y: 250}}
                                fillLinearGradientColorStops={[0, 'red', 1, 'yellow']}
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

export default PlanMakerT;

