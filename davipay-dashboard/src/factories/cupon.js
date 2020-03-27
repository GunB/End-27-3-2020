import { cuponStatus } from 'constant/status'

/* eslint camelcase: "off" */
// import * as uuidv4 from 'uuid/v4'

export const arrayIdToKey = (array = []) => {
  return array.map(item => ({
    ...item,
    key: parseInt(item.id, 10),
  }))
}

export const commerceUniqueWithStore = commerce => {
  if (
    Array.isArray(commerce) &&
    commerce.length === 1 &&
    commerce[0].store &&
    Array.isArray(commerce[0].store)
  ) {
    return commerce[0].store
  }
  return []
}

export const commerceUnique = commerce => {
  if (Array.isArray(commerce) && commerce.length === 1 && commerce[0].commerce_id) {
    return commerce[0].commerce_id
  }
  return undefined
}

export const commerceUniqueObject = commerce => {
  if (Array.isArray(commerce) && commerce.length === 1) {
    return commerce[0]
  }
  return undefined
}

export const uniqueCommerceSelected = data => Array.isArray(data) && data.length === 1

export const commerceSelectedToTree = ({ cupon }) => {
  let data = []
  const { commerce = undefined, Commerce = null } = cupon
  const comercios = Commerce || commerce
  if (Array.isArray(comercios)) {
    data = comercios.map(item => item.commerce_id || item.id)
  }
  return data
}

export const storeSelectedToTree = ({ cupon }) =>
  commerceUniqueWithStore(cupon.commerce).map(item => item.store_id)

const idNameToTree = (array = [], titleAll, keyPrefix) => {
  let data = []
  if (Array.isArray(array) && array.length > 0) {
    array = array.map(item => {
      return {
        ...item,
        key: `${keyPrefix}${item.id}`,
        title: item.name,
        value: parseInt(item.id, 10),
        dataRef: { ...item },
      }
    })
    data = [
      {
        key: titleAll,
        title: titleAll,
        value: 'ALL',
        children: [...array],
      },
    ]
  }
  return data
}

export const commerceToTree = (array = [], title) => {
  return idNameToTree(array, title, 'commerce_')
}

export const storesToTree = (array = [], title) => {
  return idNameToTree(array, title, 'store_')
}

/**
 * 
 * @param {*} array [{
                "id": 223347,
                "name": "Hamburguesas",
                "GetProduct": [
                    {
                        "id": 442152,
                        "name": "Burger Sencilla"
                    },
                    {
                        "id": 442153,
                        "name": "Veggie"
                    },
                    {
                        "id": 442154,
                        "name": "Burger Doble"
                    }
                ]
            }]
 */
export const categoryShowToTree = (array = []) => {
  const data = Array.isArray(array)
    ? array.map(category => ({
        title: `${category.name}`,
        key: `${category.id}`,
        value: `${category.id}`,
        children: Array.isArray(category.GetProduct)
          ? category.GetProduct.map(product => ({
              title: `${product.name}`,
              key: `${category.id}_${product.id}`,
              value: `${category.id}_${product.id}`,
            }))
          : undefined,
      }))
    : []

  return data
}

/**
 * 
 * @param {*} array [{
          category_id: 349,
          product: [
            {
              product_id: 96,
            },
          ],
        }]
 */
export const productsSelectedToTree = (array = []) => {
  let data = []
  if (Array.isArray(array)) {
    array.forEach(category => {
      if (Array.isArray(category.product)) {
        data = [
          ...data,
          ...category.product.map(product => `${category.category_id}_${product.product_id}`),
        ]
      }
    })
  }
  return data
}

export const selectedTreesToCupon = ({
  rawCommerce,
  rawProducts,
  rawStores,
  commerce = [],
  stores = [],
  products = [],
}) => {
  let newCommerce = []

  if (Array.isArray(commerce)) {
    if (commerce.length === 1) {
      if (commerce[0] !== 'ALL') {
        newCommerce.push({
          commerce_id: parseInt(commerce[0], 10),
          store: [...newStores(stores, rawStores)],
          category: newProducts(products, rawProducts),
        })
      } else {
        newCommerce = rawCommerce.map(raw => ({
          commerce_id: parseInt(raw.id, 10),
        }))
      }
    } else {
      newCommerce = commerce.map(id => ({ commerce_id: parseInt(id, 10) }))
    }
  }

  const resp = { commerce: newCommerce }
  return resp
}

const newProducts = (products, rawProducts) => {
  let result = []
  if (Array.isArray(products)) {
    products.map(p => {
      const splitProduct = p.split('_')
      if (splitProduct.length === 1) {
        const categoryFilter = rawProducts.filter(
          category => `${category.id}` === splitProduct[0],
        )[0]
        console.log(categoryFilter, splitProduct)
        result = [
          ...result,
          {
            category_id: parseInt(categoryFilter.id, 10),
            name: categoryFilter.name,
            product: categoryFilter.GetProduct.map(product => ({
              product_id: parseInt(product.id, 10),
              name: product.name,
            })),
          },
        ]
        // category
      } else {
        // product category[0] product[1] name[2]
        const [category_id, product_id] = splitProduct
        const found = result.find(category => category.category_id === category_id)
        if (found) {
          found.product.push({
            product_id: parseInt(product_id, 10),
          })
        } else {
          result = [
            ...result,
            {
              category_id: parseInt(category_id, 10),
              product: [{ product_id: parseInt(product_id, 10) }],
            },
          ]
        }
      }
      return true
    })
  }

  return result
}

const newStores = (stores, rawStores) => {
  let data = []
  if (Array.isArray(stores)) {
    if (stores.length === 1 && stores[0] === 'ALL') {
      data = rawStores.map(store => ({
        store_id: parseInt(store.id, 10),
      }))
    } else {
      data = stores.map(store => ({
        store_id: parseInt(store, 10),
      }))
    }
  }
  return data
}

export const statusToReadableStatus = status => {
  return cuponStatus[status]
}

export default {
  arrayIdToKey,
  commerceToTree,
}
