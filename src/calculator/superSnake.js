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

const findDirect = (startPoint, endPoint, pitStops, walls) => {
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
        if ((isWayFree(startPoint, pitStops[i], walls))
            && ((resultPitStop.length === 0)
                || (
                    (dist(startPoint, pitStops[i]) + dist(pitStops[i], endPoint)) < (dist(startPoint, resultPitStop) + dist(resultPitStop, endPoint))
                )
            )
        ) {
            resultPitStop = pitStops[i];
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
        for (let i = 0; i < pitStops.length; i++) {
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
            for (let j = 0; j < count - i; j++) {
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



