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

const PlanMakerR = () => {

    const ratio = 2; //ratio = cm / pixels
    const minDist = 10; //minimum distance between points/lines
    const maxWidth = 720; //constructor max width
    const maxHeight = 315; //constructor max height

    const dispatch = useDispatch();
    const room = useSelector(state => state.room);
    const shapes = useSelector(state => state.shapes);
    const angles = useSelector(state => state.angles);
    const state = useSelector(state => state);
    const buttons = useSelector(state => state.buttons);

    const [modalActive, setModalActive] = useState(!buttons[4]);

    const [angIcon03, setAngIcon03] = useState(imgDiagonal);
    const [angIcon04, setAngIcon04] = useState(imgDiagonal);
    const [angIcon07, setAngIcon07] = useState(imgDiagonal);

    const [labVis, setLabVis] = useState(true);
    const [anglesMode, setAnglesMode] = useState(false);
    const [compassVisible, setCompassVisible] = useState(false);
    const [compassPoint, setCompassPoint] = useState({x: 0, y: 0});
    const [square, setSquare] = useState(0);

    const pos00 = {x: room[0], y: room[1]};
    const [pos03shadow, setPos03shadow] = useState({x: room[10], y: room[11]});
    const [pos03, setPos03] = useState({x: room[12], y: room[13]});
    const [pos04shadow, setPos04shadow] = useState({x: room[14], y: room[15]});
    const [pos04, setPos04] = useState({x: room[16], y: room[17]});
    const [pos07shadow, setPos07shadow] = useState({x: room[26], y: room[27]});
    const [pos07, setPos07] = useState({x: room[28], y: room[29]});

    const pos00angled = angles[0];
    const [pos03angled, setPos03angled] = useState(angles[3]);
    const [pos04angled, setPos04angled] = useState(angles[4]);
    const [pos07angled, setPos07angled] = useState(angles[7]);

    const [dim00to03SeditMode, setDim00to03SeditMode] = useState(false);
    const [dim03to04SeditMode, setDim03to04SeditMode] = useState(false);
    const [dim04to07SeditMode, setDim04to07SeditMode] = useState(false);
    const [dim07to00editMode, setDim07to00editMode] = useState(false);

    const [dim00to03Svalue, setDim00to03Svalue] = useState(0);
    const [dim03to04Svalue, setDim03to04Svalue] = useState(0);
    const [dim04to07Svalue, setDim04to07Svalue] = useState(0);
    const [dim07to00value, setDim07to00value] = useState(0);

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
            pos03shadow.x, pos03shadow.y,
            pos03.x, pos03.y,
            pos03shadow.x, pos03shadow.y,
            pos03.x, pos03.y,
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
        dispatch(updateAngles([pos00angled, false,
            false, pos03angled,
            pos04angled, false, false, pos07angled
        ]))
    };

    useEffect(() => {

        setDim00to03Svalue(pos03shadow.x - pos00.x);
        setDim04to07Svalue(pos04.x - pos07shadow.x);

        setDim03to04Svalue(pos04shadow.y - pos03.y);
        setDim07to00value(pos07.y - pos00.y);

        setSquare((
            (pos03.y - pos03shadow.y) * (pos03.x + pos03shadow.x) / 2 +
            (pos04shadow.y - pos03.y) * (pos04shadow.x + pos03.x) / 2 +
            (pos04.y - pos04shadow.y) * (pos04.x + pos04shadow.x) / 2 -
            (pos07.y - pos07shadow.y) * pos07.x / 2) / 10000 * ratio * ratio
        )

    }, [pos03, pos03shadow, pos04, pos04shadow,
        pos07, pos07shadow]);


    return (
        <div className="content-section-grid">
            <div className="constructor-box">
                <div className={s.planMaker}>
                    {/* Angle buttons */}
                    <div>

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
                        {/*    Point 02    */}
                        {/*    Point 03    */}

                        <Draggable onDrag={(e, d) => {
                            const {x, y} = pos03shadow;
                            setCompassPoint(pos03shadow);
                            setPos03shadow({x: x + d.deltaX, y: y + d.deltaY});
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
                                           left: pos00.x + 2 * minDist,
                                           top: 0,
                                           right: (pos03angled && (pos03.x - minDist)) || maxWidth,
                                           bottom: 0
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
                                           left: (pos03angled && pos03shadow.x + minDist) || 3 * minDist,
                                           top: (pos03angled && pos03shadow.y + minDist) || 0,
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
                                           left: (pos04angled && (pos03angled && Math.max(pos04.x + minDist, pos03shadow.x + minDist) || pos04.x + minDist)) || 0,
                                           top: (pos03angled && (pos03.y + minDist) || pos03.y + 2 * minDist) || 0,
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
                                           left: (pos04angled && ((pos07angled && (pos07shadow.x + minDist)) || pos07shadow + 2 * minDist))
                                               || ((pos03angled && Math.max(pos03shadow.x + minDist, pos07shadow.x + 2 * minDist)) || ((pos07angled && pos07shadow.x + 2 * minDist)) || 3 * minDist),
                                           top: (pos04angled && (pos04shadow.y + minDist)) || (pos03angled && (pos03.y + 2 * minDist)) || (pos03.y + 3 * minDist),
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
                            top: (pos00.y + pos03shadow.y) / 2 - 8,
                            left: (pos00.x + pos03shadow.x) / 2 + 20,
                            visibility: labVis ? 'visible' : 'hidden'
                        }}>
                            {dim00to03SeditMode
                                ? <DimInput value={dim00to03Svalue}
                                            setter={setDim00to03Svalue}
                                            action={() => {
                                                setDim00to03SeditMode(false);
                                                let newValue = dim00to03Svalue;
                                                let oldValue = pos03shadow.x - pos00.x;
                                                let maxDelta = maxWidth - pos03.x;
                                                let min0to3 = pos00.x - pos03shadow.x + minDist - 1 + (pos03angled + minDist)
                                                let min4to7 = pos07shadow.x - pos04.x + minDist - 1 + (pos07angled && minDist) + (pos04angled + minDist)
                                                let minDelta = Math.max(min0to3, min4to7)
                                                ;

                                                let delta = newValue - oldValue;

                                                if (delta < minDelta + 1) delta = minDelta + 1
                                                if (delta > maxDelta + 1) delta = maxDelta + 1
                                                setDim00to03Svalue(oldValue + delta);

                                                setPos03shadow({x: pos03shadow.x + delta, y: pos03shadow.y});
                                                setPos03({x: pos03.x + delta, y: pos03.y});
                                                setPos04shadow({x: pos04shadow.x + delta, y: pos04shadow.y});
                                                setPos04({x: pos04.x + delta, y: pos04.y});
                                            }
                                            }/>
                                : <span onDoubleClick={() => setDim00to03SeditMode(true)}>
                                    {`${Math.round(dim00to03Svalue) * 2}cm`}
                                  </span>}
                        </div>

                        <div className={s.dimContainer} style={{
                            top: (pos04.y + pos07shadow.y) / 2 - 8,
                            left: (pos04.x + pos07shadow.x) / 2 + 20,
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
                                                let min0to3 = pos00.x - pos03shadow.x + 2 * minDist - 1 + (pos03angled && minDist)
                                                let min4to7 = pos07shadow.x - pos04.x + minDist - 1 + (pos04angled && minDist) + (pos07angled && minDist)
                                                let minDelta = Math.max(min0to3, min4to7)
                                                ;

                                                let delta = newValue - oldValue;

                                                if (delta < minDelta + 1) delta = minDelta + 1
                                                if (delta > maxDelta + 1) delta = maxDelta + 1
                                                setDim04to07Svalue(oldValue + delta);

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

export default PlanMakerR;

