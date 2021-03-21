import React from 'react';
import {useSelector} from "react-redux";
import {Layer, Line, Stage} from "react-konva";
import {floorMatCalculator} from "../../calculator/calculator";

const Result = () => {

    let room = useSelector(state => state.room);
    let coldSpot = useSelector(state => state.coldSpot);

    let roomToFormula = [[], [], [], [], [], [], [], []];
    room.forEach((x, i) => {
        if (i % 2 === 0) {
            roomToFormula[i / 2].push(x * 0.02)
        } else {
            roomToFormula[(i - 1) / 2].push(x * 0.02)
        }
    })

    let coldSpotToFormula = [[], [], [], []];
    coldSpot.forEach((x, i) => {
        if (i % 2 === 0) {
            coldSpotToFormula[i / 2].push((x - 300) * 0.02)
        } else {
            coldSpotToFormula[(i - 1) / 2].push(x * 0.02)
        }
    })
    console.log(coldSpotToFormula)

    let mats = floorMatCalculator(roomToFormula, [coldSpotToFormula, coldSpotToFormula])
    let SuperMats = []

    const matGroups = Object.values(mats)

    matGroups.forEach(group => {
        if (group.length > 0) {
            group.forEach(x => {
                if (x.length > 0) {
                    SuperMats.push([x[0][0][0] * 50, x[0][0][1] * 50,
                        x[0][1][0] * 50, x[0][1][1] * 50,
                        x[0][2][0] * 50, x[0][2][1] * 50,
                        x[0][3][0] * 50, x[0][3][1] * 50])
                }
            })
        }
    })

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
                                strokeWidth={5}
                                fill="yellow"
                            />
                        </Layer>
                        <Layer name="chair01">
                            <Line
                                x={0}
                                y={0}
                                points={coldSpot}
                                closed
                                stroke="#868686"
                                strokeWidth={2}
                                fill={"green"}
                            />
                            {
                                SuperMats.map(mat => <Line
                                    x={320}
                                    y={0}
                                    points={mat
                                    }
                                    closed
                                    stroke="#868686"
                                    strokeWidth={2}
                                    fill={"brown"}
                                />)
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
