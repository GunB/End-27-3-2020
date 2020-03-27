import actions from './actions'

const initialState = {
  loading: false,
  commercePublicData: {},
  documents: [],
  paymentMethods: [],
  docLoading: false,
  facturasPending: [],
  facturaSelect: null,
  banks: [],
  infoSummary: null,
  transaction: null,
}

export default function useReducer(state = initialState, action) {
  switch (action.type) {
    case actions.LOAD: {
      const { payload = {} } = action
      return { ...state, ...payload }
    }
    case actions.SET_COMMERCE_DATA: {
      return {
        ...state,
        ...action.payload,
      }
    }
    case actions.COMMERCE_SET_FACTURA: {
      return {
        ...state,
        facturaSelect: action.payload,
      }
    }
    case actions.SET_COMMERCE_TICKET_DATA: {
      return {
        ...state,
        infoSummary: action.payload,
      }
    }
    default:
      return state
  }
}
