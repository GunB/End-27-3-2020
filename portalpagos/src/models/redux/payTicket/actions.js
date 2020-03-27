const actions = {
  LOAD: 'payTicket/LOAD',
  LOAD_PAY: 'payTicket/LOAD_PAY',
  SET_PAY: 'payTicket/SET_PAY',
  LOAD_PAY_PSE: 'payTicket/LOAD_PAY_PSE',
}

export const payTicketCommerce = data => ({
  type: actions.LOAD_PAY,
  payload: data,
})

export const payTicketCommercePSE = data => ({
  type: actions.LOAD_PAY_PSE,
  payload: data,
})

export const setPayTicketCommerce = data => ({
  type: actions.SET_PAY,
  payload: { ...data },
})

export default actions
