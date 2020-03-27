import { all, takeEvery, put, call } from 'redux-saga/effects'
import { notification } from 'antd'
import { getProducts } from 'services/products'
import actions from './actions'

export function* GET_PRODUCTS({ payload }) {
  const success = yield call(getProducts, payload)
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

export default function* products() {
  yield all([takeEvery(actions.LOAD_ASYNC, GET_PRODUCTS)])
}
