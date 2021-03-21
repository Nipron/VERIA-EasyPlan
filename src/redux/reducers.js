import {combineReducers} from 'redux';
import {buttons} from "./buttonsReducer";
import {shapes} from "./shapesReducer";
import {room} from "./roomReducer";
import {coldSpot} from "./coldSpotReducer";

const reducers = combineReducers({
    buttons,
    coldSpot,
    room,
    shapes
})

export default reducers;