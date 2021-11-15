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
import {useTranslation} from "react-i18next";
import i18n from "i18next";
import {MatFinder} from "./MatFinder";
import Preloader from "../Preloader/Preloader";

const ThermostatImage = () => {
    const [image] = useImage(thermoImg);
    return <Image image={image}/>
};

const Result = () => {

    const {t} = useTranslation();
    const dispatch = useDispatch();
    const [modalActive, setModalActive] = useState(false);
    const [modalLoading, setModalLoading] = useState(true);
    const buttons = useSelector(state => state.buttons);
    const room = useSelector(state => state.room);
    const spotsArray = useSelector(state => state.points);
    const thermostat = useSelector(state => state.thermostat);
    const thermoOut = [thermostat.x, thermostat.y]
    const [image] = useImage(thermoImg);
    const checks = useSelector(state => state.checks);

    const massGroup = MatFinder(spotsArray, room, thermoOut, checks.subBurnable)

  //  const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const loadingTimer = setTimeout(() => {
                setLoading(false);
            }, 4000);

        return () => clearTimeout(loadingTimer);
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
        if ((massGroup[5] > 23) || checks.subBurnable ) {
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
    const [pdfLink, setPdfLink] = useState(i18n.t("creating_pgf"))

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
                margin: 20,
                padding: 15,
                marginTop: 10,
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
                paddingTop: 10,
                paddingBottom: 0,
            },
            text1: {
                fontSize: 10
            },
            text2: {
                fontSize: 12
            },
            text16: {
                fontSize: 16
            },
            text20: {
                fontSize: 20
            },
            textBold: {
                fontWeight: 'bold'
            }

        });
        let area = roomArea(room);
        let heatedArea = massGroup[5];

        let topFloor = "";
        let subFloor = "";

        if (checks.topLaminate) {
            topFloor = i18n.t("laminate")
        } else {
            topFloor = i18n.t("parquet")
        }

        if (checks.subUnburnable) {
            subFloor = i18n.t("unburnable_pdf")
        } else {
            subFloor = i18n.t("burnable_pdf")
        }

        const PDF2 = () => {
            return (
                <Document>
                    <Page size="A4" style={styles.page}>
                        <View style={styles.section}>
                            <PDFImage src={veria}/>
                        </View>
                        <View style={styles.sectionGrey}>
                            <Text style={styles.text16}>
                                {i18n.t("room_area")} {area.toFixed(2)} m&#178;
                            </Text>
                            <Text style={styles.text16}>
                                {i18n.t("heated_area")} {heatedArea.toFixed(2)} m&#178;
                                ({(100 * heatedArea / area).toFixed(2)}% {i18n.t("coverage")})
                            </Text>
                            <Text style={styles.text16}>
                                {i18n.t("top_floor_pdf")} {topFloor}
                            </Text>
                            <Text style={styles.text16}>
                                {i18n.t("bottom_floor_pdf")} {subFloor}
                            </Text>
                        </View>
                        <View style={styles.section}>
                            <PDFImage src={dataURL}/>
                        </View>
                        <View style={styles.sectionGrey}>
                            {(listOfParts.mat5_55 !== 0) && <Text style={styles.text2}>
                                {listOfParts.mat5_55} x Veria Clickmat 55, 5m&#178; (189B9120)
                            </Text>}
                            {(listOfParts.mat4_55 !== 0) && <Text style={styles.text2}>
                                {listOfParts.mat4_55} x Veria Clickmat 55, 4m&#178; (189B9118)
                            </Text>}
                            {(listOfParts.mat3_55 !== 0) && <Text style={styles.text2}>
                                {listOfParts.mat3_55} x Veria Clickmat 55, 3m&#178; (189B9116)
                            </Text>}
                            {(listOfParts.mat2_55 !== 0) && <Text style={styles.text2}>
                                {listOfParts.mat2_55} x Veria Clickmat 55, 2m&#178; (189B9114)
                            </Text>}
                            {(listOfParts.mat5_100 !== 0) && <Text style={styles.text2}>
                                {listOfParts.mat5_100} x Veria Clickmat 100, 5m&#178; (189B9130)
                            </Text>}
                            {(listOfParts.mat4_100 !== 0) && <Text style={styles.text2}>
                                {listOfParts.mat4_100} x Veria Clickmat 100, 4m&#178; (189B9128)
                            </Text>}
                            {(listOfParts.mat3_100 !== 0) && <Text style={styles.text2}>
                                {listOfParts.mat3_100} x Veria Clickmat 100, 3m&#178; (189B9126)
                            </Text>}
                            {(listOfParts.mat2_100 !== 0) && <Text style={styles.text2}>
                                {listOfParts.mat2_100} x Veria Clickmat 100, 2m&#178; (189B9124)
                            </Text>}
                            {(listOfParts.cord2 !== 0) && <Text style={styles.text2}>
                                {listOfParts.cord2} x Veria Clickmat {i18n.t("extension_cord")}, 2m (189B9110)
                            </Text>}
                            {(listOfParts.cord1 !== 0) && <Text style={styles.text2}>
                                {listOfParts.cord1} x Veria Clickmat {i18n.t("extension_cord")}, 1m (189B9108)
                            </Text>}
                            {(listOfParts.cord025 !== 0) && <Text style={styles.text2}>
                                {listOfParts.cord025} x Veria Clickmat {i18n.t("extension_cord")}, 0.25m (189B9106)
                            </Text>}
                            {(listOfParts.kit100 !== 0) && <Text style={styles.text2}>
                                {listOfParts.kit100} x Veria {i18n.t("wireless_click_kit")} 100 (189B9105)
                            </Text>}
                            {(listOfParts.kit55 !== 0) && <Text style={styles.text2}>
                                {listOfParts.kit55} x Veria {i18n.t("wireless_click_kit")} 55 (189B9104)
                            </Text>}
                        </View>
                        <View style={styles.disclaimer}>
                            <Text style={styles.text1}>
                                {i18n.t("disclaimer")}
                            </Text>
                        </View>
                        <View style={styles.disclaimer}>
                            <Text style={styles.text1}>
                                {i18n.t("remember")}
                            </Text>
                        </View>
                        <View style={styles.section}>
                            <Text style={styles.text20}>
                                {i18n.t("enjoy")}
                            </Text>
                        </View>
                    </Page>
                </Document>
            );
        };

        setPdfLink(<PDFDownloadLink document={<PDF2/>} fileName="EasyPlan.pdf">
            {({blob, url, loading, error}) => (loading ? i18n.t("creating_pgf") : i18n.t("save_as_pdf"))}
        </PDFDownloadLink>)
    }

    const generatePDFDocument = async () => {
        const blob = await pdf(
            <Document>
                <Page>// My document data</Page>
            </Document>
        ).toBlob();
        return blob;
    };

    generatePDFDocument().then(r => console.log(r));


    useEffect(() => {
        setModalActive(!massGroup[4])
        handleEnter();
        return () => {
        };
    }, []);



   // if (loading) return <Preloader />

    if (!buttons[7]) return <Redirect to="/floortype"/>

    return (
        <div>
            <div className="info-section">
                <div>
                    <h2>{t("result")}</h2>
                    <p>
                        {t("result_text_p1")}<a href="https://www.veriafloorheating.com/" target="_blank"><b>veriafloorheating.com</b></a>
                        <br/>
                        {t("result_text_p2")}
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
                    {/*<div className="btn-notes">{t("add_notes")}</div>*/}
                    <div className="btn-list"
                         onClick={() => setModalPartsActive(true)}>{t("list_of_parts_where")}
                    </div>
                    <div className="btn-print-project" /*onMouseEnter={handleEnter}*/>
                        {pdfLink}
                    </div>
                </div>
            </div>}
            </div>
            <ModalPartsList active={modalPartsActive} setActive={setModalPartsActive} list={listOfParts}/>
            <Modal active={loading} setActive={setLoading}>
                <Preloader/>
            </Modal>
            <Modal active={modalActive} setActive={setModalActive}>
                <div className="modal-window-floor-type">
                    <h1 className="modal-title">{t("thermostats_capacity")}</h1>
                    <span className="modal-btn-close" onClick={handleModalClick}></span>
                    <div className="modal-ft-left-content-box-result"></div>
                    <div className="modal-ft-right-content-box">
                        <p className="modal-container-description">
                            {t("capacity_text1")}
                            <b> {Math.round(massGroup[5] * 100) / 100} m<sup>2</sup></b>
                            {t("capacity_text2")}</p>
                        <br/>
                        <p className="modal-container-description">
                            {t("capacity_text3")} 42 m<sup>2</sup> {t("capacity_text4")} (Veria {t("wireless_click_kit")} 55)
                            {t("capacity_text5")} 23 m<sup>2</sup> {t("capacity_text6")} (Veria {t("wireless_click_kit")} 100)</p>
                        <br/>
                        <p className="modal-container-description">
                            {t("capacity_text7")}
                            — <a href="https://www.veriafloorheating.com/" target="_blank"><b>veriafloorheating.com</b></a>
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


