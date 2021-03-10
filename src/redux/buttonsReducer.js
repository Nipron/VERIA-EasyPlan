// Constants
const UPDATE_BUTTON = "UPDATE_BUTTON";


//Initial state
let buttonsInitialState = [undefined, true, false, false, false, false, false, false];

//Action creators
export const updateButton = page => {
    return ({type: UPDATE_BUTTON, payload: page})
}

//Buttons reducer
export const buttons = (state = buttonsInitialState, action) => {
    switch (action.type) {
        case UPDATE_BUTTON:

            let tempState = [];
            for (let i = 1; i < buttonsInitialState.length; i++) {
                    tempState[i] = i <= action.payload
            }
            return tempState;

        default:
            return state;
    }
}