import {combineReducers} from 'redux';
import {buttons} from "./buttonsReducer";
import {shapes} from "./shapesReducer";
import {room} from "./roomReducer";
import {coldSpots} from "./coldSpotsReducer";
import {angles} from "./anglesReducer";
import {points} from "./coldSpotsPoints";
import {thermostat} from "./thermostatReducer";
import {checks} from "./floorChecksReducer";
import {stageImg} from "./stageImgReducer";

const reducers = combineReducers({
    buttons,
    coldSpots,
    room,
    angles,
    shapes,
    points,
    thermostat,
    checks,
    stageImg
})

export default reducers;
