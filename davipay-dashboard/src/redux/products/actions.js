const actions = {
  LOAD_ASYNC: 'products/LOAD_ASYNC',
  LOAD: 'products/LOAD',
  CLEAN: 'products/CLEAN',
}

export const getAsyncProducts = payload => {
  return {
    type: actions.LOAD_ASYNC,
    payload,
  }
}

export const cleanProducts = () => {
  return {
    type: actions.CLEAN,
  }
}

export default actions
