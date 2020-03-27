import React from 'react'
import * as uuidv4 from 'uuid/v4'
import { Collapse } from 'antd'

const CuponCommerceToResume = ({ commerce = [], rawCommerce = [], rawStores, ...props }) => {
  const validateCommerce = () => {
    return (
      Array.isArray(commerce) &&
      Array.isArray(rawCommerce) &&
      commerce.length > 0 &&
      rawCommerce.length > 0
    )
  }
  const customPanelStyle = {
    borderRadius: 4,
    marginBottom: 0,
    border: 0,
    // paddingLeft: 0,
    overflow: 'hidden',
  }
  return (
    <Collapse bordered={false} expandIconPosition="right" {...props}>
      <Collapse.Panel
        style={customPanelStyle}
        header={
          <div className="row">
            <div className="col-3 mb-3 pl-0">
              <h5>Comercios:</h5>
            </div>
            <div className="col-9 mb-3">{`Comercios seleccionados (${commerce.length})`}</div>
          </div>
        }
        key="1"
      >
        {validateCommerce()
          ? commerce.map(c => {
              const { name } = rawCommerce.find(
                r => `${r.id}` === `${c.commerce_id}` || `${r.id}` === `${c.id}`,
              )
              return (
                <div key={uuidv4()}>
                  <div>
                    <strong>Comercio: </strong>
                    <span>{name}</span>
                  </div>
                  {Array.isArray(c.store)
                    ? c.store.map(s => {
                        const found = rawStores.find(
                          r => `${r.id}` === `${s.store_id}` || `${r.id}` === `${s.id}`,
                        )
                        return found ? (
                          <div key={uuidv4()}>
                            <span>Punto de venta: </span>
                            <span color="gray">{found.name}</span>
                          </div>
                        ) : null
                      })
                    : null}
                </div>
              )
            })
          : null}
      </Collapse.Panel>
    </Collapse>
  )
}

export default CuponCommerceToResume
