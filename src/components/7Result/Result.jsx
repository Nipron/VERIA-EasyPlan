import React, {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Document, Page, PDFDownloadLink, StyleSheet, View, Image as PDFImage, Text} from '@react-pdf/renderer';
import Konva from 'konva';
import {Layer, Line, Stage, Image, Text as KonvaText} from "react-konva";
import {matGroups} from "../../data/matGroups";
import useImage from 'use-image';
import s from "../7Result/Result.module.css";
import thermoImg from '../../img/ThermostatButton/thermostat.svg'
import {checkIntersection, colinearPointWithinSegment} from 'line-intersect';
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
import {updateButton} from "../../redux/buttonsReducer";

const ThermostatImage = () => {
    const [image] = useImage(thermoImg);
    return <Image image={image}/>
};

const Result = () => {

    const dispatch = useDispatch();

    const [modalActive, setModalActive] = useState(false);

    const buttons = useSelector(state => state.buttons);
    const room = useSelector(state => state.room);
    const spotsArray = useSelector(state => state.points);
    const thermostat = useSelector(state => state.thermostat);
    const thermoOut = [thermostat.x, thermostat.y]

    const [image] = useImage(thermoImg);

    //let massGroup = MatFinder(spotsArray, room, thermoOut)
    const massGroup = useSelector(state => state.result)


    /* if (massGroup[4]) {
         setModalActive(true)
     }*/

    useEffect(() => {
        setModalActive(!massGroup[4])
        return () => {
        };
    }, []);

    const handleModalClick = () => {
        setModalActive(false)
        if (!massGroup[4]) {
            dispatch(updateButton(6))
            return <Redirect to="/"/>
        }
    }

    const nestToDraw = nest => {
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
    let nestXX = [];
    if (massGroup[4]) {
        nestXX = nestToDraw(massGroup[1])
    }

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

    if (!buttons[7]) return <Redirect to="/floortype"/>

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
                    {
                        massGroup[4] &&
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
                                {
                                    massGroup[2].map(connector => <Line
                                        x={320}
                                        y={2}
                                        points={connector}
                                        closed
                                        fill={"black"}
                                    />)
                                }
                                {
                                    massGroup[3].map(connector => <KonvaText
                                        x={connector[0] + 320}
                                        y={connector[1] + 2}
                                        text={connector[2]}
                                        fontSize={15}
                                        fontFamily='Calibri'
                                        fill="#E8C6F7"
                                    />)
                                }
                                <Image image={image}
                                       x={thermostat.x + 320 - 12}
                                       y={thermostat.y - 7}
                                       scale={{x: 0.6, y: 0.6}}/>
                            </Layer>
                        </Stage>
                    }
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
            <Modal active={modalActive} setActive={setModalActive}>
                <div className="modal-window-floor-type">
                    <h1 className="modal-title">Thermostat's capacity</h1>
                    <span className="modal-btn-close" onClick={handleModalClick}></span>
                    <div className="modal-ft-left-content-box-result"></div>
                    <div className="modal-ft-right-content-box">
                        <p className="modal-container-description">
                            The size of the heated area in your room is
                            <b> {Math.round(massGroup[5]*100)/100}</b> sq.m.
                            and exceeds the maximum capacity of the thermostat.</p>
                    <br/>
                        <p className="modal-container-description">
                            Maximum capacity is 42 sq.m. for unburnable subfloor (Veria Wireless Clickkit 55)
                            and 23 sq.m. for burnable subfloor (Veria Wireless Clickkit 100)</p>
                    <br/>
                        <p className="modal-container-description">
                            Please change room parameters or contact us for further support — <b>veriafloorheating.com</b>
                        </p>
                    </div>
                    <div className="modal-btn-ok" onClick={handleModalClick}>
                        ok
                    </div>
                </div>
            </Modal>
        </div>
    )
        ;
};

export default Result;


