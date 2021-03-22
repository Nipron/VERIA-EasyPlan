import {combineReducers} from 'redux';
import {buttons} from "./buttonsReducer";
import {shapes} from "./shapesReducer";
import {room} from "./roomReducer";
import {coldSpot} from "./coldSpotReducer";
import {angles} from "./anglesReducer";

const reducers = combineReducers({
    buttons,
    coldSpot,
    room,
    angles,
    shapes
})

export default reducers;
