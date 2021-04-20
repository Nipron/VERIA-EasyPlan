// Constants
const UPDATE_CHECKS = "UPDATE_CHECKS";

//Initial state
let checksInitialState = {
    topLaminate: false,
    topParquet: false,
    subUnburnable: false,
    subBurnable: false
}

//Action creators
export const updateChecks = checks => {
    return ({type: UPDATE_CHECKS, payload: checks})
}

//Checks reducer
export const checks = (state = checksInitialState, action) => {
    switch (action.type) {
        case UPDATE_CHECKS:
            state = action.payload
            return state;

        default:
            return state;
    }
}