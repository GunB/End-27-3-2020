import { all } from 'redux-saga/effects'
import user from './user/sagas'
import commerce from './commerce/sagas'
import payMethod from './payMethod/sagas'
import payTicket from './payTicket/sagas'
import general from './general/sagas'
import factura from './factura/sagas'
import commercePublic from './commercePublic/sagas'

export default function* rootSaga() {
  yield all([user(), commerce(), payMethod(), payTicket(), general(), factura(), commercePublic()])
}
