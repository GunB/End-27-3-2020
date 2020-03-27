import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import user from './user/reducers'
import commerce from './commerce/reducers'
import config from './config/reducers'
import historialTransacciones from './reportes/reducers'
import payMethod from './payMethod/reducers'
import general from './general/reducers'
import payTicket from './payTicket/reducers'
import factura from './factura/reducers'
import commercePublic from './commercePublic/reducers'

export default history =>
  combineReducers({
    router: connectRouter(history),
    user,
    commerce,
    config,
    historialTransacciones,
    payMethod,
    general,
    payTicket,
    factura,
    commercePublic,
  })
