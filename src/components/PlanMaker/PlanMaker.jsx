import React, {useRef, useEffect, useState} from 'react';
import s from './PlanMaker.module.css';
import Draggable from 'react-draggable';
import {useMousePosition} from "../hooks/useMousePosition";
import {L} from "../PointsLines/PointsLines";
import {HashLink as Link} from "react-router-hash-link";
import ModalRoomSize from "../0Modal/ModalRoomSize";
import {useDispatch} from "react-redux";
import {updateButton} from "../../redux/buttonsReducer";
import imgIco from '../../img/CornerButtons/CornerLine.svg';
import imgCorner from '../../img/CornerButtons/SEcorner.svg';
import CompassArrows from "../../elements/CompassArrows/CompassArrows";
import DimInput from "../../elements/DimInput/DimInput";
import {Stage, Layer, Star, Text, Line} from 'react-konva';

const Canvas = props => {

    const canvasRef = useRef(null)

    useEffect(() => {

        const canvas = canvasRef.current
        const context = canvas.getContext('2d')
        props.draw(context)

        return () => {
            window.cancelAnimationFrame(props.draw)
        }

    }, [props.draw])

    return <canvas ref={canvasRef} {...props}/>
}


const PlanMaker = () => {

    const minDist = 30; //minimum distance between points/lines
    const maxWidth = 720; //constructor max width
    const maxHeight = 320; //constructor max height

    const position = useMousePosition();

    const [modalActive, setModalActive] = useState(false);

    const dispatch = useDispatch();

    const handleClick = (page) => {
        dispatch(updateButton(page))
    };


    const [angIcon, setAngIcon] = useState(imgIco);


    let [pos01, setPos01] = useState({x: 200, y: 0});
    let [pos02shadow, setPos02shadow] = useState({x: 200, y: 200})
    let [pos02, setPos02] = useState({x: 200, y: 200});
    let [pos03, setPos03] = useState({x: 0, y: 200});
    let [pos04, setPos04] = useState({x: 200, y: 200});

    const [aneglView, setAngelView] = useState(false)

    let [pos02angled, setPos02angled] = useState(false);
    let [labVis, setLabVis] = useState(true);

    let [dim07editMode, setDim07EditMode] = useState(false);
    let [dim07value, setDim07value] = useState(0);

    const [anglesMode, setAnglesMode] = useState(false);


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
        setCompassPoint(pos02)
        const {x, y} = pos02;
        setPos02({x: x + d.deltaX, y: y + d.deltaY});
        setDim07value(x);

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

    useEffect(() => {
        setDim07value(pos02.x)
    }, [pos02.x]);

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

    const [compassVisible, setCompassVisible] = useState(false);
    const [compassPoint, setCompassPoint] = useState({x: 0, y: 0});

    {/*const polygon = ctx => {
        ctx.fillStyle = 'red'
        ctx.moveTo(0,0);
        ctx.lineTo(pos01.x,pos01.y);
        ctx.lineTo(pos02.x,pos02.y);
        ctx.lineTo(pos03.x,pos03.y);
        ctx.fill()}*/
    }


    return (


        <div className="content-section-grid">
            <div className="constructor-box">

                <div className={s.planMaker}>


                    {/* <Canvas draw={polygon} style={{position: 'static'}}/>*/}

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


                    {/*  <div className={s.lines}>
                        <L from={"pStart"} to={"p01"}/>
                        <L from={"p01"} to={"p02s"}/>
                        {pos02angled && <L from={"p02s"} to={"p02"}/>}
                        <L from={"p02"} to={"p03"}/>
                        <L from={"p03"} to={"pStart"}/>

                    </div>*/}
                    <div className={s.points}>


                        <div className={`${s.point} ${s.pointStart}`} id="pStart"/>
                        <Draggable onDrag={handleDrag01}
                                   position={{x: pos01.x, y: pos01.y}}
                                   bounds={pos02angled
                                       ? {left: pos02.x + minDist, top: 0, right: maxWidth, bottom: 0}
                                       : {left: minDist * 2, top: 0, right: maxWidth, bottom: 0}}
                        >
                            <div className={s.point} id="p01"/>
                            {/*<YourEffect id="p01"/>*/}
                        </Draggable>
                        {/*<Draggable axis="both"
                           position={{x: pos04.x, y: pos04.y}}>
                    <div className={s.point04} style={{visibility: 'hidden'}}/>
                </Draggable>*/}

                        <Draggable onDrag={handleDrag02shadow}
                                   position={{x: pos02shadow.x, y: pos02shadow.y}}
                                   bounds={pos02angled
                                       ? {
                                           left: pos02.x + minDist,
                                           top: minDist,
                                           right: maxWidth,
                                           bottom: pos02.y - minDist
                                       }
                                       : {left: minDist * 2, top: minDist * 2, right: maxWidth, bottom: maxHeight}}
                        >
                            <div className={s.point} id="p02s"
                                 style={pos02angled ? {
                                     visibility: 'visible',
                                     background: 'red'
                                 } : {visibility: 'hidden'}}/>
                        </Draggable>

                        <Draggable onDrag={handleDrag02}
                                   position={{x: pos02.x, y: pos02.y}}
                                   onStart={() => {
                                       setCompassVisible(true);
                                       setCompassPoint(pos02);
                                   }}
                                   onStop={() => {
                                       setCompassVisible(false);
                                       setCompassPoint({});
                                   }}
                                   bounds={pos02angled
                                       ? {
                                           left: minDist,
                                           top: pos02shadow.y + minDist,
                                           right: pos02shadow.x - minDist,
                                           bottom: maxHeight
                                       }
                                       : {left: minDist * 2, top: minDist * 2, right: maxWidth, bottom: maxHeight}}
                        >
                            <div className={s.point} id="p02"/>
                        </Draggable>

                        <Draggable onDrag={handleDrag03}
                                   position={{x: pos03.x, y: pos03.y}}
                                   bounds={pos02angled
                                       ? {left: 0, top: pos02shadow.y + minDist, right: 0, bottom: maxHeight}
                                       : {left: 0, top: minDist * 2, right: 0, bottom: maxHeight}}>
                            <div className={s.point} id="p03"/>
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

                    <Stage width={maxWidth + 4 } height={maxHeight + 4}>
                        <Layer>
                            <Line
                                x={2}
                                y={2}
                                points={[0, 0, pos01.x, pos01.y,
                                    pos02shadow.x, pos02shadow.y,
                                    pos02.x , pos02.y,
                                    pos03.x , pos03.y]}
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
                     onClick={() => setAnglesMode(!anglesMode)}
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
                <div id="room-size-count">15,3 m<sup>2</sup></div>
            </div>
            <Link to="/coldspots" onClick={() => handleClick(4)} className={s.btnNextStep}>
                Continue
            </Link>
            <ModalRoomSize active={modalActive} setActive={setModalActive}/>
        </div>


    )
        ;
}

export default PlanMaker;

