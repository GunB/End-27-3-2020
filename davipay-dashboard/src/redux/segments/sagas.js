import { all, takeEvery, put, call } from 'redux-saga/effects'
import { notification } from 'antd'
import { getSegments } from 'services/segments'
import actions from './actions'

export function* GET_SEGMENTS() {
  const success = yield call(getSegments)
  if (success) {
    yield put({
      type: actions.LOAD,
      payload: [...success],
    })
  } else {
    notification.error({
      message: 'Segmentos no obtenidos',
      description: 'Porfavor verifique su conexión a internet y refresque el sitio web',
    })
  }
}

export default function* segments() {
  yield all([takeEvery(actions.LOAD_ASYNC, GET_SEGMENTS)])
}
