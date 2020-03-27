import { notification, message } from 'antd'
import { ENDPOINTS } from 'constant/endPoints'
import Axios from 'axios'
import { getAuth } from './user'

const errorHandler = error => {
  notification.warning({
    message: error.code,
    description: error.message,
  })
  return Promise.reject(error)
}

export async function getCupones() {
  const hide = message.loading('Cargando datos...', 0)
  return new Promise((resolve, reject) => {
    Axios({
      method: 'get',
      url: `${ENDPOINTS.CUPON.GET}`,
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).token}`,
      },
      credentials: 'same-origin',
    })
      .then(response => {
        hide()
        const cupones = Object.keys(response.data.data.coupons).map(
          k => response.data.data.coupons[k],
        )
        resolve(
          [...cupones].sort((a, b) => {
            return b.id - a.id
          }),
        )
      })
      .catch(error => reject(error))
  })
}

export async function getCupon(id) {
  return Axios({
    method: 'get',
    url: `${ENDPOINTS.CUPON.GET_ONE}${id}`,
    headers: getAuth(),
    credentials: 'same-origin',
  })
    .then(response => {
      const {
        data: { coupons = null },
      } = response.data
      if (coupons && Array.isArray(coupons) && coupons.length === 1) {
        return coupons[0]
      }
      return Promise.reject(
        new Error({
          message: 'El cupon no fue correctamente encontrado',
          code: 401,
          data: response.data,
        }),
      )
    })
    .catch(errorHandler)
}

export async function validateCupon(code) {
  return Axios({
    method: 'get',
    url: `${ENDPOINTS.CUPON.VALIDATE}${code}`,
    headers: getAuth(),
    credentials: 'same-origin',
  }).then(response => {
    const { data } = response
    if (data.Status) {
      return data
    }
    notification.warning({
      message: 'Codigo no valido',
      description: 'El codigo no pudo ser validado o ya existe. Intente uno nuevo',
    })
    return Promise.reject(response)
  })
}

export async function createCupon(cupon) {
  return Axios({
    method: 'post',
    url: `${ENDPOINTS.CUPON.CREATE}`,
    headers: getAuth(),
    data: { ...cupon },
    credentials: 'same-origin',
  })
    .then(response => {
      return response
    })
    .catch(errorHandler)
}

export async function updateCupon(cupon) {
  return Axios({
    method: 'post',
    url: `${ENDPOINTS.CUPON.UPDATE}`,
    headers: getAuth(),
    data: { ...cupon },
    credentials: 'same-origin',
  })
    .then(response => response.data)
    .catch(errorHandler)
}

export async function deleteCupon(cupon) {
  return Axios({
    method: 'post',
    url: `${ENDPOINTS.CUPON.DELETE}`,
    headers: getAuth(),
    data: { ...cupon },
    credentials: 'same-origin',
  })
    .then(response => response.data)
    .catch(errorHandler)
}

export async function aproveCupon(cupon) {
  return Axios({
    method: 'post',
    url: `${ENDPOINTS.CUPON.CHANGE_STATUS}`,
    headers: getAuth(),
    data: { id: cupon.id, status: '1' },
    credentials: 'same-origin',
  })
    .then(response => response.data)
    .catch(errorHandler)
}

export async function rejectCupon(cupon) {
  return Axios({
    method: 'post',
    url: `${ENDPOINTS.CUPON.CHANGE_STATUS}`,
    headers: getAuth(),
    data: { id: cupon.id, status: '2' },
    credentials: 'same-origin',
  })
    .then(response => response.data)
    .catch(errorHandler)
}

export async function detenerCupon(cupon) {
  return Axios({
    method: 'post',
    url: `${ENDPOINTS.CUPON.STOP}`,
    headers: getAuth(),
    data: { id: cupon.id, status: '3' },
    credentials: 'same-origin',
  })
    .then(response => response.data)
    .catch(errorHandler)
}

export default {
  getCupones,
  getCupon,
  createCupon,
  updateCupon,
  deleteCupon,
}
