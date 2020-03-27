import React, { Component } from 'react'
import { InputNumber } from 'antd'

class MoneyInput extends Component {
  state = {}

  render() {
    const { props } = this
    return (
      <InputNumber
        {...props}
        formatter={value => moneyTransform(value)}
        parser={value => moneyRecovery(value)}
        placeholder="Monto por transaccion"
        style={{ width: '100%' }}
      />
    )
  }
}

export const moneyTransform = value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
export const moneyRecovery = value => value.replace(/\$\s?|(,*)/g, '')

export default MoneyInput
