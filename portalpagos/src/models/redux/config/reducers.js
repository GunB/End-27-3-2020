import actions from './actions'

const initialState = {
  loading: false,
  workerloading: false,
  message: {
    type: undefined,
    message: undefined,
    style: undefined,
  },
}

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case actions.SET: {
      const { payload = {} } = action
      return { ...state, ...payload }
    }
    case actions.LOADING: {
      const { payload = {} } = action
      return { ...state, ...payload }
    }
    default:
      return state
  }
}
