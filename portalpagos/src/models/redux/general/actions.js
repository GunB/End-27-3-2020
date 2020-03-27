const actions = {
  LOAD_CITIES: 'general/LOAD_CITIES',
  LOAD_ASYNC_CITIES: 'general/LOAD_ASYNC_CITIES',
  LOAD_PAYMENTMETHODS: 'general/LOAD_PAYMENTMETHODS',
  LOAD_ASYNC_PAYMENTMETHODS: 'general/LOAD_ASYNC_PAYMENTMETHODS',
  LOAD_COMMERCEDOCUMENTS: 'general/LOAD_COMMERCEDOCUMENTS',
  LOAD_ASYNC_COMMERCEDOCUMENTS: 'general/LOAD_ASYNC__COMMERCEDOCUMENTS',
  LOAD_TYPETICKETS: 'general/LOAD_TYPETICKETS',
  LOAD_ASYNC_TYPETICKETS: 'general/LOAD_ASYNC_TYPETICKETS',
  LOAD_CATALOG_GENERAL: 'general/LOAD_CATALOG_GENERAL',
  LOAD_ASYNC_PAYMENTCYCLE: 'general/LOAD_ASYNC_PAYMENTCYCLE',
  LOAD_ASYNC_TYPESERVICE: 'general/LOAD_ASYNC_TYPESERVICE',
  LOAD_ASYNC_TYPETACCOUNT: 'general/LOAD_ASYNC_TYPETACCOUNT',
}

export const ACTION_LoadAllCities = () => ({
  type: actions.LOAD_ASYNC_CITIES,
})

export const ACTION_LoadPaymenMethods = () => ({
  type: actions.LOAD_ASYNC_PAYMENTMETHODS,
})

export const ACTION_LoadCommerceDocuments = () => ({
  type: actions.LOAD_ASYNC_COMMERCEDOCUMENTS,
})

export const ACTION_LoadTypeTickets = () => ({
  type: actions.LOAD_ASYNC_TYPETICKETS,
})

export const ACTION_LoadPaymentCycle = () => ({
  type: actions.LOAD_ASYNC_PAYMENTCYCLE,
})
export const ACTION_LoadTypeService = () => ({
  type: actions.LOAD_ASYNC_TYPESERVICE,
})
export const ACTION_LoadTypeAccount = () => ({
  type: actions.LOAD_ASYNC_TYPETACCOUNT,
})
export default actions
