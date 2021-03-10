// Constants
const UPDATE_SHAPE = "UPDATE_SHAPE";


//Initial state
let shapesInitialState = {
    R: false,
    L: false,
    T: false
}

//Action creators
export const updateShape = shape => {
    return ({type: UPDATE_SHAPE, payload: shape})
}

//Buttons reducer
export const shapes = (state = shapesInitialState, action) => {
    switch (action.type) {
        case UPDATE_SHAPE:

            for (let key in state) {
                state[key] = key === action.payload;
            }
            return state;

        default:
            return state;
    }
}