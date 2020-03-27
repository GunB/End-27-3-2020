import { publicAxios, privateAxiosForm } from 'services'
import endpoints from 'constants/endpoints'
import Axios from 'axios'

export function loadCities() {
  return publicAxios().request({
    url: `${endpoints.GENERAL.CITIES}`,
  })
}

export function loadPaymentMethods() {
  return publicAxios().request({
    url: `${endpoints.METHOD.PAY}`,
  })
}

export function loadPersonDocuments() {
  return publicAxios().request({
    url: `${endpoints.METHOD.PERSON_DOC}`,
  })
}

export function loadCommerceDocuments() {
  return publicAxios().request({
    url: `${endpoints.METHOD.COMMERCE_DOC}`,
  })
}

export function loadTypeTickets() {
  return publicAxios().request({
    url: `${endpoints.METHOD.TYPE_TICKETS}`,
  })
}

export function loadPaymentCycle() {
  return publicAxios().request({
    url: `${endpoints.METHOD.PAYMENT_CYCLE}`,
  })
}

export function loadTypeAccount() {
  return publicAxios().request({
    url: `${endpoints.METHOD.TYPE_ACCOUNT}`,
  })
}

export function loadTypeService() {
  return publicAxios().request({
    url: `${endpoints.METHOD.TYPE_SERVICE}`,
  })
}

export function uploadFile(datos) {
  return privateAxiosForm().request({
    method: 'post',
    url: endpoints.GENERAL.FILE,
    data: datos,
  })
}

export function uploadImage(datos) {
  return privateAxiosForm().request({
    method: 'post',
    url: endpoints.GENERAL.FILE_IMAGE,
    data: datos,
  })
}

export function loadIp() {
  return Axios.request({
    url: 'https://api.ipify.org?format=json',
  })
}
export default { loadCities }
