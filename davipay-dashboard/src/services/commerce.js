/* eslint-disable import/prefer-default-export */
import { notification } from 'antd'
import { ENDPOINTS } from 'constant/endPoints'
import axios from 'axios'

export async function getCommerce(bodyFormData) {
  return axios({
    method: 'get',
    url: `${ENDPOINTS.COMERCIO.GET}`,
    data: bodyFormData,
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).token}`,
    },
  })
    .then(response => {
      return response.data.data.commerce
    })
    .catch(errorHandler => {
      notification.error({
        message: 'Error',
        description: `Hubo un error intente mas tarde. ${errorHandler}`,
      })
      return Promise.reject(errorHandler)
    })
}
