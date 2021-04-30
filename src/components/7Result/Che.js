// repeat-X

import pointInPolygon from "point-in-polygon";

const Ear_X_TopLeft = (x, y, g) =>
    [x - 4,
        y + 4,
        x - 1,
        y + 4,
        x - 1,
        y + 7,
        x - 3,
        y + 10,
        x - 4,
        y + 10]

const Ear_X_TopRight = (x, y, g) =>
    [x + 4 + g.w,
        y + 4,
        x + 1 + g.w,
        y + 4,
        x + 1 + g.w,
        y + 7,
        x + 3 + g.w,
        y + 10,
        x + 4 + g.w,
        y + 10]

/*const Ear_X_BottomLeft = (x, y, g) =>
    [x - 4,
        y - 4 + g.h,
        x - 1,
        y - 4 + g.h,
        x - 1,
        y - 7 + g.h,
        x - 3,
        y - 10 + g.h,
        x - 4,
        y - 10 + g.h]

const Ear_X_BottomRight = (x, y, g) =>
    [x + 4 + g.w,
        y - 4 + g.h,
        x + 1 + g.w,
        y - 4 + g.h,
        x + 1 + g.w,
        y - 7 + g.h,
        x + 3 + g.w,
        y - 10 + g.h,
        x + 4 + g.w,
        y - 10 + g.h]*/

const Body_X_Norm = (x, y, g) =>
    [
        x,
        y,
        x,
        y + 3,
        x + 5,
        y + 3,
        x + 5,
        y + 11,
        x + 2,
        y + 11,
        x,
        y + 9,
        x,
        y + g.h,
        x + g.w,
        y + g.h,
        x + g.w,
        y + 9,
        x - 2 + g.w,
        y + 11,
        x - 5 + g.w,
        y + 11,
        x - 5 + g.w,
        y + 3,
        x + g.w,
        y + 3,
        x + g.w,
        y
    ]

export const TurnChe180 = (che) => {
        let A = [...che[0]]
        let B = [...che[1]]
        let C = [...che[2]]
        let oneArray = A.concat(B).concat(C)
        let x = che[0][0]
        let y = che[0][1]
        let w = che[0][14] - che[0][0]
        let h = che[0][15] - che[0][1]
        let newArray = [];
        for (let i = 0; i < oneArray.length / 2; i++) {
                newArray.push(2 * x + w - oneArray[i * 2])
                newArray.push(2 * y + h - oneArray[i * 2 + 1])
        }
        return [newArray.slice(0, 28), newArray.slice(28, 38), newArray.slice(38)]
}

export const Che_X_Norm = (x, y, g) => [Body_X_Norm(x, y, g), Ear_X_TopLeft(x, y, g), Ear_X_TopRight(x, y, g)]
export const Che_X_Alt = (x, y, g) => TurnChe180(Che_X_Norm(x, y, g))

//export const Che_X_Norm_CS = (x, y, g) => [[Che_X_Norm[0]],[...Che_X_Norm[1]],[...Che_X_Norm[2]]]

//mirror diagonally

export const Mirror45 = arr => {
        let a = [...arr]
        let mirrorArr = []
        for (let i = 0; i < arr.length/2; i++) {
                mirrorArr.push(a[i * 2 + 1]);
                mirrorArr.push(a[i * 2]);
        }
        return mirrorArr
}

// repeat-y

//const Ear_Y_TopRight = (x, y, g) => Mirror45(Ear_X_BottomLeft(x, y, g));
//const Ear_Y_BottomRight = (x, y, g) => Mirror45(Ear_X_BottomRight(x, y, g));
const Ear_Y_TopLeft = (x, y, g) => Mirror45(Ear_X_TopLeft(x, y, g));
const Ear_Y_BottomLeft = (x, y, g) => Mirror45(Ear_X_TopRight(x, y, g));
const Body_Y_Alt = (x, y, g) => Mirror45(Body_X_Norm(x, y, g));

export const Che_Y_Alt = (x, y, g) => [Body_Y_Alt(x, y, g), Ear_Y_TopLeft(x, y, g), Ear_Y_BottomLeft(x, y, g)]
export const Che_Y_Norm = (x, y, g) => TurnChe180(Che_Y_Alt(x, y, g))


const Body_X_Norm_ColdSpot = (x, y, g) =>
    [
            x + 1,
            y + 1,
            x + 1,
            y + 3,
            x + 5,
            y + 3,
            x + 5,
            y + 11,
            x + 2,
            y + 11,
            x + 1,
            y + 10,
            x + 1,
            y + g.h - 1,
            x + g.w - 1,
            y + g.h - 1,
            x + g.w - 1,
            y + 10,
            x - 2 + g.w,
            y + 11,
            x - 5 + g.w,
            y + 11,
            x - 5 + g.w,
            y + 3,
            x - 1 + g.w,
            y + 3,
            x - 1 + g.w,
            y + 1
    ]

export const Body_Y_Alt_ColdSpot = (x, y, g) => Mirror45(Body_X_Norm_ColdSpot(x, y, g));

export const Che_X_Norm_ColdSpot = (x, y, g) => [Body_X_Norm_ColdSpot(x, y, g), Ear_X_TopLeft(x, y, g), Ear_X_TopRight(x, y, g)]
export const Che_X_Alt_ColdSpot = (x, y, g) => TurnChe180(Che_X_Norm_ColdSpot(x, y, g))

export const Che_Y_Alt_ColdSpot = (x, y, g) => [Body_Y_Alt_ColdSpot(x, y, g), Ear_Y_TopLeft(x, y, g), Ear_Y_BottomLeft(x, y, g)]
export const Che_Y_Norm_ColdSpot = (x, y, g) => TurnChe180(Che_Y_Alt_ColdSpot(x, y, g))


/*

const findGroups = (groups) => {
    let cuts = [];
    let mats = [{
        group: {}, x: thermostat.x, y: thermostat.y,
        inM: thermoOut,
        outF: thermoOut,
        points: []
    }];
    let spots = [...spotsArray];
    for (let k = 0; k < groups.length; k++) {
        for (let i = 0; i < R[7][0]; i += 4) {
            for (let j = 0; j < R[13][1]; j += 4) {
                let gB = {} //group with bounds increased due to connectors
                if (groups[k].repeat === "repeat-x") {
                    gB = {...groups[k], w: groups[k].w + 2 * d2}
                }
                if (groups[k].repeat === "repeat-y") {
                    gB = {...groups[k], h: groups[k].h + 2 * d2}
                }
                if (
                    (((gB.repeat === "repeat-x") && (isGroupInsideRoom(i - d2, j, gB)))
                        || ((gB.repeat === "repeat-y") && (isGroupInsideRoom(i, j - d2, gB)))
                    ) && (
                        ((gB.repeat === "repeat-x") && (!doesAnyCSOverlapGroup(spots, i - d2, j, gB))) ||
                        ((gB.repeat === "repeat-y") && (!doesAnyCSOverlapGroup(spots, i, j - d2, gB)))
                    )
                ) {
                    let groupOK = [i, j, i + groups[k].w, j, i + groups[k].w, j + groups[k].h, i, j + groups[k].h];
                    let inM = [];
                    let outF = [];
                    let inMz = []; //alternative for 180 rotation
                    let outFz = []; //alternative for 180 rotation

                    if (groups[k].repeat === "repeat-x") {

                        //top cut
                        for (let q = 12; q > 0; q--) {
                            if (pointInPolygon([i, j - q], R) && pointInPolygon([i + groups[k].w, j - q], R)) {
                                cuts.push([i, j - q, i + groups[k].w, j - q, i + groups[k].w, j, i, j]);
                                break;
                            }
                        }
                        //bottom cut
                        for (let q = 12; q > 0; q--) {
                            if (pointInPolygon([i, j + groups[k].h + q], R) && pointInPolygon([i + groups[k].w, j + groups[k].h + q], R)) {
                                cuts.push([i, j + groups[k].h, i + groups[k].w, j + groups[k].h, i + groups[k].w, j + groups[k].h + q, i, j + groups[k].h + q]);
                                break;
                            }
                        }

                        spots.push([i + 1 - d2, j + 1, i + groups[k].w - 1 + d2, j + 1, i + groups[k].w - 1 + d2, j + groups[k].h - 1, i + 1 - d2, j + groups[k].h - 1]);
                        inM = [i + groups[k].w + 3, j + 6];
                        outF = [i - 3, j + 6];
                        inMz = [i - 3, j + groups[k].h - 6];
                        outFz = [i + groups[k].w + 3, j + groups[k].h - 6];
                    }


                    if (groups[k].repeat === "repeat-y") {

                        //left cut
                        for (let q = 12; q > 0; q--) {
                            if (pointInPolygon([i - q, j], R) && pointInPolygon([i - q, j + groups[k].h], R)) {
                                cuts.push([i - q, j, i, j, i, j + groups[k].h, i - q, j + groups[k].h])
                                break;
                            }
                        }
                        //right cut
                        for (let q = 12; q > 0; q--) {
                            if (pointInPolygon([i + groups[k].w + q, j], R) && pointInPolygon([i + groups[k].w + q, j + groups[k].h], R)) {
                                cuts.push([i + groups[k].w, j, i + groups[k].w + q, j, i + groups[k].w + q, j + groups[k].h, i + groups[k].w, j + groups[k].h])
                                break;
                            }
                        }

                        // cuts.push([i - 12, j, i + groups[k].w + 12, j, i + groups[k].w + 12, j + groups[k].h, i - 9, j + groups[k].h])

                        spots.push([i + 1, j + 1 - d2, i + groups[k].w - 1, j + 1 - d2, i + groups[k].w - 1, j + groups[k].h - 1 + d2, i + 1, j + groups[k].h - 1 + d2]);
                        inM = [i + groups[k].w - 6, j + groups[k].h + 3];
                        outF = [i + groups[k].w - 6, j - 3];
                        inMz = [i + 6, j - 3];
                        outFz = [i + 6, j + groups[k].h + 3];
                    }
                    mats.push({
                        group: groups[k], x: i, y: j,
                        points: groupOK,
                        inM,
                        outF,
                        inMz,
                        outFz,
                        straight: true
                    })
                }

            }
        }
    }
    return [cuts, mats]
}

*/