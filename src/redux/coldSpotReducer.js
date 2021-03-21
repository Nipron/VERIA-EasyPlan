// Constants
const UPDATE_COLDSPOT = "UPDATE_COLDSPOT";

//Initial state
let coldSpotCoordinatesInitialState = [0, 0, 0, 0, 0, 0, 0, 0];

//Action creators
export const updateColdSpot = coldSpot => {
    return ({type: UPDATE_COLDSPOT, payload: coldSpot})
}

//Buttons reducer
export const coldSpot = (state = coldSpotCoordinatesInitialState, action) => {
    switch (action.type) {
        case UPDATE_COLDSPOT:
            state = action.payload
            return state;

        default:
            return state;
    }
}