import * as ActionTypes from '../constants/actionTypes';
import * as ActionCreators from './detallesCompraActions';
import 'isomorphic-fetch';
import 'babel-polyfill';
require('regenerator-runtime/runtime');
global.fetch = require('jest-fetch-mock');

describe('Actions::DetallesCompra', () => {
    const body = {
        data: "Tiempo"
    }
    fetch.mockResponse(JSON.stringify(body))

    it('should create an action to CHANGE_DETAILS_ORDER', async () => {
        const dispatch = jest.fn();
        const expected = {
            type: ActionTypes.CHANGE_DETAILS_ORDER,
            value: body
        };

        const idOrder = 1273612831;

        // we expect this to return a function since it is a thunk
        expect(typeof (ActionCreators.asyncChangeDetailsOrder(idOrder))).toEqual('function');
        // then we simulate calling it with dispatch as the store would do
        await ActionCreators.asyncChangeDetailsOrder(idOrder)(dispatch);
        // finally assert that the dispatch was called with our expected action
        expect(dispatch).toBeCalledWith(expected);
    });
});
