// Constants
const UPDATE_THERMOSTAT = "UPDATE_THERMOSTAT";

//Initial state
let thermostatInitialState = {x: 0, y: 0};

//Action creators
export const updateThermostat = thermostat => {
    return ({type: UPDATE_THERMOSTAT, payload: thermostat})
}

//Buttons reducer
export const thermostat = (state = thermostatInitialState, action) => {
    switch (action.type) {
        case UPDATE_THERMOSTAT:
            state = action.payload
            return state;

        default:
            return state;
    }
}