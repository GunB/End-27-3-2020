const actions = {
  LOAD_ASYNC: 'commerce/LOAD_ASYNC',
  LOAD: 'commerce/LOAD',
}

export const getAsyncCommerce = () => {
  return {
    type: actions.LOAD_ASYNC,
  }
}

export default actions
