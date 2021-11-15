import {checkIntersection} from "line-intersect";  //checks if two segments intersect
import _ from 'lodash'; //lodash...

//distance between two points
export const dist = (a, b) => Math.sqrt(Math.pow(a[0] - b[0], 2) + Math.pow(a[1] - b[1], 2))

//wire length between two points
export const wireLength = path => {
    let result = 0;
    for (let i = 0; i < path.length - 1; i++) {
        result += dist(path[i], path[i + 1])
    }
    return result;
}
//finding closet point
export const findClosest = (p, array) => array[array.map(el => dist(p, el)).indexOf(Math.min(...array.map(el => dist(p, el))))]

//finding out if two points may connected directly without intersecting any wall
export const isWayFree = (startPoint, endPoint, walls) => {
    if ((!walls) || (walls.length === 0)) {
        return true
    }
    for (let i = 0; i < walls.length; i++) {
        if (checkIntersection(startPoint[0], startPoint[1], endPoint[0], endPoint[1],
            walls[i][0], walls[i][1], walls[i][2], walls[i][3]).type === "intersecting") {
            return false;
        }
    }
    return true;
}

export const findDirect = (startPoint, endPoint, pitStops, walls) => {
    let directPitStop = [];
    for (let i = 0; i < pitStops.length; i++) {
        if ((isWayFree(startPoint, pitStops[i], walls)) && (isWayFree(pitStops[i], endPoint, walls))
            && ((directPitStop.length === 0)
                || (
                    (dist(startPoint, pitStops[i]) + dist(pitStops[i], endPoint)) < (dist(startPoint, directPitStop) + dist(directPitStop, endPoint))
                )
            )
        ) {
            directPitStop = pitStops[i];
        }
    }
    return directPitStop;
}


//find closest to the endPoint pitStop that can be reached directly
export const findNextPit = (startPoint, endPoint, pitStops, walls) => {
    //checking if there is a direct single pitStop
    let resultPitStop = findDirect(startPoint, endPoint, pitStops, walls)
    if (resultPitStop.length > 0) {
        return resultPitStop
    }
    //if no direct single pitStop, than looking for a closet one to endPoint
    for (let i = 0; i < pitStops.length; i++) {
        if (isWayFree(startPoint, pitStops[i], walls)) {
                if (resultPitStop.length === 0 ||
                    (dist(startPoint, pitStops[i]) + dist(pitStops[i], endPoint)) < (dist(startPoint, resultPitStop) + dist(resultPitStop, endPoint))
                ) {
                    resultPitStop = pitStops[i];
                }
            }
        }
        return resultPitStop;
    }

//weakSnake - finding path without optimization
    export const weakSnake = (startPoint, endPoint, stops, walls) => {
        let resultPath = [];
        try {
            resultPath.push(startPoint);
            let currentPitStop = [...startPoint];
            let pitStops = _.cloneDeep(stops)
            const pitStopsArrayLength = pitStops.length  //pitStops array will be reduced later on

            for (let i = 0; i < pitStopsArrayLength; i++) {
                if (isWayFree(currentPitStop, endPoint, walls)) {
                    resultPath.push(endPoint);
                    return resultPath;
                } else {
                    currentPitStop = [...findNextPit(currentPitStop, endPoint, pitStops, walls)]
                    if (currentPitStop.length !== 0) {
                        resultPath.push(currentPitStop);
                    }
                    for (let j = 0; j < pitStops.length; j++) {
                        if ((pitStops[j][0] === currentPitStop[0]) && (pitStops[j][1] === currentPitStop[1])) {
                            pitStops.splice(j, 1)
                        }
                    }
                }
            }
        } catch (e) {
            resultPath = [startPoint, endPoint]
        }
        return resultPath;
    }

//removing excess points
    export const normalSnake = (startPoint, endPoint, pitStops, walls) => {
        let resultPath = weakSnake(startPoint, endPoint, pitStops, walls)
        if (resultPath.length < 3) return resultPath;
        try {
            let count = resultPath.length
            for (let i = 0; i < count - 2; i++) {
                for (let j = 0; j < count - i - 2; j++) {
                    if (isWayFree(resultPath[i], resultPath[count - 1 - j], walls)) {
                        resultPath.splice(i + 1, count - j - i - 2)
                        count = count - j - i - 2
                    }
                }
            }
        } catch (e) {
            resultPath = [startPoint, endPoint]
        }
        return resultPath;
    }

    export const twoWaySnake = (startPoint, endPoint, pitStops, walls) => {
        let snakeForward = weakSnake(startPoint, endPoint, pitStops, walls)
        let snakeBack = weakSnake(endPoint, startPoint, pitStops, walls)
        if (wireLength(snakeForward) < wireLength(snakeBack)) {
            return snakeForward
        } else {
            return snakeBack
        }
    }

    export const permutator = inputArr => {
        let results = [];
        const permute = (arr, memoZ) => {
            let cur, memo = memoZ || [];
            for (let i = 0; i < arr.length; i++) {
                cur = arr.splice(i, 1);
                if (arr.length === 0) {
                    results.push(memo.concat(cur));
                }
                permute(arr.slice(), memo.concat(cur));
                arr.splice(i, 0, cur[0]);
            }
            return results;
        }
        return permute(inputArr);
    }

    export const addThermo = (arr, thermostat) => {
        let result = [];
        for (let i = 0; i < arr.length; i++) {
            result.push([])
            result[i].push([[null, null], thermostat])
            result[i].push(...arr[i])
        }
        return result;
    }
    export const wiresCombinations = (arr, thermostat) => addThermo(permutator(arr), thermostat)

    export const combinationLength = comb => {
        let result = 0;
        for (let i = 0; i < comb.length - 1; i++) {
            result += wireLength(comb[i][1], comb[i + 1][0])
        }
        return result;
    }

//amount of cords for 1 snake
    export const cords = snake => {
        let cL = wireLength(snake) + 5 //cord length; 5 - extra 10cm
        let c2 = Math.round(cL - cL % 100) / 100
        let rest = cL - c2 * 100
        if (rest > 62.5) {
            return [0, 0, c2 + 1]
        }
        if (rest > 50) {
            return [1, 1, c2]
        }
        if (rest > 12.5) {
            return [0, 1, c2]
        }
        return [1, 0, c2]
    }

//calculating amount of all cords
    export const cordCalc = arr => {
        let c025 = 0;
        let c1 = 0;
        let c2 = 0;
        for (let i = 0; i < arr.length; i++) {
            let cord = cords(arr[i])
            c025 += cord[0]
            c1 += cord[1]
            c2 += cord[2]
        }
        return [c025, c1, c2]
    }



