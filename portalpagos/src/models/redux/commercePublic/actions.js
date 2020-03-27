const actions = {
  LOAD: 'commercePublic/LOAD',
  COMMERCE_DATA: 'commercePublic/COMMERCE_DATA',
  SET_COMMERCE_DATA: 'commercePublic/SET_COMMERCE_DATA',
  COMMERCE_OPTIONS_DATA: 'commercePublic/COMMERCE_OPTIONS_DATA',
  COMMERCE_GET_FACTURA: 'commercePublic/COMMERCE_GET_FACTURA',
  COMMERCE_SET_FACTURA: 'commercePublic/COMMERCE_SET_FACTURA',
  SET_COMMERCE_TICKET_DATA: 'commercePublic/SET_COMMERCE_TICKET_DATA',
  COMMERCE_TRANSACTION_DATA: 'commercePublic/COMMERCE_TRANSACTION_DATA',
}

export const commercePublicData = data => ({
  type: actions.COMMERCE_DATA,
  payload: data,
})

export const setCommercePublicData = data => ({
  type: actions.SET_COMMERCE_DATA,
  payload: data,
})

export const getOptionsCommercePublicData = data => ({
  type: actions.COMMERCE_OPTIONS_DATA,
  payload: data,
})

export const getFacturaCommercePublic = data => ({
  type: actions.COMMERCE_GET_FACTURA,
  payload: data,
})

export const commercePublicTicketData = data => ({
  type: actions.SET_COMMERCE_TICKET_DATA,
  payload: data,
})

export const setFacturaCommercePublic = data => ({
  type: actions.COMMERCE_SET_FACTURA,
  payload: data,
})

export const commercePublicTransactionData = data => ({
  type: actions.COMMERCE_TRANSACTION_DATA,
  payload: data,
})

export default actions
