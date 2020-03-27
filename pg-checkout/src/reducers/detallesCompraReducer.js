import * as Actions from '../constants/actionTypes';
import initialState from './initialState';

// IMPORTANT: Note that with Redux, state should NEVER be changed.
// State is considered immutable. Instead,
// create a copy of the state passed and set new values on the copy.
// Note that I'm using Object.assign to create a copy of current state
// and update values on the copy.
export default function detallesCompraReducer(state = initialState.detalles, action) {
    let newState;

    switch (action.type) {
        case Actions.CHANGE_DETAILS_ORDER:
            newState = {...action.value};
            return newState;

        default:
            return state;
    }
}