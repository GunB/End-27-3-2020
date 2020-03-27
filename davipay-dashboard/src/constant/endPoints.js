import { HOST_SITE_ENDPOINTS, BASE_SITE } from './base'

const AUTH = {
  LOGIN: `${HOST_SITE_ENDPOINTS}/login/`,
  REQUEST_RESET_PASSWORD: `${HOST_SITE_ENDPOINTS}/user/RequestResetPassword`,
  RESET_PASSWORD: `${HOST_SITE_ENDPOINTS}/user/ResetPassword`,
  USERS: `${HOST_SITE_ENDPOINTS}/user/listUsers/`,
  // LOGIN: "https://a724d7ee.ngrok.io/login"
}

const CRONS = {
  RUN: `${HOST_SITE_ENDPOINTS}/auth/cron/run`,
}

const REPORT = {
  USER: `${HOST_SITE_ENDPOINTS}/auth/report/UsersReport`,
}

const USER = {
  GET_ADMINS: `${HOST_SITE_ENDPOINTS}/auth/user/ListAdminUsers/`,
}

const THEME = {
  GET: `${HOST_SITE_ENDPOINTS}/theme/`,
}

const EXAMPLES = {
  CSV_SEGMENTOS: `${BASE_SITE}/resources/examples/segmento.csv`,
}

const CUPON = {
  GET: `${HOST_SITE_ENDPOINTS}/auth/discountCode/GetCoupons`,
  GET_ONE: `${HOST_SITE_ENDPOINTS}/auth/discountCode/GetCoupons?id=`,
  CHANGE_STATUS: `${HOST_SITE_ENDPOINTS}/auth/discountCode/ChangeStatus`,
  CREATE: `${HOST_SITE_ENDPOINTS}/auth/discountCode/CreateCoupon`,
  UPDATE: `${HOST_SITE_ENDPOINTS}/auth/discountCode/UpdateCoupon`,
  DELETE: `${HOST_SITE_ENDPOINTS}/auth/discountCode/DeleteCoupon`,
  VALIDATE: `${HOST_SITE_ENDPOINTS}/auth/discountCode/ValidCoupon?discount_code=`,
}

const CAMPANIA = {
  CREATE: `${HOST_SITE_ENDPOINTS}/auth/campaigns/CreateCampaigns`,
  DUPLICATE: `${HOST_SITE_ENDPOINTS}/auth/campaigns/DuplicateCampaigns`,
  EDIT: `${HOST_SITE_ENDPOINTS}/auth/campaigns/UpdateCampaigns`,
  DELETE: `${HOST_SITE_ENDPOINTS}/auth/campaigns/DeleteCampaigns`,
  STOP: `${HOST_SITE_ENDPOINTS}/auth/campaigns/StopCampaigns`,
  GET_ALL: `${HOST_SITE_ENDPOINTS}/auth/campaigns/GetCampaigns`,
  GET_BY_ID: `${HOST_SITE_ENDPOINTS}/auth/campaigns/GetCampaigns?id=`,
  VALIDATE: `${HOST_SITE_ENDPOINTS}/auth/campaigns/ValidCampaign?name=`,
}

const SEGMENTS = {
  GET_ALL: `${HOST_SITE_ENDPOINTS}/auth/segments/GetSegments`,
  CREATE: `${HOST_SITE_ENDPOINTS}/auth/segments/CreateSegments`,
}

const STORES = {
  GET_ONE: `${HOST_SITE_ENDPOINTS}/auth/store/GetStore?commerce_id=`,
  GET_ALL: `${HOST_SITE_ENDPOINTS}/auth/store/GetAllStore`,
}

const COMERCIO = {
  GET: `${HOST_SITE_ENDPOINTS}/auth/commerce/GetCommerce`,
}

const PRODUCTS = {
  GET: `${HOST_SITE_ENDPOINTS}/auth/storeCategory/GetStoreCategory?commerce_id=`,
}

const TIME = {
  REQUEST: 'http://worldtimeapi.org/api/ip',
  PROXY: 'https://cors-anywhere.herokuapp.com/',
}

const CHALLENGE = {
  CREATE: `${HOST_SITE_ENDPOINTS}/auth/challenge/CreateChallengeProgram`,
  GET: `${HOST_SITE_ENDPOINTS}/auth/challenge/GetChallengeProgram`,
}

export const ENDPOINTS = {
  AUTH,
  THEME,
  TIME,
  CUPON,
  COMERCIO,
  CAMPANIA,
  SEGMENTS,
  STORES,
  PRODUCTS,
  EXAMPLES,
  USER,
  CHALLENGE,
  CRONS,
  REPORT,
}

export default {
  ...ENDPOINTS,
}
