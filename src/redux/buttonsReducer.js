// Constants
const UPDATE_BUTTON = "UPDATE_BUTTON";

//Initial state
let buttonsInitialState = {}

//Action creators
export const updateButton = data => {
    return ({type: UPDATE_BUTTON, payload: data})
}

//Buttons reducer
export const buttons = (state = buttonsInitialState, action) => {
    switch (action.type) {
        case UPDATE_BUTTON:
            return {...state, ...action.payload};

        default:
            return state;
    }
}