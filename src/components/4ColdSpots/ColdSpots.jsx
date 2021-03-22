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
import {updateColdSpot} from "../../redux/coldSpotReducer";


const ColdSpots = () => {

    const dispatch = useDispatch();
    const buttons = useSelector(state => state.buttons);
    let room = useSelector(state => state.room);

    const [color, setColor] = useState('grey');
    const [modalActive, setModalActive] = useState(false);

    const [modalHelpActive, setModalHelpActive] = useState(!buttons[5]); //shows modal only first time on page

    const [width, setWidth] = useState(25);
    const [height, setHeight] = useState(25);
    const [cold01visible, setCold01visible] = useState(false);

    const [coldSpotFirst00, setColdSpotFirst00] = useState({x: 0, y: 0})
    const [coldSpotFirst01, setColdSpotFirst01] = useState({x: 0, y: 0})
    const [coldSpotFirst02, setColdSpotFirst02] = useState({x: 0, y: 0})
    const [coldSpotFirst03, setColdSpotFirst03] = useState({x: 0, y: 0})

    const handleClick = (page) => {
        dispatch(updateButton(page))
        dispatch(updateColdSpot([coldSpotFirst00.x - 320, coldSpotFirst00.y,
            coldSpotFirst03.x - 320, coldSpotFirst03.y,
            coldSpotFirst02.x - 320, coldSpotFirst02.y,
            coldSpotFirst01.x - 320, coldSpotFirst01.y]))
    }

    const handleAdd = () => {
        setModalActive(false);
        setCold01visible(true);
    }

    const handleDragMove = (e) => {

        const stage = e.target.getStage();
        const layer = stage.findOne(".main-layer");

        let p01 = e.target.position()
        let p02 = {x: p01.x + width, y: p01.y};
        let p03 = {x: p01.x + width, y: p01.y + height};
        let p04 = {x: p01.x + 0, y: p01.y + height};

        setColdSpotFirst00(p01);
        setColdSpotFirst01(p02);
        setColdSpotFirst02(p03);
        setColdSpotFirst03(p04);

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

    if (!buttons[4]) return <Redirect to="/"/>

    return (
        <div>
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

                    <Stage width={1220} height={320}>
                        <Layer name="main-layer">
                            <Line
                                x={320}
                                y={2}
                                points={room}
                                closed
                                stroke="#868686"
                                strokeWidth={5}
                                fill="yellow"
                            />
                        </Layer>
                        <Layer name="chair01">
                            <Line
                                x={600}
                                y={0}
                                points={[0, 0, width, 0, width, height, 0, height]}
                                closed
                                draggable
                                stroke="#868686"
                                strokeWidth={2}
                                fill={color}
                                visible={cold01visible}
                                onDragMove={handleDragMove}
                            />
                            {/*<Line
                                x={600}
                                y={100}
                                points={[0, 0, 50, 0, 50, 50, 0, 50]}
                                closed
                                draggable
                                stroke="#868686"
                                strokeWidth={2}
                                fill={color}
                                visible={false}
                                onDragMove={handleDragMove}
                            />*/}
                        </Layer>
                    </Stage>


                    <span id="square"></span>
                </div>
                <div className="button-box">
                    <div id="btn-add-cold-spot" className="box_btn-style"
                         onClick={() => setModalActive(true)}>Add Cold Spot
                    </div>
                    <div id="btn-help-cold-spot" className="box_btn-style-black"
                         onClick={() => setModalHelpActive(true)}>Need help?
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
                <div className="modal-window-cold-spot">
                    <h1 className="modal-title-coldspot">Add Cold Spot</h1>
                    <span className="modal-btn-close-add-modal" onClick={() => setModalActive(false)}></span>
                    <form className="form-coldspot" id="coldspot" method="GET" action="">
                        <label className="form-coldspot-lable">width:</label>
                        <input name="width" type="number" value={(width * 2).toString()}
                               onChange={e => setWidth(e.target.value / 2)}/>
                        <label className="form-coldspot-lable">height:</label>
                        <input name="height" type="number" value={(height * 2).toString()}
                               onChange={e => setHeight(e.target.value / 2)}/>
                    </form>
                    <span className="coldspot-geometry-figure-selector">
          <ul>
            <li id="figure-1"></li>
            <li id="figure-2"></li>
            <li id="figure-3"></li>
            <li id="figure-4"></li>
            <li id="figure-5"></li>
          </ul>
        </span>
                    <button onClick={handleAdd}>add</button>
                </div>
            </Modal>

            <Modal active={modalHelpActive} setActive={setModalHelpActive}>
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
                    <div className="modal-btn-continue" onClick={() => setModalHelpActive(false)}>continue</div>
                </div>
            </Modal>
        </div>
    );
};

export default ColdSpots;
