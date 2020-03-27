export default {}

export const ENVIROMENT = process.env.NODE_ENV
export const HOST_SITE_ENDPOINTS =
  process.env.REACT_APP_PORTALPAGOS_ENDPOINTS || 'http://localhost:5000'
export const SITE_NAME = process.env.REACT_APP_PORTALPAGOS_SITE_NAME || 'Web Site'
export const LOCALSTORAGE_SESSION_ATTRIBUTE = 'user'
export const RECAPTCHA_KEY = process.env.REACT_APP_PORTALPAGOS_RECAPTCHA_SITE_KEY
export const JWT_SECRET = process.env.REACT_APP_PORTALPAGOS_JWT_SECRET
