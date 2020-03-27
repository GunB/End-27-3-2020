import { all, takeEvery, put, call } from 'redux-saga/effects'
import store from 'models/store'
import { CODE_ROLE, CODE_TYPE_TICKET } from 'constants/codecatalog'
import { loadPersonDocuments } from 'services/general'
import { createFactura, createFacturaFile } from 'services/ticket'
import { loadCommerceAll } from 'services/commerce'
import { safeSagaRequest } from 'helpers/safeSaga'
import endpoints from 'constants/endpoints'
import moment from 'moment'
import actions from './actions'

//import { ACTION_configLoading } from '../config/actions'
//
export function* FACTURA_INIT_DATA() {
  const { user } = store.getState()

  if (user.user_data) {
    yield put({
      type: actions.SET_STATE_FACTURA,
      payload: { commerce: user.user_data.commerce },
    })
    // revisamos rol de la persona
    let isRolAdmin = false
    if (user.user_data.roles && user.user_data.roles.length > 0) {
      user.user_data.roles.forEach(function validaRol(value) {
        if (value.code === CODE_ROLE.ADMIN) {
          isRolAdmin = true
        }
      })
      yield put({
        type: actions.SET_STATE_FACTURA,
        payload: { isAdmin: isRolAdmin, isCommerce: !isRolAdmin },
      })
    } else {
      yield put({
        type: actions.SET_STATE_FACTURA,
        payload: { isAdmin: false, isCommerce: false },
      })
    }

    // Validamos comercio valido
    if (
      (user.user_data.commerce &&
        user.user_data.commerce.ticket_type &&
        user.user_data.commerce.ticket_type.code === CODE_TYPE_TICKET.DB) ||
      isRolAdmin
    ) {
      yield put({
        type: actions.SET_STATE_FACTURA,
        payload: { isValidCommerce: true },
      })
    } else {
      yield put({
        type: actions.SET_STATE_FACTURA,
        payload: { isValidCommerce: false },
      })
    }
    if (isRolAdmin) {
      const commercesResult = yield call(
        loadCommerceAll,
        endpoints.COMMERCE.GET_PRIVATE_ALL.concat('?ticket_type_code=db'),
      )
      yield put({
        type: actions.SET_STATE_FACTURA,
        payload: { commerces: commercesResult.data },
      })
    }
  }
  /** Load */
  const success = yield call(loadPersonDocuments)

  yield put({
    type: actions.SET_STATE_FACTURA,
    payload: { documents: success.data },
  })
}

export function* CREATE_FACTURA({ payload: data }) {
  yield put({
    type: actions.SET_STATE_FACTURA,
    payload: { success: false, loading: true, onError: false },
  })
  const factura = {}
  factura.commerce_id = data.comercio
  factura.document_type_id = data.tipoDoc
  factura.document_number = data.numDoc
  factura.name = data.name
  factura.phone = data.phone
  factura.email = data.email
  factura.reference = data.reference
  factura.concept = data.concept
  factura.amount = data.amount
  factura.date_end = moment(data.date).format('DD/MM/YYYY')
  try {
    const success = yield call(createFactura, factura)
    if (success.data) {
      yield put({
        type: actions.SET_STATE_FACTURA,
        payload: { success: true, loading: false, onError: false },
      })
    }
  } catch (error) {
    console.log(error)
    yield put({
      type: actions.SET_STATE_FACTURA,
      payload: { success: false, loading: false, onError: true },
    })
  }
}

export function* CREATE_FACTURA_FILE({ payload: data }) {
  yield put({
    type: actions.SET_STATE_FACTURA,
    payload: { success: false, loading: true, onError: false },
  })
  try {
    const success = yield call(createFacturaFile, data)

    if (success.data) {
      yield put({
        type: actions.SET_STATE_FACTURA,
        payload: { success: true, loading: false, onError: false },
      })
    }
  } catch (error) {
    console.log(error)
    yield put({
      type: actions.SET_STATE_FACTURA,
      payload: { success: false, loading: false, onError: true },
    })
  }
}
export default function* rootSaga() {
  yield all([
    takeEvery(
      actions.LOAD_INIT_DATA_FACTURA,
      safeSagaRequest(FACTURA_INIT_DATA, actions.LOAD_INIT_DATA_FACTURA),
    ),
    takeEvery(actions.SET_FACTURA, CREATE_FACTURA),
    takeEvery(actions.SET_FACTURA_FILE, CREATE_FACTURA_FILE),
  ])
}
