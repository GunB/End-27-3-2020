const actions = {
  LOAD_ASYNC: 'stores/LOAD_ASYNC',
  LOAD: 'stores/LOAD',
  CLEAN: 'stores/CLEAN',
}

export const getAsyncStores = payload => {
  return {
    type: actions.LOAD_ASYNC,
    payload,
  }
}

export const cleanStores = () => {
  return {
    type: actions.CLEAN,
  }
}

export default actions
