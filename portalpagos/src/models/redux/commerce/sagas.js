import { all, takeEvery, put, call } from 'redux-saga/effects'
import {
  loadPublicCommerceAll,
  loadPublicCommerceCategories,
  createCommerce,
} from 'services/commerce'
import { SITE_MESSAGE } from 'constants/site_message'
import store from 'models/store'
import { safeSagaRequest } from 'helpers/safeSaga'
import { isEmpty } from 'helpers/isEmpty'
import { categorize } from 'factories/categorize'
import { ACTION_configLoading } from 'models/redux/config/actions'
import actions, {
  ACTION_SAGA_loadCommerce,
  ACTION_SAGA_loadCategories,
  ACTION_SAGA_loadCategorizedCommerce,
} from './actions'

export function* LOAD_ASYNC() {
  /** Prevent reloading */
  const { commerce } = store.getState()
  if (!isEmpty(commerce.public)) return
  /** Load */
  yield put(ACTION_configLoading({ loading: true }))
  const success = yield call(loadPublicCommerceAll)
  yield put(ACTION_SAGA_loadCommerce(success.data))
  yield put(
    ACTION_configLoading({
      loading: false,
      message: { type: SITE_MESSAGE.TYPE.SUCCESS.HTTP },
    }),
  )
}

export function* LOAD_CATEGORIES() {
  /** Prevent reloading */
  const { commerce } = store.getState()
  if (!isEmpty(commerce.categories)) return
  /** Load */
  yield put(ACTION_configLoading({ loading: true }))
  const success = yield call(loadPublicCommerceCategories)
  yield put(ACTION_SAGA_loadCategories(success.data))
  yield put(
    ACTION_configLoading({
      loading: false,
      message: { type: SITE_MESSAGE.TYPE.SUCCESS.HTTP },
    }),
  )
}

export function* LOAD_COMMERCE_CATEGORIES() {
  /** Prevent reloading */
  const { commerce } = store.getState()
  if (!isEmpty(commerce.categories) && !isEmpty(commerce.public)) return
  /** Load */
  yield put(ACTION_configLoading({ loading: true }))
  const [fetchCommerce, fetchCategories] = yield all([
    call(loadPublicCommerceAll),
    call(loadPublicCommerceCategories),
  ])
  yield all([
    put(ACTION_SAGA_loadCommerce(fetchCommerce.data)),
    put(ACTION_SAGA_loadCategories(fetchCategories.data)),
  ])
  const grouped = categorize(fetchCommerce.data, fetchCategories.data)
  yield put(ACTION_SAGA_loadCategorizedCommerce(grouped))
  yield put(
    ACTION_configLoading({
      loading: false,
      message: { type: SITE_MESSAGE.TYPE.SUCCESS.HTTP },
    }),
  )
}

export function createCommerceSaga(datos) {
  const comercio = datos
  comercio.city = { ID: datos.city }
  comercio.document_type = { ID: datos.tipoDoc }
  comercio.document_number = datos.numDoc
  comercio.ticket_type = { ID: datos.ticket_type }
  const metodos = []
  datos.payment_method.forEach(function a(value) {
    metodos.push({ ID: value })
  })
  comercio.payment_method = metodos
  const contactos = []
  if (datos.contactos) {
    datos.contactos.forEach(function con(element) {
      contactos.push({
        name: datos.names[element],
        area: datos.areas[element],
        phone: datos.telefonos[element],
        email: datos.correos[element],
      })
    })
    comercio.names = null
    comercio.areas = null
    comercio.telefonos = null
    comercio.correos = null
    comercio.contactos = null
  }
  comercio.contacts = contactos
  comercio.agreement.payment_cycle = { ID: datos.agreement.payment_cycle }
  comercio.agreement.account_type = { ID: datos.agreement.account_type }
  comercio.agreement.service_type = { ID: datos.agreement.service_type }
  comercio.agreement.number_transactions = Number(datos.agreement.number_transactions)
  comercio.agreement.min_number_transactions = Number(datos.agreement.min_number_transactions)
  comercio.agreement.transaction_amount = Number(datos.agreement.transaction_amount)
  comercio.agreement.total_transaction_amount = 0
  comercio.image = datos.commerce_image
  comercio.category = { ID: datos.category }

  const conceptos = []
  if (datos.keyPaymentConcept) {
    datos.keyPaymentConcept.forEach(function con(element) {
      conceptos.push({ name: datos.paymentConcept[element] })
    })
    comercio.keyPaymentConcept = null
    comercio.paymentConcept = null
  }
  comercio.payment_concept = conceptos
  comercio.free_payment_concept = datos.free_payment_concept === '1'

  const formField = {}
  if (datos.keyExtraData) {
    datos.keyExtraData.forEach(function con(element) {
      formField[datos.extraDataName[element]] = datos.extraDataType[element]
    })
    comercio.keyExtraData = null
    comercio.extraDataName = null
    datos.extraDataType = null
  }
  comercio.form_field = formField
  comercio.commerce_url = datos.url_redirect
  comercio.tipoDoc = null
  comercio.numDoc = null
  console.log(comercio)
  return createCommerce(comercio)
}

export default function* rootSaga() {
  yield all([
    takeEvery(actions.LOAD_ASYNC, safeSagaRequest(LOAD_ASYNC, actions.LOAD_ASYNC)),
    takeEvery(
      actions.LOAD_ASYNC_CATEGORY,
      safeSagaRequest(LOAD_CATEGORIES, actions.LOAD_ASYNC_CATEGORY),
    ),
    takeEvery(
      actions.LOAD_ASYNC_COMMERCE_CATEGORY,
      safeSagaRequest(LOAD_COMMERCE_CATEGORIES, actions.LOAD_ASYNC_COMMERCE_CATEGORY),
    ),
  ])
}
