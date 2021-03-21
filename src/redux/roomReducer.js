// Constants
const UPDATE_ROOM = "UPDATE_ROOM";

//Initial state
let roomCoordinatesInitialState = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

//Action creators
export const updateRoom = room => {
    return ({type: UPDATE_ROOM, payload: room})
}

//Buttons reducer
export const room = (state = roomCoordinatesInitialState, action) => {
    switch (action.type) {
        case UPDATE_ROOM:
            state = action.payload
            return state;

        default:
            return state;
    }
}