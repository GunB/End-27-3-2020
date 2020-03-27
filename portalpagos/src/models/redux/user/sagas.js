import { all, takeEvery, put, call } from 'redux-saga/effects'
import store from 'store'
import { verifyAccount, login } from 'services/user'
import { LOCALSTORAGE_SESSION_ATTRIBUTE } from 'constants/base'
import { SITE_MESSAGE } from 'constants/site_message'
import { isAutoStyleNoneDefault } from 'helpers/defineStyle'
import { safeSagaRequest } from 'helpers/safeSaga'
import actions from './actions'
import { ACTION_configLoading } from '../config/actions'

export function* LOGIN({ payload: { email, password } }) {
  yield put(ACTION_configLoading())
  const success = yield call(login, { credential: email, password })
  const user = success.user || success.user_admin
  yield put({
    type: actions.LOAD_CURRENT_ACCOUNT,
    payload: { ...success.data, user },
  })
}

export function* LOAD_CURRENT_ACCOUNT(
  { payload: { token, admin_user: user_data, ...data } },
  auto = false,
) {
  let response
  try {
    response = yield call(verifyAccount, { token, ...data })
    /** Guardado de datos en local Storage */
    /** Se definio que no va a existir una persistencia del token */
    //store.set(LOCALSTORAGE_SESSION_ATTRIBUTE, { token, ...data })
  } catch (e) {
    response = null
  }

  if (response) {
    yield put({
      type: actions.SET_STATE,
      payload: {
        user_data: {
          ...data,
          ...user_data,
        },
        token,
        authorized: true,
      },
    })

    yield put(
      ACTION_configLoading({
        loading: false,
        message: {
          type: SITE_MESSAGE.TYPE.SUCCESS.HTTP,
          title: actions.LOAD_CURRENT_ACCOUNT,
          style: isAutoStyleNoneDefault(auto),
        },
      }),
    )
    // yield put({ type: actions.LOAD_MENU })
  } else {
    yield put({
      type: actions.SET_STATE,
    })
    store.clearAll()
    yield put(
      ACTION_configLoading({
        loading: false,
        message: {
          type: SITE_MESSAGE.TYPE.ERROR.HTTP,
          title: actions.LOAD_CURRENT_ACCOUNT,
          style: isAutoStyleNoneDefault(auto),
        },
      }),
    )
  }
}

export function* LOGOUT() {
  // yield call(logout)
  store.clearAll()
  yield put({
    type: actions.SET_STATE,
  })
}

export default function* rootSaga() {
  const dataUser = {
    payload: {},
  }
  const userLS = store.get(LOCALSTORAGE_SESSION_ATTRIBUTE)

  if (userLS) {
    try {
      dataUser.payload = userLS
    } catch (e) {
      dataUser.payload = {}
    }
  }

  yield all([
    takeEvery(actions.LOGIN, safeSagaRequest(LOGIN, actions.LOGIN)),
    takeEvery(actions.LOAD_CURRENT_ACCOUNT, LOAD_CURRENT_ACCOUNT),
    takeEvery(actions.LOGOUT, safeSagaRequest(LOGOUT, actions.LOGOUT)),
    LOAD_CURRENT_ACCOUNT(dataUser, true), // run once on app load to check user auth
  ])
}
