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

import squareWhite from '../../img/ColdSpotIcons/squareWhite.svg';
import squareGrey from '../../img/ColdSpotIcons/squareGrey.svg';
import triangle1white from '../../img/ColdSpotIcons/triangle1white.svg';
import triangle1grey from '../../img/ColdSpotIcons/triangle1grey.svg';
import triangle2white from '../../img/ColdSpotIcons/triangle2white.svg';
import triangle2grey from '../../img/ColdSpotIcons/triangle2grey.svg';
import triangle3white from '../../img/ColdSpotIcons/triangle3white.svg';
import triangle3grey from '../../img/ColdSpotIcons/triangle3grey.svg';
import triangle4white from '../../img/ColdSpotIcons/triangle4white.svg';
import triangle4grey from '../../img/ColdSpotIcons/triangle4grey.svg';
import {updateColdSpots} from "../../redux/coldSpotsReducer";
import {updatePoints} from "../../redux/coldSpotsPoints";
import {useTranslation} from "react-i18next";


const ColdSpot = spot => <Line
    x={600}
    y={0}
    points={[0, 0, spot.width, 0, spot.width, spot.height, 0, spot.height]}
    closed
    draggable
    stroke="#868686"
    strokeWidth={2}
    fill={spot.color}
    visible={spot.cold01visible}
    onDragMove={(e, spot) => spot.handleDragMove(e, spot)}
/>


const ColdSpots = () => {
    const {t} = useTranslation();


    const dispatch = useDispatch();
    const buttons = useSelector(state => state.buttons);
    const room = useSelector(state => state.room);
    let spots = useSelector(state => state.coldSpots);

    const [color, setColor] = useState('grey');
    const [modalActive, setModalActive] = useState(!buttons[5]);
    const [modalHelpActive, setModalHelpActive] = useState(!buttons[5]); //shows modal only first time on page

    const [width, setWidth] = useState(25);
    const [height, setHeight] = useState(25);
    const [figure, setFigure] = useState(1);
    const [currentColdSpot, setCurrentColdSpot] = useState(0);

    const [figure01picture, setFigure01picture] = useState(squareGrey)
    const [figure02picture, setFigure02picture] = useState(triangle1white)
    const [figure03picture, setFigure03picture] = useState(triangle2white)
    const [figure04picture, setFigure04picture] = useState(triangle3white)
    const [figure05picture, setFigure05picture] = useState(triangle4white)

    const [spot00, setSpot00] = useState({
        width: spots[0].width, height: spots[0].height, figure: spots[0].figure,
        A: spots[0].A, B: spots[0].B, C: spots[0].C, D: spots[0].D,
        visible: spots[0].visible, color: spots[0].color, onDragMove: spots[0].onDragMove,
        points: []
    });

    const [spot01, setSpot01] = useState({
        width: spots[1].width, height: spots[1].height, figure: spots[1].figure,
        A: spots[1].A, B: spots[1].B, C: spots[1].C, D: spots[1].D,
        visible: spots[1].visible, color: spots[1].color, onDragMove: spots[1].onDragMove,
        points: []
    });

    const [spot02, setSpot02] = useState({
        width: spots[2].width, height: spots[2].height, figure: spots[2].figure,
        A: spots[2].A, B: spots[2].B, C: spots[2].C, D: spots[2].D,
        visible: spots[2].visible, color: spots[2].color, onDragMove: spots[2].onDragMove,
        points: []
    });

    const [spot03, setSpot03] = useState({
        width: spots[3].width, height: spots[3].height, figure: spots[3].figure,
        A: spots[3].A, B: spots[3].B, C: spots[3].C, D: spots[3].D,
        visible: spots[3].visible, color: spots[3].color, onDragMove: spots[3].onDragMove,
        points: []
    });

    const [spot04, setSpot04] = useState({
        width: spots[4].width, height: spots[4].height, figure: spots[4].figure,
        A: spots[4].A, B: spots[4].B, C: spots[4].C, D: spots[4].D,
        visible: spots[4].visible, color: spots[4].color, onDragMove: spots[4].onDragMove,
        points: []
    });

    const [points00, setPoints00] = useState([])
    const [points01, setPoints01] = useState([])
    const [points02, setPoints02] = useState([])
    const [points03, setPoints03] = useState([])
    const [points04, setPoints04] = useState([])

    const handleClick = (page) => {
        let pointsForResult = []
        if (spot00.color === "yellow") pointsForResult.push(points00)
        if (spot01.color === "yellow") pointsForResult.push(points01)
        if (spot02.color === "yellow") pointsForResult.push(points02)
        if (spot03.color === "yellow") pointsForResult.push(points03)
        if (spot04.color === "yellow") pointsForResult.push(points04)
        dispatch(updatePoints(pointsForResult))
        dispatch(updateButton(page))
        dispatch(updateColdSpots([spot00, spot01, spot02, spot03, spot04]))
    }

    const handleAdd = () => {
        let pts = [];
        if (figure === 1) {
            pts = [0, 0, width, 0, width, height, 0, height]
        }
        if (figure === 2) {
            pts = [0, 0, width / 2, height / 2, width, height, 0, height]
        }
        if (figure === 3) {
            pts = [0, 0, width, 0, width / 2, height / 2, 0, height]
        }
        if (figure === 4) {
            pts = [0, 0, width, 0, width, height, width / 2, height / 2,]
        }
        if (figure === 5) {
            //pts = [width / 2, height / 2, width, 0, width, height, 0, height]
            pts = [0, 0, width / 2, -height / 2, width / 2, height / 2, -width / 2, height / 2]
        }

        if (currentColdSpot === 0) {
            setSpot00({
                width: width,
                height: height,
                figure: figure,
                visible: true,
                color: "red",
                onDragMove: handleDragMove00,
                points: pts,
                A: {x: pts[0], y: pts[1]},
                B: {x: pts[2], y: pts[3]},
                C: {x: pts[4], y: pts[5]},
                D: {x: pts[6], y: pts[7]}
            })
            spots[0] = spot00;
        }

        if (currentColdSpot === 1) {
            setSpot01({
                width: width,
                height: height,
                figure: figure,
                visible: true,
                color: "red",
                onDragMove: handleDragMove01,
                points: pts,
                A: {x: pts[0], y: pts[1]},
                B: {x: pts[2], y: pts[3]},
                C: {x: pts[4], y: pts[5]},
                D: {x: pts[6], y: pts[7]}
            })
            spots[1] = spot01;
        }

        if (currentColdSpot === 2) {
            setSpot02({
                width: width,
                height: height,
                figure: figure,
                visible: true,
                color: "red",
                onDragMove: handleDragMove02,
                points: pts,
                A: {x: pts[0], y: pts[1]},
                B: {x: pts[2], y: pts[3]},
                C: {x: pts[4], y: pts[5]},
                D: {x: pts[6], y: pts[7]}
            })
            spots[2] = spot02;
        }

        if (currentColdSpot === 3) {
            setSpot03({
                width: width,
                height: height,
                figure: figure,
                visible: true,
                color: "red",
                onDragMove: handleDragMove03,
                points: pts,
                A: {x: pts[0], y: pts[1]},
                B: {x: pts[2], y: pts[3]},
                C: {x: pts[4], y: pts[5]},
                D: {x: pts[6], y: pts[7]}
            })
            spots[3] = spot03;
        }

        if (currentColdSpot === 4) {
            setSpot04({
                width: width,
                height: height,
                figure: figure,
                visible: true,
                color: "red",
                onDragMove: handleDragMove04,
                points: pts,
                A: {x: pts[0], y: pts[1]},
                B: {x: pts[2], y: pts[3]},
                C: {x: pts[4], y: pts[5]},
                D: {x: pts[6], y: pts[7]}
            })
            spots[4] = spot04;
        }


        setCurrentColdSpot(currentColdSpot + 1)
        setModalActive(false);
    }

    const handleDragMove00 = (e) => {
        const stage = e.target.getStage();
        const layer = stage.findOne(".main-layer");
        const layer2 = stage.findOne(".bin");

        let A = e.target.position()
        let B = {x: A.x + spot00.B.x - spot00.A.x, y: A.y + spot00.B.y - spot00.A.y};
        let C = {x: A.x + spot00.C.x - spot00.A.x, y: A.y + spot00.C.y - spot00.A.y};
        let D = {x: A.x + spot00.D.x - spot00.A.x, y: A.y + spot00.D.y - spot00.A.y};

        setPoints00([A.x - 320, A.y, B.x - 320, B.y, C.x - 320, C.y, D.x - 320, D.y])

        if (((spot00.figure === 5) ? true : layer.getIntersection(A))
            && ((spot00.figure === 2) ? true : layer.getIntersection(B))
            && ((spot00.figure === 3) ? true : layer.getIntersection(C))
            && ((spot00.figure === 4) ? true : layer.getIntersection(D))
            && layer.getIntersection({x: A.x + width / 2, y: A.y + height / 2}))
            setSpot00({...spot00, color: "yellow"})
        else {
            setSpot00({...spot00, color: "red"})
        }
        if (layer2.getIntersection(A)) {
            setSpot00({...spot00, visible: false})
        }
    }

    const handleDragMove01 = (e) => {
        const stage = e.target.getStage();
        const layer = stage.findOne(".main-layer");
        const layer2 = stage.findOne(".bin");

        let A = e.target.position()
        let B = {x: A.x + spot01.B.x - spot01.A.x, y: A.y + spot01.B.y - spot01.A.y};
        let C = {x: A.x + spot01.C.x - spot01.A.x, y: A.y + spot01.C.y - spot01.A.y};
        let D = {x: A.x + spot01.D.x - spot01.A.x, y: A.y + spot01.D.y - spot01.A.y};

        setPoints01([A.x - 320, A.y, B.x - 320, B.y, C.x - 320, C.y, D.x - 320, D.y])

        if (((spot01.figure === 5) ? true : layer.getIntersection(A))
            && ((spot01.figure === 2) ? true : layer.getIntersection(B))
            && ((spot01.figure === 3) ? true : layer.getIntersection(C))
            && ((spot01.figure === 4) ? true : layer.getIntersection(D))
            && layer.getIntersection({x: A.x + width / 2, y: A.y + height / 2}))
            setSpot01({...spot01, color: "yellow", A: A, B: B, C: C, D: D})
        else {
            setSpot01({...spot01, vi: "red"})
        }
        if (layer2.getIntersection(A)) {
            setSpot01({...spot01, visible: false})
        }
    }

    const handleDragMove02 = (e) => {
        const stage = e.target.getStage();
        const layer = stage.findOne(".main-layer");
        const layer2 = stage.findOne(".bin");

        let A = e.target.position()
        let B = {x: A.x + spot02.B.x - spot02.A.x, y: A.y + spot02.B.y - spot02.A.y};
        let C = {x: A.x + spot02.C.x - spot02.A.x, y: A.y + spot02.C.y - spot02.A.y};
        let D = {x: A.x + spot02.D.x - spot02.A.x, y: A.y + spot02.D.y - spot02.A.y};

        setPoints02([A.x - 320, A.y, B.x - 320, B.y, C.x - 320, C.y, D.x - 320, D.y])

        if (((spot02.figure === 5) ? true : layer.getIntersection(A))
            && ((spot02.figure === 2) ? true : layer.getIntersection(B))
            && ((spot02.figure === 3) ? true : layer.getIntersection(C))
            && ((spot02.figure === 4) ? true : layer.getIntersection(D))
            && layer.getIntersection({x: A.x + width / 2, y: A.y + height / 2}))
            setSpot02({...spot02, color: "yellow", A: A, B: B, C: C, D: D})
        else {
            setSpot02({...spot02, color: "red"})
        }
        if (layer2.getIntersection(A)) {
            setSpot02({...spot02, visible: false})
        }
    }

    const handleDragMove03 = (e) => {
        const stage = e.target.getStage();
        const layer = stage.findOne(".main-layer");
        const layer2 = stage.findOne(".bin");

        let A = e.target.position()
        let B = {x: A.x + spot03.B.x - spot03.A.x, y: A.y + spot03.B.y - spot03.A.y};
        let C = {x: A.x + spot03.C.x - spot03.A.x, y: A.y + spot03.C.y - spot03.A.y};
        let D = {x: A.x + spot03.D.x - spot03.A.x, y: A.y + spot03.D.y - spot03.A.y};

        setPoints03([A.x - 320, A.y, B.x - 320, B.y, C.x - 320, C.y, D.x - 320, D.y])

        if (((spot03.figure === 5) ? true : layer.getIntersection(A))
            && ((spot03.figure === 2) ? true : layer.getIntersection(B))
            && ((spot03.figure === 3) ? true : layer.getIntersection(C))
            && ((spot03.figure === 4) ? true : layer.getIntersection(D))
            && layer.getIntersection({x: A.x + width / 2, y: A.y + height / 2}))
            setSpot03({...spot03, color: "yellow", A: A, B: B, C: C, D: D})
        else {
            setSpot03({...spot03, color: "red"})
        }
        if (layer2.getIntersection(A)) {
            setSpot03({...spot03, visible: false})
        }
    }

    const handleDragMove04 = (e) => {
        const stage = e.target.getStage();
        const layer = stage.findOne(".main-layer");
        const layer2 = stage.findOne(".bin");

        let A = e.target.position()
        let B = {x: A.x + spot04.B.x - spot04.A.x, y: A.y + spot04.B.y - spot04.A.y};
        let C = {x: A.x + spot04.C.x - spot04.A.x, y: A.y + spot04.C.y - spot04.A.y};
        let D = {x: A.x + spot04.D.x - spot04.A.x, y: A.y + spot04.D.y - spot04.A.y};

        setPoints04([A.x - 320, A.y, B.x - 320, B.y, C.x - 320, C.y, D.x - 320, D.y])

        if (((spot04.figure === 5) ? true : layer.getIntersection(A))
            && ((spot04.figure === 2) ? true : layer.getIntersection(B))
            && ((spot04.figure === 3) ? true : layer.getIntersection(C))
            && ((spot04.figure === 4) ? true : layer.getIntersection(D))
            && layer.getIntersection({x: A.x + width / 2, y: A.y + height / 2}))
            setSpot04({...spot04, color: "yellow", A: A, B: B, C: C, D: D})
        else {
            setSpot04({...spot04, color: "red"})
        }
        if (layer2.getIntersection(A)) {
            setSpot04({...spot04, visible: false})
        }
    }

    if (!buttons[4]) return <Redirect to="/"/>

    return (
        <div>
            <div className="info-section">
                <div>
                    <h2>{t("cold_spots")}</h2>
                    <p>{t("cold_spots_text_p1")}
                        {t("cold_spots_text_p2")}
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
                                fillLinearGradientStartPoint={{x: -50, y: -50}}
                                fillLinearGradientEndPoint={{x: 250, y: 250}}
                                fillLinearGradientColorStops={[0, 'white', 1, 'lightgrey']}
                            />
                        </Layer>
                        <Layer name="bin">
                            <Line
                                x={1050}
                                y={80}
                                points={[0, 0, 170, 0, 170, 200, 0, 200]}
                                closed
                                stroke="#868686"
                                strokeWidth={0}
                                opacity={0}
                                fill="white"
                            />
                        </Layer>
                        <Layer name="coldSpot1">
                            <Line
                                x={600}
                                y={150}
                                points={spot00.points}
                                closed
                                draggable
                                stroke="#868686"
                                strokeWidth={2}
                                fill={spot00.color}
                                visible={spot00.visible}
                                onDragMove={handleDragMove00}
                            />
                        </Layer>
                        <Layer>
                            <Line
                                x={600}
                                y={150}
                                points={spot01.points}
                                closed
                                draggable
                                stroke="#868686"
                                strokeWidth={2}
                                fill={spot01.color}
                                visible={spot01.visible}
                                onDragMove={handleDragMove01}
                            />
                        </Layer>
                        <Layer>
                            <Line
                                x={600}
                                y={150}
                                points={spot02.points}
                                closed
                                draggable
                                stroke="#868686"
                                strokeWidth={2}
                                fill={spot02.color}
                                visible={spot02.visible}
                                onDragMove={handleDragMove02}
                            />
                        </Layer>
                        <Layer>
                            <Line
                                x={600}
                                y={150}
                                points={spot03.points}
                                closed
                                draggable
                                stroke="#868686"
                                strokeWidth={2}
                                fill={spot03.color}
                                visible={spot03.visible}
                                onDragMove={handleDragMove03}
                            />
                        </Layer>
                        <Layer>
                            <Line
                                x={600}
                                y={150}
                                points={spot04.points}
                                closed
                                draggable
                                stroke="#868686"
                                strokeWidth={2}
                                fill={spot04.color}
                                visible={spot04.visible}
                                onDragMove={handleDragMove04}
                            />
                        </Layer>
                    </Stage>


                    <span id="square"></span>
                </div>
                <div className="button-box">
                    <div id="btn-add-cold-spot" className="box_btn-style"
                         onClick={() => {
                             setModalActive(true);
                             setFigure(1);
                             setWidth(25);
                             setHeight(25);
                             setFigure01picture(squareGrey);
                             setFigure02picture(triangle1white);
                             setFigure03picture(triangle2white);
                             setFigure04picture(triangle3white);
                             setFigure05picture(triangle4white);
                         }
                         }>{t("add_cold_spot")}
                    </div>
                    <div id="btn-help-cold-spot" className="box_btn-style-black"
                         onClick={() => setModalHelpActive(true)}>{t("need_help")}
                    </div>

                    <div className="bin-area">
                        <span>{t("drag_here")}</span>
                    </div>
                    <Link to="/thermostat" onClick={() => handleClick(5)} className={s.btnNextStep}>
                        {t("continue")}
                    </Link>
                </div>
            </div>
            <Modal active={modalActive} setActive={setModalActive}>
                <div className="modal-window-cold-spot">
                    <h1 className="modal-title-coldspot">{t("add_cold_spot")}</h1>
                    <span className="modal-btn-close-add-modal" onClick={() => setModalActive(false)}></span>
                    <form className="form-coldspot" id="coldspot" method="GET" action="">
                        <label className="form-coldspot-lable">{t("width")}</label>
                        <input name="width" type="number" value={(width * 2).toString()}
                               onChange={e => setWidth(e.target.value / 2)}/>
                        <label className="form-coldspot-lable">{t("height")}</label>
                        <input name="height" type="number" value={(height * 2).toString()}
                               onChange={e => setHeight(e.target.value / 2)}/>
                    </form>
                    <span className="coldspot-geometry-figure-selector">
          <ul>
            <li id="figure-1"
                style={{backgroundImage: `url(${figure01picture})`}}
                onClick={() => {
                    setFigure(1);
                    setFigure01picture(squareGrey)
                    setFigure02picture(triangle1white)
                    setFigure03picture(triangle2white)
                    setFigure04picture(triangle3white)
                    setFigure05picture(triangle4white)

                }}></li>
            <li id="figure-2"
                style={{backgroundImage: `url(${figure02picture})`}}
                onClick={() => {
                    setFigure(2);
                    setFigure01picture(squareWhite)
                    setFigure02picture(triangle1grey)
                    setFigure03picture(triangle2white)
                    setFigure04picture(triangle3white)
                    setFigure05picture(triangle4white)

                }}></li>
            <li id="figure-3"
                style={{backgroundImage: `url(${figure03picture})`}}
                onClick={() => {
                    setFigure(3);
                    setFigure01picture(squareWhite)
                    setFigure02picture(triangle1white)
                    setFigure03picture(triangle2grey)
                    setFigure04picture(triangle3white)
                    setFigure05picture(triangle4white)

                }}></li>
            <li id="figure-4"
                style={{backgroundImage: `url(${figure04picture})`}}
                onClick={() => {
                    setFigure(4);
                    setFigure01picture(squareWhite)
                    setFigure02picture(triangle1white)
                    setFigure03picture(triangle2white)
                    setFigure04picture(triangle3grey)
                    setFigure05picture(triangle4white)

                }}></li>
            <li id="figure-5"
                style={{backgroundImage: `url(${figure05picture})`}}
                onClick={() => {
                    setFigure(5);
                    setFigure01picture(squareWhite)
                    setFigure02picture(triangle1white)
                    setFigure03picture(triangle2white)
                    setFigure04picture(triangle3white)
                    setFigure05picture(triangle4grey)

                }}></li>
          </ul>
        </span>
                    <button onClick={handleAdd}>{t("add")}</button>
                </div>
            </Modal>

            <Modal active={modalHelpActive} setActive={setModalHelpActive}>
                <div className="modal-window-cold-spot-help">
                    <h1 className="modal-title">{t("add_cold_spots")}</h1>
                    <span className="modal-btn-close" onClick={() => setModalHelpActive(false)}></span>
                    <div className="modal-cs-left-content-box"></div>
                    <div className="modal-cs-right-content-box">
                       <span>
                          <img src={coldSpot} alt="cold-spot-position"/>
                             <h2>{t("cold_spot")}</h2>
                              <p>
                               {t("cold_spot_text_p1")}
                                  <br/>
                                  {t("cold_spot_text_p2")}
                             </p>
                                </span>
                        <span>
                      <img src={coldSpotWrong} alt="cold-spot-wrong-position"/>
                       <h2>{t("not_cold_spot")}</h2>
                  <p>
                     {t("not_cold_spot_text_p1")}
                      <br/>
                      {t("not_cold_spot_text_p2")}
                        </p>
                          </span>

                    </div>
                    <Link className="modal-btn-skip"
                          to="/thermostat"
                          onClick={() => handleClick(5)}
                    >
                        {t("skip")}
                    </Link>
                    <div className="modal-btn-continue" onClick={() => setModalHelpActive(false)}>{t("continue")}</div>
                </div>
            </Modal>
        </div>
    );
};

export default ColdSpots;