import pointInPolygon from "point-in-polygon";
import {Bomb, BombForRoom, Bulldozer, RemoveDoubledPoints, RoomTransformer} from "../../calculator/helpers";

const isGroupInsideRoom = (groupX0, groupY0, group, R) =>
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

export const MatFinder = (spotsArray, room) => {

    const d = 4  // 4px * 2cm = 8cm - minimum distance between for connector
    let spots = [...spotsArray];
    const headVertical = {w: 50, h: 74}
    const headHorizontal = {w: 74, h: 50}
    const square = {w: 50, h: 50}
    const connectorVertical = {w: d, h: 6}
    const connectorHorizontal = {w: 6, h: d}
    const R = RoomTransformer(room, 0)
    let needToSearch = true;
    let resultMats = []
    let connectors = []


    //for each point finding 4 "icicles" - groups of mats with different length
    while (needToSearch) {
        let superMass = []
        for (let y = 0; y < R[13][1]; y += 2) {
            for (let x = 0; x < R[7][0]; x += 2) {
                //creating horizontal starting row growing down
                let columnsDown = 0
                let startRowGrowDown = [0] //0 is code for "down"
                while ((isGroupInsideRoom(x + columnsDown * 50, y + 1, headVertical, R))
                    && (isGroupInsideRoom(x - 3, y + 4 + 1, connectorVertical, R))
                    && (isGroupInsideRoom(x + (columnsDown + 1) * 50 - 1, y + 4 + 1, connectorVertical, R))
                    && (!doesAnyCSOverlapGroup(spots, x + columnsDown * 50, y + 1, headVertical))
                    && (!doesAnyCSOverlapGroup(spots, x + columnsDown * 50 - 3, y + 4 + 1, connectorVertical))
                    && (!doesAnyCSOverlapGroup(spots, x + (columnsDown + 1) * 50 - 1, y + 4 + 1, connectorVertical))
                    ) {
                    columnsDown++
                    startRowGrowDown.push(0)
                }
                for (let col = 0; col < startRowGrowDown.length - 1; col++) {
                    let rowDown = 0;
                    while ((isGroupInsideRoom(x + col * 50, y - 1 + headVertical.h + rowDown * 50, square, R))
                    && (!doesAnyCSOverlapGroup(spots, x + col * 50, y - 1 + headVertical.h + rowDown * 50, square))
                    && (rowDown < 3)) {
                        startRowGrowDown[col + 1]++
                        rowDown++
                    }
                }

                //creating horizontal starting row growing up
                let columnsUp = 0
                let startRowGrowUp = [1]  //1 is code for "up"

                while ((isGroupInsideRoom(x + columnsUp * 50, y, headVertical, R))
                    && (isGroupInsideRoom(x - 3, y + headVertical.h - 10, connectorVertical, R))
                    && (isGroupInsideRoom(x - 1 + (columnsUp + 1) * 50, y + headVertical.h - 10, connectorVertical, R))
                    && (!doesAnyCSOverlapGroup(spots, x + columnsUp * 50, y, headVertical))
                    && (!doesAnyCSOverlapGroup(spots, x + columnsUp * 50 - 3, y + headVertical.h - 10, connectorVertical))
                    && (!doesAnyCSOverlapGroup(spots, x - 1 + (columnsUp + 1) * 50, y + headVertical.h - 10, connectorVertical))
                    ) {
                    columnsUp++
                    startRowGrowUp.push(0)
                }

                for (let col = 0; col < startRowGrowUp.length - 1; col++) {
                    let rowUp = 0;
                    while ((isGroupInsideRoom(x + col * 50, y + 1 - (rowUp + 1) * 50, square, R))
                    && (!doesAnyCSOverlapGroup(spots, x + col * 50, y + 1 - (rowUp + 1) * 50, square))
                    && (rowUp < 3)) {
                        startRowGrowUp[col + 1]++
                        rowUp++
                    }
                }

                //creating vertical starting column growing left
                let rowsLeft = 0
                let startColumnGrowLeft = [2]

                while ((isGroupInsideRoom(x + 1, y + rowsLeft * 50, headHorizontal, R))
                    && (isGroupInsideRoom(x + 1 + headHorizontal.w - 10, y - 3, connectorHorizontal, R))
                    && (isGroupInsideRoom(x + 1 + headHorizontal.w - 10, y - 1 + (rowsLeft + 1) * 50, connectorHorizontal, R))
                    && (!doesAnyCSOverlapGroup(spots, x, y + rowsLeft * 50, headHorizontal))
                    && (!doesAnyCSOverlapGroup(spots, x + 1 + headHorizontal.w - 10, y - 3, connectorHorizontal))
                    && (!doesAnyCSOverlapGroup(spots, x + 1 + headHorizontal.w - 10, y - 1 + (rowsLeft + 1) * 50, connectorHorizontal))
                    ) {
                    rowsLeft++
                    startColumnGrowLeft.push(0)
                }

                for (let row = 0; row < startColumnGrowLeft.length - 1; row++) {
                    let columnLeft = 0;
                    while ((isGroupInsideRoom(x + 1 - (columnLeft + 1) * 50, y + row * 50, square, R))
                    && (!doesAnyCSOverlapGroup(spots, x + 1 - (columnLeft + 1) * 50, y + row * 50, square))
                    && (columnLeft < 3)) {
                        startColumnGrowLeft[row + 1]++
                        columnLeft++
                    }
                }

                //creating vertical starting column growing right
                let rowsRight = 0
                let startColumnGrowRight = [3]

                while ((isGroupInsideRoom(x + 1, y + rowsRight * 50, headHorizontal, R))
                    && (isGroupInsideRoom(x + 1 + 4, y - 3, connectorHorizontal, R))
                    && (isGroupInsideRoom(x + 1 + 4, y - 1 + (rowsRight + 1) * 50, connectorHorizontal, R))
                    && (!doesAnyCSOverlapGroup(spots, x, y + rowsRight * 50, headHorizontal))
                    && (!doesAnyCSOverlapGroup(spots, x + 1 + 4, y - 3, connectorHorizontal))
                    && (!doesAnyCSOverlapGroup(spots, x + 1 + 4, y - 1 + (rowsRight + 1) * 50, connectorHorizontal))
                    ) {
                    rowsRight++
                    startColumnGrowRight.push(0)
                }

                for (let row = 0; row < startColumnGrowLeft.length - 1; row++) {
                    let columnRight = 0;
                    while ((isGroupInsideRoom(x - 1 + headHorizontal.w + columnRight * 50, y + row * 50, square, R))
                    && (!doesAnyCSOverlapGroup(spots, x - 1 + headHorizontal.w + columnRight * 50, y + row * 50, square))
                    && (columnRight < 3)) {
                        startColumnGrowRight[row + 1]++
                        columnRight++
                    }
                }

                if (startRowGrowDown.length > 1) {
                    superMass.push([x, y, ...startRowGrowDown])
                }

                if (startRowGrowUp.length > 1) {
                    superMass.push([x, y, ...startRowGrowUp])
                }

                if (startColumnGrowLeft.length > 1) {
                    superMass.push([x, y, ...startColumnGrowLeft])
                }

                if (startColumnGrowRight.length > 1) {
                    superMass.push([x, y, ...startColumnGrowRight])
                }
            }
        }

        if (superMass.length === 0) {
            needToSearch = false;
        } else {
            let max = 0;
            let index = 0
            for (let i = 0; i < superMass.length; i++) {
                let sum = superMass[i].length * 1.5;
                for (let j = 3; j < superMass[i].length; j++) {
                    sum += superMass[i][j]
                }
                if (sum > max) {
                    max = sum;
                    index = i
                }
            }

            let icicle = superMass[index]  //icicle - the biggest group of connected different length mats
            const x = icicle[0];
            const y = icicle[1];
            const growDirection = icicle[2];  //0 - down, 1 - up, 2 - left, 3 - right

            for (let z = 3; z < icicle.length; z++) {
                switch (growDirection) {
                    case 0:
                        resultMats.push([50 * (z - 3) + x, y,
                            50 * (z - 2) + x, y,
                            50 * (z - 2) + x, 75 + icicle[z] * 50 + y,
                            50 * (z - 3) + x, 75 + icicle[z] * 50 + y])
                        spots.push([50 * (z - 3) + x + 1, y + 1,
                            50 * (z - 2) + x - 1, y + 1,
                            50 * (z - 2) + x - 1, y + 75 + icicle[z] * 50 - 1,
                            50 * (z - 3) + x + 1, y + 75 + icicle[z] * 50 - 1])
                        connectors.push([x - 4, y + 4,
                            x + 4, y + 4,
                            x + 4, y + 10,
                            x - 4, y + 10])
                        connectors.push([x - 4 + 50 * (z - 2), y + 4,
                            x + 4 + 50 * (z - 2), y + 4,
                            x + 4 + 50 * (z - 2), y + 10,
                            x - 4 + 50 * (z - 2), y + 10])
                        break;
                    case 1:
                        resultMats.push([50 * (z - 3) + x, y + 75,
                            50 * (z - 2) + x, y + 75,
                            50 * (z - 2) + x, y - icicle[z] * 50,
                            50 * (z - 3) + x, y - icicle[z] * 50])
                        spots.push([50 * (z - 3) + x + 1, y + 75 - 1,
                            50 * (z - 2) + x - 1, y + 75 - 1,
                            50 * (z - 2) + x - 1, y - icicle[z] * 50 + 1,
                            50 * (z - 3) + x + 1, y - icicle[z] * 50 + 1])
                        connectors.push([x - 4, y + 75 - 10,
                            x + 4, y + 75 - 10,
                            x + 4, y + 75 - 4,
                            x - 4, y + 75 - 4])
                        connectors.push([x - 4 + 50 * (z - 2), y + 75 - 10,
                            x + 4 + 50 * (z - 2), y + 75 - 10,
                            x + 4 + 50 * (z - 2), y + 75 - 4,
                            x - 4 + 50 * (z - 2), y + 75 - 4])
                        break;
                    case 2:
                        resultMats.push([x - icicle[z] * 50, y + 50 * (z - 3),
                            x + 75, y + 50 * (z - 3),
                            x + 75, y + 50 * (z - 2),
                            x - icicle[z] * 50, y + 50 * (z - 2)])
                        spots.push([x - icicle[z] * 50 + 1, y + 50 * (z - 3) + 1,
                            x + 75 - 1, y + 50 * (z - 3) + 1,
                            x + 75 - 1, y + 50 * (z - 2) - 1,
                            x - icicle[z] * 50 + 1, y + 50 * (z - 2) - 1])
                        connectors.push([x + 75 - 10, y - 4,
                            x + 75 - 4, y - 4,
                            x + 75 - 4, y + 4,
                            x + 75 - 10, y + 4])
                        connectors.push([x + 75 - 10, y - 4 + 50 * (z - 2),
                            x + 75 - 4, y - 4 + 50 * (z - 2),
                            x + 75 - 4, y + 4 + 50 * (z - 2),
                            x + 75 - 10, y + 4 + 50 * (z - 2)])
                        break;
                    case 3:
                        resultMats.push([x + 75 + icicle[z] * 50, y + 50 * (z - 3),
                            x, y + 50 * (z - 3),
                            x, y + 50 * (z - 2),
                            x + 75 + icicle[z] * 50, y + 50 * (z - 2)])
                        spots.push([x + 75 + icicle[z] * 50 - 1, y + 50 * (z - 3) + 1,
                            x + 1, y + 50 * (z - 3) + 1,
                            x + 1, y + 50 * (z - 2) - 1,
                            x - 1 + 75 + icicle[z] * 50, y + 50 * (z - 2) + 1])
                        connectors.push([x + 4, y - 4,
                            x + 10, y - 4,
                            x + 10, y + 4,
                            x + 4, y + 4])
                        connectors.push([x + 4, y - 4 + 50 * (z - 2),
                            x + 10, y - 4 + 50 * (z - 2),
                            x + 10, y + 4 + 50 * (z - 2),
                            x + 4, y + 4 + 50 * (z - 2)])
                        break;
                }
            }
        }
    }

    //FIRST: Creating array of pitStops - nodal points at the room for wires (corners of the room, cold spots and mats)
    let pitStops = []
    //adding room corners
    pitStops.push(...BombForRoom(RoomTransformer(room, 0)))
    //adding cold spots' corners
    let initialSpots = [...spotsArray]
    for (let i = 0; i < initialSpots.length; i++) {
        pitStops.push(...Bomb(initialSpots[i]))
    }
    //adding all mats' corners
    for (let i = 0; i < resultMats.length; i++) {
        pitStops.push(...Bomb(resultMats[i]))
    }
    //removing all doubles
    pitStops = [...RemoveDoubledPoints(pitStops)]


    console.log(pitStops)

    return [resultMats, connectors]
}
