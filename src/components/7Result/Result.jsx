import React from 'react';
import {useSelector} from "react-redux";
import Konva from 'konva';
import {Layer, Line, Stage, Image} from "react-konva";
import {matGroups} from "../../data/matGroups";
import pointInPolygon from 'point-in-polygon';

const Result = () => {

    const room = useSelector(state => state.room);
    const spotsArray = useSelector(state => state.points);

    const d = 4; //1 px = 2 cm;  d - minimum distance between wall and mat

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
            group: {}, x: 0, y: 0,
            inM: [0, 0],
            outF: [0, 0],
            points: []
        }];
        let spots = [...spotsArray];
        let wires = [{in: [0, 0], out: [0, 0]}];
        for (let k = 0; k < groups.length; k++) {
            for (let i = 4; i < R[7][0]; i += 5) {
                for (let j = 4; j < R[13][1]; j += 5) {
                    if ((isGroupInsideRoom(i, j, groups[k])) && (!doesAnyCSOverlapGroup(spots, i, j, groups[k]))) {
                        let groupOK = [i, j, i + groups[k].w, j, i + groups[k].w, j + groups[k].h, i, j + groups[k].h];
                        spots.push([i + 1, j + 1, i + groups[k].w - 1, j + 1, i + groups[k].w - 1, j + groups[k].h - 1, i + 1, j + groups[k].h - 1]);
                        let inM = [];
                        let outF = [];
                        let inMz = []; //alternative for 180 rotation
                        let outFz = []; //alternative for 180 rotation
                        if (groups[k].repeat === "repeat-x") {
                            cuts.push([i, j - 12, i + groups[k].w, j - 12, i + groups[k].w, j + groups[k].h + 12, i, j + groups[k].h + 12]);
                            wires.push({in: [i, j], out: [i + groups[k].w, j]})
                            inM = [i + groups[k].w, j + 6];
                            outF = [i, j + 6];
                            inMz = [i, j + groups[k].h - 6];
                            outFz = [i + groups[k].w, j + groups[k].h - 6];
                        }
                        if (groups[k].repeat === "repeat-y") {
                            cuts.push([i - 12, j, i + groups[k].w + 12, j, i + groups[k].w + 12, j + groups[k].h, i - 12, j + groups[k].h])
                            wires.push({in: [i + groups[k].w, j], out: [i + groups[k].w, j + groups[k].h]})
                            inM = [i + groups[k].w - 6, j + groups[k].h];
                            outF = [i + groups[k].w - 6, j];
                            inMz = [i + 6, j];
                            outFz = [i + 6, j + groups[k].h];
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
        return [cuts, mats, wires]
    }

    const superMats = findGroups(matGroups);

    const theMats = superMats[1]

    const sortedWires = (arr) => {
        for (let i = 0; i < arr.length - 1; i++) {
            for (let j = 1; j < arr.length - 1 - i; j++) {

                if (Math.sqrt(Math.pow(arr[i].outF[0] - arr[i + 1].inM[0], 2)
                    + Math.pow(arr[i].outF[1] - arr[i + 1].inM[1], 2)) >
                    (Math.sqrt(Math.pow(arr[i].outF[0] - arr[i + 1].inMz[0], 2)
                        + Math.pow(arr[i].outF[1] - arr[i + 1].inMz[1], 2)))) {
                    let tempM = arr[i + 1].inM;
                    let tempF = arr[i + 1].outF;
                    arr[i + 1].inM = arr[i + 1].inMz;
                    arr[i + 1].outF = arr[i + 1].outFz;
                    arr[i + 1].inMz = tempM;
                    arr[i + 1].outFz = tempF;
                    arr[i + 1].straight = !arr[i + 1].straight
                }

                if (Math.sqrt(Math.pow(arr[i].outF[0] - arr[i + 1 + j].inM[0], 2)
                    + Math.pow(arr[i].outF[1] - arr[i + 1 + j].inM[1], 2)) >
                    (Math.sqrt(Math.pow(arr[i].outF[0] - arr[i + 1 + j].inMz[0], 2)
                        + Math.pow(arr[i].outF[1] - arr[i + 1 + j].inMz[1], 2)))) {
                    let tempM = arr[i + 1 + j].inM;
                    let tempF = arr[i + 1 + j].outF;
                    arr[i + 1 + j].inM = arr[i + 1 + j].inMz;
                    arr[i + 1 + j].outF = arr[i + 1 + j].outFz;
                    arr[i + 1 + j].inMz = tempM;
                    arr[i + 1 + j].outFz = tempF;
                    arr[i + 1 + j].straight = !arr[i + 1 + j].straight
                }

                if (Math.sqrt(Math.pow(arr[i].outF[0] - arr[i + 1].inM[0], 2)
                    + Math.pow(arr[i].outF[1] - arr[i + 1].inM[1], 2)) >
                    Math.sqrt(Math.pow(arr[i].outF[0] - arr[i + 1 + j].inM[0], 2)
                        + Math.pow(arr[i].outF[1] - arr[i + 1 + j].inM[1], 2))) {
                    let temp = arr[i + 1];
                    arr[i + 1] = arr[i + 1 + j];
                    arr[i + 1 + j] = temp;
                }
            }
        }
        return arr;
    }

    const wiresToLines = (arr) => {
        let wires = []
        for (let i = 0; i < arr.length - 1; i++) {
            wires.push([arr[i].outF[0], arr[i].outF[1], arr[i + 1].inM[0], arr[i + 1].inM[1]])
        }
        return wires;
    }

    const wires = wiresToLines(sortedWires(theMats))

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
                    <Stage width={1220} height={320}>
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
                                    strokeWidth={1}
                                    fill="#FF6D6D"
                                />)
                            }
                            {
                                superMats[1].map(mat => {
                                    const image = new window.Image();
                                    const imageAlt = new window.Image();

                                    image.src = mat.group.img;
                                    imageAlt.src = mat.group.imgAlt;
                                    return <Line
                                        x={320}
                                        y={0}
                                        points={mat.points}
                                        closed
                                        stroke="white"
                                        strokeWidth={0}
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
                            {
                                wires.map(mat => {
                                    return <Line
                                        x={320}
                                        y={0}
                                        points={mat}
                                        closed
                                        stroke="yellow"
                                        strokeWidth={2}
                                    />
                                })
                            }
                        </Layer>
                    </Stage>

                    {/*<span className="calculation-process">Calculation Project...</span>
                    <span className="printing-project">Printing Project...</span>
                    <span className="calculation-complete">Calculation complete</span>*/}
                    <div className="block-button">
                        <div className="btn-notes-loading">Add Notes</div>
                        <div className="btn-list-loading">List of Parts / Where to Buy</div>
                        <div className="btn-print-project-loading"><a href="#">Print Project</a></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Result;
