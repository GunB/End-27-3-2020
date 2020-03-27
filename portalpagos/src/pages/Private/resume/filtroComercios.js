import React from 'react'
import { Input, Button, Form, Col, Row, DatePicker, Select } from 'antd'
import GenericLabel from 'components/CustomComponent/GenericLabel'

@Form.create()
class FiltroComercios extends React.Component {
  onSubmit = event => {
    event.preventDefault()
    const { form } = this.props
    form.validateFields((error, values) => {
      if (error) {
        console.log(error)
      } else {
        console.log(values)
      }
    })
  }
  render() {
    const gridSize = {
      sm: 12,
      md: 8,
    }
    const { form } = this.props
    return (
      <Form layout="vertical" onSubmit={this.onSubmit} hideRequiredMark>
        <Row gutter={[{ xs: 8, sm: 16, md: 24, lg: 32 }]}>
          <Col {...gridSize}>
            <Form.Item
              label={
                <GenericLabel
                  title="Comercio"
                  content="Selecciona el tipo de descuento, Porcentaje (%) o Monto ($), luego ingresa el valor del descuento."
                />
              }
            >
              {form.getFieldDecorator('commerce', {
                rules: [{ required: true, message: 'Porfavor ingrese el identificador del cupón' }],
              })(<Input placeholder="Nombre del cupón" size="default" />)}
            </Form.Item>
          </Col>
          <Col {...gridSize}>
            <Form.Item
              label={
                <GenericLabel
                  title="AppCode"
                  content="Selecciona el tipo de descuento, Porcentaje (%) o Monto ($), luego ingresa el valor del descuento."
                />
              }
            >
              {form.getFieldDecorator('appcode', {
                rules: [{ required: true, message: 'Porfavor ingrese la descripción' }],
              })(<Input placeholder="Nombre del cupón" size="default" />)}
            </Form.Item>
          </Col>
          <Col {...gridSize}>
            <Form.Item
              label={
                <GenericLabel
                  title="Metodo de pago"
                  content="Selecciona el tipo de descuento, Porcentaje (%) o Monto ($), luego ingresa el valor del descuento."
                />
              }
            >
              {form.getFieldDecorator('payment', {
                rules: [{ required: true, message: 'Porfavor ingrese los terminos y condiciones' }],
              })(<Input placeholder="Nombre del cupón" size="default" />)}
            </Form.Item>
          </Col>
          <Col {...gridSize}>
            <Form.Item
              label={
                <GenericLabel
                  title="Fecha"
                  content="Selecciona el tipo de descuento, Porcentaje (%) o Monto ($), luego ingresa el valor del descuento."
                />
              }
            >
              {form.getFieldDecorator('payment', {
                rules: [{ required: true, message: 'Porfavor ingrese los terminos y condiciones' }],
              })(<DatePicker.RangePicker style={{ width: '100%' }} />)}
            </Form.Item>
          </Col>
          <Col {...gridSize}>
            <Form.Item
              label={
                <GenericLabel
                  title="Zona horaria"
                  content="Selecciona el tipo de descuento, Porcentaje (%) o Monto ($), luego ingresa el valor del descuento."
                />
              }
            >
              {form.getFieldDecorator('payment', {
                rules: [{ required: true, message: 'Porfavor ingrese los terminos y condiciones' }],
              })(
                <Select style={{ width: '100%' }} placeholder="Example">
                  <Select.Option value="1">Monto ($)</Select.Option>
                  <Select.Option value="2">Porcentaje (%)</Select.Option>
                </Select>,
              )}
            </Form.Item>
          </Col>
          <Col {...gridSize}>
            <Form.Item
              label={
                <GenericLabel
                  title="Moneda"
                  content="Selecciona el tipo de descuento, Porcentaje (%) o Monto ($), luego ingresa el valor del descuento."
                />
              }
            >
              {form.getFieldDecorator('payment', {
                rules: [{ required: true, message: 'Porfavor ingrese los terminos y condiciones' }],
              })(
                <Select style={{ width: '100%' }} placeholder="Example">
                  <Select.Option value="1">Monto ($)</Select.Option>
                  <Select.Option value="2">Porcentaje (%)</Select.Option>
                </Select>,
              )}
            </Form.Item>
          </Col>
          <Col sm={24} md={16}>
            <label htmlFor="transactions">
              <GenericLabel
                title="Transacciones"
                content="Selecciona el tipo de descuento, Porcentaje (%) o Monto ($), luego ingresa el valor del descuento."
              />
              <Row className="mt-2">
                <Col xs={6}>
                  <Form.Item>
                    {form.getFieldDecorator('transactions', {
                      rules: [
                        { required: true, message: 'Porfavor ingrese los terminos y condiciones' },
                      ],
                    })(
                      <Select style={{ width: '100%' }} placeholder="Example">
                        <Select.Option value="1">Monto ($)</Select.Option>
                        <Select.Option value="2">Porcentaje (%)</Select.Option>
                      </Select>,
                    )}
                  </Form.Item>
                </Col>
                <Col xs={18}>
                  <Form.Item>
                    {form.getFieldDecorator('commerce', {
                      rules: [
                        { required: true, message: 'Porfavor ingrese el identificador del cupón' },
                      ],
                    })(<Input placeholder="Nombre del cupón" size="default" />)}
                  </Form.Item>
                </Col>
              </Row>
            </label>
          </Col>
          <Col {...gridSize}>
            <Form.Item label={<br />}>
              {form.getFieldDecorator('submit')(
                <Button style={{ width: '100%' }} type="primary" htmlType="submit">
                  Buscar
                </Button>,
              )}
            </Form.Item>
          </Col>
        </Row>
      </Form>
    )
  }
}

export default FiltroComercios
