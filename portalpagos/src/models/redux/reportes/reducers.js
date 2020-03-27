import actions from './actions'

const initialState = []

export default function reportes(state = initialState, action) {
  switch (action.type) {
    case actions.LOAD: {
      const { payload = [] } = action
      return payload
    }
    default:
      return state
  }
}
