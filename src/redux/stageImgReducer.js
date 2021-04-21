// Constants
const UPDATE_IMG = "UPDATE_IMG";

//Initial state
let stageImgInitialState = '';

//Action creators
export const updateImg = URL => {
    return ({type: UPDATE_IMG, payload: URL})
}

//Buttons reducer
export const stageImg = (state = stageImgInitialState, action) => {
    switch (action.type) {
        case UPDATE_IMG:
            state = action.payload
            return state;

        default:
            return state;
    }
}