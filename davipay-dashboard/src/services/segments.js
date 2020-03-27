/* eslint-disable import/prefer-default-export */
import { notification } from 'antd'
import { ENDPOINTS } from 'constant/endPoints'
import axios from 'axios'

export async function getSegments(bodyFormData) {
  return axios({
    method: 'get',
    url: `${ENDPOINTS.SEGMENTS.GET_ALL}`,
    data: bodyFormData,
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).token}`,
    },
  })
    .then(response => {
      return response.data.data.segments
    })
    .catch(errorHandler => {
      notification.error({
        message: 'Error',
        description: `Hubo un error intente mas tarde. ${errorHandler}`,
      })
      return Promise.reject(errorHandler)
    })
}

export async function createSegment(bodyFormData) {
  const formData = new FormData()
  const keys = Object.keys(bodyFormData)
  keys.forEach(k => {
    formData.set(k, bodyFormData[k])
  })

  return axios({
    method: 'post',
    url: `${ENDPOINTS.SEGMENTS.CREATE}`,
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).token}`,
    },
  })
    .then(response => {
      return response
    })
    .catch(errorHandler => {
      notification.error({
        message: 'Error',
        description: `Hubo un error intente mas tarde. ${errorHandler}`,
      })
      return Promise.reject(errorHandler)
    })
}
