import React from 'react'
import { Form, Row, Col, Select, Input, InputNumber, DatePicker, Button, Modal } from 'antd'
import GenericLabel from 'components/CustomComponent/GenericLabel'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { ACTION_createFactura, ACTION_closeSuccessFactura } from 'models/redux/factura/actions'

@withRouter
@connect(state => ({
  user: state.user.user_data,
  isAdmin: state.factura.isAdmin,
  isCommerce: state.factura.isCommerce,
  isValidCommerce: state.factura.isValidCommerce,
  commerce: state.factura.commerce,
  commerces: state.factura.commerces,
  documents: state.factura.documents,
  loading: state.factura.loading,
  success: state.factura.success,
  onError: state.factura.onError,
}))
@Form.create()
class FacturaManual extends React.Component {
  componentDidMount() {}

  getSelectDocuments = () => {
    const { documents } = this.props
    const documentsElemts = documents.map(value => {
      return (
        <Select.Option value={value.id} key={value.id}>
          {value.name}
        </Select.Option>
      )
    })
    return documentsElemts
  }

  onSubmit = event => {
    event.preventDefault()
    const { form, commerce, dispatch, isAdmin } = this.props
    form.validateFields((error, values) => {
      if (!error) {
        if (!isAdmin) {
          values.comercio = commerce.commerce_id
        }
        dispatch(ACTION_createFactura(values))
      }
    })
  }

  cleanForm = event => {
    event.preventDefault()
    const { form } = this.props
    form.resetFields()
  }

  getAdminCommerce = form => {
    const { isAdmin, commerces } = this.props
    if (isAdmin) {
      return (
        <Form.Item label="Comercio">
          {form.getFieldDecorator('comercio', {
            placeholder: 'Comercio',
            rules: [
              {
                required: true,
                message: 'Por favor ingrese el comercio',
              },
            ],
          })(
            <Select style={{ width: '100%' }}>
              {commerces.map(value => {
                return (
                  <Select.Option value={value.id} key={value.id}>
                    {value.fiscal_name}
                  </Select.Option>
                )
              })}
            </Select>,
          )}
        </Form.Item>
      )
    }
    return <span />
  }

  showFacturaOk = ok => {
    const { dispatch, form } = this.props
    if (ok) {
      const secondsToGo = 5
      const modal = Modal.success({
        title: 'Cargar facutra',
        content: `La factura se cargo correctamente`,
      })
      setTimeout(() => {
        modal.destroy()
      }, secondsToGo * 1000)
      dispatch(ACTION_closeSuccessFactura())
      form.resetFields()
    }
  }

  showFacturaError = error => {
    const { dispatch } = this.props
    if (error) {
      const secondsToGo = 5
      const modal = Modal.error({
        title: 'Cargar facutra',
        content: `No se pudo cargar la factura`,
      })
      setTimeout(() => {
        modal.destroy()
      }, secondsToGo * 1000)
      dispatch(ACTION_closeSuccessFactura())
    }
  }
  render() {
    const { form, loading, success, onError } = this.props
    const responsive = { xs: 30, sm: 20 }
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
      },
    }

    return (
      <div>
        <br />
        <Form {...formItemLayout} labelAlign="left" className="mb-3" hideRequiredMark>
          <Row gutter={24}>
            <Col {...responsive}>
              <h4>Información del cliente</h4>
              {this.getAdminCommerce(form)}
              <Form.Item label="Tipo y número de documento" style={{ marginBottom: 0 }}>
                <Form.Item
                  style={{ display: 'inline-block', width: 'calc(30% - 1px)', marginBottom: 0 }}
                >
                  {form.getFieldDecorator('tipoDoc', {
                    placeholder: 'Seleccionar tipo documento',
                    rules: [
                      {
                        required: true,
                        message: 'Por favor seleccione el tipo de documento',
                      },
                    ],
                  })(<Select style={{ width: '100%' }}>{this.getSelectDocuments()}</Select>)}
                </Form.Item>

                <Form.Item
                  style={{ display: 'inline-block', width: 'calc(70% - 1px)', marginBottom: 0 }}
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
              </Form.Item>
              <Form.Item label="Nombre">
                {form.getFieldDecorator('name', {
                  placeholder: 'Nombre',
                  rules: [
                    {
                      required: true,
                      message: 'Por favor ingrese el nombre',
                    },
                  ],
                })(<Input placeholder="Nombre" size="default" />)}
              </Form.Item>
              <Form.Item
                label={
                  <span>
                    Correo electrónico <small style={{ opacity: 0.5 }}>(Opcional) </small>
                  </span>
                }
              >
                {form.getFieldDecorator('email', {
                  placeholder: 'Correo electrónico',
                  rules: [
                    {
                      required: false,
                      type: 'email',
                      message: 'Correo electrónico no valido',
                    },
                  ],
                })(<Input placeholder="Correo electrónico" size="default" />)}
              </Form.Item>
              <Form.Item
                label={
                  <span>
                    Teléfono <small style={{ opacity: 0.5 }}>(Opcional) </small>
                  </span>
                }
              >
                {form.getFieldDecorator('phone', {
                  placeholder: 'Teléfono',
                  rules: [
                    {
                      required: false,
                      message: 'Por favor ingrese el teléfono',
                    },
                  ],
                })(<Input placeholder="Teléfono" size="default" />)}
              </Form.Item>
            </Col>
          </Row>
          <hr />
          <br />
          <Row gutter={24}>
            <Col {...responsive}>
              <h4>Información del pago</h4>
              <Form.Item
                label={
                  <GenericLabel
                    title="Número de referencia"
                    content="Por favor ingrese el número de referencia"
                  />
                }
              >
                {form.getFieldDecorator('reference', {
                  placeholder: 'Número de referencia',
                  rules: [
                    {
                      required: true,
                      message: 'Porfavor ingrese el número de referencia',
                    },
                  ],
                })(<Input placeholder="Número de referencia" size="default" />)}
              </Form.Item>
              <Form.Item label="Concepto de pago">
                {form.getFieldDecorator('concept', {
                  placeholder: 'Concepto de pago',
                  rules: [
                    {
                      required: true,
                      message: 'Por favor ingrese el concepto de pago',
                    },
                  ],
                })(<Input placeholder="Concepto de pago" size="default" />)}
              </Form.Item>
              <Form.Item label="Valor a pagar">
                {form.getFieldDecorator('amount', {
                  placeholder: 'Valor a pagar',
                  rules: [
                    {
                      required: true,
                      message: 'Por favor ingrese el valor a pagar',
                    },
                  ],
                })(
                  <InputNumber
                    formatter={value => `$ ${value}`}
                    placeholder="Valor a pagar"
                    style={{ width: '100%' }}
                  />,
                )}
              </Form.Item>
              <Form.Item label="Fecha de vencimiento">
                {form.getFieldDecorator('date', {
                  initialValue: undefined,
                  rules: [
                    { required: true, message: 'Porfavor seleccione la fecha de vencimiento' },
                  ],
                })(<DatePicker placeholder="Fecha de vencimiento" style={{ width: '100%' }} />)}
              </Form.Item>
            </Col>
          </Row>
          <hr />
          <br />
        </Form>
        <Row type="flex" align="middle">
          <Col xs={24} style={{ textAlign: 'right' }}>
            <Button type="link" htmlType="submit" disabled={loading} onClick={this.cleanForm}>
              Descartar
            </Button>

            <Button type="primary" htmlType="submit" loading={loading} onClick={this.onSubmit}>
              Crear Factura
            </Button>
          </Col>
        </Row>
        {this.showFacturaOk(success)}
        {this.showFacturaError(onError)}
      </div>
    )
  }
}

export default FacturaManual
