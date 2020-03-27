import { all, takeEvery, put, call } from 'redux-saga/effects'
import { notification } from 'antd'
import { getCommerce } from 'services/commerce'
import actions from './actions'

export function* GET_COMMERCE() {
  const success = yield call(getCommerce)
  if (success) {
    yield put({
      type: actions.LOAD,
      payload: [...success],
    })
  } else {
    notification.error({
      message: 'Comercios no obtenidos',
      description: 'Porfavor verifique su conexión a internet y refresque el sitio web',
    })
  }
}

export default function* commerce() {
  yield all([takeEvery(actions.LOAD_ASYNC, GET_COMMERCE)])
}
