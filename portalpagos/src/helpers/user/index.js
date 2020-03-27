import store from 'models/store'
import { isEmpty } from 'helpers/isEmpty'

export const validateRole = () => {
  const {
    user: { token },
  } = store.getState()
  return !isEmpty(token)
}

export default {
  validateRole,
}
