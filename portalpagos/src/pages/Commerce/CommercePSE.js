import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import BasicLayout from 'components/LayoutComponents/BasicLayout'
import { Row, Col, Layout, Steps, Breadcrumb } from 'antd'
import CardCommerce from '../../components/Common/CardCommerce/CardCommerce'
import { commercePublicTransactionData } from '../../models/redux/commercePublic/actions'
import PaySummary from './PaySummary/PaySummary'

const { Step } = Steps

const stateToProps = (state, props) => ({
  commerce: state.commercePublic.commercePublicData || {},
  transaction: state.commercePublic.transaction || {},
  transactionId: props.match.params.id,
  loading: state.commercePublic.loading,
})

@withRouter
@connect(stateToProps)
class Commerce extends Component {
  constructor() {
    super()
    this.state = {
      statusStep: 2,
    }
  }

  componentDidMount() {
    const { dispatch, transactionId } = this.props
    dispatch(commercePublicTransactionData(transactionId))
  }

  getStepDatasource = (stepsBasic, stepsDB) => {
    const { commerce } = this.props
    if (commerce.ticket_type && commerce.ticket_type.code === 'db') {
      return stepsDB
    }
    if (commerce.ticket_type && commerce.ticket_type.code === 'basic') {
      return stepsBasic
    }
    return stepsBasic
  }

  render() {
    const { commerce, transaction, loading } = this.props
    const { statusStep } = this.state

    const stepsBasic = [
      {
        title: 'Información de pago',
        content: <div />,
      },
      {
        title: 'Información de usuario',
        content: <div />,
      },
      {
        title: 'Resumen de pago',
        content: (
          <PaySummary setSelect={this.setSelect} transaction={transaction} commerce={commerce} />
        ),
      },
    ]

    const stepsDB = [
      {
        title: 'Consultar',
        content: <div />,
      },
      {
        title: 'Pagar',
        content: <div />,
      },
      {
        title: 'Resumen de pago',
        content: (
          <PaySummary setSelect={this.setSelect} transaction={transaction} commerce={commerce} />
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
            <Col md={24} sm={24}>
              <div className="centering-vertical w-100" style={{ height: '100%' }}>
                <Row type="flex" align="middle">
                  <Col md={24} sm={24}>
                    {this.getStepDatasource(stepsBasic, stepsDB)[statusStep].content}
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </Layout.Content>
      </BasicLayout>
    )
  }
}

export default Commerce
