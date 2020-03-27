/* eslint-disable import/prefer-default-export */
import { notification } from 'antd'
import { ENDPOINTS } from 'constant/endPoints'
import axios from 'axios'
import { getAuth } from './user'

export async function createCampania(bodyFormData) {
  return axios({
    method: 'post',
    url: `${ENDPOINTS.CAMPANIA.CREATE}`,
    data: bodyFormData,
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).token}`,
    },
  })
    .then(() => {
      notification.success({
        message: 'Exito',
        description: 'Se ha enviado la campaña con exito',
      })
      return null
    })
    .catch(errorHandler => {
      notification.error({
        message: 'Error',
        description: `Hubo un error intente mas tarde. ${errorHandler}`,
      })
      return Promise.reject(errorHandler)
    })
}

export async function duplicateCampania(data) {
  return axios({
    method: 'post',
    url: `${ENDPOINTS.CAMPANIA.DUPLICATE}`,
    data,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).token}`,
    },
  })
    .then(() => {
      notification.success({
        message: 'Exito',
        description: 'Se ha duplicado la campaña con exito',
      })
      return null
    })
    .catch(errorHandler => {
      notification.error({
        message: 'Error',
        description: `Hubo un error intente mas tarde.${errorHandler}`,
      })
      return Promise.reject(errorHandler)
    })
}

export async function editCampania(bodyFormData) {
  return axios({
    method: 'post',
    url: `${ENDPOINTS.CAMPANIA.EDIT}`,
    data: bodyFormData,
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).token}`,
    },
  })
    .then(() => {
      notification.success({
        message: 'Exito',
        description: 'Se ha actualizado la campaña con exito',
      })
      return null
    })
    .catch(errorHandler => {
      notification.error({
        message: 'Error',
        description: `Hubo un error intente mas tarde.`,
      })
      return Promise.reject(errorHandler)
    })
}

export async function getAllCampaigns(search) {
  return axios({
    method: 'get',
    url: `${ENDPOINTS.CAMPANIA.GET_ALL}?name=${search}`,
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).token}`,
    },
  })
    .then(response => {
      const data = response.data.data.campaigns
      return [...data].sort((a, b) => {
        return b.id - a.id
      })
    })
    .catch(errorHandler => {
      notification.error({
        message: 'Error',
        description: `Hubo un error intente mas tarde.${errorHandler}`,
      })
      return Promise.reject(errorHandler)
    })
}

export async function getAllCampaignById(id) {
  return axios({
    method: 'get',
    url: `${ENDPOINTS.CAMPANIA.GET_BY_ID}${id}`,
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).token}`,
    },
  })
    .then(response => {
      return response.data.data.campaigns
    })
    .catch(errorHandler => {
      notification.error({
        message: 'Error',
        description: `Hubo un error intente mas tarde.${errorHandler}`,
      })
      return Promise.reject(errorHandler)
    })
}

export async function getAllSegments() {
  return axios({
    method: 'get',
    url: `${ENDPOINTS.SEGMENTS.GET_ALL}`,
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).token}`,
    },
  })
    .then(response => {
      return response.data.data.segments
    })
    .catch(errorHandler => {
      notification.error({
        message: 'Error',
        description: `Hubo un error intente mas tarde.${errorHandler}`,
      })
      return Promise.reject(errorHandler)
    })
}

export async function removeCampaignService(id) {
  const bodyFormData = new FormData()
  bodyFormData.append('id', id)
  return axios({
    method: 'post',
    url: `${ENDPOINTS.CAMPANIA.DELETE}`,
    data: bodyFormData,
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).token}`,
    },
  })
    .then(() => {
      notification.success({
        message: 'Exito',
        description: 'Se ha eliminado la campaña con exito',
      })
      return null
    })
    .catch(errorHandler => {
      notification.error({
        message: 'Error',
        description: `Hubo un error intente mas tarde.`,
      })
      return Promise.reject(errorHandler)
    })
}

export async function validateCampaign(code) {
  return axios({
    method: 'get',
    url: `${ENDPOINTS.CAMPANIA.VALIDATE}${code}`,
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
