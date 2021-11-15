import pointInPolygon from "point-in-polygon";
import _ from 'lodash';
import {
    Bomb, BombForMat,
    BombForRoom,
    Bulldozer, BulldozerSquad,
    ColdSpotsTransformer, connectorsFarm, entriesCombinations, pitStopsCleaner,
    RemoveDoubledPoints, RoomReshaper,
    RoomTransformer
} from "../../calculator/helpers";
import {
    combinationLength, cordCalc,
    dist,
    normalSnake, twoWaySnake,
    weakSnake,
    wireLength,
    wiresCombinations
} from "../../calculator/superSnake";
import {useSelector} from "react-redux";
import {useState} from "react";

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

export const MatFinder = (spotsArray, room, thermoOut, burnable) => {

    const d = 4  // 4px * 2cm = 8cm - minimum distance between for connector
    const t = -1 //
    const bG = 4;
    const sG = 0;
    const spots = ColdSpotsTransformer(spotsArray, 0);
    const headVertical = {w: 58, h: 75}
    const headHorizontal = {w: 75, h: 58}
    const square = {w: 50, h: 50}
    const connectorVertical = {w: d, h: 6}
    const connectorHorizontal = {w: 6, h: d}
    const R = RoomTransformer(room, -1.8)
    let needToSearch = true;
    let resultMats = []
    let resultCuts = []
    let entryPoints = []
    let entryPointsAlternative = [] //for mat group rotation cases
    let cE = 0 //current entry index
    let connectors = [];
    let area = 0;
    const shapes = useSelector(state => state.shapes);
    let list = [
        0,  //mat 2m
        0,  //mat 3m
        0,  //mat 4m
        0,  //mat 5m
        0,  //cord 0,25m
        0,  //cord 1m
        0   //cord 2m
    ]

    //for each point finding 4 "icicles" - groups of mats with different length
    while (needToSearch) {
        let superMass = []
        for (let y = 0; y <= R[13][1] - 50; y += 2) {
            for (let x = R[7][0] - 50; x >= 0; x -= 2) {
                //creating horizontal starting row growing down
                let columnsDown = 0
                let startRowGrowDown = [0] //0 is code for "down"
                while ((isGroupInsideRoom(x + columnsDown * 50 - bG, y - sG, headVertical, R))
                    // && (isGroupInsideRoom(x - 3, y + 4 + 1, connectorVertical, R))
                    //  && (isGroupInsideRoom(x + (columnsDown + 1) * 50 - 1, y + 4 + 1, connectorVertical, R))
                    && (!doesAnyCSOverlapGroup(spots, x + columnsDown * 50 - bG, y- sG, headVertical))
                    && (!doesAnyCSOverlapGroup(connectors, x + columnsDown * 50 - bG, y- sG, headVertical))
                    // && (!doesAnyCSOverlapGroup(spots, x + columnsDown * 50 - 3, y + 4 + 1, connectorVertical))
                    //  && (!doesAnyCSOverlapGroup(spots, x + (columnsDown + 1) * 50 - 1, y + 4 + 1, connectorVertical))
                    ) {
                    columnsDown++
                    startRowGrowDown.push(0)
                }
                for (let col = 0; col < startRowGrowDown.length - 1; col++) {
                    let rowDown = 0;
                    while ((isGroupInsideRoom(x + col * 50, y + sG + headVertical.h + rowDown * 50, square, R))
                    && (!doesAnyCSOverlapGroup(spots, x + col * 50, y + sG + headVertical.h + rowDown * 50, square))
                    && (rowDown < 3)) {
                        startRowGrowDown[col + 1]++
                        rowDown++
                    }
                }

                //creating horizontal starting row growing up
                let columnsUp = 0
                let startRowGrowUp = [1]  //1 is code for "up"

                while ((isGroupInsideRoom(x + columnsUp * 50 - bG, y + sG, headVertical, R))
                    //  && (isGroupInsideRoom(x - 3, y + headVertical.h - 10, connectorVertical, R))
                    //  && (isGroupInsideRoom(x - 1 + (columnsUp + 1) * 50, y + headVertical.h - 10, connectorVertical, R))
                    && (!doesAnyCSOverlapGroup(spots, x + columnsUp * 50 - bG, y, headVertical))
                    && (!doesAnyCSOverlapGroup(connectors, x + columnsUp * 50 - bG, y, headVertical))
                    //  && (!doesAnyCSOverlapGroup(spots, x + columnsUp * 50 - 3, y + headVertical.h - 10, connectorVertical))
                    //  && (!doesAnyCSOverlapGroup(spots, x - 1 + (columnsUp + 1) * 50, y + headVertical.h - 10, connectorVertical))
                    ) {
                    columnsUp++
                    startRowGrowUp.push(0)
                }

                for (let col = 0; col < startRowGrowUp.length - 1; col++) {
                    let rowUp = 0;
                    while ((isGroupInsideRoom(x + col * 50, y - sG - (rowUp + 1) * 50, square, R))
                    && (!doesAnyCSOverlapGroup(spots, x + col * 50, y - sG - (rowUp + 1) * 50, square))
                    && (rowUp < 3)) {
                        startRowGrowUp[col + 1]++
                        rowUp++
                    }
                }

                //creating vertical starting column growing left
                let rowsLeft = 0
                let startColumnGrowLeft = [2]

                while ((isGroupInsideRoom(x + sG, y + rowsLeft * 50 - bG, headHorizontal, R))
                    //  && (isGroupInsideRoom(x + 1 + headHorizontal.w - 10, y - 3, connectorHorizontal, R))
                    //  && (isGroupInsideRoom(x + 1 + headHorizontal.w - 10, y - 1 + (rowsLeft + 1) * 50, connectorHorizontal, R))
                    && (!doesAnyCSOverlapGroup(spots, x, y + rowsLeft * 50 - bG, headHorizontal))
                    && (!doesAnyCSOverlapGroup(connectors, x, y + rowsLeft * 50 - bG, headHorizontal))
                    //  && (!doesAnyCSOverlapGroup(spots, x + 1 + headHorizontal.w - 10, y - 3, connectorHorizontal))
                    //  && (!doesAnyCSOverlapGroup(spots, x + 1 + headHorizontal.w - 10, y - 1 + (rowsLeft + 1) * 50, connectorHorizontal))
                    ) {
                    rowsLeft++
                    startColumnGrowLeft.push(0)
                }

                for (let row = 0; row < startColumnGrowLeft.length - 1; row++) {
                    let columnLeft = 0;
                    while ((isGroupInsideRoom(x - sG - (columnLeft + 1) * 50, y + row * 50, square, R))
                    && (!doesAnyCSOverlapGroup(spots, x - sG - (columnLeft + 1) * 50, y + row * 50, square))
                    && (columnLeft < 3)) {
                        startColumnGrowLeft[row + 1]++
                        columnLeft++
                    }
                }

                //creating vertical starting column growing right
                let rowsRight = 0
                let startColumnGrowRight = [3]

                while ((isGroupInsideRoom(x - sG, y + rowsRight * 50 - bG, headHorizontal, R))
                    //   && (isGroupInsideRoom(x + 1 + 4, y - 3, connectorHorizontal, R))
                    //  && (isGroupInsideRoom(x + 1 + 4, y - 1 + (rowsRight + 1) * 50, connectorHorizontal, R))
                    && (!doesAnyCSOverlapGroup(spots, x, y + rowsRight * 50 - bG, headHorizontal))
                    && (!doesAnyCSOverlapGroup(connectors, x, y + rowsRight * 50 - bG, headHorizontal))
                    //   && (!doesAnyCSOverlapGroup(spots, x + 1 + 4, y - 3, connectorHorizontal))
                    //   && (!doesAnyCSOverlapGroup(spots, x + 1 + 4, y - 1 + (rowsRight + 1) * 50, connectorHorizontal))
                    ) {
                    rowsRight++
                    startColumnGrowRight.push(0)
                }

                for (let row = 0; row < startColumnGrowLeft.length - 1; row++) {
                    let columnRight = 0;
                    while ((isGroupInsideRoom(x + sG + headHorizontal.w + columnRight * 50, y + row * 50, square, R))
                    && (!doesAnyCSOverlapGroup(spots, x + sG + headHorizontal.w + columnRight * 50, y + row * 50, square))
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
            entryPoints.push([[], []])
            entryPointsAlternative.push([null, null])

            //checking if rectangular
            let isRectangular = true
            for (let i = 3; i < icicle.length - 1; i++) {
                if (icicle[i] !== icicle[i + 1]) {
                    isRectangular = false;
                    break;
                }
            }

            //calculating heated area
            for (let i = 3; i < icicle.length; i++) {
                area += icicle[i] + 1.4
                if (icicle[i] === 0) list[0]++;
                if (icicle[i] === 1) list[1]++;
                if (icicle[i] === 2) list[2]++;
                if (icicle[i] === 3) list[3]++;
            }

            if (area > 42)  {
                return [, , , , false, area]
            }

            switch (growDirection) {
                case 0:
                    connectors.push([x - 4, y + 4,
                        x + 4, y + 4,
                        x + 4, y + 10,
                        x - 4, y + 10])
                    entryPoints[cE][1] = [x - 4, y + 7]
                    if (isRectangular) {
                        entryPointsAlternative[cE][0] = [x - 4, y + 75 + icicle[3] * 50 - 7]
                    }
                    break;
                case 1:
                    connectors.push([x - 4, y + 75 - 10,
                        x + 4, y + 75 - 10,
                        x + 4, y + 75 - 4,
                        x - 4, y + 75 - 4])
                    entryPoints[cE][0] = [x - 4, y + 75 - 7]
                    if (isRectangular) {
                        entryPointsAlternative[cE][1] = [x - 4, y - icicle[3] * 50 + 7]
                    }
                    break;
                case 2:
                    connectors.push([x + 75 - 10, y - 4,
                        x + 75 - 4, y - 4,
                        x + 75 - 4, y + 4,
                        x + 75 - 10, y + 4])
                    entryPoints[cE][1] = [x + 75 - 7, y - 4]
                    if (isRectangular) {
                        entryPointsAlternative[cE][0] = [x + 7 - icicle[3] * 50, y - 4]
                    }
                    break;
                case 3:
                    connectors.push([x + 4, y - 4,
                        x + 10, y - 4,
                        x + 10, y + 4,
                        x + 4, y + 4])
                    entryPoints[cE][0] = [x + 7, y - 4]
                    if (isRectangular) {
                        entryPointsAlternative[cE][1] = [x - 7 + 75 + icicle[3] * 50, y - 4]
                    }
                    break;
            }

            for (let z = 3; z < icicle.length; z++) {
                switch (growDirection) {
                    case 0:
                        resultMats.push([50 * (z - 3) + x, y,
                            50 * (z - 2) + x, y,
                            50 * (z - 2) + x, 75 + icicle[z] * 50 + y,
                            50 * (z - 3) + x, 75 + icicle[z] * 50 + y])
                        resultCuts.push([50 * (z - 3) + x, y - 12.5,
                            50 * (z - 2) + x, y - 12.5,
                            50 * (z - 2) + x, 75 + icicle[z] * 50 + y + 12.5,
                            50 * (z - 3) + x, 75 + icicle[z] * 50 + y + 12.5])
                        spots.push([50 * (z - 3) + x + t, y + t,
                            50 * (z - 2) + x - t, y + t,
                            50 * (z - 2) + x - t, y + 75 + icicle[z] * 50 - t,
                            50 * (z - 3) + x + t, y + 75 + icicle[z] * 50 - t])
                        entryPoints[cE][0] = [x + 4 + 50 * (z - 2), y + 7]
                        if (isRectangular) {
                            entryPointsAlternative[cE][1] = [x + 4 + 50 * (z - 2), y + 75 + icicle[z] * 50 - 7]
                        }
                        connectors.push([x - 4 + 50 * (z - 2), y + 4,
                            x + 4 + 50 * (z - 2), y + 4,
                            x + 4 + 50 * (z - 2), y + 10,
                            x - 4 + 50 * (z - 2), y + 10])
                        break;
                    case 1:
                        resultMats.push([50 * (z - 3) + x, y - icicle[z] * 50,
                            50 * (z - 2) + x, y - icicle[z] * 50,
                            50 * (z - 2) + x, y + 75,
                            50 * (z - 3) + x, y + 75])
                        resultCuts.push([50 * (z - 3) + x, y - icicle[z] * 50 - 12.5,
                            50 * (z - 2) + x, y - icicle[z] * 50 - 12.5,
                            50 * (z - 2) + x, y + 75 + 12.5,
                            50 * (z - 3) + x, y + 75 + 12.5])
                        spots.push([50 * (z - 3) + x + t, y + 75 - t,
                            50 * (z - 2) + x - t, y + 75 - t,
                            50 * (z - 2) + x - t, y - icicle[z] * 50 + t,
                            50 * (z - 3) + x + t, y - icicle[z] * 50 + t])
                        entryPoints[cE][1] = [x + 4 + 50 * (z - 2), y + 75 - 7]
                        if (isRectangular) {
                            entryPointsAlternative[cE][0] = [x + 4 + 50 * (z - 2), y - icicle[3] * 50 + 7]
                        }
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
                        resultCuts.push([x - icicle[z] * 50 - 12.5, y + 50 * (z - 3),
                            x + 75 + 12.5, y + 50 * (z - 3),
                            x + 75 + 12.5, y + 50 * (z - 2),
                            x - icicle[z] * 50 - 12.5, y + 50 * (z - 2)])
                        spots.push([x - icicle[z] * 50 + t, y + 50 * (z - 3) + t,
                            x + 75 - t, y + 50 * (z - 3) + t,
                            x + 75 - t, y + 50 * (z - 2) - t,
                            x - icicle[z] * 50 + t, y + 50 * (z - 2) - t])
                        entryPoints[cE][0] = [x + 75 - 7, y + 4 + 50 * (z - 2)]
                        if (isRectangular) {
                            entryPointsAlternative[cE][1] = [x + 7 - icicle[3] * 50, y + 4 + 50 * (z - 2)]
                        }
                        connectors.push([x + 75 - 10, y - 4 + 50 * (z - 2),
                            x + 75 - 4, y - 4 + 50 * (z - 2),
                            x + 75 - 4, y + 4 + 50 * (z - 2),
                            x + 75 - 10, y + 4 + 50 * (z - 2)])
                        break;
                    case 3:
                        resultMats.push([x, y + 50 * (z - 3),
                            x + 75 + icicle[z] * 50, y + 50 * (z - 3),
                            x + 75 + icicle[z] * 50, y + 50 * (z - 2),
                            x, y + 50 * (z - 2)])
                        resultCuts.push([x - 12.5, y + 50 * (z - 3),
                            x + 75 + icicle[z] * 50 + 12.5, y + 50 * (z - 3),
                            x + 75 + icicle[z] * 50 + 12.5, y + 50 * (z - 2),
                            x - 12.5, y + 50 * (z - 2)])
                        spots.push([x + t, y + 50 * (z - 3) + t,
                            x + 75 + icicle[z] * 50 - t, y + 50 * (z - 3) + t,
                            x + 75 + icicle[z] * 50 - t, y + 50 * (z - 2) - t,
                            x + t, y + 50 * (z - 2) - t])
                        entryPoints[cE][1] = [x + 7, y + 4 + 50 * (z - 2)]
                        if (isRectangular) {
                            entryPointsAlternative[cE][0] = [x - 7 + 75 + icicle[3] * 50, y + 4 + 50 * (z - 2)]
                        }
                        connectors.push([x + 4, y - 4 + 50 * (z - 2),
                            x + 10, y - 4 + 50 * (z - 2),
                            x + 10, y + 4 + 50 * (z - 2),
                            x + 4, y + 4 + 50 * (z - 2)])
                        break;
                }
            }
            cE++;
        }
    }


    let arrayOfCombinationsWithAlts = entriesCombinations(entryPoints, entryPointsAlternative);

    const creatingSuperMegaArrayOfCombinations = (arr, thermoOut) => {
        let result = [];
        for (let i = 0; i < arr.length; i++) {
            result.push(...wiresCombinations(arr[i], thermoOut))
        }
        return result;
    }


    let waysCombinations = creatingSuperMegaArrayOfCombinations(arrayOfCombinationsWithAlts, thermoOut)

    let spotsForWalls = ColdSpotsTransformer(spotsArray, 1)
    spotsForWalls.push(...resultMats)
    let walls = BulldozerSquad(spotsForWalls)
    let wallsFromRoom = Bulldozer(RoomReshaper(room, -3))

    //Creating array of pitStops - nodal points at the room for wires (corners of the room, cold spots and mats)
    let pitStops = []
    //adding room corners
 //   console.log("PIT STOPS before room corners")
 //   console.log(pitStops)

    const roomCorners = BombForRoom(RoomTransformer(room, -1))
    if (shapes.L) {
        pitStops.push(roomCorners[3])
        pitStops.push(roomCorners[4])
        walls.push(wallsFromRoom[1])
        walls.push(wallsFromRoom[2])
        walls.push(wallsFromRoom[3])
        walls.push(wallsFromRoom[4])
        walls.push(wallsFromRoom[5])
    }
    if (shapes.T) {
        pitStops.push(roomCorners[3])
        pitStops.push(roomCorners[4])
        pitStops.push(roomCorners[9])
        pitStops.push(roomCorners[10])
        walls.push(wallsFromRoom[1])
        walls.push(wallsFromRoom[2])
        walls.push(wallsFromRoom[3])
        walls.push(wallsFromRoom[4])
        walls.push(wallsFromRoom[5])
        walls.push(wallsFromRoom[7])
        walls.push(wallsFromRoom[8])
        walls.push(wallsFromRoom[9])
        walls.push(wallsFromRoom[10])
        walls.push(wallsFromRoom[11])
    }
 //   console.log("PIT STOPS before adding cold spots corners")
    let pit2 = _.cloneDeep(pitStops)
 //   console.log(pit2)
    //adding cold spots' corners
    let spotsForPitStops = ColdSpotsTransformer(spotsArray, 0)

    for (let i = 0; i < spotsForPitStops.length; i++) {
        pitStops.push(...Bomb(spotsForPitStops[i]))
    }
 //   console.log("PIT STOPS before adding mat corners")
    let pit3 = _.cloneDeep(pitStops)
 //   console.log(pit3)
    //adding all mats' corners
    for (let i = 0; i < resultMats.length; i++) {
        let corners = [...BombForMat(resultMats[i])]
        pitStops.push(...corners)
    }

 //   console.log("PIT STOPS before remove extra")
    let pit4 = _.cloneDeep(pitStops)
 //   console.log(pit4)

    //removing extra pitStops from corners
    loop:
    for (let i = 0; i < pitStops.length - 1; i++) {
        for (let j = i + 1; j < pitStops.length; j++) {
            if (
                ((pitStops[i][1] === pitStops[j][1]) &&
                    (Math.abs(pitStops[i][0] - pitStops[j][0]) === 2)) ||
                ((pitStops[i][0] === pitStops[j][0]) &&
                    (Math.abs(pitStops[i][1] - pitStops[j][1]) === 2))
            ) {
                pitStops[i][0] = pitStops[0][0]
                pitStops[i][1] = pitStops[0][1]
                pitStops[j][0] = pitStops[0][0]
                pitStops[j][1] = pitStops[0][1]
                continue loop;
            }
        }
    }

     /*const pathLength = (path, pitStops, walls) => {
         let resultLength = 0;
         for (let i = 0; i < path.length - 1; i++) {
             resultLength += wireLength(normalSnake(path[i][1], path[i + 1][0], pitStops, walls))
         }
         return resultLength;
     }*/

    const pathLengthHamster = path => {
        let resultLength = 0;
        for (let i = 0; i < path.length - 1; i++) {
            resultLength += dist(path[i][1], path[i + 1][0]) //(path[i][1], path[i + 1][0], pitStops, walls))
        }
        return resultLength;
    }

    const bestPath = (arr /*, pS, walls*/) => {
        let best = arr[0];
        for (let i = 1; i < arr.length; i++) {
            if (pathLengthHamster(arr[i]/*, pS, walls*/) < pathLengthHamster(best/*, pS, walls*/)) best = arr[i]
        }
        return best;
    }

 //   console.log("PIT STOPS")
    let pit5 = _.cloneDeep(pitStops)
  //  console.log(pit5)

    const pitStopsNoDoubles = pitStopsCleaner(pitStops, resultMats)

    let path = bestPath(waysCombinations/*, pitStopsNoDoubles, walls*/);

    const connectorsAndNumbers = connectorsFarm(path)
    console.log("PATH")
    console.log(path)
  //  console.log("PIT STOPS NO DOUBLES  dd")
 //   console.log(pitStopsNoDoubles)
    let pit6 = _.cloneDeep(pitStopsNoDoubles)
  //  console.log(pit6)
  //  console.log("WALLS")
  //  console.log(walls)

    const snakesNestMaker = (arr, pStops, walls) => {
        let result = [];
        for (let i = 0; i < arr.length - 1; i++) {
            result.push(twoWaySnake(arr[i][1], arr[i + 1][0], pStops, walls));
        }
        return result
    }
    let snakesNest = snakesNestMaker(path, pitStopsNoDoubles, walls)
    let cordsArray = cordCalc(snakesNest)
    list[4] = cordsArray[0]
    list[5] = cordsArray[1]
    list[6] = cordsArray[2]

 //   console.log("ZZZZZZZZ")
 //   console.log(snakesNest, "nest roooooom")
  //  console.log(resultMats)
  //  console.log("ZZZZZZZZ")

    return [resultMats, snakesNest, connectorsAndNumbers[0], connectorsAndNumbers[1], true, area, list, resultCuts]
}
