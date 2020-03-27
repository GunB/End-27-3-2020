import { publicAxios } from 'services'
import endpoints from 'constants/endpoints'

export const typeMethod = () =>
  publicAxios().request({
    method: 'get',
    url: endpoints.METHOD.PAY,
  })

export default {
  typeMethod,
}
