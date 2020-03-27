/* eslint camelcase: "off" */
import React from 'react'
import { Form, DatePicker, Select, InputNumber, Button } from 'antd'
import moment from 'moment'
import { isFinite } from 'lodash'
import GenericLabel from 'components/CustomComponents/genericLabel'

@Form.create()
class FormDetails extends React.Component {
  onSubmit = event => {
    event.preventDefault()
    const { form, onSubmit, activeTab, tabList } = this.props
    form.validateFields((error, values) => {
      if (error) {
        console.log(error, values)
      } else {
        const data = { ...values }
        if (data.tipoDescuento === '1') {
          data.percentage = 0
          data.max_amount = 0
        }
        if (data.tipoDescuento === '2') {
          data.amount = 0
        }
        const [date_from, date_to] = values.periodo
        data.date_from = moment(date_from).format('YYYY-MM-DD hh:mm:ss')
        data.date_to = moment(date_to).format('YYYY-MM-DD hh:mm:ss')
        delete data.periodo

        onSubmit(data, { activeTab, tabList })
      }
    })
  }

  onDiscard = () => {
    const { onDiscard } = this.props
    onDiscard()
  }

  descuentoChange = () => {
    const { form } = this.props
    const tipoDescuento = form.getFieldValue('tipoDescuento')
    if (tipoDescuento === '1') {
      // presupuesto/valor de bono
      const presupuesto = form.getFieldValue('amount_limit_redeem')
      const amount = form.getFieldValue('amount')
      let stock = presupuesto / amount
      if (!isFinite(stock)) {
        stock = null
      } else {
        stock = Math.round(stock)
      }
      form.setFieldsValue({
        stock,
      })
    }
  }

  placeButtons = () => {
    return (
      <>
        <hr />
        <div className="text-right">
          <Button.Group size="big">
            <Button type="link" className="gray mr-3" onClick={this.onDiscard}>
              <u>Descartar</u>
            </Button>
            <Button type="primary" onClick={this.onSubmit}>
              Continuar
            </Button>
          </Button.Group>
        </div>
      </>
    )
  }

  render() {
    const { Option } = Select
    const { RangePicker } = DatePicker
    const { form, cupon } = this.props

    const descuentoGen = tipoDescuento => {
      let resp = null
      if (tipoDescuento) {
        if (tipoDescuento === '1') {
          resp = (
            <>
              <Form.Item
                label="&nbsp;"
                style={{ display: 'inline-block', width: 'calc(50% - 12px)' }}
              >
                {form.getFieldDecorator('amount', {
                  initialValue: cupon.amount,
                  rules: [
                    {
                      required: true,
                      message: 'Porfavor ingrese el valor del descuento',
                    },
                  ],
                })(
                  <InputNumber
                    onChange={this.descuentoChange}
                    onKeyUp={this.descuentoChange}
                    formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    parser={value => value.replace(/\$\s?|(,*)/g, '')}
                    style={{ width: '100%', marginBottom: '0' }}
                  />,
                )}
              </Form.Item>
            </>
          )
        }
        if (tipoDescuento === '2') {
          resp = (
            <>
              <Form.Item
                label="&nbsp;"
                style={{ display: 'inline-block', width: 'calc(50% - 12px)' }}
              >
                {form.getFieldDecorator('percentage', {
                  initialValue: cupon.percentage,
                  rules: [
                    {
                      min: 0,
                      max: 100,
                      type: 'number',
                      range: { min: 0, max: 100 },
                      required: true,
                      message: 'Porfavor ingrese el valor del descuento',
                    },
                  ],
                })(
                  <InputNumber
                    formatter={value => `${value}%`}
                    parser={value => value.replace('%', '')}
                    sufix="%"
                    style={{ width: '100%', marginBottom: '0' }}
                  />,
                )}
              </Form.Item>
              <Form.Item
                label={
                  <GenericLabel
                    title="Descuento máximo"
                    content="El descuento máximo es el límite de dinero a descontar usando un cupón de descuento por Porcentaje (%)."
                  />
                }
              >
                {form.getFieldDecorator('max_amount', {
                  initialValue: cupon.max_amount,
                  rules: [{ required: true, message: 'Porfavor ingrese el descuento máximo' }],
                })(
                  <InputNumber
                    formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    parser={value => value.replace(/\$\s?|(,*)/g, '')}
                    style={{ width: '100%', marginBottom: '0' }}
                  />,
                )}
              </Form.Item>
            </>
          )
        }
      }
      return resp
    }

    const stockGen = tipoDescuento => {
      if (tipoDescuento === '1') {
        return (
          <>
            <span style={{ display: 'inline-block', width: '24px', textAlign: 'center' }}>
              &nbsp;
            </span>
            <Form.Item label="Stock" style={{ display: 'inline-block', width: 'calc(50% - 12px)' }}>
              {form.getFieldDecorator('stock', {
                initialValue: cupon.stock,
                rules: [
                  {
                    required: true,
                    message: 'Porfavor ingrese el presupuesto máximo',
                  },
                ],
              })(<InputNumber readOnly style={{ width: '100%', marginBottom: '0' }} />)}
            </Form.Item>
          </>
        )
      }
      return null
    }

    return (
      <>
        <Form layout="vertical" className="mb-3" onSubmit={this.onSubmit}>
          <div className="col-lg-8">
            <Form.Item label="Periodo">
              {form.getFieldDecorator('periodo', {
                initialValue: [moment(cupon.date_from), moment(cupon.date_to)],
                rules: [{ required: true, message: 'Porfavor inrese el período' }],
              })(<RangePicker style={{ width: '100%' }} />)}
            </Form.Item>
            <div>
              <Form.Item
                label={
                  <GenericLabel
                    title="Descuento"
                    content="Selecciona el tipo de descuento, Porcentaje (%) o Monto ($), luego ingresa el valor del descuento."
                  />
                }
                style={{ display: 'inline-block', width: 'calc(50% - 12px)' }}
              >
                {form.getFieldDecorator('tipoDescuento', {
                  initialValue: cupon.tipoDescuento,
                  rules: [{ required: true, message: 'Porfavor seleccione el tipo de descuento' }],
                })(
                  <Select
                    style={{ width: '100%' }}
                    onChange={this.descuentoChange}
                    onKeyUp={this.descuentoChange}
                  >
                    <Option value="1">Monto ($)</Option>
                    <Option value="2">Porcentaje (%)</Option>
                  </Select>,
                )}
              </Form.Item>
              <span style={{ display: 'inline-block', width: '24px', textAlign: 'center' }}>
                &nbsp;
              </span>
              {descuentoGen(form.getFieldValue('tipoDescuento'))}
            </div>

            <Form.Item
              label={
                <GenericLabel
                  title="Presupuesto"
                  content="El presupuesto se establece para controlar y limitar el uso de cupones. En caso de Descuento por Monto ($) se verá reflejado en el stock de los cupones."
                />
              }
              style={
                form.getFieldValue('tipoDescuento') === '2'
                  ? { width: '100%' }
                  : { display: 'inline-block', width: 'calc(50% - 12px)' }
              }
            >
              {form.getFieldDecorator('amount_limit_redeem', {
                initialValue: cupon.amount_limit_redeem,
                rules: [{ required: true, message: 'Porfavor ingrese el presupuesto mínimo' }],
              })(
                <InputNumber
                  formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  parser={value => value.replace(/\$\s?|(,*)/g, '')}
                  onChange={this.descuentoChange}
                  onKeyUp={this.descuentoChange}
                  style={{ width: '100%', marginBottom: '0' }}
                />,
              )}
            </Form.Item>

            {stockGen(form.getFieldValue('tipoDescuento'))}

            <Form.Item
              label={
                <GenericLabel
                  title="Compra mínima"
                  content="La compra mínima condiciona el uso de un cupón al valor de las compras."
                />
              }
            >
              {form.getFieldDecorator('min_amount', {
                initialValue: cupon.min_amount,
                rules: [{ required: true, message: 'Porfavor ingrese la compra mínima' }],
              })(
                <InputNumber
                  formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  parser={value => value.replace(/\$\s?|(,*)/g, '')}
                  style={{ width: '100%', marginBottom: '0' }}
                />,
              )}
            </Form.Item>

            <Form.Item label="Límite de usos (usos por usuario)">
              {form.getFieldDecorator('user_limit_redeem', {
                initialValue: cupon.user_limit_redeem,
                rules: [
                  { required: true, message: 'Porfavor ingrese el limite de usos por usuario' },
                ],
              })(<InputNumber style={{ width: '100%', marginBottom: '0' }} />)}
            </Form.Item>
          </div>
        </Form>
        {this.placeButtons()}
      </>
    )
  }
}

export default FormDetails
