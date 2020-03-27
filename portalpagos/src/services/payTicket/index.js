import { publicAxios } from 'services'
import endpoints from 'constants/endpoints'

export function payTicketData(datos) {
  return publicAxios().request({
    method: 'post',
    url: endpoints.PAY.TICKET,
    data: datos,
  })
}

export default { payTicketData }
