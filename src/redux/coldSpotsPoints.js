// Constants
const UPDATE_POINTS = "UPDATE_POINTS";

//Initial state
let pointsInitialState = [];

//Action creators
export const updatePoints = points => {
    return ({type: UPDATE_POINTS, payload: points})
}

//Buttons reducer
export const points = (state = pointsInitialState, action) => {
    switch (action.type) {
        case UPDATE_POINTS:
            state = action.payload
            return state;

        default:
            return state;
    }
}