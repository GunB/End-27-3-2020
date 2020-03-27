import actions from './actions'

const initialState = {
  loading: false,
  payTicket: {},
  responseTC: '',
  responsePSE: '',
}

export default function useReducer(state = initialState, action) {
  switch (action.type) {
    case actions.LOAD: {
      const { payload = {} } = action
      return { ...state, ...payload }
    }
    case actions.SET_PAY: {
      return {
        ...state,
        ...action.payload,
      }
    }
    default:
      return state
  }
}
