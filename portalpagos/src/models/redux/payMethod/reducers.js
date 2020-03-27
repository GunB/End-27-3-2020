import actions from './actions'

const initialState = {
  loading: false,
  payMethod: [],
}

export default function useReducer(state = initialState, action) {
  switch (action.type) {
    case actions.LOAD: {
      const { payload = {} } = action
      return { ...state, ...payload }
    }
    // case actions.LOAD_ASYNC: {
    //   return {
    //     ...state,
    //     ...action.payload,
    //   }
    // }
    case actions.SET_DATA: {
      return {
        ...state,
        ...action.payload,
      }
    }
    default:
      return state
  }
}
