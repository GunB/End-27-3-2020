import React from 'react'
import * as uuidv4 from 'uuid/v4'

const CuponProductsToResume = ({ productos = [], rawProducts = [], ...props }) => {
  return (
    <div {...props}>
      {Array.isArray(productos) && productos.length > 0 && rawProducts.length > 0
        ? productos.map(c => {
            const { name, GetProduct } = rawProducts.find(
              r => `${r.id}` === `${c.category_id}` || `${r.id}` === `${c.id}`,
            )
            return (
              <div key={uuidv4()}>
                <strong>Categoria: </strong>
                <span>{name}</span>
                {Array.isArray(c.product)
                  ? c.product.map(p => {
                      const find = GetProduct.find(
                        r => `${r.id}` === `${p.product_id}` || `${r.id}` === `${p.id}`,
                      )
                      return find ? (
                        <div key={uuidv4()}>
                          <span>Producto: </span>
                          <span>{find.name}</span>
                        </div>
                      ) : null
                    })
                  : null}
              </div>
            )
          })
        : null}
    </div>
  )
}

export default CuponProductsToResume
