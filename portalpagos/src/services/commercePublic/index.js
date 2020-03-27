import { publicAxios } from 'services'
import endpoints from 'constants/endpoints'

export const cardCommerce = () =>
  publicAxios().request({
    method: 'get',
    url: endpoints.PUBLIC.COMMERCE,
  })

export const getCommerceId = idCommerce =>
  publicAxios().request({
    method: 'get',
    url: `${endpoints.PUBLIC.COMMERCE}/${idCommerce}`,
  })

export const getBankCommerceId = idCommerce =>
  publicAxios().request({
    method: 'get',
    url: `${endpoints.PUBLIC.BANKS}/${idCommerce}/banks`,
  })

export const getTransactionId = idCommerce =>
  publicAxios().request({
    method: 'get',
    url: `${endpoints.PUBLIC.TRANSACTION}${idCommerce}`,
  })

export default {
  cardCommerce,
}
