import actions from './actions'

const initialState = {
  isAdmin: false,
  isCommerce: false,
  isValidCommerce: true,
  commerce: null,
  commerces: [],
  documents: [],
  loading: false,
  success: false,
  onError: false,
}

export default function facturaReducer(state = initialState, action) {
  switch (action.type) {
    case actions.SET_STATE_FACTURA: {
      const { payload = {} } = action
      return { ...state, ...payload }
    }
    case actions.CLOSE_SUCCESS_FACTURA: {
      const { payload = {} } = action
      return { ...state, ...payload }
    }
    default:
      return state
  }
}
