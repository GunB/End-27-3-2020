import actions from './actions'

/**
 * Referirse a src/assets/json/commerce.json para revisar estructura de array
 */

const initialState = {
  public: [],
  private: [],
  publicCategorized: [],
  categories: [],
}

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case actions.LOAD: {
      const { payload = [] } = action
      return {
        ...state,
        public: payload,
      }
    }
    case actions.LOAD_CATEGORY: {
      const { payload = [] } = action
      return {
        ...state,
        categories: payload,
      }
    }
    case actions.LOAD_CATEGORIZED_COMMERCE: {
      const { payload = [] } = action
      return {
        ...state,
        publicCategorized: payload,
      }
    }
    default:
      return state
  }
}
