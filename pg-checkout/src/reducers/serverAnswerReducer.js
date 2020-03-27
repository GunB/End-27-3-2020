import initialState from './initialState';
import { SERVER_ANSWER_CLEAN, SERVER_ANSWER } from '../constants/actionTypes';

// IMPORTANT: Note that with Redux, state should NEVER be changed.
// State is considered immutable. Instead,
// create a copy of the state passed and set new values on the copy.
// Note that I'm using Object.assign to create a copy of current state
// and update values on the copy.
export default function serverAnswerReducer(state = initialState.serverAnswer, action) {
    switch (action.type) {
        case SERVER_ANSWER:
            return action.value;
        case SERVER_ANSWER_CLEAN:
            return null;
        default:
            return state;
    }
}