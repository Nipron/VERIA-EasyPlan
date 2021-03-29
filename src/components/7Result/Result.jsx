import React from 'react';
import {useSelector} from "react-redux";
import Konva from 'konva';
import {Layer, Line, Stage, Image} from "react-konva";
import {matGroups} from "../../data/matGroups";


const Result = () => {

    let room = useSelector(state => state.room);
    let d = 4; //1 px = 2 cm;  d - minimum distance between wall and mat
    //r = room with bounds (d)
    let r = [room[0] + d, room[1] + d,
        room[2] - d, room[3] + d, room[4] - d, room[5] + d,
        room[6] - d, room[7] + d, room[8] - d, room[9] + d,
        room[10] - d, room[11] + d, room[12] - d, room[13] + d,
        room[14] - d, room[15] - d, room[16] - d, room[17] - d,
        room[18] - d, room[19] - d, room[20] - d, room[21] - d,
        room[22] - d, room[23] - d, room[24] - d, room[25] - d,
        room[26] + d, room[27] - d, room[28] + d, room[29] - d
    ]

    //const matGroups = [{x: 50, y: 10}, {x: 10, y: 50}]
    // let coldSpots = useSelector(state => state.coldSpots);

    const isPointInsideRoom = (x, y) => {
        if ((y > r[29]) && (y <= r[27])
            && (x <= r[0] + (y - r[29]) * (r[26] - r[28]) / (r[27] - r[29]))) {
            //   console.log("A")
            return false
        }
        if ((y >= r[3]) && (y < r[5])) {
            //   console.log("B")
            return ((x >= r[0]) && (x <= r[2] + (y - r[3]) * (r[4] - r[2]) / (r[5] - r[3])))
        }
        if ((y >= r[5]) && (y < r[7])) {
            //    console.log("C")
            return ((x >= r[0]) && (x <= r[6]))
        }
        if ((y >= r[7]) && (y < r[9])) {
            //    console.log("D")
            return ((x >= r[0]) && (x <= r[6] + (y - r[7]) * (r[8] - r[6]) / (r[9] - r[7])))
        }
        if ((y >= r[11]) && (y < r[13])) {
            //    console.log("E")
            return ((x >= r[0]) && (x <= r[10] + (y - r[11]) * (r[12] - r[10]) / (r[13] - r[11])))
        }
        if ((y >= r[13]) && (y < r[15])) {
            //    console.log("F")
            return ((x >= r[0]) && (x <= r[14]))
        }
        if ((y >= r[15]) && (y <= r[17])) {
            //    console.log("G")
            return ((x >= r[0]) && (x <= r[16] + (r[17] - y) * (r[14] - r[16]) / (r[17] - r[15])))
        }
        if ((y > r[19]) && (y <= r[21])) {
            //    console.log("H")
            return ((x >= r[0]) && (x <= r[20] + (r[21] - y) * (r[18] - r[20]) / (r[21] - r[19])))
        }
        if ((y > r[21]) && (y <= r[23])) {
            //   console.log("I")
            return ((x >= r[0]) && (x <= r[22]))
        }
        if ((y > r[23]) && (y <= r[25])) {
            //    console.log("J")
            return ((x >= r[0]) && (x <= r[24] + (r[25] - y) * (r[22] - r[24]) / (r[25] - r[23])))
        }
        //  console.log("K")
        return false;
    }

    const isGroupInsideRoom = (groupX0, groupY0, group) =>
        isPointInsideRoom(groupX0, groupY0)
        && isPointInsideRoom(groupX0 + group.w, groupY0)
        && isPointInsideRoom(groupX0 + group.w, groupY0 + group.h)
        && isPointInsideRoom(groupX0, groupY0 + group.h)

    const isCSCornerInsideGroup = (cX, cY, gX0, gY0, group) => (cX >= gX0) && (cX <= (gX0 + group.w)) && (cY >= gY0) && (cY <= (gY0 + group.h))

    const doesCSOverlapGroup = (CS, gX0, gY0, group) => isCSCornerInsideGroup(CS[0], CS[1], gX0, gY0, group)
        || isCSCornerInsideGroup(CS[2], CS[3], gX0, gY0, group)
        || isCSCornerInsideGroup(CS[4], CS[5], gX0, gY0, group)
        || isCSCornerInsideGroup(CS[6], CS[7], gX0, gY0, group)
        || isCSCornerInsideGroup(gX0, gY0, CS[0], CS[1], {w: CS[2] - CS[0], h: CS[7] - CS[1]})
        || isCSCornerInsideGroup(gX0 + group.w, gY0, CS[0], CS[1], {w: CS[2] - CS[0], h: CS[7] - CS[1]})
        || isCSCornerInsideGroup(gX0 + group.w, gY0 + group.h, CS[0], CS[1], {w: CS[2] - CS[0], h: CS[7] - CS[1]})
        || isCSCornerInsideGroup(gX0, gY0 + group.h, CS[0], CS[1], {w: CS[2] - CS[0], h: CS[7] - CS[1]})
        || ((CS[0] <= gX0) && (CS[2] >= gX0 + group.w) && (CS[1] >= gY0) && (CS[7] <= gY0 + group.h))
        || ((CS[0] >= gX0) && (CS[2] <= gX0 + group.w) && (CS[1] <= gY0) && (CS[7] >= gY0 + group.h))

    const doesAnyCSOverlapGroup = (CSarray, gX0, gY0, group) => {
        let overlap = false;
        for (let i = 0; i < CSarray.length; i++) {
            overlap = overlap || doesCSOverlapGroup(CSarray[i], gX0, gY0, group)
        }
        return overlap
    }

    const CS1 = [10, 240, 70, 240, 70, 290, 10, 290]
    const CS2 = [380, 120, 440, 120, 440, 160, 380, 160]
    const CS3 = [180, 120, 300, 120, 300, 240, 180, 240]

    let coldSpots = [CS1, CS2];

    //let middlemanMats =

    let calcAll = (mats) => {
        let all = []
        let cuts = [];
        let mamats = [];
        let matGroups = [...mats];
        let spots = [...coldSpots]
        for (let k = 0; k < matGroups.length; k++) {
            for (let i = 0; i < r[12]; i += 5) {
                for (let j = 0; j < r[25]; j += 5) {
                    if ((isGroupInsideRoom(i, j, matGroups[k])) && (!doesAnyCSOverlapGroup(spots, i, j, matGroups[k]))) {
                        let groupOK = [i, j, i + matGroups[k].w, j, i + matGroups[k].w, j + matGroups[k].h, i, j + matGroups[k].h];
                        spots.push([i + 1, j + 1, i + matGroups[k].w - 1, j + 1, i + matGroups[k].w - 1, j + matGroups[k].h - 1, i + 1, j + matGroups[k].h - 1])
console.log(matGroups[k].repeat)
                        if (matGroups[k].repeat === "repeat-x") {
                            cuts.push([i, j - 12, i + matGroups[k].w, j - 12, i + matGroups[k].w, j + matGroups[k].h + 12, i, j + matGroups[k].h + 12])
                        }
                        if (matGroups[k].repeat === "repeat-y") {
                            cuts.push([i - 12, j, i + matGroups[k].w + 12, j, i + matGroups[k].w + 12, j + matGroups[k].h, i - 12, j + matGroups[k].h])
                        }

                        all.push(groupOK)
                        mamats.push({
                            group: matGroups[k],
                            x: i, y: j,
                            points: groupOK
                        })
                    }

                }
            }
        }
        return [all, cuts, mamats]
    }

    let superMats = calcAll(matGroups);
    console.log(superMats[2])

    /* const calc = () => {
         matGroups.forEach(matGroup => {

         })
         return 5;
     }*/

    //let a = calc();

    let roomToFormula = [];

    room.forEach((x, i) => {
        if (i % 2 === 0) {
            roomToFormula.push([]);
            roomToFormula[i / 2].push(x * 0.02)
        } else {
            roomToFormula[(i - 1) / 2].push(x * 0.02)
        }
    })

    /* let coldSpotToFormula = [[], [], [], []];
     coldSpot.forEach((x, i) => {
         if (i % 2 === 0) {
             coldSpotToFormula[i / 2].push(x * 0.02)} else {
             coldSpotToFormula[(i - 1) / 2].push(x * 0.02)
         }
     })*/


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
                                superMats[1].map(cut => <Line
                                    x={320}
                                    y={0}
                                    points={cut}
                                    closed
                                    stroke="#868686"
                                    strokeWidth={1}
                                    fill={"pink"}
                                />)
                            }
                            {
                                superMats[2].map(mat => {
                                    const image = new window.Image();
                                    image.src = mat.group.img;
                                    return <Line
                                        x={320}
                                        y={0}
                                        points={mat.points}
                                        closed
                                        stroke="#868686"
                                        strokeWidth={1}
                                        fillPatternImage={image}
                                        fillPatternX={mat.x}
                                        fillPatternY={mat.y}
                                        fillPatternScale={{x: 1, y: 1}}
                                        fillPatternRepeat={mat.repeat}
                                    />
                                })
                            }
                            {
                                coldSpots.map(spot => <Line
                                    x={320}
                                    y={0}
                                    points={spot}
                                    closed
                                    stroke="#868686"
                                    strokeWidth={2}
                                    fill={"white"}
                                />)
                            }
                            { /*  <Line
                                x={320}
                                y={0}
                                points={CS3}
                                closed
                                stroke="#868686"
                                strokeWidth={2}
                                fillPatternImage={image}
                                fillPatternX={CS3[0]}
                                fillPatternY={CS3[1]}
                                fillPatternScale={{x:1, y:1}}
                                fillPatternRepeat="no-repeat"
                            />*/}
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
