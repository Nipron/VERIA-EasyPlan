import * as geometric from "geometric";

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
    formTriplets(singletArray, duplet3DArray, triplet3DArray)
    formQuadruplets(duplet3DArray, quadruplet3DArray)
    quadruplet3DArray.map(triplet => {
    })
    triplet3DArray.map(triplet => {
    })
    duplet3DArray.map(duplets => {
    })
    singletArray.map(singlets => {
    })
    const roomArea = getRoomArea()

    function formDuplets(singletArray, singletArrayCopy) {
        for (var yIndex = 0; yIndex < singletArray.length; yIndex++) {
            // enter y axis, start with 0th index
            // loop through x axis
            var duplets = []
            var singlets = []
            for (var xIndex = 0; xIndex < singletArray[yIndex].length - 1;) {
                // check if this block intersects with the next block
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
                // push the last element to singlets as well if the second last element isn't duplet
                if (xIndex === singletArray[yIndex].length - 2) singlets.push(singletArray[yIndex][xIndex + 1])
                xIndex++
            }
            duplet3DArray.push(duplets)
            singletArrayCopy.push(singlets)
        }
    }

    function formTriplets(singletArray, duplet3DArray, triplet3DArray) {
        for (var yIndex = 0; yIndex < duplet3DArray.length; yIndex++) {
            // enter y axis, start with 0th index
            // loop through x axis
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
            // enter y axis, start with 0th index
            // loop through x axis
            var quadruplets = []
            for (var xIndex = 0; xIndex < duplet3DArray[yIndex].length - 1;) {
                // check if this block intersects with the next block
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
        // var isInBiggerPolygon = geometric.polygonInPolygon(squareCoordinates, polygonCoordinates)
        // if (!isInBiggerPolygon) {
        //     return
        // }
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

    // will use this function to cover the square boxes on the edges of polygon
    function polygonOnPolygon(polygonA, polygonB) {
        var smallerSquarePolygon = [
            [polygonA[0][0] + 0.1, polygonA[0][1] + 0.1],
            [polygonA[1][0] + 0.1, polygonA[1][1] - 0.1],
            [polygonA[2][0] - 0.1, polygonA[2][1] - 0.1],
            [polygonA[3][0] - 0.1, polygonA[3][1] + 0.1]
        ]
        return geometric.polygonInPolygon(smallerSquarePolygon, polygonB)
    }

    function getRoomArea() {
        return geometric.polygonArea(polygonCoordinates)
    }

    // will return quadruplets  and quintuplets as well
    return {quadruplet3DArray, singletArray, duplet3DArray, triplet3DArray, roomArea}
}

let roomClockwise = [];
roomClockwise.push(room[0]);
roomClockwise.push(room[1]);

for (let i = 0; i < (room.length - 2) / 2; i++) {
    roomClockwise.push(room[room.length - (2 * i + 1) - 1])
    roomClockwise.push(room[room.length - (2 * i) - 1])
}

let roomNoDoubles = []
roomNoDoubles.push(roomClockwise[0]);
roomNoDoubles.push(roomClockwise[1]);

for (let i = 0; i < (roomClockwise.length - 2) / 4; i++) {
    roomNoDoubles.push(roomClockwise[i * 4 + 2]);
    roomNoDoubles.push(roomClockwise[i * 4 + 3]);
    if (!((roomClockwise[i * 4 + 2] === roomClockwise[i * 4 + 4]) && (roomClockwise[i * 4 + 3] === roomClockwise[i * 4 + 5]))) {
        roomNoDoubles.push(roomClockwise[i * 4 + 4]);
        roomNoDoubles.push(roomClockwise[i * 4 + 5]);
    }
}