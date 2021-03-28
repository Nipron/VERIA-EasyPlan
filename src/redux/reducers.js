import {combineReducers} from 'redux';
import {buttons} from "./buttonsReducer";
import {shapes} from "./shapesReducer";
import {room} from "./roomReducer";
import {coldSpots} from "./coldSpotsReducer";
import {angles} from "./anglesReducer";

const reducers = combineReducers({
    buttons,
    coldSpots,
    room,
    angles,
    shapes
})

export default reducers;
