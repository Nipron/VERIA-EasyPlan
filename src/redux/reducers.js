import {combineReducers} from 'redux';
import {buttons} from "./buttonsReducer";
import {shapes} from "./shapesReducer";
import {room} from "./roomReducer";
import {coldSpots} from "./coldSpotsReducer";
import {angles} from "./anglesReducer";
import {points} from "./coldSpotsPoints";

const reducers = combineReducers({
    buttons,
    coldSpots,
    room,
    angles,
    shapes,
    points
})

export default reducers;
