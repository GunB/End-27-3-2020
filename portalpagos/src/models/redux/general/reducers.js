import { attributeHandlerMapper } from 'helpers/attributeHandler'
import actions from './actions'

const initialState = {
  cities: [],
  paymentMethods: [],
  commerceDocuments: [],
  typeTickets: [],
  paymentCycle: [],
  typeAccount: [],
  typeService: [],
}

export default function reportes(state = initialState, action) {
  switch (action.type) {
    case actions.LOAD_CITIES: {
      const { payload = [] } = action
      const cities = attributeHandlerMapper(payload)
      return { ...state, cities }
    }
    case actions.LOAD_PAYMENTMETHODS: {
      const { payload = [] } = action
      const paymentMethods = attributeHandlerMapper(payload)
      return { ...state, paymentMethods }
    }
    case actions.LOAD_COMMERCEDOCUMENTS: {
      const { payload = [] } = action
      const commerceDocuments = attributeHandlerMapper(payload)
      return { ...state, commerceDocuments }
    }
    case actions.LOAD_TYPETICKETS: {
      const { payload = [] } = action
      const typeTickets = attributeHandlerMapper(payload)
      return { ...state, typeTickets }
    }
    case actions.LOAD_CATALOG_GENERAL: {
      return {
        ...state,
        ...action.payload,
      }
    }
    default:
      return state
  }
}
