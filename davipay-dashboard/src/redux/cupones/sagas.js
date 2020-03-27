import { all, takeEvery, put, call } from 'redux-saga/effects'
import { push } from 'react-router-redux'
import { notification } from 'antd'
import { getCupones, createCupon } from 'services/cupon'
import actions from './actions'

export function* GET_CUPONES() {
  const success = yield call(getCupones)
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

export function* CREATE_CUPON({ payload }) {
  notification.info({
    message: 'Creando su cupon...',
    description: 'Porfavor espere un momento.',
  })
  const success = yield call(createCupon, payload)
  console.log(success)
  if (success) {
    notification.success({
      message: 'Cupon creado correctamente',
      description: 'Los datos han sido correctamente creados en la base de datos.',
    })
    yield put(push('/dashboard/alpha'))
  } else {
    notification.error({
      message: 'Cupon no creado',
      description: 'Porfavor verifique su conexión a internet y refresque el sitio web',
    })
  }
}

export default function* cupones() {
  yield all([
    takeEvery(actions.LOAD_ASYNC, GET_CUPONES),
    takeEvery(actions.CREATE_ASYC, CREATE_CUPON),
  ])
}
