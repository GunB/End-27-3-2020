/* eslint-disable import/prefer-default-export */
import { notification } from 'antd'
import { ENDPOINTS } from 'constant/endPoints'
import axios from 'axios'

export async function getReport(formData) {
  const bodyFormData = new FormData()
  Object.keys(formData).forEach(k => {
    bodyFormData.append(k, formData[k])
  })

  return axios({
    method: 'post',
    url: `${ENDPOINTS.REPORT.USER}`,
    data: bodyFormData,
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).token}`,
    },
  })
    .then(response => {
      if (response.data.status.toLowerCase() !== 'success') return new Error(response)
      return response.data.data
    })
    .catch(errorHandler => {
      notification.error({
        message: 'Error',
        description: `Hubo un error intente mas tarde. ${errorHandler}`,
      })
      return Promise.reject(errorHandler)
    })
}
