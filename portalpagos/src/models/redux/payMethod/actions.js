const actions = {
  LOAD_ASYNC: 'payMethod/LOAD_ASYNC',
  LOAD: 'payMethod/LOAD',
  SET_DATA: 'payMethod/SET_DATA',
}

export const payMethodCommerce = data => ({
  type: actions.LOAD_ASYNC,
  payload: data,
})

export const setPayMethodData = data => ({
  type: actions.SET_DATA,
  payload: data,
})

export default actions
