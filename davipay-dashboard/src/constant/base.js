export const PROCESS_ENV = process.env.NODE_ENV
if (PROCESS_ENV === 'development') console.log(process.env)
export const BASE_SITE = process.env.REACT_APP_PUBLIC_URL
export const SITE_NAME = process.env.REACT_APP_DAVIPAY_MARVEL_SITE_NAME
export const HOST_SITE_ENDPOINTS = process.env.REACT_APP_DAVIPAY_MARVEL_ENDPOINTS
export const RECAPTCHA_SITE_KEY = process.env.REACT_APP_DAVIPAY_MARVEL_RECAPTCHA_SITE_KEY
export const JWT_SECRET = process.env.REACT_APP_DAVIPAY_MARVEL_JWT_SECRET
export const ENV_THEME = (() => {
  let resp = {}
  if (process.env.REACT_APP_DAVIPAY_MARVEL_THEME) {
    resp = JSON.parse(process.env.REACT_APP_DAVIPAY_MARVEL_THEME.replace(/'/g, '"'))
  }
  return resp
})()
