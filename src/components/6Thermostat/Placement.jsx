import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {updateButton} from "../../redux/buttonsReducer";
import {Redirect} from "react-router";
import s from "./Thermostat.module.css";
import {HashLink as Link} from "react-router-hash-link";
import {Layer, Line, Stage} from "react-konva";
import Draggable from "react-draggable";
import thermostat from '../../img/ThermostatButton/thermostat.svg'

const Placement = () => {

    let room = useSelector(state => state.room);

    const startX = 437;
    const startY = 9;

    const pos00 = {x: startX + room[0], y: startY + room[1]}
    const pos01s = {x: startX + room[2], y: startY + room[3]}
    const pos01 = {x: startX + room[4], y: startY + room[5]}
    const pos02s = {x: startX + room[6], y: startY + room[7]}
    const pos02 = {x: startX + room[8], y: startY + room[9]}
    const pos03s = {x: startX + room[10], y: startY + room[11]}
    const pos03 = {x: startX + room[12], y: startY + room[13]}
    const pos04s = {x: startX + room[14], y: startY + room[15]}
    const pos04 = {x: startX + room[16], y: startY + room[17]}
    const pos05s = {x: startX + room[18], y: startY + room[19]}
    const pos05 = {x: startX + room[20], y: startY + room[21]}
    const pos06s = {x: startX + room[22], y: startY + room[23]}
    const pos06 = {x: startX + room[24], y: startY + room[25]}
    const pos07s = {x: startX + room[26], y: startY + room[27]}
    const pos07 = {x: startX + room[28], y: startY + room[29]}

    const center = {x: pos00.x + Math.min(pos01s.x - pos00.x, pos06.x - pos00.x) / 2, y: (pos03.y + pos04s.y) / 2 + 300}

    const [thermX, setThermX] = useState(pos00.x);
    const [thermY, setThermY] = useState(pos00.y);

    const [left, setLeft] = useState(startX - 1)
    const [right, setRight] = useState(startX + 1)
    const [top, setTop] = useState(startY - 1)
    const [bottom, setBottom] = useState(startY + 1)


    const [modalActive, setModalActive] = useState(false);

    const buttons = useSelector(state => state.buttons);
    const dispatch = useDispatch();

    const handleClick = (page) => {
        dispatch(updateButton(page))
    }


    if (!buttons[6]) return <Redirect to="/"/>

    const handleDragMove = (e) => {
        const stage = e.target.getStage();
        const layer = stage.findOne(".main-layer");
        let cursor = e.target.position();

        if (layer.getIntersection(cursor)) {
            setThermX(330)
            setThermY(30)
        }

    }




    return (
        <div>
            <div className="info-section">
                <div>
                    <h2>Place Thermostat</h2>
                    <p>Drag the thermostat along the edges of the room, so it matches the placement in the actual room.
                    </p>
                </div>
                <div className="ellipse-faq-btn">?</div>
            </div>

            <div className="content-section-grid">
                <div className="constructor-box">
                    <div className={s.planMaker}>
                        <div className={s.points}>
                            <Draggable onDrag={(e, d) => {
                                let x = thermX;
                                let y = thermY;
                                setThermX(x + d.deltaX)
                                setThermY(y + d.deltaY)

                                const SuperSector = (x, y, A, B) => ((center.y - A.y) * (center.y - B.y) > 0)
                                    && ((center.x - x) / (center.y - y + 0.01) <= (center.x - A.x) / (center.y - A.y + 0.01))
                                    && ((center.x - x) / (center.y - y + 0.01) > (center.x - B.x) / (center.y - B.y + 0.01))

                                console.log( SuperSector(984, 260, pos04s, pos04))


                                const sector = (A, B) => ((center.y - A.y) * (center.y - B.y) > 0)
                                    && ((center.x - x) / (center.y - y + 0.01) <= (center.x - A.x) / (center.y - A.y + 0.01))
                                    && ((center.x - x) / (center.y - y + 0.01) > (center.x - B.x) / (center.y - B.y + 0.01))


                                if (sector(pos07, pos00)) {
                                    setLeft(pos00.x);
                                    setRight(pos00.x);
                                    setTop(pos00.y - 1);
                                    setBottom(pos07.y + 1);
                                }

                                if (sector(pos00, pos01s)) {
                                    setLeft(pos00.x);
                                    setRight(pos01s.x + 2);
                                    setTop(pos00.y);
                                    setBottom(pos00.y);
                                }

                                if (sector(pos01s, pos01)) {
                                    setLeft(pos01s.x + (y - pos01s.y) * (pos01.x - pos01s.x) / (pos01.y - pos01s.y));
                                    setRight(pos01s.x + (y - pos01s.y) * (pos01.x - pos01s.x) / (pos01.y - pos01s.y));
                                    setTop(pos01s.y - 1);
                                    setBottom(pos01.y + 1);
                                }

                                if (sector(pos01, pos02s)) {
                                    setLeft(pos01.x);
                                    setRight(pos01.x);
                                    setTop(pos01.y - 1);
                                    setBottom(pos02s.y + 1);
                                }

                                if (sector(pos02s, pos02)) {
                                    setLeft(pos02s.x + (y - pos02s.y) * (pos02.x - pos02s.x) / (pos02.y - pos02s.y));
                                    setRight(pos02s.x + (y - pos02s.y) * (pos02.x - pos02s.x) / (pos02.y - pos02s.y));
                                    setTop(pos02s.y - 1);
                                    setBottom(pos02.y + 1);
                                }

                                if (sector(pos02, pos03s)) {
                                    setLeft(pos02.x - 1);
                                    setRight(pos03s.x);
                                    setTop(pos02.y);
                                    setBottom(pos02.y);
                                    console.log(x);
                                    console.log(y);
                                }

                                if (sector(pos03s, pos03)) {
                                    setLeft(pos03s.x + (y - pos03s.y) * (pos03.x - pos03s.x) / (pos03.y - pos03s.y));
                                    setRight(pos03s.x + (y - pos03s.y) * (pos03.x - pos03s.x) / (pos03.y - pos03s.y));
                                    setTop(pos03s.y - 1);
                                    setBottom(pos03.y + 1);
                                    console.log(x);
                                    console.log(y);
                                }

                                if (sector(pos03, pos04s)) {
                                    setLeft(pos03.x);
                                    setRight(pos03.x);
                                    setTop(pos03.y - 1);
                                    setBottom(pos04s.y + 1);
                                    console.log(x);
                                    console.log(y);


                                }

                                if (sector(pos04s, pos04)) {
                                    setLeft(pos04.x + (y - pos04s.y) * (pos04s.x - pos04.x) / (pos04.y - pos04s.y));
                                    setRight(pos04.x + (y - pos04s.y) * (pos04s.x - pos04.x) / (pos04.y - pos04s.y));
                                    setTop(pos04s.y - 1);
                                    setBottom(pos04.y + 1);
                                }


                            }
                            }
                                       position={{x: thermX, y: thermY}}
                                       onStart={() => {
                                       }}
                                       onStop={() => {
                                       }}
                                       bounds={
                                           {
                                               left: left,
                                               top: top,
                                               right: right,
                                               bottom: bottom
                                           }
                                       }
                            >
                                <div className={s.thermostat}/>
                            </Draggable>
                        </div>

                    </div>


                    <Stage width={1220} height={320}>
                        <Layer name="main-layer">
                            <Line
                                x={320}
                                y={2}
                                points={room}
                                closed
                                stroke="#868686"
                                strokeWidth={5}
                                fillLinearGradientStartPoint={{x: -50, y: -50}}
                                fillLinearGradientEndPoint={{x: 250, y: 250}}
                                fillLinearGradientColorStops={[0, 'white', 1, 'lightgrey']}
                            />
                        </Layer>
                        {/*} <Layer name="chair01">
                            <Line
                                x={thermX}
                                y={thermY}
                                points={[0, 0, 10, 0, 10, 10, 0, 10]}
                                closed
                                draggable
                                stroke="#868686"
                                strokeWidth={2}
                                fill={"pink"}
                                visible={true}
                                onDragMove={handleDragMove}
                            />
                        </Layer>*/}
                    </Stage>

                </div>
                <div className="button-box">
                    <Link to="/result" onClick={() => handleClick(7)} className={s.btnNextStep}>
                        Continue
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Placement;
