import React, {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Document, Page, PDFDownloadLink, StyleSheet, View, Image as PDFImage, Text} from '@react-pdf/renderer';
import Konva from 'konva';
import {Layer, Line, Stage, Image} from "react-konva";
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

const ThermostatImage = () => {
    const [image] = useImage(thermoImg);
    return <Image image={image}/>
};

const Result = () => {

    const dispatch = useDispatch();

    const buttons = useSelector(state => state.buttons);
    const room = useSelector(state => state.room);
    const spotsArray = useSelector(state => state.points);
    const thermostat = useSelector(state => state.thermostat);
    const thermoOut = [thermostat.x, thermostat.y]

    const [image] = useImage(thermoImg);

    const d = 0; //1 px = 2 cm;  d - minimum distance between wall and mat
    const d2 = 4; //1 px = 2 cm;  d - minimum distance between wall and mat

    const R = [[room[0] + d, room[1] + d],
        [room[2] - d, room[3] + d], [room[4] - d, room[5] + d],
        [room[6] - d, room[7] + d], [room[8] - d, room[9] + d],
        [room[10] - d, room[11] + d], [room[12] - d, room[13] + d],
        [room[14] - d, room[15] - d], [room[16] - d, room[17] - d],
        [room[18] - d, room[19] - d], [room[20] - d, room[21] - d],
        [room[22] - d, room[23] - d], [room[24] - d, room[25] - d],
        [room[26] + d, room[27] - d], [room[28] + d, room[29] - d]
    ]

    const isGroupInsideRoom = (groupX0, groupY0, group) =>
        pointInPolygon([groupX0, groupY0], R)
        && pointInPolygon([groupX0 + group.w, groupY0], R)
        && pointInPolygon([groupX0 + group.w, groupY0 + group.h], R)
        && pointInPolygon([groupX0, groupY0 + group.h], R)

    // Cold Spot inside Group and vice versa
    const YinYang = (CS, gX0, gY0, group) =>
        pointInPolygon([gX0, gY0], [[CS[0], CS[1]], [CS[2], CS[3]], [CS[4], CS[5]], [CS[6], CS[7]]])
        || pointInPolygon([gX0 + group.w, gY0], [[CS[0], CS[1]], [CS[2], CS[3]], [CS[4], CS[5]], [CS[6], CS[7]]])
        || pointInPolygon([gX0 + group.w, gY0 + group.h], [[CS[0], CS[1]], [CS[2], CS[3]], [CS[4], CS[5]], [CS[6], CS[7]]])
        || pointInPolygon([gX0, gY0 + group.h], [[CS[0], CS[1]], [CS[2], CS[3]], [CS[4], CS[5]], [CS[6], CS[7]]])
        || pointInPolygon([CS[0], CS[1]], [[gX0, gY0], [gX0 + group.w, gY0], [gX0 + group.w, gY0 + group.h], [gX0, gY0 + group.h]])
        || pointInPolygon([CS[2], CS[3]], [[gX0, gY0], [gX0 + group.w, gY0], [gX0 + group.w, gY0 + group.h], [gX0, gY0 + group.h]])
        || pointInPolygon([CS[4], CS[5]], [[gX0, gY0], [gX0 + group.w, gY0], [gX0 + group.w, gY0 + group.h], [gX0, gY0 + group.h]])
        || pointInPolygon([CS[6], CS[7]], [[gX0, gY0], [gX0 + group.w, gY0], [gX0 + group.w, gY0 + group.h], [gX0, gY0 + group.h]])

    // Intersection of two line segments
    const lSI = (x1, y1, x2, y2, x3, y3, x4, y4) => {
        let a_dx = x2 - x1;
        let a_dy = y2 - y1;
        let b_dx = x4 - x3;
        let b_dy = y4 - y3;
        let s = (-a_dy * (x1 - x3) + a_dx * (y1 - y3)) / (-b_dx * a_dy + a_dx * b_dy);
        let t = (+b_dx * (y1 - y3) - b_dy * (x1 - x3)) / (-b_dx * a_dy + a_dx * b_dy);
        return (s >= 0 && s <= 1 && t >= 0 && t <= 1);
    }

    const doesOneGroupSideIntersectCS = (CS, x1, y1, x2, y2) => lSI(CS[0], CS[1], CS[2], CS[3], x1, y1, x2, y2)
        || lSI(CS[2], CS[3], CS[4], CS[5], x1, y1, x2, y2)
        || lSI(CS[4], CS[5], CS[6], CS[7], x1, y1, x2, y2)
        || lSI(CS[6], CS[7], CS[0], CS[1], x1, y1, x2, y2)

    const doCSandGroupIntersect = (CS, gX0, gY0, group) => doesOneGroupSideIntersectCS(CS, gX0, gY0, gX0 + group.w, gY0)
        || doesOneGroupSideIntersectCS(CS, gX0 + group.w, gY0, gX0 + group.w, gY0 + group.h)
        || doesOneGroupSideIntersectCS(CS, gX0 + group.w, gY0 + group.h, gX0, gY0 + group.h)
        || doesOneGroupSideIntersectCS(CS, gX0, gY0 + group.h, gX0, gY0)

    const doesAnyCSOverlapGroup = (CSarray, gX0, gY0, group) => {
        let overlap = false;
        for (let i = 0; i < CSarray.length; i++) {
            overlap = overlap
                || YinYang(CSarray[i], gX0, gY0, group)
                || doCSandGroupIntersect(CSarray[i], gX0, gY0, group)
        }
        return overlap
    }

    const findGroups = (groups) => {
        let cuts = [];
        let mats = [{
            group: {}, x: thermostat.x, y: thermostat.y,
            inM: thermoOut,
            outF: thermoOut,
            points: []
        }];
        let spots = [...spotsArray];
        for (let k = 0; k < groups.length; k++) {
            for (let i = 0; i < R[7][0]; i += 4) {
                for (let j = 0; j < R[13][1]; j += 4) {
                    let gB = {} //group with bounds increased due to connectors
                    if (groups[k].repeat === "repeat-x") {
                        gB = {...groups[k], w: groups[k].w + 2 * d2}
                    }
                    if (groups[k].repeat === "repeat-y") {
                        gB = {...groups[k], h: groups[k].h + 2 * d2}
                    }
                    if (
                        (((gB.repeat === "repeat-x") && (isGroupInsideRoom(i - d2, j, gB)))
                            || ((gB.repeat === "repeat-y") && (isGroupInsideRoom(i, j - d2, gB)))
                        ) && (
                            ((gB.repeat === "repeat-x") && (!doesAnyCSOverlapGroup(spots, i - d2, j, gB))) ||
                            ((gB.repeat === "repeat-y") && (!doesAnyCSOverlapGroup(spots, i, j - d2, gB)))
                        )
                    ) {
                        let groupOK = [i, j, i + groups[k].w, j, i + groups[k].w, j + groups[k].h, i, j + groups[k].h];
                        let inM = [];
                        let outF = [];
                        let inMz = []; //alternative for 180 rotation
                        let outFz = []; //alternative for 180 rotation
                        if (groups[k].repeat === "repeat-x") {

                            //top cut
                            for (let q = 12; q > 0; q--) {
                                if (pointInPolygon([i, j - q], R) && pointInPolygon([i + groups[k].w, j - q], R)) {
                                    cuts.push([i, j - q, i + groups[k].w, j - q, i + groups[k].w, j, i, j]);
                                    break;
                                }
                            }
                            //bottom cut
                            for (let q = 12; q > 0; q--) {
                                if (pointInPolygon([i, j + groups[k].h + q], R) && pointInPolygon([i + groups[k].w, j + groups[k].h + q], R)) {
                                    cuts.push([i, j + groups[k].h, i + groups[k].w, j + groups[k].h, i + groups[k].w, j + groups[k].h + q, i, j + groups[k].h + q]);
                                    break;
                                }
                            }

                            spots.push([i + 1 - d2, j + 1, i + groups[k].w - 1 + d2, j + 1, i + groups[k].w - 1 + d2, j + groups[k].h - 1, i + 1 - d2, j + groups[k].h - 1]);
                            inM = [i + groups[k].w + 3, j + 6];
                            outF = [i - 3, j + 6];
                            inMz = [i - 3, j + groups[k].h - 6];
                            outFz = [i + groups[k].w + 3, j + groups[k].h - 6];
                        }
                        if (groups[k].repeat === "repeat-y") {

                            //left cut
                            for (let q = 12; q > 0; q--) {
                                if (pointInPolygon([i - q, j], R) && pointInPolygon([i - q, j + groups[k].h], R)) {
                                    cuts.push([i - q, j, i, j, i, j + groups[k].h, i - q, j + groups[k].h])
                                    break;
                                }
                            }
                            //right cut
                            for (let q = 12; q > 0; q--) {
                                if (pointInPolygon([i + groups[k].w + q, j], R) && pointInPolygon([i + groups[k].w + q, j + groups[k].h], R)) {
                                    cuts.push([i + groups[k].w, j, i + groups[k].w + q, j, i + groups[k].w + q, j + groups[k].h, i + groups[k].w, j + groups[k].h])
                                    break;
                                }
                            }


                            // cuts.push([i - 12, j, i + groups[k].w + 12, j, i + groups[k].w + 12, j + groups[k].h, i - 9, j + groups[k].h])


                            spots.push([i + 1, j + 1 - d2, i + groups[k].w - 1, j + 1 - d2, i + groups[k].w - 1, j + groups[k].h - 1 + d2, i + 1, j + groups[k].h - 1 + d2]);
                            inM = [i + groups[k].w - 6, j + groups[k].h + 3];
                            outF = [i + groups[k].w - 6, j - 3];
                            inMz = [i + 6, j - 3];
                            outFz = [i + 6, j + groups[k].h + 3];
                        }
                        mats.push({
                            group: groups[k], x: i, y: j,
                            points: groupOK,
                            inM,
                            outF,
                            inMz,
                            outFz,
                            straight: true
                        })
                    }

                }
            }
        }

        return [cuts, mats]
    }

    const superMats = findGroups(matGroups);

    const theMats = superMats[1]

    let chineseWalls = [];  //array of all walls
    //first we push all room walls
    for (let i = 0; i < room.length / 2 - 1; i++) {
        if ((i === 2) || (i === 3) || (i === 4) || (i === 8) || (i === 9) || (i === 10))
            chineseWalls.push({xS: room[2 * i], yS: room[2 * i + 1], xF: room[2 * i + 2], yF: room[2 * i + 3]})
    }
    //second we push all mats
    for (let i = 1; i < theMats.length; i++) {
        chineseWalls.push({xS: theMats[i].x, yS: theMats[i].y, xF: theMats[i].x + theMats[i].group.w, yF: theMats[i].y})
        chineseWalls.push({
            xS: theMats[i].x + theMats[i].group.w,
            yS: theMats[i].y,
            xF: theMats[i].x + theMats[i].group.w,
            yF: theMats[i].y + theMats[i].group.h
        })
        chineseWalls.push({
            xS: theMats[i].x + theMats[i].group.w,
            yS: theMats[i].y + theMats[i].group.h,
            xF: theMats[i].x,
            yF: theMats[i].y + theMats[i].group.h
        })
        chineseWalls.push({xS: theMats[i].x, yS: theMats[i].y + theMats[i].group.h, xF: theMats[i].x, yF: theMats[i].y})
    }
    //third we push all cold spots
    for (let i = 0; i < spotsArray.length; i++) {
        chineseWalls.push({xS: spotsArray[i][0], yS: spotsArray[i][1], xF: spotsArray[i][2], yF: spotsArray[i][3]})
        chineseWalls.push({xS: spotsArray[i][2], yS: spotsArray[i][3], xF: spotsArray[i][4], yF: spotsArray[i][5]})
        chineseWalls.push({xS: spotsArray[i][4], yS: spotsArray[i][5], xF: spotsArray[i][6], yF: spotsArray[i][7]})
        chineseWalls.push({xS: spotsArray[i][6], yS: spotsArray[i][7], xF: spotsArray[i][0], yF: spotsArray[i][7]})
    }

    const sortedWires = (arr, walls) => {
        for (let i = 0; i < arr.length; i++) {
            for (let j = 0; j < arr.length - 1 - i; j++) {

                let path = pathLength(PathFinder({x: arr[i].outF[0], y: arr[i].outF[1]}, {
                    x: arr[i + 1].inM[0],
                    y: arr[i + 1].inM[1]
                }, walls))
                let pathZ = pathLength(PathFinder({x: arr[i].outF[0], y: arr[i].outF[1]}, {
                    x: arr[i + 1].inMz[0],
                    y: arr[i + 1].inMz[1]
                }, walls))
                let pathNext = pathLength(PathFinder({x: arr[i].outF[0], y: arr[i].outF[1]}, {
                    x: arr[i + 1 + j].inM[0],
                    y: arr[i + 1 + j].inM[1]
                }, walls))
                let pathNextZ = pathLength(PathFinder({x: arr[i].outF[0], y: arr[i].outF[1]}, {
                    x: arr[i + 1 + j].inMz[0],
                    y: arr[i + 1 + j].inMz[1]
                }, walls))

                if (path > pathZ) {
                    let tempM = arr[i + 1].inM;
                    let tempF = arr[i + 1].outF;
                    arr[i + 1].inM = arr[i + 1].inMz;
                    arr[i + 1].outF = arr[i + 1].outFz;
                    arr[i + 1].inMz = tempM;
                    arr[i + 1].outFz = tempF;
                    arr[i + 1].straight = !arr[i + 1].straight
                }

                if (pathNext > pathNextZ) {
                    let tempM = arr[i + 1 + j].inM;
                    let tempF = arr[i + 1 + j].outF;
                    arr[i + 1 + j].inM = arr[i + 1 + j].inMz;
                    arr[i + 1 + j].outF = arr[i + 1 + j].outFz;
                    arr[i + 1 + j].inMz = tempM;
                    arr[i + 1 + j].outFz = tempF;
                    arr[i + 1 + j].straight = !arr[i + 1 + j].straight
                }

                if (path > pathNext) {
                    let temp = arr[i + 1];
                    arr[i + 1] = arr[i + 1 + j];
                    arr[i + 1 + j] = temp;
                }


            }
        }
        return arr;
    }

    const wiresToLines = (arr) => {
        let wiresB = []
        for (let i = 0; i < arr.length - 1; i++) {
            wiresB.push([arr[i].outF[0], arr[i].outF[1], arr[i + 1].inM[0], arr[i + 1].inM[1]])
        }
        return wiresB;
    }

    // console.log(sortedWires(theMats, chineseWalls))

    const wires = wiresToLines(sortedWires(theMats, chineseWalls))

    const justWires = sortedWires(theMats)

    // console.log(justWires)

    let pStart = {x: 130, y: 10}
    let pFinish = {x: 140, y: 10}

    //  let cord = PathFinder(pStart, pFinish, chineseWalls)

    //  console.log(chineseWalls)
    //  console.log(wires)
    //   console.log(cord)

    let superCords = []

    for (let i = 0; i < wires.length; i++) {
        let cord = PathFinder({x: wires[i][0], y: wires[i][1]}, {x: wires[i][2], y: wires[i][3]}, chineseWalls)
        superCords.push([])
        for (let j = 0; j < cord.length; j++) {
            superCords[i].push(cord[j].x)
            superCords[i].push(cord[j].y)
        }
    }

    //  console.log(wires)

    // console.log(PathFinder({x: wires[2][0], y:  wires[2][1]}, {x: wires[2][2], y:  wires[2][3]}, chineseWalls))
    //  console.log(PathFinder({x: 152, y:  2}, {x:2, y:  220}, chineseWalls))

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
            })
        ;

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

    /*  useEffect(() => {
         const dataURL = stageRef.current.toDataURL({
              pixelRatio: 0.5
          });
          setIm(dataURL)
      }, []);*/

    if (!buttons[7]) return <Redirect to="/"/>

    // const [letDraw, setLetDraw] = useState(false)

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
                                superMats[0].map(cut => <Line
                                    x={320}
                                    y={0}
                                    points={cut}
                                    closed
                                    stroke="#868686"
                                    strokeWidth={0}
                                    fill="#FF6D6D"
                                />)
                            }
                            {
                                superMats[1].map(mat => {
                                    let image = new window.Image();
                                    let imageAlt = new window.Image();

                                    image.src = mat.group.img;
                                    //image.onload = () => setImageZ(image)

                                    imageAlt.src = mat.group.imgAlt;

                                    return <Line
                                        x={320}
                                        y={0}
                                        points={mat.points}
                                        closed
                                        // stroke="#6F6F6F"
                                        // strokeWidth={1}
                                        // fill="#FF3F3F"
                                        fillPatternImage={mat.straight ? image : imageAlt}
                                        fillPatternX={mat.x}
                                        fillPatternY={mat.y}
                                        fillPatternScale={{x: 1, y: 1}}
                                        fillPatternRepeat={mat.repeat}
                                    />
                                })
                            }
                            {
                                spotsArray.map(spot => <Line
                                    x={320}
                                    y={0}
                                    points={spot}
                                    closed
                                    stroke="#868686"
                                    strokeWidth={2}
                                    fill={"white"}
                                />)
                            }
                        </Layer>
                        <Layer name="main-layer">
                            <Line
                                x={320}
                                y={2}
                                points={room}
                                closed
                                stroke="#868686"
                                strokeWidth={2}
                            />
                        </Layer>
                        <Layer>
                            {
                                superCords.map(wire => {
                                    return <Line
                                        x={320}
                                        y={0}
                                        points={wire}
                                        stroke="black"
                                        strokeWidth={2}
                                    />
                                })
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
                        <div className="btn-print-project" onMouseEnter={handleEnter}>
                            {pdfLink}
                        </div>
                        {/* <div className="btn-print-project" onMouseEnter={handleEnter}>
                            <NewPDF/>
                        </div>*/}
                    </div>
                </div>
            </div>
            <ModalPartsList active={modalPartsActive} setActive={setModalPartsActive} list={listOfParts}/>
        </div>
    );
};

export default Result;


