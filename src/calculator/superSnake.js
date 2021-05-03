import {checkIntersection} from "line-intersect";  //checks if two segments intersect

//distance between two points
const dist = (a, b) => Math.sqrt(Math.pow(a[0] - b[0], 2) + Math.pow(a[1] - b[1], 2))

//finding closet point
export const findClosest = (p, array) => array[array.map(el => dist(p, el)).indexOf(Math.min(...array.map(el => dist(p, el))))]

