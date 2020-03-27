import SITE_MESSAGE from 'constants/site_message'
import { put, call } from 'redux-saga/effects'
import { ACTION_configLoading } from 'models/redux/config/actions'

export function* genericSagaHTTPError(actionCalled, error) {
  console.error(error)
  console.error(actionCalled)
  yield put(
    ACTION_configLoading({
      loading: false,
      message: {
        type: SITE_MESSAGE.TYPE.ERROR.HTTP,
        title: `${actionCalled}`,
        info: error,
      },
    }),
  )
}

export const safeSagaRequest = (saga, actionCalled, recovery = genericSagaHTTPError, ...args) =>
  function* genSafeSaga(action) {
    try {
      yield call(saga, ...args, action)
    } catch (err) {
      yield call(recovery, actionCalled, ...args, err)
    }
  }

export default { genericSagaHTTPError, safeSagaRequest }
