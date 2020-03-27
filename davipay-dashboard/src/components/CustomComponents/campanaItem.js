/* eslint-disable no-nested-ternary */

import React from 'react'
import { Button, Popconfirm, Collapse } from 'antd'

class CampanaItem extends React.Component {
  toTitleCase = s => s.substr(0, 1).toUpperCase() + s.substr(1).toLowerCase()

  render() {
    const { removeCampaign, editCampaing, duplicateCampaign } = this.props
    const data = {
      ...this.props,
    }
    const { Name, Message, id, SubType, DiscountCode, segments } = data

    let dateExist = '~'
    let hoursExist = '~'
    if (Date !== '') {
      const datePublish = data.Date
      dateExist = datePublish.substr(0, 10)
      hoursExist = datePublish.substr(11, 5)
    }

    const RedireccionamientoView = () => {
      const segmentsLocal = segments
        ? [...segments]
        : DiscountCode.Segments
        ? [...DiscountCode.Segments]
        : []
      if (segmentsLocal.length > 0) {
        return (
          <div>
            <Collapse expandIconPosition="right">
              <Collapse.Panel header={`Elementos en lista (${segmentsLocal.length})`} key="1">
                {Object.keys(segmentsLocal).map(c => (
                  <p key={c}>{segmentsLocal[c].name}</p>
                ))}
              </Collapse.Panel>
            </Collapse>
          </div>
        )
      }
      return '~'
    }
    const table = (
      <div className="row">
        <div className="col-4">
          <div>
            <h5>Segmento:</h5>
          </div>
          <div>{RedireccionamientoView()}</div>
        </div>
        <div className="col-4">
          <div>
            <h5>Cupón:</h5>
          </div>
          <div>{DiscountCode ? DiscountCode.name : '~'}</div>
        </div>
        <div className="col-4">
          <div>
            <h5>{SubType !== '1' ? 'Enviado' : 'Programado'}</h5>
          </div>
          <div>{dateExist}</div>
          <div>{hoursExist}</div>
        </div>
      </div>
    )

    const body = (
      <div className="row">
        <div className="col-12 col-md-12 col-lg-6">{Message}</div>
        <div className="col-12 col-md-12 col-lg-6">{table}</div>
      </div>
    )

    const actions = (
      <div className="mt-2">
        <Button.Group size="big">
          {SubType === '1' ? (
            <Button type="link" className="gray" onClick={() => editCampaing(Name, id)}>
              <u>Editar</u>
            </Button>
          ) : null}
          <Button type="link" className="gray" onClick={() => duplicateCampaign(Name, id)}>
            <u>Duplicar</u>
          </Button>
          <Popconfirm
            placement="rightTop"
            title="¿Esta seguro de eliminar esta camapaña?"
            onConfirm={() => removeCampaign(id)}
            okText="Si"
            cancelText="No"
          >
            <Button type="link">
              <u>Eliminar</u>
            </Button>
          </Popconfirm>
        </Button.Group>
      </div>
    )

    return (
      <div className="col-12 mb-3">
        <h3>{Name}</h3>
        <div>{id}</div>
        {body}
        {actions}
        <hr />
      </div>
    )
  }
}

export default CampanaItem
