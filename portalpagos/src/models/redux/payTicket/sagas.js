import { all, takeEvery, put as putAction, call } from 'redux-saga/effects'
import { payTicketData } from 'services/payTicket'
import moment from 'moment'
import actions, { setPayTicketCommerce } from './actions'

export function* PAY_TICKET_TC({ payload: values }) {
  yield putAction(setPayTicketCommerce({ loading: true }))
  yield putAction(setPayTicketCommerce({ payTicket: {} }))
  yield putAction(setPayTicketCommerce({ responseTC: '' }))

  console.log(values)
  const billSaved = values.invoice // Trae valores precargados de TC desde el admin
  const commerceSelect = values.commerce
  const billCaptured = values.invoiceCaptured // Valores de información de pago para TC basica
  const creditCardInfo = values.tc // Valores capturados de información de usuario para TC Basica

  const ticketTC = {}

  ticketTC.commerce_id = commerceSelect.commerce_id
  if (billSaved && billSaved.id && billSaved.ticket_number && billSaved.amount) {
    ticketTC.ticket_id = billSaved.id
    ticketTC.amount = Number(billSaved.amount)
  }

  if (billCaptured && billCaptured.numberPaper && billCaptured.totalPay) {
    ticketTC.form_field = getFormField(billCaptured)
    ticketTC.amount = Number(billCaptured.totalPay)
    ticketTC.reference = billCaptured.numberPaper
    ticketTC.concept = billCaptured.concept

    //totalPay
  }

  ticketTC.address = creditCardInfo.address
  ticketTC.postal_code = String(creditCardInfo.postal_code)
  ticketTC.name = creditCardInfo.name
  ticketTC.holder_name = creditCardInfo.name
  ticketTC.card_number = String(creditCardInfo.card_number)
  ticketTC.cvc = String(creditCardInfo.cvc)
  ticketTC.expiry_month = Number(moment(creditCardInfo.expiry_date).format('MM'))
  ticketTC.expiry_year = Number(moment(creditCardInfo.expiry_date).format('YYYY'))
  ticketTC.installments = Number(creditCardInfo.installments)
  ticketTC.document_number = creditCardInfo.numDoc
  ticketTC.phone = String(creditCardInfo.phone)
  ticketTC.email = creditCardInfo.email
  ticketTC.document_type_id = creditCardInfo.tipoDoc
  ticketTC.captcha = creditCardInfo.token

  try {
    const success = yield call(payTicketData, ticketTC)
    console.log(success)
    yield putAction(setPayTicketCommerce({ payTicket: success.data }))
    yield putAction(setPayTicketCommerce({ responseTC: 'success' }))
  } catch (error) {
    console.log(error)
    yield putAction(setPayTicketCommerce({ responseTC: 'error' }))
  }
  yield putAction(setPayTicketCommerce({ loading: false }))
}

export function* PAY_TICKET_PSE({ payload: values }) {
  yield putAction(setPayTicketCommerce({ loading: true }))
  yield putAction(setPayTicketCommerce({ payTicket: null }))
  yield putAction(setPayTicketCommerce({ responsePSE: '' }))

  console.log(values)
  const facturaGuardada = values.factura
  const facturaCapturadas = values.facturaCapturada
  const datosPago = values.pse
  const commerceSelect = values.commerce

  console.log(commerceSelect)
  const ticket = {}
  ticket.commerce_id = commerceSelect.commerce_id
  if (facturaGuardada && facturaGuardada.id) {
    ticket.ticket_id = facturaGuardada.id
    ticket.holder_name = facturaGuardada.name
  }
  if (facturaCapturadas && facturaCapturadas.numberPaper) {
    ticket.reference = facturaCapturadas.numberPaper
    ticket.concept = facturaCapturadas.concept
    ticket.form_field = getFormField(facturaCapturadas)
    //totalPay
  }

  ticket.document_type = datosPago.tipoDoc
  ticket.document_number = datosPago.numDoc
  ticket.name = datosPago.name
  ticket.phone = datosPago.phone
  ticket.email = datosPago.email

  ticket.amount = datosPago.amount

  ticket.pse = {
    bank_code: datosPago.banco,
    response_url: '/ticket/comercio/',
    type_user: datosPago.person,
    ip_address: '196.180.50.10',
    type_doc: datosPago.tipoDoc.toUpperCase(),
    num_doc: datosPago.numDoc,
  }
  ticket.captcha = datosPago.token
  try {
    const success = yield call(payTicketData, ticket)
    yield putAction(setPayTicketCommerce({ payTicket: success.data }))
    console.log(success.data)
  } catch (error) {
    console.log(error)
    yield putAction(setPayTicketCommerce({ responsePSE: 'error' }))
  }
  yield putAction(setPayTicketCommerce({ loading: false }))
}

function getFormField(data) {
  const result = {}
  let formfield = false
  Object.keys(data).forEach(key => {
    if (key.startsWith('form_')) {
      const field = key.replace('form_', '')
      result[field] = data[key]
      formfield = true
    }
  })

  if (formfield) {
    return result
  }
  return null
}
export default function* rootSaga() {
  yield all([takeEvery(actions.LOAD_PAY, PAY_TICKET_TC)])
  yield all([takeEvery(actions.LOAD_PAY_PSE, PAY_TICKET_PSE)])
}
