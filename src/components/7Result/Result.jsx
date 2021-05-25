import React, {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Document, Page, PDFDownloadLink, StyleSheet, View, Image as PDFImage, Text, pdf} from '@react-pdf/renderer';
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
import {updateButton} from "../../redux/buttonsReducer";
import {cordCalc, cords} from "../../calculator/superSnake";
import {roomArea} from "../../calculator/helpers";
import PDF3 from "../PDF/PDF";
import {saveAs} from 'file-saver';

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
    const massGroup = useSelector(state => state.result)

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
    let list = []
    const listOfParts = {
        "mat5_55": 0,
        "mat4_55": 0,
        "mat3_55": 0,
        "mat2_55": 0,
        "mat5_100": 0,
        "mat4_100": 0,
        "mat3_100": 0,
        "mat2_100": 0,
        "cord2": 0,
        "cord1": 0,
        "cord025": 0,
        "kit100": 0,
        "kit55": 0
    }

    if (massGroup[4]) {
        nestXX = nestToDraw(massGroup[1])
        list = massGroup[6]
        // area = roomArea(room)
        listOfParts.cord025 = list[4]
        listOfParts.cord1 = list[5]
        listOfParts.cord2 = list[6]
        if (massGroup[5] > 23) {
            listOfParts.mat2_55 = list[0]
            listOfParts.mat3_55 = list[1]
            listOfParts.mat4_55 = list[2]
            listOfParts.mat5_55 = list[3]
            listOfParts.kit55 = 1;
        } else {
            listOfParts.mat2_100 = list[0]
            listOfParts.mat3_100 = list[1]
            listOfParts.mat4_100 = list[2]
            listOfParts.mat5_100 = list[3]
            listOfParts.kit100 = 1;
        }
    }

    const [modalNotesActive, setModalNotesActive] = useState(false);
    const [modalPartsActive, setModalPartsActive] = useState(false); //shows modal only first time on page
    const stageRef = useRef();
    const [im, setIm] = useState(null)
    const [pdfLink, setPdfLink] = useState("Creating PDF...")

    const handleEnter = async (event) => {
        let dataURL = "";
        if (massGroup[4]) {
            dataURL = stageRef.current.toDataURL({
                pixelRatio: 4
            });
        }

        const styles = StyleSheet.create({
            page: {
                flexDirection: 'column',
                backgroundColor: 'white'
            },
            section: {
                margin: 10,
                padding: 10,
                marginTop: 0,
                marginBottom: 0
            },
            sectionGrey: {
                margin: 20,
                marginTop: 0,
                marginBottom: 0,
                padding: 15,
                backgroundColor: "#DCDCDC",
                borderRadius: 7
            },
            disclaimer: {
                margin: 20,
                marginTop: 0,
                marginBottom: 0,
                padding: 15,
                bottom: 0
            }
        });
        let area = roomArea(room);
        let heatedArea = massGroup[5];
        const PDF2 = () => {
            return (
                <Document>
                    <Page size="A4" style={styles.page}>
                        <View style={styles.section}>
                            <PDFImage src={veria}/>
                        </View>
                        <View style={styles.sectionGrey}>
                            <Text>
                                Room area: {area.toFixed(2)} m&#178; Heated
                                area: {heatedArea.toFixed(2)} m&#178; ({(100 * heatedArea / area).toFixed(2)}% coverage)
                            </Text>
                            <Text>
                                Top Floor Covering: Laminate
                            </Text>
                            <Text>
                                Bottom Floor Construction: Unburnable (Concrete)
                            </Text>
                        </View>
                        <View style={styles.section}>
                            <PDFImage src={dataURL}/>
                        </View>
                        <View style={styles.sectionGrey}>
                            {(listOfParts.mat5_55 !== 0) && <Text>
                                {listOfParts.mat5_55} x Veria Clickmat 55, 5m&#178;
                            </Text>}
                            {(listOfParts.mat4_55 !== 0) && <Text>
                                {listOfParts.mat4_55} x Veria Clickmat 55, 4m&#178;
                            </Text>}
                            {(listOfParts.mat3_55 !== 0) && <Text>
                                {listOfParts.mat3_55} x Veria Clickmat 55, 3m&#178;
                            </Text>}
                            {(listOfParts.mat2_55 !== 0) && <Text>
                                {listOfParts.mat2_55} x Veria Clickmat 55, 2m&#178;
                            </Text>}
                            {(listOfParts.mat5_100 !== 0) && <Text>
                                {listOfParts.mat5_100} x Veria Clickmat 100, 5m&#178;
                            </Text>}
                            {(listOfParts.mat4_100 !== 0) && <Text>
                                {listOfParts.mat4_100} x Veria Clickmat 100, 4m&#178;
                            </Text>}
                            {(listOfParts.mat3_100 !== 0) && <Text>
                                {listOfParts.mat3_100} x Veria Clickmat 100, 3m&#178;
                            </Text>}
                            {(listOfParts.mat2_100 !== 0) && <Text>
                                {listOfParts.mat2_100} x Veria Clickmat 100, 2m&#178;
                            </Text>}
                            {(listOfParts.cord2 !== 0) && <Text>
                                {listOfParts.cord2} x Veria Clickmat extension cord, 2m
                            </Text>}
                            {(listOfParts.cord1 !== 0) && <Text>
                                {listOfParts.cord1} x Veria Clickmat extension cord, 1m
                            </Text>}
                            {(listOfParts.cord025 !== 0) && <Text>
                                {listOfParts.cord025} x Veria Clickmat extension cord, 0.25m
                            </Text>}
                            {(listOfParts.kit100 !== 0) && <Text>
                                {listOfParts.kit100} x Veria Wireless Clickkit 100
                            </Text>}
                            {(listOfParts.kit55 !== 0) && <Text>
                                {listOfParts.kit55} x Veria Wireless Clickkit 55
                            </Text>}
                        </View>
                        <View style={styles.disclaimer}>
                            <Text>
                                DISCLAMER: Please note that this is a computer genereted simulation.
                                Installations of products on site may vary.
                                Always be sure to carefully follow the instructions enclosed in the package.
                            </Text>
                            <Text>
                                Remember to buy Veria Fillermat (stock code 189B9134) to fill up areas of the floor which are not covered with heating mats. In this way a uniform base  layer for wooden floor is created.
                            </Text>
                            <Text>
                                Enjoy your new floor heating.
                            </Text>
                        </View>
                    </Page>
                </Document>
            );
        };

        setPdfLink(<PDFDownloadLink document={<PDF2/>} fileName="EasyPlan.pdf">
            {({blob, url, loading, error}) => (loading ? 'Creating PDF...' : 'Save as PDF')}
        </PDFDownloadLink>)
    }

    const generatePDFDocument = async () => {
        const blob = await pdf(
            <Document>
                <Page>// My document data</Page>
            </Document>
        ).toBlob();
        console.log("BLOB")
        console.log(blob);
        return blob;
    };

    generatePDFDocument().then(r => console.log(r));


    useEffect(() => {
        setModalActive(!massGroup[4])
        handleEnter();
        return () => {
        };
    }, []);

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

            <div className="content-section-grid">{massGroup[4] &&
                <div className="constructor-box">
                <Stage width={630} height={380} ref={stageRef}
                       x={5}
                       y={-12}>
                    <Layer name="main-layer">
                        <Line
                            x={10}
                            y={20}
                            points={room}
                            closed
                            stroke="#868686"
                            strokeWidth={2}
                            fillLinearGradientStartPoint={{x: -50, y: -50}}
                            fillLinearGradientEndPoint={{x: 250, y: 250}}
                            fill="lightgrey"
                            //fillLinearGradientColorStops={[0, 'white', 1, 'lightgrey']}
                        />
                        {
                            massGroup[7].map(tail => <Line
                                x={10}
                                y={20}
                                points={tail}
                                closed
                                stroke="#6E6E6E"
                                globalCompositeOperation="source-atop"
                                strokeWidth={2}
                                fill="#FA9393"
                            />)
                        }
                    </Layer>
                    <Layer name="result">
                        {
                            massGroup[0].map(tail => <Line
                                x={10}
                                y={20}
                                points={tail}
                                closed
                                stroke="#6E6E6E"
                                strokeWidth={2}
                                fill="#FF3F3F"
                            />)
                        }
                        {
                            spotsArray.map(spot => <Line
                                x={10}
                                y={20}
                                points={spot}
                                closed
                                stroke="#868686"
                                strokeWidth={2}
                                fill={"white"}
                            />)
                        }
                        {
                            massGroup[2].map(connector => <Line
                                x={10}
                                y={20}
                                points={connector}
                                closed
                                fill={"black"}
                            />)
                        }
                        {
                            massGroup[3].map(text => <KonvaText
                                x={text[0] + 10}
                                y={text[1] + 20}
                                text={text[2]}
                                fontSize={15}
                                fontFamily='Calibri'
                                //fill="#E8C6F7"
                                fill="black"
                            />)
                        }
                        <Line
                            x={10}
                            y={20}
                            points={room}
                            closed
                            stroke="#868686"
                            strokeWidth={2}
                            fillLinearGradientStartPoint={{x: -50, y: -50}}
                            fillLinearGradientEndPoint={{x: 250, y: 250}}
                            //fill="#F7C9C9"
                            //fillLinearGradientColorStops={[0, 'white', 1, 'lightgrey']}
                        />
                        {
                            nestXX.map(snake => <Line
                                x={10}
                                y={20}
                                points={snake}
                                // stroke="#9F35CC"
                                stroke="black"
                                strokeWidth={2}
                            />)
                        }
                        <Image image={image}
                               x={thermostat.x + 2}
                               y={thermostat.y + 13}
                               scale={{x: 0.6, y: 0.6}}/>
                    </Layer>
                </Stage>

                    <div className="block-button">
                        <div className="btn-notes">Add Notes</div>
                        <div className="btn-list"
                             onClick={() => setModalPartsActive(true)}>List of Parts / Where to Buy
                        </div>
                        <div className="btn-print-project" /*onMouseEnter={handleEnter}*/>
                            {pdfLink}
                        </div>
                    </div>
                </div>}
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
                            <b> {Math.round(massGroup[5] * 100) / 100}</b> sq.m.
                            and exceeds the maximum capacity of the thermostat.</p>
                        <br/>
                        <p className="modal-container-description">
                            The maximum capacity is 42 sq.m. for burnable subfloor (Veria Wireless Clickkit 55)
                            and 23 sq.m. for unburnable subfloor (Veria Wireless Clickkit 100)</p>
                        <br/>
                        <p className="modal-container-description">
                            Please change room parameters or contact us for further support
                            — <b>veriafloorheating.com</b>
                        </p>
                    </div>
                    <div className="modal-btn-ok" onClick={handleModalClick}>
                        ok
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default Result;


