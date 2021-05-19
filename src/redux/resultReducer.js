// Constants
const UPDATE_RESULT = "UPDATE_RESULT";

//Initial state
let resultInitialState = [[],[],[],[],false];

//Action creators
export const updateResult = result => {
    return ({type: UPDATE_RESULT, payload: result})
}

//Buttons reducer
export const result = (state = resultInitialState, action) => {
    switch (action.type) {
        case UPDATE_RESULT:
            state = action.payload
            return state;

        default:
            return state;
    }
}