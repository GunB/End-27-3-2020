import * as ActionTypes from '../constants/actionTypes';
import * as ActionCreators from './serverAnswerActions';
import 'isomorphic-fetch';
import 'babel-polyfill';
require('regenerator-runtime/runtime');
global.fetch = require('jest-fetch-mock');

describe('Actions', () => {

  it('should create an action to SERVER_ANSWER', () => {
    const response = { response: "ahgsdhjagsdjhagsd" };
    const expected = {
      type: ActionTypes.SERVER_ANSWER,
      value: response
    };

    expect(typeof (ActionCreators.changeServerData(response))).toEqual('object');
    expect(ActionCreators.changeServerData(response)).toEqual(expected);
  });

  const body = {
    data: "Tiempo"
  }
  fetch.mockResponse(JSON.stringify(body))

  it('should create an action to SERVER_ANSWER async', async () => {
    const dispatch = jest.fn();
    const expected = {
      type: ActionTypes.SERVER_ANSWER,
      value: body
    };

    const url = "URL://URL";

    // we expect this to return a function since it is a thunk
    expect(typeof (ActionCreators.asyncFetchGetServerData(url))).toEqual('function');
    // then we simulate calling it with dispatch as the store would do
    await ActionCreators.asyncFetchGetServerData(url)(dispatch);
    // finally assert that the dispatch was called with our expected action
    expect(dispatch).toBeCalledWith(expected);
  });
});
