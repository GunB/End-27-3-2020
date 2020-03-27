import React from 'react'
import { Card } from 'antd'
import commerce from '../../../assets/img/01.png'

const PendingPays = props => {
  const { setSelect } = props
  return (
    <div className="pending__card">
      <Card bodyStyle={{ display: 'flex' }} className="bradius-normal" onClick={setSelect}>
        <div className="pending__img">
          <img src={commerce} alt="commerce" className="w-100 bradius-sm" />
        </div>
        <div className="pending__body">
          <p className="reset-margin fs-secondary pending__titleCommerce">Automores cdsjkds</p>
          <strong className="reset-margin bold fs-secondary">$ 121.380</strong>
        </div>
      </Card>
    </div>
  )
}

export default PendingPays
