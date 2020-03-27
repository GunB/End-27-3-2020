import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import BasicLayout from 'components/LayoutComponents/BasicLayout'
import { Row, Col, Layout, Steps, Breadcrumb, Modal } from 'antd'
import CardCommerce from '../../components/Common/CardCommerce/CardCommerce'
import {
  commercePublicData,
  getOptionsCommercePublicData,
  commercePublicTicketData,
} from '../../models/redux/commercePublic/actions'
import IdenticationDoc from './IdentificationDoc/IdentificationDoc'
import PayMethod from './PayMethod/Paymethod'
import PaySummary from './PaySummary/PaySummary'
import ResumeData from './ResumeData/ResumeData'
import PayInformation from './PayInformation/PayInformation'
// import Pse from './Pse/Pse'
// import PendingPays from './PendingPays/PendingPays'
// import CreditCard from './CreditCard/CreditCard'

const { Step } = Steps

const stateToProps = (state, props) => ({
  commerce: state.commercePublic.commercePublicData || {},
  commerceId: props.match.params.id,
  loading: state.commercePublic.loading,
  paymentMethods: state.commercePublic.paymentMethods,
  facturaDB: state.commercePublic.facturaSelect,
  infoSummary: state.commercePublic.infoSummary,
  payTicket: state.payTicket.payTicket,
})

@withRouter
@connect(stateToProps)
class Commerce extends Component {
  constructor() {
    super()
    this.state = {
      statusStep: 0,
    }
  }

  componentDidMount() {
    const { dispatch, commerceId } = this.props
    dispatch(commercePublicData(commerceId))
    dispatch(getOptionsCommercePublicData())
  }

  setSelect = () => {
    const { statusStep } = this.state
    this.setState({ statusStep: statusStep + 1 })
  }

  handleConcept = values => {
    const { dispatch } = this.props
    if (values) {
      console.log(values)
      dispatch(commercePublicTicketData(values))
    }
    return values
  }

  getStepDatasource = (stepsBasic, stepsDB) => {
    const { commerce } = this.props
    if (commerce.ticket_type && commerce.ticket_type.code === 'db') {
      return stepsDB
    }
    if (commerce.ticket_type && commerce.ticket_type.code === 'basic') {
      return stepsBasic
    }
    if (commerce.ticket_type && commerce.ticket_type.code === 'webservice') {
      const secondsToGo = 5
      const modal = Modal.info({
        title: 'Pago comercio externo',
        content: `Usted está siendo redireccionado al sitio web del comercio para realizar el pago.`,
        okButtonProps: { display: 'none', disabled: true, className: 'modal-footer-hiden-button' },
        okText: ' ',
      })
      setTimeout(() => {
        modal.destroy()
        window.location = commerce.commerce_url
      }, secondsToGo * 1000)
      return stepsBasic
    }
    return stepsBasic
  }

  getResumeData = () => {
    const { statusStep } = this.state
    const { facturaDB, infoSummary } = this.props
    if (statusStep !== 2) {
      return (
        <Col md={8} sm={24}>
          <ResumeData
            statusDisplay={statusStep}
            handleConcept={this.handleConcept}
            facturaDB={facturaDB}
            infoSummary={infoSummary}
          />
        </Col>
      )
    }
    return false
  }

  getSizeResumeData = () => {
    const { statusStep } = this.state
    if (statusStep !== 2) {
      return 16
    }
    return 24
  }

  render() {
    const { commerce, loading, payTicket } = this.props
    const { statusStep } = this.state

    const stepsBasic = [
      {
        title: 'Información de pago',
        content: (
          <PayInformation
            setSelect={this.setSelect}
            fields={commerce}
            handleConcept={this.handleConcept}
          />
        ),
      },
      {
        title: 'Información de usuario',
        content: <PayMethod setSelect={this.setSelect} />,
      },
      {
        title: 'Resumen de pago',
        content: (
          <PaySummary
            setSelect={this.setSelect}
            commerce={commerce}
            transaction={payTicket && payTicket.transaction ? payTicket.transaction : {}}
          />
        ),
      },
    ]

    const stepsDB = [
      {
        title: 'Consultar',
        content: <IdenticationDoc setSelect={this.setSelect} />,
      },
      {
        title: 'Pagar',
        content: <PayMethod setSelect={this.setSelect} />,
      },
      {
        title: 'Resumen de pago',
        content: (
          <PaySummary
            setSelect={this.setSelect}
            commerce={commerce}
            transaction={payTicket && payTicket.transaction ? payTicket.transaction : {}}
          />
        ),
      },
    ]
    return (
      <BasicLayout loading={loading}>
        <Layout.Content className="container container--y">
          <Row>
            <Col>
              <Breadcrumb>
                <Breadcrumb.Item>
                  <Link to="/">Inicio</Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                  <Link
                    to={`/directorio/${
                      commerce.category ? commerce.category.id || commerce.category.ID : 0
                    }/${commerce.category ? commerce.category.name : ''}`}
                  >
                    {commerce.category ? commerce.category.name : ''}
                  </Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>{commerce.public_name}</Breadcrumb.Item>
              </Breadcrumb>
            </Col>
          </Row>
          <Row className="container--y">
            <Col>
              <CardCommerce commerceData={commerce} />
            </Col>
          </Row>
          <Row className="container--y">
            <Col md={12} sm={24}>
              <Steps size="small" current={statusStep}>
                {this.getStepDatasource(stepsBasic, stepsDB).map(item => (
                  <Step key={item.title} title={item.title} />
                ))}
              </Steps>
            </Col>
          </Row>
          <Row className="container--y commerce__payment">
            <Col md={this.getSizeResumeData()} sm={24}>
              <div className="centering-vertical w-100" style={{ height: '100%' }}>
                <Row type="flex" align="middle">
                  <Col md={24} sm={24}>
                    {this.getStepDatasource(stepsBasic, stepsDB)[statusStep].content}
                  </Col>
                </Row>
              </div>
            </Col>
            {this.getResumeData()}
          </Row>
        </Layout.Content>
      </BasicLayout>
    )
  }
}

export default Commerce
