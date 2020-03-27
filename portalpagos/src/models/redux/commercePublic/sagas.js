import { all, takeEvery, put as putAction, call } from 'redux-saga/effects'
import {
  getCommerceId,
  cardCommerce,
  getBankCommerceId,
  getTransactionId,
} from 'services/commercePublic'
import { loadPersonDocuments, loadPaymentMethods, loadIp } from 'services/general'
import { getFactura } from 'services/ticket'
import { setPayTicketCommerce } from 'models/redux/payTicket/actions'
import actions, { setCommercePublicData } from './actions'

export function* CARD_COMMERCE(data) {
  yield putAction(setCommercePublicData({ loading: true }))
  yield putAction(setCommercePublicData({ commercePublicData: {} }))
  console.log(data)
  try {
    const success = yield call(getCommerceId, data.payload)
    yield putAction(setCommercePublicData({ commercePublicData: success.data }))
  } catch (error) {
    console.log(error)
    try {
      const successList = yield call(cardCommerce)
      let comercio = {}
      successList.data.forEach(element => {
        if (Number(element.commerce_id) === Number(data.payload)) {
          comercio = element
        }
      })
      yield putAction(setCommercePublicData({ commercePublicData: comercio }))
    } catch (e) {
      console.log(e)
    }
  }
  yield putAction(setCommercePublicData({ loading: false }))

  try {
    yield putAction(setCommercePublicData({ banks: [] }))
    const successBank = yield call(getBankCommerceId, data.payload)
    const banksFilter = []
    if (successBank.data.banks) {
      successBank.data.banks.forEach(element => {
        if (element.code !== '0') {
          banksFilter.push(element)
        }
      })
    }
    yield putAction(setCommercePublicData({ banks: banksFilter }))
  } catch (error) {
    console.log(error)
  }
}

export function* INIT_OPTIONS_COMMERCE() {
  yield putAction(setCommercePublicData({ docLoading: false }))
  yield putAction(setCommercePublicData({ facturasPending: [] }))
  yield putAction(setCommercePublicData({ facturaSelect: null }))
  yield putAction(setCommercePublicData({ infoSummary: null }))
  yield putAction(setCommercePublicData({ ip: '' }))
  yield putAction(setPayTicketCommerce({ payTicket: null }))
  yield putAction(setPayTicketCommerce({ responsePSE: '' }))
  yield putAction(setPayTicketCommerce({ responseTC: '' }))
  yield putAction(setPayTicketCommerce({ loading: false }))

  try {
    const successDoc = yield call(loadPersonDocuments)
    yield putAction(setCommercePublicData({ documents: successDoc.data }))
  } catch (error) {
    console.log(error)
  }
  try {
    const successPay = yield call(loadPaymentMethods)
    yield putAction(setCommercePublicData({ paymentMethods: successPay.data }))
  } catch (error) {
    console.log(error)
  }
  try {
    const successIp = yield call(loadIp)
    console.log(successIp)
    yield putAction(setCommercePublicData({ ip: successIp.data.ip }))
  } catch (error) {
    console.log(error)
  }
}

export function* GET_FACTURA_COMMERCE(data) {
  yield putAction(setCommercePublicData({ docLoading: true }))
  yield putAction(setCommercePublicData({ facturasPending: [] }))
  yield putAction(setCommercePublicData({ facturaSelect: null }))
  try {
    const success = yield call(getFactura, data.payload)
    yield putAction(setCommercePublicData({ facturasPending: success.data.tickets }))
  } catch (error) {
    console.log(error)
  }
  yield putAction(setCommercePublicData({ docLoading: false }))
}

export function* GET_TRANSACTION_COMMERCE(data) {
  yield putAction(setCommercePublicData({ loading: true }))
  yield putAction(setCommercePublicData({ commercePublicData: {} }))
  yield putAction(setCommercePublicData({ transaction: {} }))
  try {
    const success = yield call(getTransactionId, data.payload)
    const trx = success.data.transaction
    yield putAction(setCommercePublicData({ transaction: trx }))
    try {
      const successC = yield call(getCommerceId, trx.commerce_id)
      yield putAction(setCommercePublicData({ commercePublicData: successC.data }))
    } catch (error) {
      console.log(error)
    }
  } catch (error) {
    console.log(error)
  }
  yield putAction(setCommercePublicData({ loading: false }))
}

export default function* rootSaga() {
  yield all([takeEvery(actions.COMMERCE_DATA, CARD_COMMERCE)])
  yield all([takeEvery(actions.COMMERCE_OPTIONS_DATA, INIT_OPTIONS_COMMERCE)])
  yield all([takeEvery(actions.COMMERCE_GET_FACTURA, GET_FACTURA_COMMERCE)])
  yield all([takeEvery(actions.COMMERCE_TRANSACTION_DATA, GET_TRANSACTION_COMMERCE)])
}
