import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Card, Row, Col } from 'antd'
import { payTicketCommerce } from '../../../models/redux/payTicket/actions'
import CreditCard from '../CreditCard/CreditCard'
import Pse from '../Pse/Pse'

const stateToProps = state => ({
  commerce: state.commercePublic.commercePublicData || {},
  documents: state.commercePublic.documents,
  responseTC: state.payTicket.responseTC,
  infoSummary: state.commercePublic.infoSummary,
  invoiceDB: state.commercePublic.facturaSelect,
})

@withRouter
@connect(stateToProps)
class PayMethod extends Component {
  constructor() {
    super()
    this.state = {
      typePayMethod: null,
    }
  }

  // Pinta las cards de método de pago
  handleMethod = method => {
    return (
      <Row style={{ width: '100%' }}>
        <h4>Método de pago</h4>
        {method.map((item, key) => {
          return (
            <Col md={8} sm={12} key={item.id}>
              <Card
                id={key}
                bodyStyle={{ display: 'flex' }}
                className="bradius-normal method__card"
                onClick={() => {
                  this.handleOptionsMethod(item)
                }}
              >
                <div className="method__img">
                  <img src={item.image} alt="payment method" className="w-100 bradius-sm" />
                </div>
                <div className="method__body">
                  <p className="reset-margin method__titleCommerce">
                    <b>{item.name}</b>
                  </p>
                </div>
              </Card>
            </Col>
          )
        })}
      </Row>
    )
  }

  // Pinta el formulario de la opción elegida
  handleOptionsMethod = item => {
    const { documents, commerce, infoSummary, invoiceDB, setSelect } = this.props
    if (item.code === 'tdc') {
      this.setState({
        typePayMethod: (
          <CreditCard
            handleDataCC={this.handleDataCC}
            changeMethod={this.changeMethod}
            documents={documents}
            commerce={commerce}
            infoSummary={infoSummary}
            invoiceDB={invoiceDB}
            setSelect={setSelect}
          />
        ),
      })
    } else {
      this.setState({ typePayMethod: <Pse changeMethod={this.changeMethod} /> })
    }
  }

  handleDataCC = values => {
    const { dispatch, commerce, infoSummary, invoiceDB } = this.props
    const data = {
      commerce,
      invoice: invoiceDB,
      invoiceCaptured: infoSummary,
      tc: values,
    }
    dispatch(payTicketCommerce(data))
  }

  changeMethod = () => {
    this.setState({ typePayMethod: null })
  }

  render() {
    const { commerce } = this.props
    const { typePayMethod } = this.state
    return (
      <div className="method__container">
        {(() => {
          if (typePayMethod === null) {
            return this.handleMethod(commerce.payment_method || [])
          }
          return typePayMethod
        })()}
      </div>
    )
  }
}

export default PayMethod
