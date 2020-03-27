import { CHANGE_THEME } from '../constants/actionTypes';
import initialState from './initialState';

export default function themeReducer(state = initialState.theme, action) {
    switch (action.type) {
        case CHANGE_THEME:
            return changeTheme({...state}, action.value);
        default:
            return state;
    }
}

const changeTheme = (stateTheme = undefined, argTheme) => {
    let theme = { ...stateTheme, ...argTheme };
    return theme;
};