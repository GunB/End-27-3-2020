import { HOST_SITE_ENDPOINTS } from 'constants/base'
import store from 'models/store'
import Axios from 'axios'
import urlTemplate from 'url-template'
import { isEmpty } from 'helpers/isEmpty'

export const AxiosInterceptorBefore = config => {
  // Do something before request is sent
  if (isEmpty(config.method)) {
    config.method = 'get'
  }
  if (config.method.toLowerCase() === 'get' && !isEmpty(config.data)) {
    const data = JSON.parse(config.data)
    config.url = urlTemplate.parse(config.url).expand(data)
    console.info('AxiosBeforeInterceptor (Type GET):', config.url, config)
  }
  return config
}

export const AxiosInterceptorAfter = response => {
  console.info('AxiosAfterInterceptor (GOT):', response)
  if (response.data && response.data.status && response.data.status.toLowerCase() === 'error') {
    return Promise.reject(response)
  }
  const interpreted = {
    ...response,
    data: response.data.data,
  }
  console.info('AxiosAfterInterceptor (TRANSFORMED):', interpreted)
  return interpreted
}

let publicAxiosInstance = null

export const privateAxios = () => {
  const {
    user: { token },
  } = store.getState()
  const privateAxiosInstance = Axios.create({
    baseURL: HOST_SITE_ENDPOINTS,
    //timeout: 2500,
    headers: {
      session_token: `${token}`,
    },
    credentials: 'same-origin',
  })
  privateAxiosInstance.interceptors.request.use(AxiosInterceptorBefore)
  privateAxiosInstance.interceptors.response.use(AxiosInterceptorAfter)
  return privateAxiosInstance
}

export const privateAxiosForm = () => {
  const {
    user: { token },
  } = store.getState()
  const privateAxiosInstance = Axios.create({
    baseURL: HOST_SITE_ENDPOINTS,
    //timeout: 2500,
    headers: {
      session_token: `${token}`,
      'Content-Type': 'multipart/form-data',
    },
    credentials: 'same-origin',
  })
  privateAxiosInstance.interceptors.request.use(AxiosInterceptorBefore)
  privateAxiosInstance.interceptors.response.use(AxiosInterceptorAfter)
  return privateAxiosInstance
}

export const publicAxios = () => {
  if (isEmpty(publicAxiosInstance)) {
    publicAxiosInstance = Axios.create({
      baseURL: HOST_SITE_ENDPOINTS,
      //timeout: 2500,
      credentials: 'same-origin',
    })
    publicAxiosInstance.interceptors.request.use(AxiosInterceptorBefore)
    publicAxiosInstance.interceptors.response.use(AxiosInterceptorAfter)
  }
  return publicAxiosInstance
}

export default {
  privateAxios,
  publicAxios,
  privateAxiosForm,
}
