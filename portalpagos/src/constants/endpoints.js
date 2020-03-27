const AUTH = {
  LOGIN: `/v1/admin/login`,
}

const USER = {
  CREATE: `/v1/admin/user`,
  UPDATE: `/v1/admin/user`,
  GET: `/v1/user/admin`,
  GET_ALL: `/v1/admin/user`,
}

const USER_ATTR = {
  DOCUMENT_TYPES: `/v1/catalog/document-person`,
}

const COMMERCE = {
  GET_ALL: `/v1/public/commerce`,
  GET_PRIVATE_ALL: `/v1/admin/commerce`,
}

const COMMERCE_ATTR = {
  CATEGORIES: `/v1/catalog/category`,
  CREATE: `/v1/admin/commerce`,
}

const ROLE = {
  CREATE_ROLE: `/v1/admin/role`,
  UPDATE_ROLE: `/v1/admin/role`,
  GET: `/v1/admin/role/{id}`,
  GET_ALL: `/v1/admin/role`,
}

const TICKET = {
  CREATE: `/v1/admin/ticket`,
  IMPORT: `/v1/admin/ticket/importer`,
  GET: `/v1/ticket/{id}`,
  GET_ALL: `/v1/admin/tickets`,
  GET_BY_PERSON: `/v1/tickets/person/{document_type}/{document_number}`,
  GET_BY_COMMERCE: `/v1/tickets/commerce/{id}`,
  GET_BY_COMMERCE_BY_PERSON: `/v1/tickets/commerce/`,
}

const PAY = {
  TICKET: `/v1/transaction/pay`,
  PAY: `/v1/transaction/pay`,
}

const METHOD = {
  PAY: `/v1/catalog/payment-method`,
  PERSON_DOC: `/v1/catalog/document-person`,
  COMMERCE_DOC: `/v1/catalog/document-commerce`,
  TYPE_TICKETS: `/v1/catalog/ticket-type`,
  PAYMENT_CYCLE: `/v1/catalog/payment-cycle`,
  TYPE_ACCOUNT: `/v1/catalog/account-type`,
  TYPE_SERVICE: `/v1/catalog/service-type`,
}

const GENERAL = {
  CITIES: `/v1/city`,
  FILE: `/v1/admin/upload/file`,
  FILE_IMAGE: `/v1/admin/upload/image`,
}

const PUBLIC = {
  COMMERCE: `/v1/public/commerce`,
  BANKS: `/v1/commerce`,
  TRANSACTION: `/v1/transaction/`,
}

export default {
  AUTH,
  USER,
  ROLE,
  TICKET,
  PAY,
  METHOD,
  USER_ATTR,
  COMMERCE,
  COMMERCE_ATTR,
  GENERAL,
  PUBLIC,
}
