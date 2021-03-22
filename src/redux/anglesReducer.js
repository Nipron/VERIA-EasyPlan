// Constants
const UPDATE_ANGLES = "UPDATE_ANGLES";

//Initial state
let anglesInitialState = [false, false, false, false, false, false, false, false];

//Action creators
export const updateAngles = angles => {
    return ({type: UPDATE_ANGLES, payload: angles})
}

//Buttons reducer
export const angles = (state = anglesInitialState, action) => {
    switch (action.type) {
        case UPDATE_ANGLES:
            state = action.payload
            return state;

        default:
            return state;
    }
}