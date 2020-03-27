import React, { Component } from 'react'
import { Form, Input, DatePicker, Row, Col, Radio, Icon, Select } from 'antd'
import GenericLabel from 'components/CustomComponent/GenericLabel'
import ViewButtonWizzardHandler from 'components/CustomComponent/SimpleWizzard/ViewButtonWizzardHandler'
import moment from 'moment'
import { connect } from 'react-redux'

const stateToProps = ({ general }) => ({
  paymentCycles: general.paymentCycle || [],
  typeServices: general.typeService || [],
  typeAccounts: general.typeAccount || [],
})

@connect(stateToProps)
@Form.create()
class FormContrato extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  onSubmit = event => {
    event.preventDefault()
    const { form, onSubmit } = this.props
    form.validateFields((error, values) => {
      if (error) {
        console.log(error)
      } else {
        onSubmit({ agreement: values })
      }
    })
  }

  render() {
    const { onSubmit } = this
    const {
      formLayout,
      dataSource: agreement,
      form,
      schemaSource,
      specialValidators,
      paymentCycles,
      typeServices,
      typeAccounts,
    } = this.props
    const { agreement: dataSource = {} } = agreement

    return (
      <>
        <Form {...formLayout} className="mb-3">
          <Form.Item
            label={
              <GenericLabel title="Fecha del contrato" content="Ingresa la fecha del contrato" />
            }
          >
            {form.getFieldDecorator('date', {
              initialValue: dataSource.date ? moment(dataSource.date) : null,
              rules: [{ required: true, message: 'Ingresa la fecha del contrato' }],
            })(<DatePicker style={{ width: '100%' }} />)}
          </Form.Item>
          <Form.Item
            label={
              <GenericLabel
                title="Código único de venta no presente"
                content="Ingresa el Código único de venta no presente"
              />
            }
          >
            {form.getFieldDecorator('code', {
              initialValue: dataSource.code,
              rules: [{ required: true, message: 'Ingresa el Código único de venta no presente' }],
            })(<Input placeholder="Código" />)}
          </Form.Item>
          <hr />
          <h4 className="my-4">Información de pago</h4>
          <Form.Item
            label={<GenericLabel title="Ciclo de pago" content="Seleccione el ciclo de pago" />}
          >
            {form.getFieldDecorator('payment_cycle', {
              initialValue: dataSource.payment_cycle,
              rules: [{ required: true, message: 'Seleccione el ciclo de pago' }],
            })(
              <Radio.Group style={{ width: '100%' }}>
                <Row>
                  {paymentCycles.map(type => (
                    <Col xs={6} key={`cycle-${type.id}`}>
                      <Radio value={type.id}>{type.name}</Radio>
                    </Col>
                  ))}
                </Row>
              </Radio.Group>,
            )}
          </Form.Item>
          <Form.Item
            label={
              <GenericLabel
                title="Tipo y número de cuenta"
                content="Seleccione el tipo de cuenta"
              />
            }
          >
            <Form.Item
              style={{ display: 'inline-block', width: 'calc(40% - 1px)', marginBottom: 0 }}
            >
              {form.getFieldDecorator('account_type', {
                initialValue: dataSource.account_type,
                rules: [{ required: true, message: 'Seleccione el tipo de cuenta' }],
              })(
                <Select style={{ width: '100%' }}>
                  {typeAccounts.map(doc => (
                    <Select.Option key={doc.id} value={doc.id}>
                      {doc.name}
                    </Select.Option>
                  ))}
                </Select>,
              )}
            </Form.Item>
            <Form.Item
              style={{ display: 'inline-block', width: 'calc(60% - 1px)', marginBottom: 0 }}
            >
              {form.getFieldDecorator('account_number', {
                initialValue: dataSource.account_number,
                rules: [
                  {
                    required: true,
                    validator: specialValidators.validateNumber,
                    message: 'Ingresa el número de cuenta',
                  },
                ],
              })(<Input placeholder="Número de cuenta" />)}
            </Form.Item>
          </Form.Item>
          <Form.Item
            label={
              <GenericLabel
                title="Titular de la cuenta"
                content="Ingrese el Titular de la cuenta"
              />
            }
          >
            {form.getFieldDecorator('account_name', {
              initialValue: dataSource.account_name,
              rules: [{ required: true, message: 'Ingrese el Titular de la cuenta' }],
            })(<Input placeholder="Titular de la cuenta" />)}
          </Form.Item>
          <Form.Item
            label={
              <GenericLabel
                title="Correo de notificación de pagos"
                content="Ingrese el Correo de notificación de pagos"
              />
            }
          >
            {form.getFieldDecorator('email', {
              initialValue: dataSource.email,
              rules: [
                {
                  required: true,
                  type: 'email',
                  message: 'Ingrese el Correo de notificación de pagos',
                },
              ],
            })(<Input placeholder="Correo de notificación de pagos" />)}
          </Form.Item>
          <hr />
          <h4 className="my-4">Información del servicio</h4>
          <Form.Item
            label={
              <GenericLabel title="Tipo de servicio" content="Seleccione el Tipo de servicio" />
            }
          >
            {form.getFieldDecorator('service_type', {
              initialValue: dataSource.service_type,
              rules: [{ required: true, message: 'Seleccione el Tipo de servicio' }],
            })(
              <Radio.Group style={{ width: '100%' }}>
                <Row>
                  {typeServices.map(type => (
                    <Col xs={6} key={`service-${type.id}`}>
                      <Radio value={type.id}>{type.name}</Radio>
                    </Col>
                  ))}
                </Row>
              </Radio.Group>,
            )}
          </Form.Item>
          <Form.Item
            label={
              <GenericLabel
                title="Cantidad de transacciones"
                content="Ingrese la Cantidad de transacciones"
              />
            }
          >
            {form.getFieldDecorator('number_transactions', {
              initialValue: dataSource.number_transactions,
              rules: [
                {
                  required: true,
                  validator: specialValidators.validateNumber,
                  message: 'Ingrese la Cantidad de transacciones',
                },
              ],
            })(<Input style={{ width: '100%' }} placeholder="Cantidad de transacciones" />)}
          </Form.Item>
          <Form.Item
            label={
              <GenericLabel
                title="Cantidad mínima de transacciones"
                content="Ingrese la Cantidad mínima de transacciones"
              />
            }
          >
            {form.getFieldDecorator('min_number_transactions', {
              initialValue: dataSource.min_number_transactions,
              rules: [
                {
                  required: true,
                  validator: specialValidators.validateNumber,
                  message: 'Ingrese la Cantidad mínima de transacciones',
                },
              ],
            })(<Input style={{ width: '100%' }} placeholder="Cantidad mínima de transacciones" />)}
          </Form.Item>
          <Form.Item
            label={
              <GenericLabel
                title="Valor unitario (COP)"
                content="Ingrese la Cantidad mínima de transacciones"
              />
            }
          >
            {form.getFieldDecorator('transaction_amount', {
              initialValue: dataSource.transaction_amount,
              rules: [
                {
                  required: true,
                  validator: specialValidators.validateNumber,
                  message: 'Ingrese el Valor unitario (COP)',
                },
              ],
            })(
              <Input
                style={{ width: '100%' }}
                prefix={<Icon type="dollar" />}
                placeholder="Valor unitario (COP)"
              />,
            )}
          </Form.Item>
          {/* <Form.Item
            label={
              <GenericLabel
                title={
                  <span>
                    Valor total (COP) <small>(Automático)</small>
                  </span>
                }
                content="Ingrese la Cantidad mínima de transacciones"
              />
            }
          >
            {form.getFieldDecorator('total_transaction_amount', {
              initialValue: dataSource.total_transaction_amount,
            })(<Input disabled prefix={<Icon type="dollar" />} placeholder="Valor total (COP)" />)}
          </Form.Item> */}
        </Form>
        <ViewButtonWizzardHandler urlBack={schemaSource.urlBack} onSubmit={onSubmit} />
      </>
    )
  }
}

export default FormContrato
