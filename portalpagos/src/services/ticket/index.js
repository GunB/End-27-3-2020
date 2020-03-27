import { privateAxios, privateAxiosForm, publicAxios } from 'services'
import endpoints from 'constants/endpoints'

export function createFactura(datos) {
  return privateAxios().request({
    method: 'post',
    url: endpoints.TICKET.CREATE,
    data: datos,
  })
}

export function createFacturaFile(datos) {
  return privateAxiosForm().request({
    method: 'post',
    url: endpoints.TICKET.IMPORT,
    data: datos,
  })
}

export function getFactura(datos) {
  return publicAxios().request({
    method: 'get',
    url: `${endpoints.TICKET.GET_BY_COMMERCE_BY_PERSON}${datos.commerce_id}/person/${datos.document_type}/${datos.document_number}`,
  })
}
export default { createFactura }
