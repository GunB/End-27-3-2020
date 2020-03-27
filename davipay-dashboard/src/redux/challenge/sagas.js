import { all, takeEvery, put, call } from 'redux-saga/effects'
import { notification } from 'antd'
import { getChallenges } from 'services/challenge'
import actions from './actions'

export function* GET_CHALLENGES() {
  const success = yield call(getChallenges)
  if (success) {
    yield put({
      type: actions.LOAD,
      payload: [...success],
    })
  } else {
    notification.error({
      message: 'Cupones no obtenidos',
      description: 'Porfavor verifique su conexión a internet y refresque el sitio web',
    })
  }
}

export default function* cupones() {
  yield all([takeEvery(actions.LOAD_ASYNC, GET_CHALLENGES)])
}
