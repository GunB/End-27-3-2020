import { publicAxios, privateAxios } from 'services'
import endpoints from 'constants/endpoints'

export const loadPublicCommerceAll = () =>
  publicAxios().request({
    method: 'get',
    url: endpoints.COMMERCE.GET_ALL,
  })

export const loadPublicCommerceCategories = () =>
  publicAxios().request({
    method: 'get',
    url: endpoints.COMMERCE_ATTR.CATEGORIES,
  })

export const loadCommerceAll = urlPass =>
  privateAxios().request({
    method: 'get',
    url: urlPass,
  })

export function createCommerce(datos) {
  return privateAxios().request({
    method: 'post',
    url: endpoints.COMMERCE_ATTR.CREATE,
    data: datos,
  })
}
export default {
  loadPublicCommerceAll,
  loadPublicCommerceCategories,
  loadCommerceAll,
}
