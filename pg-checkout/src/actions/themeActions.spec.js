import * as ActionTypes from '../constants/actionTypes';
import * as ActionCreators from './themeActions';

describe('Actions', () => {

  it('should create an action to CHANGE_THEME', () => {
    const theme = 'Paymentez';
    const expected = {
      type: ActionTypes.CHANGE_THEME,
      value: theme
    };

    expect(typeof (ActionCreators.changeCurrentTheme(theme))).toEqual('object');
    expect(ActionCreators.changeCurrentTheme(theme)).toEqual(expected);
  });
});
