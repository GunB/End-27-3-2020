import { all, takeEvery, put as putAction, call } from 'redux-saga/effects'
import { typeMethod } from 'services/payMethod'
import actions, { setPayMethodData } from './actions'

export function* PAY_METHOD() {
  yield putAction(setPayMethodData({ loading: true }))
  yield putAction(setPayMethodData({ payMethod: [] }))
  try {
    const success = yield call(typeMethod)
    yield putAction(setPayMethodData({ payMethod: success.data }))
  } catch (error) {
    console.log(error)
  }
  yield putAction(setPayMethodData({ loading: false }))
}

export default function* rootSaga() {
  yield all([takeEvery(actions.LOAD_ASYNC, PAY_METHOD)])
}
