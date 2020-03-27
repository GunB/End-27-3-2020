const actions = {
  LOAD_INIT_DATA_FACTURA: 'factura/LOAD_INIT_DATA_FACTURA',
  LOAD_DOCUMENTS: 'factura/LOAD_DOCUMENTS',
  LOAD_COMMERCES: 'factura/LOAD_COMMERCES',
  SET_FACTURA: 'factura/SET_FACTURA',
  SET_FACTURA_FILE: 'factura/SET_FACTURA_FILE',
  SET_STATE_FACTURA: 'factura/SET_STATE',
  CLOSE_SUCCESS_FACTURA: 'factura/CLOSE_SUCCESS_FACTURA',
}

export const ACTION_facturaSetState = data => ({
  type: actions.SET_STATE_FACTURA,
  payload: data,
})

export const ACTION_facturaInitData = () => ({
  type: actions.LOAD_INIT_DATA_FACTURA,
})

export const ACTION_createFactura = data => ({
  type: actions.SET_FACTURA,
  payload: data,
})

export const ACTION_createFacturaFile = data => ({
  type: actions.SET_FACTURA_FILE,
  payload: data,
})

export const ACTION_closeSuccessFactura = () => ({
  type: actions.CLOSE_SUCCESS_FACTURA,
  payload: { success: false, onError: false },
})

export default actions
