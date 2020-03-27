import SITE_MESSAGE from 'constants/site_message'
import commerce from 'models/redux/commerce/actions'
import auth from 'models/redux/user/actions'
import factura from 'models/redux/factura/actions'

export const data = {
  [`${SITE_MESSAGE.TYPE.ERROR.HTTP}`]: 'No pudimos cargar los datos',
  [`${SITE_MESSAGE.TYPE.ERROR.HTTP}${commerce.LOAD_ASYNC_COMMERCE_CATEGORY}`]: 'Verifique que su conexión a Internet esté funcionando correctamente e intente nuevamente',
  [`${SITE_MESSAGE.TYPE.ERROR.HTTP}${auth.LOGIN}-title`]: 'Datos incorrectos',
  [`${SITE_MESSAGE.TYPE.ERROR.HTTP}${auth.LOGIN}`]: 'Verifique usuario y contraseña e intente nuevamente',
  [`${SITE_MESSAGE.TYPE.ERROR.HTTP}${factura.SET_FACTURA}-title`]: 'Cargar Factura',
  [`${SITE_MESSAGE.TYPE.ERROR.HTTP}${factura.SET_FACTURA}`]: 'No se pudo cargar la factura',
  [`${SITE_MESSAGE.TYPE.ERROR.HTTP}${factura.SET_FACTURA_FILE}-title`]: 'Cargar Factura',
  [`${SITE_MESSAGE.TYPE.ERROR.HTTP}${factura.SET_FACTURA_FILE}`]: 'No se pudo cargar el archivo de facturas',
}

export default {
  data,
}
