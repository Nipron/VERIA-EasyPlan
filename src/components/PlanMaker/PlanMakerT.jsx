import React, {useRef, useEffect, useState} from 'react';
import s from './PlanMaker.module.css';
import Draggable from 'react-draggable';
import {useMousePosition} from "../hooks/useMousePosition";
import {HashLink as Link} from "react-router-hash-link";
import ModalRoomSize from "../0Modal/ModalRoomSize";
import {useDispatch} from "react-redux";
import {updateButton} from "../../redux/buttonsReducer";
import imgIco from '../../img/CornerButtons/CornerLine.svg';
import imgCorner from '../../img/CornerButtons/SEcorner.svg';
import CompassArrows from "../../elements/CompassArrows/CompassArrows";
import DimInput from "../../elements/DimInput/DimInput";
import {Stage, Layer, Star, Text, Line} from 'react-konva';

const PlanMakerT = () => {

    const ratio = 2; //ratio = cm / pixels
    const minDist = 15; //minimum distance between points/lines
    const maxWidth = 720; //constructor max width
    const maxHeight = 320; //constructor max height

    const [modalActive, setModalActive] = useState(false);
    const dispatch = useDispatch();
    const handleClick = (page) => {
        dispatch(updateButton(page))
    };

    const [angIcon, setAngIcon] = useState(imgIco);

    const [labVis, setLabVis] = useState(false);
    const [anglesMode, setAnglesMode] = useState(false);
    const [compassVisible, setCompassVisible] = useState(false);
    const [compassPoint, setCompassPoint] = useState({x: 0, y: 0});
    const [square, setSquare] = useState(47.4785);

    const posStart = {x: 0, y: 0};
    const [pos01shadow, setPos01shadow] = useState({x: 180, y: 0});
    const [pos01, setPos01] = useState({x: 180, y: 0});
    const [pos02shadow, setPos02shadow] = useState({x: 180, y: 120});
    const [pos02, setPos02] = useState({x: 180, y: 120});
    const [pos03shadow, setPos03shadow] = useState({x: 220, y: 120});
    const [pos03, setPos03] = useState({x: 220, y: 120});
    const [pos04shadow, setPos04shadow] = useState({x: 220, y: 220});
    const [pos04, setPos04] = useState({x: 220, y: 220});
    const [pos05shadow, setPos05shadow] = useState({x: 180, y: 220});
    const [pos05, setPos05] = useState({x: 180, y: 220});
    const [pos06shadow, setPos06shadow] = useState({x: 180, y: 300});
    const [pos06, setPos06] = useState({x: 180, y: 300});
    const [pos07shadow, setPos07shadow] = useState({x: 0, y: 300});
    const [pos07, setPos07] = useState({x: 0, y: 300});

    const [pos01angled, setPos01angled] = useState(false);
    const [pos02angled, setPos02angled] = useState(false);
    const [pos03angled, setPos03angled] = useState(false);
    const [pos04angled, setPos04angled] = useState(false);
    const [pos05angled, setPos05angled] = useState(false);
    const [pos06angled, setPos06angled] = useState(false);
    const [pos07angled, setPos07angled] = useState(false);

    const [dimSTARTto01SeditMode, setSTARTto01SeditMode] = useState(false);
    const [dim01Sto01editMode, setDim01Sto01editMode] = useState(false);
    const [dim01to02SeditMode, setDim01to02SeditMode] = useState(false);
    const [dim02Sto02editMode, setDim02Sto02editMode] = useState(false);
    const [dim02to03SeditMode, setDim02to03SeditMode] = useState(false);
    const [dim03Sto03editMode, setDim03Sto03editMode] = useState(false);
    const [dim03to04SeditMode, setDim03to04SeditMode] = useState(false);
    const [dim04Sto04editMode, setDim04Sto04editMode] = useState(false);
    const [dim04to05SeditMode, setDim04to05SeditMode] = useState(false);
    const [dim05Sto05editMode, setDim05Sto05editMode] = useState(false);
    const [dim05to06SeditMode, setDim05to06SeditMode] = useState(false);
    const [dim06Sto06editMode, setDim06Sto06editMode] = useState(false);
    const [dim06to07SeditMode, setDim06to07SeditMode] = useState(false);
    const [dim07Sto07editMode, setDim07Sto07editMode] = useState(false);
    const [dim07toSTARTeditMode, setDim07toSTARTeditMode] = useState(false);

    const [dim07editMode, setDim07EditMode] = useState(false);

    const [dimSTARTto01Svalue, setSTARTto01Svalue] = useState(false);
    const [dim01Sto01value, setDim01Sto01value] = useState(false);
    const [dim01to02Svalue, setDim01to02Svalue] = useState(false);
    const [dim02Sto02value, setDim02Sto02value] = useState(false);
    const [dim02to03Svalue, setDim02to03Svalue] = useState(false);
    const [dim03Sto03value, setDim03Sto03value] = useState(false);
    const [dim03to04Svalue, setDim03to04Svalue] = useState(false);
    const [dim04Sto04value, setDim04Sto04value] = useState(false);
    const [dim04to05Svalue, setDim04to05Svalue] = useState(false);
    const [dim05Sto05value, setDim05Sto05value] = useState(false);
    const [dim05to06Svalue, setDim05to06Svalue] = useState(false);
    const [dim06Sto06value, setDim06Sto06value] = useState(false);
    const [dim06to07Svalue, setDim06to07Svalue] = useState(false);
    const [dim07Sto07value, setDim07Sto07value] = useState(false);
    const [dim07toSTARTvalue, setDim07toSTARTvalue] = useState(false);

    const [dim07value, setDim07value] = useState(0);


    const handleAngles = (ang) => {

        setAnglesMode(false);
        setPos02angled(ang);
        if (ang) {
            setAngIcon(imgCorner)
            setPos02({x: pos02.x - minDist, y: pos02.y});
            setPos02shadow({x: pos02shadow.x, y: pos02shadow.y - minDist});
        } else {
            setAngIcon(imgIco)
            setPos02({x: pos02shadow.x, y: pos02.y});
            setPos02shadow({x: pos02shadow.x, y: pos02.y});
        }
    }

    const handleAngle01 = (ang) => {

        setAnglesMode(false);
        setPos01angled(ang);
        if (ang) {
            setAngIcon(imgCorner)
            setPos01({x: pos01.x - minDist, y: pos02.y});
            setPos01shadow({x: pos02shadow.x, y: pos01shadow.y - minDist});
        } else {
            setAngIcon(imgIco)
            setPos01({x: pos01shadow.x, y: pos01.y});
            setPos01shadow({x: pos01shadow.x, y: pos01.y});
        }
    }



    useEffect(() => {
        setDim07value(pos02.x)

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
            (pos07.y - pos07shadow.y) * pos07.x / 2 ) / 10000 * ratio * ratio
        )

    }, [pos01, pos02, pos03, pos04, pos05, pos06, pos07]);

    const handleInputChange = (e) => {
        let newDim = e.target.value / 2;
        if (newDim < pos03.x) setDim07value(pos03.x)
        else if (newDim > pos02.x) setDim07value(pos02.x)
        else setDim07value(newDim)
    }

    const handleBlur = () => {
        setDim07EditMode(false);
        let newDim = dim07value;
        if (pos02angled) {
            if (newDim < pos03.x + minDist) newDim = pos03.x + minDist
            if (newDim > pos02.x + maxWidth - pos02shadow.x) newDim = pos02.x + maxWidth - pos02shadow.x
            setDim07value(newDim);
            setPos01({x: newDim + pos02shadow.x - pos02.x, y: pos01.y});
            setPos02({x: newDim, y: pos02.y});
            setPos02shadow({x: newDim + pos02shadow.x - pos02.x, y: pos02shadow.y});

        } else {
            if (newDim < pos03.x + minDist) newDim = pos03.x + minDist
            if (newDim > maxWidth) newDim = maxWidth
            setDim07value(newDim);
            setPos01({x: newDim, y: pos01.y});
            setPos02({x: newDim, y: pos02.y});
            setPos02shadow({x: newDim, y: pos02shadow.y});
        }
    }

    return (
        <div className="content-section-grid">
            <div className="constructor-box">
                <div className={s.planMaker}>

                    <div className={s.butT}
                         onClick={() => handleAngles(!pos01angled)}
                         style={{
                             backgroundImage: `url(${angIcon})`,
                             top: ((pos01.y + pos01shadow.y) / 2 - 20),
                             left: ((pos01.x + pos01shadow.x) / 2 + 31),
                             transform: "rotate(90deg)",
                             visibility: anglesMode ? 'visible' : 'hidden'
                         }}>
                    </div>

                    <div className={s.butT}
                         onClick={() => handleAngles(!pos02angled)}
                         style={{
                             backgroundImage: `url(${angIcon})`,
                             top: ((pos02.y + pos02shadow.y) / 2 - 20),
                             left: ((pos02.x + pos02shadow.x) / 2 + 31),
                             transform: "rotate(90deg)",
                             visibility: anglesMode ? 'visible' : 'hidden'
                         }}>
                    </div>




                    <div className={s.points}>
                        <div className={`${s.point} ${s.pointStart}`} id="pStart"/>

                        <Draggable onDrag={(e, d) => {
                            const {x, y} = pos01shadow;
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
                                           left: minDist,
                                           top: 0,
                                           right: pos01.x - minDist,
                                           bottom: 0
                                       }
                                       : {left: minDist * 2, top: 0, right: maxWidth, bottom: 0}}
                        >
                            <div className={s.point} id="p01s"
                                 style={pos01angled ? {
                                     visibility: 'visible',
                                     background: 'red'
                                 } : {visibility: 'hidden'}}/>
                        </Draggable>


                        <Draggable onDrag={(e, d) => {
                            const {x, y} = pos01;
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
                                   bounds={pos02angled
                                       ? {
                                           left: pos01shadow.x + minDist,
                                           top: minDist,
                                           right: maxWidth,
                                           bottom: pos02shadow.y - minDist
                                       }
                                       : {left: minDist * 2, top: 0, right: maxWidth, bottom: 0}}
                        >
                            <div className={s.point} id="p01"/>
                        </Draggable>

                        {/*    Point 02    */}

                        <Draggable onDrag={(e, d) => {
                            const {x, y} = pos02shadow;
                            setPos02shadow({x: x + d.deltaX, y: y + d.deltaY});
                            setPos01({x, y: pos01.y});
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
                                   bounds={pos02angled
                                       ? {
                                           left: pos01shadow.x + minDist,
                                           top: pos01.y + minDist,
                                           right: pos02.x - minDist,
                                           bottom: pos02.y - minDist
                                       }
                                       : {left: minDist * 2, top: minDist * 2, right: maxWidth, bottom: maxHeight}}
                        >
                            <div className={s.point} id="p02s"
                                 style={pos02angled ? {visibility: 'visible'} : {visibility: 'hidden'}}/>
                        </Draggable>

                        <Draggable onDrag={(e, d) => {
                            const {x, y} = pos02;
                            setPos02({x: x + d.deltaX, y: y + d.deltaY});
                            setPos02shadow({x: x + d.deltaX, y: y + d.deltaY});

                            setPos03({x: pos03.x, y: y});
                            setPos03shadow({x: pos03shadow.x, y: y});

                            setPos01({x: x, y: pos01.y});
                            setPos01shadow({x: x, y: pos01.y});
                        }}
                                   position={{x: pos02.x, y: pos02.y}}
                                   bounds={pos02angled
                                       ? {left: 0, top: pos02shadow.y + minDist, right: 0, bottom: maxHeight}
                                       : {
                                           left: minDist,
                                           top: minDist,
                                           right: pos03.x - minDist,
                                           bottom: pos04.y - minDist
                                       }}>
                            <div className={s.point} id="p02"/>
                        </Draggable>

                        {/*    Point 03    */}

                        <Draggable onDrag={(e, d) => {
                            const {x, y} = pos03;
                            setPos03({x: x + d.deltaX, y: y + d.deltaY});
                            setPos03shadow({x: x + d.deltaX, y: y + d.deltaY});

                            setPos04({x: x, y: pos04.y});
                            setPos04shadow({x: x, y: pos04.y});

                            setPos02({x: pos02.x, y: y});
                            setPos02shadow({x: pos02shadow.x, y: y});
                        }}
                                   position={{x: pos03.x, y: pos03.y}}
                                   bounds={pos03angled
                                       ? {left: 0, top: pos02shadow.y + minDist, right: 0, bottom: maxHeight}
                                       : {
                                           left: pos02.x + minDist,
                                           top: minDist,
                                           right: maxWidth,
                                           bottom: pos04.y - minDist
                                       }}>
                            <div className={s.point} id="p03"/>
                        </Draggable>

                        {/*    Point 04    */}

                        <Draggable onDrag={(e, d) => {
                            const {x, y} = pos04;
                            setPos04({x: x + d.deltaX, y: y + d.deltaY});
                            setPos04shadow({x: x + d.deltaX, y: y + d.deltaY});

                            setPos05({x: pos05.x, y: y});
                            setPos05shadow({x: pos05shadow.x, y: y});

                            setPos03({x: x, y: pos03.y});
                            setPos03shadow({x: x, y: pos03.y});
                        }}
                                   position={{x: pos04.x, y: pos04.y}}
                                   bounds={pos05angled
                                       ? {left: 0, top: pos02shadow.y + minDist, right: 0, bottom: maxHeight}
                                       : {
                                           left: Math.max(pos02.x + minDist, pos05.x + minDist),
                                           top: pos03.y + minDist,
                                           right: maxWidth,
                                           bottom: maxHeight - minDist
                                       }}>
                            <div className={s.point} id="p04"/>
                        </Draggable>

                        {/*    Point 05    */}

                        <Draggable onDrag={(e, d) => {
                            const {x, y} = pos05;
                            setPos05({x: x + d.deltaX, y: y + d.deltaY});
                            setPos05shadow({x: x + d.deltaX, y: y + d.deltaY});

                            setPos06({x: x, y: pos06.y});
                            setPos06shadow({x: x, y: pos06shadow.y});

                            setPos04({x: pos04.x, y: y});
                            setPos04shadow({x: pos04shadow.x, y: y});
                        }}
                                   position={{x: pos05.x, y: pos05.y}}
                                   bounds={pos05angled
                                       ? {left: 0, top: pos02shadow.y + minDist, right: 0, bottom: maxHeight}
                                       : {
                                           left: minDist,
                                           top: pos03.y + minDist,
                                           right: pos04.x - minDist,
                                           bottom: pos06.y - minDist
                                       }}>
                            <div className={s.point} id="p05"/>
                        </Draggable>

                        {/*    Point 06    */}

                        <Draggable onDrag={(e, d) => {
                            const {x, y} = pos06;
                            setPos06({x: x + d.deltaX, y: y + d.deltaY});
                            setPos06shadow({x: x + d.deltaX, y: y + d.deltaY});

                            setPos07({x: pos07.x, y: y});
                            setPos07shadow({x: pos07shadow.x, y: y});

                            setPos05({x: x, y: pos05.y});
                            setPos05shadow({x: x, y: pos05shadow.y});
                        }}
                                   position={{x: pos06.x, y: pos06.y}}
                                   bounds={pos06angled
                                       ? {left: 0, top: pos02shadow.y + minDist, right: 0, bottom: maxHeight}
                                       : {
                                           left: minDist,
                                           top: pos05.y + minDist,
                                           right: pos04.x - minDist,
                                           bottom: maxHeight
                                       }}>
                            <div className={s.point} id="p06"/>
                        </Draggable>

                        {/*    Point 07    */}

                        <Draggable onDrag={(e, d) => {
                            const {x, y} = pos07shadow;
                            setPos02shadow({x: x + d.deltaX, y: y + d.deltaY});
                            setPos01({x, y: pos01.y});
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
                                   bounds={pos02angled
                                       ? {
                                           left: pos01shadow.x + minDist,
                                           top: pos01.y + minDist,
                                           right: pos02.x - minDist,
                                           bottom: pos02.y - minDist
                                       }
                                       : {left: minDist * 2, top: minDist * 2, right: maxWidth, bottom: maxHeight}}
                        >
                            <div className={s.point} id="p02s"
                                 style={pos02angled ? {visibility: 'visible'} : {visibility: 'hidden'}}/>
                        </Draggable>




                        <Draggable onDrag={(e, d) => {
                            const {x, y} = pos07;
                            setPos07({x: x + d.deltaX, y: y + d.deltaY});
                            setPos07shadow({x: x + d.deltaX, y: y + d.deltaY});

                            setPos06({x: pos06.x, y: y});
                            setPos06shadow({x: pos06shadow.x, y: y});
                        }}
                                   position={{x: pos07.x, y: pos07.y}}
                                   bounds={pos07angled
                                       ? {left: 0, top: pos02shadow.y + minDist, right: 0, bottom: maxHeight}
                                       : {left: 0, top: pos05.y + minDist, right: 0, bottom: maxHeight}}>
                            <div className={s.point} id="p07"/>
                        </Draggable>


                    </div>


                    <div className={s.dimensions}>

                        <div className={s.dimContainer}
                             style={{
                                 top: (pos01.y - 10), left: Math.round((pos01.x) / 2 + 20),
                                 visibility: labVis ? 'visible' : 'hidden'
                             }}>
                            <span>{`${pos02shadow.x * 2}cm`}</span>
                        </div>

                        <div className={s.dimContainer}
                             style={{
                                 top: ((pos01.y + pos02shadow.y) / 2 - 10),
                                 left: Math.round((pos01.x + pos02shadow.x) / 2 + 20),
                                 visibility: labVis ? 'visible' : 'hidden'
                             }}>
                            <span>{`${pos02shadow.y * 2}cm`}</span>
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


                        <div className={s.dimContainer} style={{
                            top: ((pos02.y + pos03.y) / 2 - 6),
                            left: Math.round((pos02.x) / 2 + 20),
                            visibility: labVis ? 'visible' : 'hidden'
                        }}>
                            {dim07editMode
                                ? <DimInput value={dim07value}
                                            setter={setDim07value}
                                            action={handleBlur}/>
                                : <span onDoubleClick={() => setDim07EditMode(true)}>
                                    {`${dim07value * 2}cm`}
                                  </span>}
                        </div>

                        <div className={s.dimContainer} style={{
                            top: ((pos03.y) / 2 - 10), left: 20,
                            visibility: labVis ? 'visible' : 'hidden'
                        }}>
                            <span>{`${pos02.y * 2}cm`}</span>
                        </div>
                    </div>

                    <CompassArrows point={compassPoint} visible={compassVisible}/>

                    <Stage width={maxWidth + 4} height={maxHeight + 4}>
                        <Layer>
                            <Line
                                x={2}
                                y={2}
                                points={[posStart.x, posStart.y,
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

