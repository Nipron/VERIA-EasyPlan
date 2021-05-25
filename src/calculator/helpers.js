import pointInPolygon from "point-in-polygon";

//RoomTransformer - transformimg the room into proper array [[x0, y0],[x1, y1],[x2, y2]] for PointInPolygon + resizing it
export const RoomTransformer = (room, d) => [[room[0] + d, room[1] + d],
    [room[2] - d, room[3] + d], [room[4] - d, room[5] + d],
    [room[6] - d, room[7] + d], [room[8] - d, room[9] + d],
    [room[10] - d, room[11] + d], [room[12] - d, room[13] + d],
    [room[14] - d, room[15] - d], [room[16] - d, room[17] - d],
    [room[18] - d, room[19] - d], [room[20] - d, room[21] - d],
    [room[22] - d, room[23] - d], [room[24] - d, room[25] - d],
    [room[26] + d, room[27] - d], [room[28] + d, room[29] - d]
]

//RoomReshaper
export const RoomReshaper = (room, d) => [
    room[0] + d, room[1] + d,
    room[2] - d, room[3] + d, room[4] - d, room[5] + d,
    room[6] - d, room[7] + d, room[8] - d, room[9] + d,
    room[10] - d, room[11] + d, room[12] - d, room[13] + d,
    room[14] - d, room[15] - d, room[16] - d, room[17] - d,
    room[18] - d, room[19] - d, room[20] - d, room[21] - d,
    room[22] - d, room[23] - d, room[24] - d, room[25] - d,
    room[26] + d, room[27] - d, room[28] + d, room[29] - d
]

//Cold Spot transformer
export const ColdSpotsTransformer = (spots, d) => {
    let result = [];
    for (let i = 0; i < spots.length; i++) {
        result.push([spots[i][0] + d, spots[i][1] + d,
            spots[i][2] - d, spots[i][3] + d,
            spots[i][4] - d, spots[i][5] - d,
            spots[i][6] + d, spots[i][7] - d])
    }
    return result;
}

//Bulldozer - transforming a building (a polygon) into array of walls => [[W0StartX, W0StartY, W0FinishX, W0FinishY], [W1StartX, W1StartY, W1FinishX, W1FinishY]]
export const Bulldozer = poly => {
    let result = [];
    for (let i = 0; i < poly.length / 2 - 1; i++) {
        result.push([poly[2 * i], poly[2 * i + 1], poly[2 * i + 2], poly[2 * i + 3]])
    }
    result.push([poly[poly.length - 2], poly[poly.length - 1], poly[0], poly[1]])
    return result;
}

//BulldozerSquad - applying Bulldozer for the array of buildings (polygons)
export const BulldozerSquad = city => {
    let result = [];
    for (let i = 0; i < city.length; i++) {
        result.push(...Bulldozer(city[i]))
    }
    return result;
}

//Bomb - similar to RoomTransformer, but for any polygon and with no resizing
export const Bomb = poly => {
    let result = [];
    for (let i = 0; i < poly.length / 2; i++) {
        result.push([poly[2 * i], poly[2 * i + 1]]);
    }
    return result;
}

//BombForMat - similar to Bomb, but only for rectangle mats + distancing corners
export const BombForMat = mat => [
    [mat[0] - 1, mat[1] - 1],
    [mat[2] + 1, mat[3] - 1],
    [mat[4] + 1, mat[5] + 1],
    [mat[6] - 1, mat[7] + 1]
];

//BombForRoom - Bomb for resized room
export const BombForRoom = room => {
    let result = [];
    for (let i = 0; i < room.length - 1; i++) {
        result.push([room[i][0], room[i][1]]);
    }
    result.push([room[room.length - 2][0], room[room.length - 1][1]]);
    return result;
}

//Removing doubled points
export const pitStopsCleaner = (arr, spots) => {
    let resultTemp = []
    loop1:
        for (let i = 0; i < arr.length; i++) {
            // let isUnique = true
            for (let j = i + 1; j < arr.length; j++) {
                if ((arr[i][0] === arr[j][0]) && (arr[i][1] === arr[j][1])) {
                    // isUnique = false
                    continue loop1;
                }
            }
            /*if (isUnique)*/
            resultTemp.push(arr[i])
        }

    let result = [];
    loop2:
        for (let i = 0; i < resultTemp.length; i++) {
            for (let j = 0; j < spots.length; j++) {
                if (pointInPolygon(resultTemp[i], spots[j])) {
                    continue loop2;
                }
            }
            result.push(resultTemp[i])
        }
    return result
}

//creating combinations with alternative entries points
export const entriesCombinations = (arr1, arr2) => {
    let result = []
    let count = Math.pow(2, arr1.length)
    let deleted = 0;
    loop:
        for (let i = 0; i < count; i++) {
            result.push([])
            let temp = i;
            for (let j = 0; j < arr1.length; j++) {
                result[i - deleted].push([])
                if (temp >= Math.pow(2, arr1.length - 1 - j)) {
                    temp -= Math.pow(2, arr1.length - 1 - j)
                    result[i - deleted][j] = arr1[j]
                } else {
                    if (arr2[j][0] !== null) {
                        result[i - deleted][j] = arr2[j]
                    } else {
                        result.pop();
                        deleted++;
                        continue loop;
                    }
                }
            }
        }
    return result;
}

export const connectorsFarm = path => {
    let connectors = [];
    let numbers = [];
    for (let i = 1; i < path.length; i++) {
        //horizontal icicle
        if (path[i][0][1] === path[i][1][1]) {
            //growing down
            if (path[i][0][0] > path[i][1][0]) {
                numbers.push([path[i][0][0] - 18, path[i][0][1] - 6, i])
                if (i !== path.length - 1) numbers.push([path[i][1][0] + 10, path[i][1][1] - 6, i + 1])
                for (let j = 0; j < (path[i][0][0] - path[i][1][0]) / 50; j++) {
                    if ((i === path.length - 1) && (j === 0)) {
                        connectors.push([path[i][1][0] + 4, path[i][1][1] - 3,
                            path[i][1][0] + 8, path[i][1][1] - 3,
                            path[i][1][0] + 8, path[i][1][1] + 3,
                            path[i][1][0] + 4, path[i][1][1] + 3])
                    } else {
                        connectors.push([path[i][1][0] + 50 * j, path[i][1][1] - 3,
                            path[i][1][0] + 50 * j + 8, path[i][1][1] - 3,
                            path[i][1][0] + 50 * j + 8, path[i][1][1] + 3,
                            path[i][1][0] + 50 * j, path[i][1][1] + 3])
                    }
                }
            }
            //growing up
            if (path[i][0][0] < path[i][1][0]) {
                numbers.push([path[i][0][0] + 10, path[i][0][1] - 6, i])
                if (i !== path.length - 1) numbers.push([path[i][1][0] - 18, path[i][1][1] - 6, i + 1])
                for (let j = 0; j < (path[i][1][0] - path[i][0][0]) / 50; j++) {
                    if ((i === path.length - 1) && (j === 0)) {
                        connectors.push([path[i][1][0] - 8, path[i][1][1] - 3,
                            path[i][1][0] - 4, path[i][1][1] - 3,
                            path[i][1][0] - 4, path[i][1][1] + 3,
                            path[i][1][0] - 8, path[i][1][1] + 3])
                    } else {
                        connectors.push([path[i][1][0] - 50 * j - 8, path[i][1][1] - 3,
                            path[i][1][0] - 50 * j, path[i][1][1] - 3,
                            path[i][1][0] - 50 * j, path[i][1][1] + 3,
                            path[i][1][0] - 50 * j - 8, path[i][1][1] + 3])
                    }
                }
            }
        }
        //vertical icicle
        if (path[i][0][0] === path[i][0][0]) {
            //growing left
            if (path[i][0][1] > path[i][1][1]) {
                numbers.push([path[i][0][0] - 4, path[i][0][1] - 22, i])
                if (i !== path.length - 1) numbers.push([path[i][1][0] - 4, path[i][1][1] + 9, i + 1])
                for (let j = 0; j < (path[i][0][1] - path[i][1][1]) / 50; j++) {
                    if ((i === path.length - 1) && (j === 0)) {
                        connectors.push([path[i][1][0] - 3, path[i][1][1] + 4,
                            path[i][1][0] + 3, path[i][1][1] + 4,
                            path[i][1][0] + 3, path[i][1][1] + 8,
                            path[i][1][0] - 3, path[i][1][1] + 8])
                    } else {
                        connectors.push([path[i][1][0] - 3, path[i][1][1] + 50 * j,
                            path[i][1][0] + 3, path[i][1][1] + 50 * j,
                            path[i][1][0] + 3, path[i][1][1] + 50 * j + 8,
                            path[i][1][0] - 3, path[i][1][1] + 50 * j + 8])
                    }
                }
            }
            //growing right
            if (path[i][0][1] < path[i][1][1]) {
                numbers.push([path[i][0][0] - 4, path[i][0][1] + 9, i])
                if (i !== path.length - 1) numbers.push([path[i][1][0] - 4, path[i][1][1] - 22, i + 1])
                for (let j = 0; j < (path[i][1][1] - path[i][0][1]) / 50; j++) {
                    if ((i === path.length - 1) && (j === 0)) {
                        connectors.push([path[i][1][0] - 3, path[i][1][1] - 8,
                            path[i][1][0] + 3, path[i][1][1] - 8,
                            path[i][1][0] + 3, path[i][1][1] - 4,
                            path[i][1][0] - 3, path[i][1][1] - 4])
                    } else {
                        connectors.push([path[i][1][0] - 3, path[i][1][1] - 50 * j - 8,
                            path[i][1][0] + 3, path[i][1][1] - 50 * j - 8,
                            path[i][1][0] + 3, path[i][1][1] - 50 * j,
                            path[i][1][0] - 3, path[i][1][1] - 50 * j])
                    }
                }
            }
        }
    }
    return [connectors, numbers]
}

export const roomArea = r => (
    (r[5] - r[3]) * (r[4] + r[2]) / 2 +
    (r[7] - r[5]) * (r[6] + r[4]) / 2 +
    (r[9] - r[7]) * (r[8] + r[6]) / 2 +
    (r[11] - r[9]) * (r[10] + r[8]) / 2 +
    (r[13] - r[11]) * (r[12] + r[10]) / 2 +
    (r[15] - r[13]) * (r[14] + r[12]) / 2 +
    (r[17] - r[15]) * (r[16] + r[14]) / 2 +
    (r[19] - r[17]) * (r[18] + r[16]) / 2 +
    (r[21] - r[19]) * (r[20] + r[18]) / 2 +
    (r[23] - r[21]) * (r[22] + r[20]) / 2 +
    (r[25] - r[23]) * (r[24] + r[22]) / 2 +
    (r[29] - r[27]) * r[26] / 2
) / 2500
