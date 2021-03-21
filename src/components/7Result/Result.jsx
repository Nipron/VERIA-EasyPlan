import React from 'react';
import {useSelector} from "react-redux";
import {Layer, Line, Stage} from "react-konva";
import {floorMatCalculator} from "../../calculator/calculator";
import * as geometric from "geometric";

const Result = () => {

    let calc = (polygonCoordinates, coldSpotCoordinates) => {

        var coldSpotIndividualPoints = []
        for (var i = 0; i < coldSpotCoordinates.length; i++) {
            coldSpotIndividualPoints.push(...coldSpotCoordinates[i])
        }
        var polyXCoordinates = []
        var polyYCoordinates = []
        for (var i = 0; i < polygonCoordinates.length; i++) {
            var x = polygonCoordinates[i][0]
            var y = polygonCoordinates[i][1]
            polyXCoordinates.push(x)
            polyYCoordinates.push(y)
        }

        var minX = Math.min(...polyXCoordinates)
        var minY = Math.min(...polyYCoordinates)
        var maxX = Math.max(...polyXCoordinates)
        var maxY = Math.max(...polyYCoordinates)
        var rectangleCoordinates = [[minX, minY], [minX, maxY], [maxX, maxY], [maxX, minY]]

        var threeDArray = []
        var a, i, b, j
        for (a = minY, i = 0; a < maxY; a++, i++) {
            var twoDArray = []
            for (b = minX, j = 0; b < maxX; b++, j++) {
                var squareCoordinates = [[b, a], [b, a + 1], [b + 1, a + 1], [b + 1, a]]

                formArrayOfSquares(squareCoordinates, twoDArray)
            }
            threeDArray.push(twoDArray)
        }

        var singletArray = threeDArray
        var duplet3DArray = []
        var singletArrayCopy = []
        var triplet3DArray = []
        var quadruplet3DArray = []
        formDuplets(singletArray, singletArrayCopy)
        singletArray = JSON.parse(JSON.stringify(singletArrayCopy))

        formQuadruplets(duplet3DArray, quadruplet3DArray)

        function formDuplets(singletArray, singletArrayCopy) {
            for (var yIndex = 0; yIndex < singletArray.length; yIndex++) {
                var duplets = []
                var singlets = []
                for (var xIndex = 0; xIndex < singletArray[yIndex].length - 1;) {
                    var doesIntersectNextBlock = geometric.polygonIntersectsPolygon(singletArray[yIndex][xIndex], singletArray[yIndex][xIndex + 1])
                    if (doesIntersectNextBlock) {
                        var dupletPolygon = [singletArray[yIndex][xIndex][0],
                            singletArray[yIndex][xIndex][1],
                            singletArray[yIndex][xIndex + 1][2],
                            singletArray[yIndex][xIndex + 1][3]]
                        duplets.push(dupletPolygon)

                        xIndex++
                    } else {
                        singlets.push(singletArray[yIndex][xIndex])
                    }
                    if (xIndex === singletArray[yIndex].length - 2) singlets.push(singletArray[yIndex][xIndex + 1])
                    xIndex++
                }
                duplet3DArray.push(duplets)
                singletArrayCopy.push(singlets)
            }
        }
        function formTriplets(singletArray, duplet3DArray, triplet3DArray) {
            for (var yIndex = 0; yIndex < duplet3DArray.length; yIndex++) {
                var triplets = []
                for (var xIndex = 0; xIndex < duplet3DArray[yIndex].length; xIndex++) {
                    // check if this block intersects with any singlets in this y coodinate
                    var doesIntersectAnySinglet = false;
                    for (var x = 0; x < singletArray[yIndex].length; x++) {
                        if (!(duplet3DArray[yIndex][xIndex] && singletArray[yIndex][x])) {
                            continue
                        }
                        doesIntersectAnySinglet = geometric.polygonIntersectsPolygon(duplet3DArray[yIndex][xIndex], singletArray[yIndex][x])
                        if (doesIntersectAnySinglet) {
                            var tripletPolygon = [duplet3DArray[yIndex][xIndex][0],
                                duplet3DArray[yIndex][xIndex][1],
                                singletArray[yIndex][x][2],
                                singletArray[yIndex][x][3]]
                            triplets.push(tripletPolygon)
                            duplet3DArray[yIndex][xIndex] = null
                            singletArray[yIndex][x] = null
                        }
                    }
                    singletArray[yIndex] = singletArray[yIndex].filter(function (el) {
                        return el != null;
                    });
                }
                for (var xIndex = 0; xIndex < duplet3DArray[yIndex].length; xIndex++) {
                    duplet3DArray[yIndex] = duplet3DArray[yIndex].filter(function (el) {
                        return el != null;
                    });
                }
                triplet3DArray.push(triplets)
            }
        }
        function formQuadruplets(duplet3DArray, quadruplet3DArray) {
            for (var yIndex = 0; yIndex < duplet3DArray.length; yIndex++) {
                var quadruplets = []
                for (var xIndex = 0; xIndex < duplet3DArray[yIndex].length - 1;) {
                    var doesIntersectNextBlock = geometric.polygonIntersectsPolygon(duplet3DArray[yIndex][xIndex], duplet3DArray[yIndex][xIndex + 1])
                    if (doesIntersectNextBlock) {
                        var quadrupletPolygon = [duplet3DArray[yIndex][xIndex][0],
                            duplet3DArray[yIndex][xIndex][1],
                            duplet3DArray[yIndex][xIndex + 1][2],
                            duplet3DArray[yIndex][xIndex + 1][3]]
                        quadruplets.push(quadrupletPolygon)
                        duplet3DArray[yIndex][xIndex] = null
                        duplet3DArray[yIndex][xIndex + 1] = null

                        xIndex++
                    }
                    xIndex++
                }
                for (var xIndex = 0; xIndex < duplet3DArray[yIndex].length; xIndex++) {
                    duplet3DArray[yIndex] = duplet3DArray[yIndex].filter(function (el) {
                        return el != null;
                    });
                }
                quadruplet3DArray.push(quadruplets)
            }
        }
        function isInAnyColdSpot(squareCoordinates) {
            for (var i = 0; i < coldSpotCoordinates.length; i++) {
                var isInsideColdSpot = geometric.polygonInPolygon(squareCoordinates, coldSpotCoordinates[i])
                if (isInsideColdSpot) {
                    return true
                }
            }
            return false
        }
        function doesIntersectAnyColdSpot(squareCoordinates) {
            for (var i = 0; i < coldSpotIndividualPoints.length; i++) {
                var doesIntersectColdSpot = geometric.pointInPolygon(coldSpotIndividualPoints[i], squareCoordinates)
                if (doesIntersectColdSpot) {
                    return true
                }
            }
            return false
        }
        function formArrayOfSquares(squareCoordinates, twoDArray) {
            var isOnBiggerPolygon = polygonOnPolygon(squareCoordinates, polygonCoordinates)
            if (!isOnBiggerPolygon) {
                return
            }
            var isInsideAnyColdSpot = isInAnyColdSpot(squareCoordinates)
            if (isInsideAnyColdSpot) {
                return
            }
            var doesIntersectColdSpot = doesIntersectAnyColdSpot(squareCoordinates)
            if (doesIntersectColdSpot) {
                return
            }
            twoDArray.push(squareCoordinates)
        }
        function polygonOnPolygon(polygonA, polygonB) {
            var smallerSquarePolygon = [
                [polygonA[0][0] + 0.05, polygonA[0][1] + 0.05],
                [polygonA[1][0] + 0.05, polygonA[1][1] - 0.05],
                [polygonA[2][0] - 0.05, polygonA[2][1] - 0.05],
                [polygonA[3][0] - 0.05, polygonA[3][1] + 0.05]
            ]
            return geometric.polygonInPolygon(smallerSquarePolygon, polygonB)
        }
        return {quadruplet3DArray, singletArray, duplet3DArray, triplet3DArray}
    }

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

    let mats = calc(roomToFormula, [coldSpotToFormula, coldSpotToFormula])
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
                                    points={mat}
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
