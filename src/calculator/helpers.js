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
export const RemoveDoubledPoints = arr => {
    let result = []
    for (let i = 0; i < arr.length - 1; i++) {
        let isUnique = true
        for (let j = i + 1; j < arr.length; j++) {
            if ((arr[i][0] === arr[j][0]) && (arr[i][1] === arr[j][1])) {
                isUnique = false
                break;
            }
        }
        if (isUnique) result.push(arr[i])
    }
    result.push(arr[arr.length - 1])
    return result
}

//snake transformer for drawing
export const SnakeForDrawing = snake => {
    let result = [];
    for (let i = 0; i < snake.length; i++) {
        result.push(snake[i][0])
        result.push(snake[i][1])
    }
    return result;
}
