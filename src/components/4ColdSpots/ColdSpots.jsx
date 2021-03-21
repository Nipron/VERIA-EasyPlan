import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {updateButton} from "../../redux/buttonsReducer";
import {Redirect} from "react-router";

import s from "./ColdSpots.module.css";
import {HashLink as Link} from "react-router-hash-link";
import Modal from "../0Modal/Modal";

import coldSpot from '../../img/frame_with_coldspot.png';
import coldSpotWrong from '../../img/frame_with_coldspot_wrong_position.png';
import {Layer, Line, Stage} from "react-konva";

const ColdSpots = () => {

    const [modalActive, setModalActive] = useState(true);

    const buttons = useSelector(state => state.buttons);
    const dispatch = useDispatch();

    const handleClick = (page) => {
        dispatch(updateButton(page))
    }
    const [color, setColor] = useState('grey');

    const handleDragMove = (e) => {

        const stage = e.target.getStage();
        const layer = stage.findOne(".main-layer");

        let p01 = e.target.position()
        let p02 = {x: p01.x + 50, y: p01.y};
        let p03 = {x: p01.x + 0, y: p01.y + 50};
        let p04 = {x: p01.x + 50, y: p01.y + 50};

        if (!layer.getIntersection(p01)
            && !layer.getIntersection(p02)
            && !layer.getIntersection(p03)
            && !layer.getIntersection(p04)
        ) setColor("grey")
        if (layer.getIntersection(p01)
            || layer.getIntersection(p02)
            || layer.getIntersection(p03)
            || layer.getIntersection(p04)
        ) setColor("red")
        if (layer.getIntersection(p01)
            && layer.getIntersection(p02)
            && layer.getIntersection(p03)
            && layer.getIntersection(p04)
        ) setColor("green")
    }

    return (
        <div>

            <Stage width={720} height={320}>
                <Layer name="main-layer">
                    <Line
                        x={100}
                        y={100}
                        points={[0, 0, 200, 0, 250, 200, 0, 180]}
                        closed
                        stroke="#868686"
                        strokeWidth={5}
                        fill="yellow"
                    />
                </Layer>
                <Layer name="chair01">
                    <Line
                        x={0}
                        y={0}
                        points={[0, 0, 50, 0, 50, 50, 0, 50]}
                        closed
                        draggable
                        stroke="#868686"
                        strokeWidth={2}
                        fill={color}
                        onDragMove={handleDragMove}
                    />
                </Layer>
            </Stage>




            <div className="info-section">
                <div>
                    <h2>Cold spots</h2>
                    <p>Here you can add 'cold spots' for areas where underfloor heating should not be placed due to
                        obstacles or certain types of furniture.
                        Note that you can only place the cold spot within the exterior walls (cold spot is yellow). If
                        the cold spot crosses the exterior wall (cold spot is red) it must be moved with the room again.
                    </p>
                </div>
                <div className="ellipse-faq-btn">?</div>
            </div>

            <div className="content-section-grid">
                <div className="constructor-box">

                    <Stage width={720} height={320}>
                        <Layer name="main-layer">
                            <Line
                                x={100}
                                y={100}
                                points={[0, 0, 200, 0, 250, 200, 0, 180]}
                                closed
                                stroke="#868686"
                                strokeWidth={5}
                                fill="yellow"
                            />
                        </Layer>
                        <Layer name="chair01">
                            <Line
                                x={0}
                                y={0}
                                points={[0, 0, 50, 0, 50, 50, 0, 50]}
                                closed
                                draggable
                                stroke="#868686"
                                strokeWidth={2}
                                fill={color}
                                onDragMove={handleDragMove}
                            />
                        </Layer>
                    </Stage>


                    <span id="square"></span>
                </div>
                <div className="button-box">
                    <div id="btn-add-cold-spot" className="box_btn-style">Add Cold Spot</div>
                    <div id="btn-help-cold-spot" className="box_btn-style-black"
                         onClick={() => setModalActive(true)}>Need help?
                    </div>

                    <div className="bin-area">
                        <span>Drag here to delete</span>
                    </div>
                    <Link to="/floortype" onClick={() => handleClick(5)} className={s.btnNextStep}>
                        Continue
                    </Link>
                </div>
            </div>
            <Modal active={modalActive} setActive={setModalActive}>
                <div className="modal-window-cold-spot-help">
                    <h1 className="modal-title">Add Cold Spots</h1>
                    <span className="modal-btn-close" onClick={() => setModalActive(false)}></span>
                    <div className="modal-cs-left-content-box"></div>
                    <div className="modal-cs-right-content-box">
                       <span>
                          <img src={coldSpot} alt="cold-spot-position"/>
                             <h2>Cold Spot</h2>
                              <p>
                               A cold spot indicates an area of the floor that cannot or should not be heated.
                             <br/>
                                      These are areas where obstacles, e.g. adresser with less than 6 cm of free space, can cause too much heat to accumulate in the floor.
                            <br/>
                              Cold spots should be added to these areas to prevent this from happening.
                             </p>
                                </span>
                        <span>
                      <img src={coldSpotWrong} alt="cold-spot-wrong-position"/>
                       <h2>Not a cold spot</h2>
                  <p>
                      Any obstacle with at least 7 cm of free space above the floor should not be considered a cold spot.
                             <br/>
                               The floor under here should have underfloor heating like the rest of the room.
                        </p>
                          </span>

                    </div>
                    <Link className="modal-btn-skip"
                          to="/floortype"
                          onClick={() => handleClick(5)}
                    >
                        skip
                    </Link>

                    {/*}   <a href="">
                        <span className="modal-btn-skip">skip</span>
                    </a> */}
                    <div className="modal-btn-continue" onClick={() => setModalActive(false)}>continue</div>
                </div>
            </Modal>
        </div>
    );
};

export default ColdSpots;
