// Constants
const UPDATE_COLDSPOT = "UPDATE_COLDSPOT";
const ADD_COLDSPOT = "ADD_COLDSPOT";

//Initial state
let coldSpotCoordinatesInitialState = [0, 0, 0, 0, 0, 0, 0, 0];
let coldSpotsInitialState = [];

//Action creators
export const updateColdSpot = coldSpot => {
    return ({type: UPDATE_COLDSPOT, payload: coldSpot})
}

export const addColdSpot = coldSpot => {
    return ({type: ADD_COLDSPOT, payload: coldSpot})
}

//Buttons reducer
export const coldSpots = (state = coldSpotCoordinatesInitialState, action) => {
    switch (action.type) {
        case UPDATE_COLDSPOT:
            state = action.payload
            return state;
        case ADD_COLDSPOT:
            state = [...state, action.payload]
            return state;

        default:
            return state;
    }
}