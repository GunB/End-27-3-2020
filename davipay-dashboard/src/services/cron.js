/* eslint-disable import/prefer-default-export */
import { notification } from 'antd'
import { ENDPOINTS } from 'constant/endPoints'
import axios from 'axios'

export async function runCron(bodyFormData) {
  return axios({
    method: 'post',
    url: `${ENDPOINTS.CRONS.RUN}`,
    data: bodyFormData,
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).token}`,
    },
  })
    .then(response => {
      return response.data
    })
    .catch(errorHandler => {
      notification.error({
        message: 'Error',
        description: `Hubo un error intente mas tarde. ${errorHandler}`,
      })
      return Promise.reject(errorHandler)
    })
}
