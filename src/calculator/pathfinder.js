import {checkIntersection} from "line-intersect";  //checks if two segments intersect

//distance between two points
const dist = (a, b) => Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2))

//finding closet point
const findClosest = (p, array) => array[array.map(el => dist(p, el)).indexOf(Math.min(...array.map(el => dist(p, el))))]

const PathFinder = (pS, pF, walls, NN) => {
    if ((!walls) || (walls.length === 0)) {
        return [pS, pF]
    }

    let currPit = pS;
    let pitStops = [pS];
    let wallsPassed = [];

    for (let i = 0; i < walls.length; i++) {
        let success = false;
        let intersectionsArray = [];
        let wallsOnMyWay = [];

        walls.map(wall => {
            let currentWallAlreadyPassed = false;
            let intersection = checkIntersection(currPit.x, currPit.y, pF.x, pF.y, wall.xS, wall.yS, wall.xF, wall.yF)

            if (wallsPassed.length > 0) {
                for (let j = 0; j < wallsPassed.length; j++) {
                    currentWallAlreadyPassed = currentWallAlreadyPassed || ((wall.xS === wallsPassed[j].xS) && (wall.yS === wallsPassed[j].yS)
                        && (wall.xF === wallsPassed[j].xF) && (wall.yF === wallsPassed[j].yF))
                }
            }

            if ((intersection.type === "intersecting") && !currentWallAlreadyPassed) {
                wallsOnMyWay.push(wall);
                intersectionsArray.push(intersection.point)
            }
        })

        success = (wallsOnMyWay.length === 0)

        if (!success) {
            let closestWall = wallsOnMyWay[intersectionsArray.indexOf(findClosest(currPit, intersectionsArray))]

            if (!(((currPit.x === closestWall.xS) && (currPit.y === closestWall.yS)) ||
                ((currPit.x === closestWall.xF) && (currPit.y === closestWall.yF)))) {
                currPit = (dist({x: closestWall.xS, y: closestWall.yS}, {x: pF.x, y: pF.y})
                    > dist({x: closestWall.xF, y: closestWall.yF}, {x: pF.x, y: pF.y}))
                    ? {x: closestWall.xF, y: closestWall.yF}
                    : {x: closestWall.xS, y: closestWall.yS}
            }
            if (NN === 99) {
               // console.log(closestWall)
            }


            pitStops.push(currPit);
            wallsPassed.push(closestWall)

        }
    }
    pitStops.push(pF)
    return pitStops
}

export const pathLength = (stopsArray) => {
    let totalLength = 0
    for (let i = 0; i < stopsArray.length - 1; i++) {
        totalLength += dist(stopsArray[i], stopsArray[i + 1])
    }
    return totalLength
}


export default PathFinder

