import { all, takeEvery, put, call } from 'redux-saga/effects'
import {
  loadCities,
  loadPaymentMethods,
  loadCommerceDocuments,
  loadTypeTickets,
  loadPaymentCycle,
  loadTypeAccount,
  loadTypeService,
} from 'services/general'
import { SITE_MESSAGE } from 'constants/site_message'
import { safeSagaRequest } from 'helpers/safeSaga'
import store from 'models/store'
import { isEmpty } from 'helpers/isEmpty'
import actions from './actions'
import { ACTION_configLoading } from '../config/actions'

export function* LOAD_ASYNC_CITIES() {
  /** Prevent reloading */
  const { general } = store.getState()
  if (!isEmpty(general.cities)) return
  /** Load */
  yield put(ACTION_configLoading({ loading: true }))
  const success = yield call(loadCities)
  yield put({
    type: actions.LOAD_CITIES,
    payload: success.data,
  })
  yield put(
    ACTION_configLoading({ loading: false, message: { type: SITE_MESSAGE.TYPE.SUCCESS.HTTP } }),
  )
}

export function* LOAD_ASYNC_PAYMENTMETHODS() {
  /** Prevent reloading */
  const { general } = store.getState()
  if (!isEmpty(general.paymentMethods)) return
  /** Load */
  yield put(ACTION_configLoading({ loading: true }))
  const success = yield call(loadPaymentMethods)
  yield put({
    type: actions.LOAD_PAYMENTMETHODS,
    payload: success.data,
  })
  yield put(
    ACTION_configLoading({ loading: false, message: { type: SITE_MESSAGE.TYPE.SUCCESS.HTTP } }),
  )
}

export function* LOAD_ASYNC_COMMERCEDOCUMENTS() {
  const { general } = store.getState()
  if (!isEmpty(general.commerceDocuments)) return
  /** Load */
  yield put(ACTION_configLoading({ loading: true }))
  const success = yield call(loadCommerceDocuments)
  yield put({
    type: actions.LOAD_COMMERCEDOCUMENTS,
    payload: success.data,
  })
  yield put(
    ACTION_configLoading({ loading: false, message: { type: SITE_MESSAGE.TYPE.SUCCESS.HTTP } }),
  )
}

export function* LOAD_ASYNC_TYPETICKETS() {
  /** Prevent reloading */
  const { general } = store.getState()
  if (!isEmpty(general.typeTickets)) return
  /** Load */
  yield put(ACTION_configLoading({ loading: true }))
  const success = yield call(loadTypeTickets)
  yield put({
    type: actions.LOAD_TYPETICKETS,
    payload: success.data,
  })
  yield put(
    ACTION_configLoading({ loading: false, message: { type: SITE_MESSAGE.TYPE.SUCCESS.HTTP } }),
  )
}

export function* LOAD_ASYNC_PAYMENTCYCLE() {
  const { general } = store.getState()
  if (!isEmpty(general.paymentCycle)) return
  yield put(ACTION_configLoading({ loading: true }))
  const success = yield call(loadPaymentCycle)
  yield put({
    type: actions.LOAD_CATALOG_GENERAL,
    payload: { paymentCycle: success.data },
  })
  yield put(
    ACTION_configLoading({ loading: false, message: { type: SITE_MESSAGE.TYPE.SUCCESS.HTTP } }),
  )
}

export function* LOAD_ASYNC_TYPETACCOUNT() {
  const { general } = store.getState()
  if (!isEmpty(general.typeAccount)) return
  yield put(ACTION_configLoading({ loading: true }))
  const success = yield call(loadTypeAccount)
  yield put({
    type: actions.LOAD_CATALOG_GENERAL,
    payload: { typeAccount: success.data },
  })
  yield put(
    ACTION_configLoading({ loading: false, message: { type: SITE_MESSAGE.TYPE.SUCCESS.HTTP } }),
  )
}

export function* LOAD_ASYNC_TYPESERVICE() {
  const { general } = store.getState()
  if (!isEmpty(general.typeService)) return
  yield put(ACTION_configLoading({ loading: true }))
  const success = yield call(loadTypeService)
  yield put({
    type: actions.LOAD_CATALOG_GENERAL,
    payload: { typeService: success.data },
  })
  yield put(
    ACTION_configLoading({ loading: false, message: { type: SITE_MESSAGE.TYPE.SUCCESS.HTTP } }),
  )
}

export default function* rootSaga() {
  yield all([
    takeEvery(
      actions.LOAD_ASYNC_CITIES,
      safeSagaRequest(LOAD_ASYNC_CITIES, actions.LOAD_ASYNC_CITIES),
    ),
    takeEvery(
      actions.LOAD_ASYNC_PAYMENTMETHODS,
      safeSagaRequest(LOAD_ASYNC_PAYMENTMETHODS, actions.LOAD_ASYNC_PAYMENTMETHODS),
    ),
    takeEvery(
      actions.LOAD_ASYNC_COMMERCEDOCUMENTS,
      safeSagaRequest(LOAD_ASYNC_COMMERCEDOCUMENTS, actions.LOAD_ASYNC_COMMERCEDOCUMENTS),
    ),
    takeEvery(
      actions.LOAD_ASYNC_TYPETICKETS,
      safeSagaRequest(LOAD_ASYNC_TYPETICKETS, actions.LOAD_ASYNC_TYPETICKETS),
    ),
    takeEvery(
      actions.LOAD_ASYNC_PAYMENTCYCLE,
      safeSagaRequest(LOAD_ASYNC_PAYMENTCYCLE, actions.LOAD_ASYNC_PAYMENTCYCLE),
    ),
    takeEvery(
      actions.LOAD_ASYNC_TYPESERVICE,
      safeSagaRequest(LOAD_ASYNC_TYPESERVICE, actions.LOAD_ASYNC_TYPESERVICE),
    ),
    takeEvery(
      actions.LOAD_ASYNC_TYPETACCOUNT,
      safeSagaRequest(LOAD_ASYNC_TYPETACCOUNT, actions.LOAD_ASYNC_TYPETACCOUNT),
    ),
  ])
}
