import React, {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Document, Page, PDFDownloadLink, StyleSheet, View, Image as PDFImage, Text} from '@react-pdf/renderer';
import Konva from 'konva';
import {Layer, Line, Stage, Image, Text as KonvaText} from "react-konva";
import {matGroups} from "../../data/matGroups";
import pointInPolygon from 'point-in-polygon';
import useImage from 'use-image';
import s from "../7Result/Result.module.css";
import thermoImg from '../../img/ThermostatButton/thermostat.svg'
import {checkIntersection, colinearPointWithinSegment} from 'line-intersect';
import PathFinder, {pathLength} from "../../calculator/pathfinder";
import coldSpot from "../../img/frame_with_coldspot.png";
import coldSpotWrong from "../../img/frame_with_coldspot_wrong_position.png";
import {HashLink as Link} from "react-router-hash-link";
import Modal from "../0Modal/Modal";
import ModalPartsList from "../0Modal/ModalPartsList";
import PDF from "../PDF/PDF";
import {updateImg} from "../../redux/stageImgReducer";
import veria from "../../img/forPDF/PDFheader.png";
import NewPDF from "../PDF/newPDF";
import {Redirect} from "react-router";

import {MatFinder} from "./MatFinder";
import {
    findClosest,
    findNextPit, findShortestCombination,
    isWayFree,
    normalSnake,
    permutator,
    weakSnake,
    wireLength, wiresCombinations
} from "../../calculator/superSnake";
import {
    Bulldozer,
    BulldozerSquad,
    ColdSpotsTransformer,
    RoomReshaper,
    RoomTransformer, SnakeForDrawing
} from "../../calculator/helpers";

const ThermostatImage = () => {
    const [image] = useImage(thermoImg);
    return <Image image={image}/>
};

const Result = () => {

    const dispatch = useDispatch();

    const buttons = useSelector(state => state.buttons);
    const room = useSelector(state => state.room);
    const spotsArray = useSelector(state => state.points);
    const transformedSpots = ColdSpotsTransformer(spotsArray, 1);
    const thermostat = useSelector(state => state.thermostat);
    const thermoOut = [thermostat.x, thermostat.y]

    const [image] = useImage(thermoImg);

    let massGroup = MatFinder(spotsArray, room, thermoOut)

    let walls = BulldozerSquad(massGroup[3])
    let wallsFromRoom = Bulldozer(RoomReshaper(room, -2))

    walls.push(...wallsFromRoom)
    let pitStops = massGroup[2]

    let nestToDraw = nest => {
        let result = [];
        for (let i = 0; i < nest.length; i++) {
            let snake = []
            for (let j = 0; j < nest[i].length; j++) {
                snake.push(nest[i][j][0])
                snake.push(nest[i][j][1])
            }
            result.push(snake)
        }
        return result;
    }
    let nestXX = nestToDraw(massGroup[5])

    const listOfParts = {
        "mat5_55": 3,
        "mat4-55": 0,
        "mat3-55": 3,
        "mat2-55": 0,
        "mat5-100": 0,
        "mat4-100": 4,
        "mat3-100": 1,
        "mat2-100": 0,
        "cord2": 4,
        "cord1": 1,
        "cord025": 4,
        "kit100": 1,
        "kit55": 0
    }

    const [modalNotesActive, setModalNotesActive] = useState(false);
    const [modalPartsActive, setModalPartsActive] = useState(false); //shows modal only first time on page

    const stageRef = useRef();
    const [im, setIm] = useState(null)
    const [pdfLink, setPdfLink] = useState("PDF")

    const handleEnter = event => {

        const dataURL = stageRef.current.toDataURL({
            pixelRatio: 2
        });
        setIm(dataURL)
        const styles = StyleSheet.create({
            page: {
                flexDirection: 'column',
                backgroundColor: 'white'
            },
            section: {
                margin: 20,
                padding: 20
            },
            sectionGrey: {
                margin: 20,
                padding: 20,
                backgroundColor: "#DCDCDC",
                borderRadius: 7
            }
        });
        const PDF2 = () => {
            return (
                <Document>
                    <Page size="A4" style={styles.page}>
                        <View style={styles.section}>
                            <PDFImage src={veria}/>
                        </View>
                        <View style={styles.sectionGrey}>
                            <Text>
                                Floor heating: 11,0 m2 | Clickmat | 75% heating coverage
                            </Text>
                            <Text>
                                Top Floor Covering: Laminate
                            </Text>
                            <Text>
                                Bottom Floor Construction: Unburnable (Concrete)
                            </Text>
                        </View>
                        <View style={styles.section}>
                            <PDFImage src={im}/>
                        </View>
                    </Page>
                </Document>
            );
        };

        setPdfLink(<PDFDownloadLink document={<PDF2/>} fileName="EasyPlan.pdf">
            {({blob, url, loading, error}) => (loading ? 'Loading...' : 'Save as PDF')}
        </PDFDownloadLink>)
    }

    if (!buttons[7]) return <Redirect to="/"/>

    return (
        <div>
            <div className="info-section">
                <div>
                    <h2>Result</h2>
                    <p>
                        Please note that this is a computer generated simulation.
                        <br/>
                        Installation of products on site may vary. Always be sure to carefully follow the instructions
                        enclosed in the package.
                    </p>
                </div>
                <div className="ellipse-faq-btn">?</div>
            </div>

            <div className="content-section-grid">
                <div className="constructor-box">

                    <Stage width={1220} height={320} ref={stageRef}>
                        <Layer name="main-layer">
                            <Line
                                x={320}
                                y={2}
                                points={room}
                                closed
                                stroke="#868686"
                                strokeWidth={1}
                                fillLinearGradientStartPoint={{x: -50, y: -50}}
                                fillLinearGradientEndPoint={{x: 250, y: 250}}
                                fillLinearGradientColorStops={[0, 'white', 1, 'lightgrey']}
                            />
                        </Layer>
                        <Layer name="result">
                            {
                                massGroup[0].map(tail => <Line
                                    x={320}
                                    y={2}
                                    points={tail}
                                    closed
                                    stroke="#6E6E6E"
                                    strokeWidth={2}
                                    fill="#FF3F3F"
                                />)
                            }
                            {/*
                                massGroup[1].map(tail => <Line
                                    x={320}
                                    y={2}
                                    points={tail}
                                    closed
                                    fill="#2B2B2B"
                                />)
                            */}
                            {
                                spotsArray.map(spot => <Line
                                    x={320}
                                    y={2}
                                    points={spot}
                                    closed
                                    stroke="#868686"
                                    strokeWidth={2}
                                    fill={"white"}
                                />)
                            }
                            {
                                nestXX.map(snake => <Line
                                    x={320}
                                    y={2}
                                    points={snake}
                                    stroke="#9F35CC"
                                    strokeWidth={2}
                                />)
                            }
                            {/*
                                <Line
                                    x={320}
                                    y={2}
                                    points={demoDraw}
                                    stroke="#094D2A"
                                    strokeWidth={2}
                                />
                            */}
                            {
                                massGroup[6].map(connector => <KonvaText
                                    x={connector[0] + 320}
                                    y={connector[1] + 2}
                                    text={connector[2]}
                                    fontSize={15}
                                    fontFamily='Calibri'
                                    fill="#E8C6F7"
                                />)
                            }
                            {
                                massGroup[7].map(connector => <Line
                                    x={320}
                                    y={2}
                                    points={connector}
                                    closed
                                    fill={"black"}
                                />)
                            }
                            <Image image={image}
                                   x={thermostat.x + 320 - 12}
                                   y={thermostat.y - 7}
                                   scale={{x: 0.6, y: 0.6}}/>
                        </Layer>
                    </Stage>
                    {/*<span className="calculation-process">Calculation Project...</span>
                    <span className="printing-project">Printing Project...</span>
                    <span className="calculation-complete">Calculation complete</span>*/}
                    <div className="block-button">
                        <div className="btn-notes">Add Notes</div>
                        <div className="btn-list"
                             onClick={() => setModalPartsActive(true)}>List of Parts / Where to Buy
                        </div>
                        {/* <div className="btn-print-project" onMouseEnter={handleEnter}>
                            {pdfLink}
                        </div>
                         <div className="btn-print-project" onMouseEnter={handleEnter}>
                            <NewPDF/>
                        </div>*/}
                    </div>
                </div>
            </div>
            <ModalPartsList active={modalPartsActive} setActive={setModalPartsActive} list={listOfParts}/>
        </div>
    )
        ;
};

export default Result;


