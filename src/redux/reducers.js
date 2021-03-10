import {combineReducers} from 'redux';
import {buttons} from "./buttonsReducer";
import {shapes} from "./shapesReducer";

const reducers = combineReducers({
    buttons,
    shapes
})

export default reducers;