import { all, takeEvery, put, call } from 'redux-saga/effects'
import { notification } from 'antd'
import { getStores } from 'services/stores'
import actions from './actions'

export function* GET_STORES({ payload }) {
  const success = yield call(getStores, payload)
  if (success) {
    yield put({
      type: actions.LOAD,
      payload: [...success],
    })
  } else {
    notification.error({
      message: 'Tiendas no obtenidas',
      description: 'Porfavor verifique su conexión a internet y refresque el sitio web',
    })
  }
}

export default function* stores() {
  yield all([takeEvery(actions.LOAD_ASYNC, GET_STORES)])
}
