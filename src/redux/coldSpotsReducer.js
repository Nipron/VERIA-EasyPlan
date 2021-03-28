// Constants
const UPDATE_COLDSPOTS = "UPDATE_COLDSPOTS";
const ADD_COLDSPOT = "ADD_COLDSPOT";

//Initial state
let coldSpotsInitialState = [{}, {}, {}, {}, {}];

//Action creators
export const updateColdSpots = coldSpots => {
    return ({type: UPDATE_COLDSPOTS, payload: coldSpots})
}

//Buttons reducer
export const coldSpots = (state = coldSpotsInitialState, action) => {
    switch (action.type) {
        case UPDATE_COLDSPOTS:
            state = action.payload
            return state;

        default:
            return state;
    }
}