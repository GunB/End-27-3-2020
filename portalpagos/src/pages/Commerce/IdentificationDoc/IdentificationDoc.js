import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import { Form, Select, Input, Button, Empty, Card, Row, Col } from 'antd'
import { formatCurrency } from 'utils/numberFormat'
import {
  getFacturaCommercePublic,
  setFacturaCommercePublic,
} from 'models/redux/commercePublic/actions'

const { Option } = Select

const no_result = (
  <span style={{ textAlign: 'center', width: '100%', display: 'block' }}>
    <b>No tiene pagos pendientes en este comercio</b>
    <br />
    <Link to="/categorias">Volver al inicio</Link>
  </span>
)
const stateToProps = state => ({
  documents: state.commercePublic.documents,
  docLoading: state.commercePublic.docLoading,
  facturasPending: state.commercePublic.facturasPending,
  commerce: state.commercePublic.commercePublicData || {},
})

@withRouter
@connect(stateToProps)
@Form.create()
class IdenticationDoc extends Component {
  state = {
    consultado: false,
  }

  componentDidMount() {
    this.setState(() => ({
      consultado: false,
    }))
  }
  onSubmit = event => {
    event.preventDefault()
    const { form, dispatch, commerce } = this.props
    form.validateFields((error, values) => {
      if (!error) {
        console.log(values)
        const data = {}
        data.document_type = values.tipoDoc
        data.document_number = values.numDoc
        data.commerce_id = commerce.commerce_id
        dispatch(getFacturaCommercePublic(data))
        this.setState(() => ({
          consultado: true,
        }))
      }
    })
    //setSelect,
  }

  getEmptyResult = () => {
    const { consultado } = this.state
    const { docLoading, facturasPending } = this.props
    if (consultado && !docLoading && facturasPending.length === 0) {
      return (
        <Row>
          <Col md={2} sm={2} />
          <Col md={20} sm={2}>
            <Card style={{ borderRadius: '14px', boxShadow: '0 4px 15px rgba(0, 0, 0, 0.15' }}>
              <Empty image={Empty.PRESENTED_IMAGE_DEFAULT} description={no_result} />
            </Card>
          </Col>
        </Row>
      )
    }
    return false
  }

  handleOptionsMethod = item => {
    const { setSelect, dispatch } = this.props
    dispatch(setFacturaCommercePublic(item))
    setSelect()
  }
  getDataFactura = () => {
    const { facturasPending, commerce } = this.props
    if (facturasPending.length > 0) {
      return (
        <Row>
          <h4>Pagos pendientes</h4>
          {facturasPending.map((item, key) => {
            return (
              <Col md={8} sm={12} key={item.id}>
                <Card
                  id={key}
                  bodyStyle={{ display: 'flex', width: '100%' }}
                  className="bradius-normal method__card"
                  onClick={() => {
                    this.handleOptionsMethod(item)
                  }}
                >
                  <div className="method__img">
                    <img src={commerce.image} alt="payment method" className="w-100 bradius-sm" />
                  </div>
                  <div className="method__body">
                    <p className="reset-margin fs-secondary">
                      <small>{item.concept}</small>
                    </p>
                    <p className="reset-margin fs-secondary">
                      <small>
                        <b>$ {formatCurrency(item.amount)}</b>
                      </small>
                    </p>
                  </div>
                </Card>
              </Col>
            )
          })}
        </Row>
      )
    }
    return false
  }

  getFormConsulta = form => {
    const { consultado } = this.state
    const { docLoading, documents } = this.props
    if (!consultado || docLoading) {
      return (
        <Row>
          <Col md={24} sm={24}>
            <Form hideRequiredMark>
              <Form.Item label="Documento de identidad" style={{ marginBottom: 0 }}>
                <Form.Item
                  style={{
                    display: 'inline-block',
                    width: 'calc(20% - 1px)',
                    margin: '0 20px 0 0',
                  }}
                >
                  {form.getFieldDecorator('tipoDoc', {
                    placeholder: 'Seleccionar tipo documento',
                    rules: [
                      {
                        required: true,
                        message: 'Por favor seleccione el tipo de documento',
                      },
                    ],
                  })(
                    <Select style={{ width: '100%' }}>
                      {documents.map(item => {
                        return (
                          <Option
                            value={item.id || item.ID ? item.id || item.ID : 0}
                            key={`document-${item.code}`}
                          >
                            {item.name}
                          </Option>
                        )
                      })}
                    </Select>,
                  )}
                </Form.Item>
                <Form.Item
                  style={{
                    display: 'inline-block',
                    width: 'calc(45% - 1px)',
                    margin: '0 20px 0 0',
                  }}
                >
                  {form.getFieldDecorator('numDoc', {
                    placeholder: 'Número de documento',
                    rules: [
                      {
                        required: true,
                        message: 'Por favor ingrese el número de documento',
                      },
                    ],
                  })(<Input placeholder="Número de documento" style={{ width: '100%' }} />)}
                </Form.Item>
                <Button
                  className="bg-primary-color hv-link"
                  onClick={this.onSubmit}
                  loading={docLoading}
                >
                  Consultar
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      )
    }
    return false
  }
  render() {
    const { form } = this.props
    return (
      <Row>
        <Col md={24} sm={24}>
          {this.getEmptyResult()}
          {this.getFormConsulta(form)}
          {this.getDataFactura()}
        </Col>
      </Row>
    )
  }
}

export default IdenticationDoc
