import { notification } from 'antd'
import { ENDPOINTS } from 'constant/endPoints'
import jwt from 'jsonwebtoken'
import _ from 'lodash'
import axios from 'axios'
import { store } from 'index'
import { JWT_SECRET } from 'constant/base'

export const getAuth = () => {
  const state = store.getState()
  const response = {
    'Content-Type': 'application/json',
  }
  if (state.user.token) {
    response.Authorization = `Bearer ${state.user.token.token.token}`
  }
  return {
    ...response,
  }
}

export async function login(email, password) {
  const bodyFormData = new FormData()
  bodyFormData.set('email', email)
  bodyFormData.set('password', password)
  return axios({
    method: 'post',
    url: `${ENDPOINTS.AUTH.LOGIN}`,
    data: bodyFormData,
    config: { headers: { 'Content-Type': 'multipart/form-data' } },
  }).then(response => {
    const dataSave = {
      token: response.data.token,
      expire: response.data.expire,
      email,
    }
    localStorage.setItem('user', JSON.stringify(dataSave))
    return response.data
  })
}

export function requestResetPassword(email) {
  return new Promise((resolve, reject) => {
    const bodyFormData = new FormData()
    bodyFormData.set('email', email)

    return axios({
      method: 'post',
      url: `${ENDPOINTS.AUTH.REQUEST_RESET_PASSWORD}`,
      data: bodyFormData,
      config: { headers: { 'Content-Type': 'multipart/form-data' } },
    })
      .then(response => {
        notification.success({
          message: 'Exito',
          description: 'Solictud de recuperacion de correo enviada',
        })
        resolve(response)
      })
      .catch(() => {
        notification.error({
          message: 'Error',
          description: 'No se ha podido enviar la solicitud.',
        })
        reject()
      })
  })
}

export function resetPassword(bodyFormData) {
  return new Promise((resolve, reject) => {
    return axios({
      method: 'post',
      url: `${ENDPOINTS.AUTH.RESET_PASSWORD}`,
      data: bodyFormData,
      config: { headers: { 'Content-Type': 'multipart/form-data' } },
    })
      .then(response => {
        notification.success({
          message: 'Exito',
          description: 'Se cambio la contraseña con exito',
        })
        resolve(response)
      })
      .catch(() => {
        notification.error({
          message: 'Error',
          description: 'No se ha podido enviar la solicitud.',
        })
        reject()
      })
  })
}

export function getAdmins() {
  return new Promise((resolve, reject) => {
    return axios({
      method: 'post',
      url: `${ENDPOINTS.USER.GET_ADMINS}`,
      config: { headers: { 'Content-Type': 'multipart/form-data' } },
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).token}`,
      },
    })
      .then(response => {
        resolve(response.data.data.users)
      })
      .catch(() => {
        notification.error({
          message: 'Error',
          description: 'No se ha podido enviar la solicitud. Intente nuevamente',
        })
        reject()
      })
  })
}

export async function currentAccount({ token, ...data }) {
  let decoded = {
    decoded: null,
    token: null,
  }
  if (!_.isEmpty(token)) {
    try {
      decoded = {
        decoded: jwt.verify(token, JWT_SECRET),
        token: {
          token,
          ...data,
        },
      }
    } catch (e) {
      console.log(e)
    }
  }
  return decoded
}

export async function logout() {
  /*
  return firebaseAuth()
    .signOut()
    .then(() => true)
    */
  return true
}
