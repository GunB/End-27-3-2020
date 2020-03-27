const actions = {
  LOAD: 'commerce/LOAD',
  LOAD_ASYNC: 'commerce/LOAD_ASYNC',
  LOAD_ASYNC_CATEGORY: 'commerce/LOAD_ASYNC_CATEGORY',
  LOAD_CATEGORY: 'commerce/LOAD_CATEGORY',
  LOAD_ASYNC_COMMERCE_CATEGORY: 'commerce/LOAD_ASYNC_COMMERCE_CATEGORY',
  LOAD_CATEGORIZED_COMMERCE: 'commerce/LOAD_CATEGORIZED_COMMERCE',
}

export const ACTION_LoadCommerce = () => ({
  type: actions.LOAD_ASYNC,
})

export const ACTION_LoadCategories = () => ({
  type: actions.LOAD_ASYNC_CATEGORY,
})

export const ACTION_LoadCommerceCategories = () => ({
  type: actions.LOAD_ASYNC_COMMERCE_CATEGORY,
})

export const ACTION_SAGA_loadCommerce = (commerce = []) => ({
  type: actions.LOAD,
  payload: commerce,
})

export const ACTION_SAGA_loadCategories = (categories = []) => ({
  type: actions.LOAD_CATEGORY,
  payload: categories,
})

export const ACTION_SAGA_loadCategorizedCommerce = (groupedCommerce = { 0: [] }) => ({
  type: actions.LOAD_CATEGORIZED_COMMERCE,
  payload: groupedCommerce,
})

export default actions
