import { all, takeEvery, put, call } from 'redux-saga/effects'
import { LoadAllHistorialTransacciones } from 'services/historialTransacciones'
import { SITE_MESSAGE } from 'constants/site_message'
import { safeSagaRequest } from 'helpers/safeSaga'
import actions from './actions'
import { ACTION_configLoading } from '../config/actions'

export function* LOAD_ASYNC() {
  yield put(ACTION_configLoading({ loading: true }))
  const success = yield call(LoadAllHistorialTransacciones)
  yield put({
    type: actions.LOAD,
    payload: success.data.data,
  })
  yield put(
    ACTION_configLoading({ loading: false, message: { type: SITE_MESSAGE.TYPE.SUCCESS.HTTP } }),
  )
}

export default function* rootSaga() {
  yield all([takeEvery(actions.LOAD_ASYNC, safeSagaRequest(LOAD_ASYNC, actions.LOAD_ASYNC))])
}
