import React, { Component } from 'react'
import { Form, Row, Col, Input, InputNumber, Select, Button } from 'antd'

@Form.create()
class PayInformation extends Component {
  onSubmit = event => {
    event.preventDefault()
    const { form, setSelect, handleConcept } = this.props
    form.validateFields((error, values) => {
      if (error) {
        console.log(error)
      } else {
        setSelect()
        handleConcept(values)
      }
    })
  }

  fields = (fields, form) => {
    if (fields && fields.form_field) {
      if (fields.form_field !== null) {
        return Object.keys(fields.form_field).map((item, keys) => {
          if (Object.values(fields.form_field) === 'number') {
            return (
              <Col sm={24} md={12} key={`number-${item}`}>
                {/* eslint-disable-next-line react/no-array-index-key */}
                <Form.Item label={item} key={keys}>
                  {form.getFieldDecorator(`form_${item}`, {
                    initialValue: '',
                    rules: [{ required: true, message: 'Campo requerido' }],
                  })(
                    <InputNumber
                      // readOnly={schemaSource.code ? schemaSource.code : false}
                      placeholder={item}
                      style={{ width: '100%', margin: '0 20px 0 0' }}
                    />,
                  )}
                </Form.Item>
              </Col>
            )
          }
          return (
            <Col sm={24} md={12} key={`text-${item}`}>
              <Form.Item label={item}>
                {form.getFieldDecorator(`form_${item}`, {
                  // initialValue: dataSource.nameOwner,
                  rules: [{ required: true, message: 'Campo requerido' }],
                })(
                  <Input
                    allowClear
                    placeholder={item}
                    style={{ width: '100%', margin: '0 20px 0 0' }}
                  />,
                )}
              </Form.Item>
            </Col>
          )
        })
      }
    }
    return null
  }

  conceptPay = fields => {
    if (fields && fields.payment_concept) {
      return fields.payment_concept.map((concept, key) => {
        return (
          // eslint-disable-next-line react/no-array-index-key
          <Select.Option value={concept} key={key}>
            {concept}
          </Select.Option>
        )
      })
    }
    return null
  }

  render() {
    const { form, fields } = this.props
    return (
      <>
        <Form hideRequiredMark style={{ width: '95%' }}>
          <Row gutter={[32, 8]} type="flex">
            <Col sm={24} md={12}>
              <Form.Item label="Número (Hoja, pedido, factura u orden)">
                {form.getFieldDecorator('numberPaper', {
                  // initialValue: dataSource.nameOwner,
                  rules: [{ required: true, message: 'Campo requerido' }],
                })(
                  <Input
                    allowClear
                    placeholder="Número (Hoja, pedido, factura u orden)"
                    style={{ width: '100%', margin: '0 20px 0 0' }}
                  />,
                )}
              </Form.Item>
            </Col>
            <Col sm={24} md={12}>
              <Form.Item label="Concepto">
                {form.getFieldDecorator('concept', {
                  // initialValue: dataSource.nameOwner,
                  placeholder: 'Seleccionar concepto',
                  rules: [{ required: true, message: 'Campo requerido' }],
                })(
                  <Select style={{ width: '100%', margin: '0 20px 0 0' }}>
                    {this.conceptPay(fields)}
                    {/* <Select.Option value="jaja">
                      No se si
                    </Select.Option>
                    <Select.Option value="jaja">
                      Amaral
                    </Select.Option> */}
                  </Select>,
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[32, 8]} type="flex" align="middle">
            <Col sm={24} md={12}>
              <Form.Item label="Total a pagar">
                {form.getFieldDecorator('totalPay', {
                  initialValue: '',
                  rules: [{ required: true, message: 'Campo requerido' }],
                })(
                  <InputNumber
                    // readOnly={schemaSource.code ? schemaSource.code : false}
                    formatter={value => `$ ${value}`}
                    placeholder="Total a pagar"
                    style={{ width: '100%', margin: '0 20px 0 0' }}
                  />,
                )}
              </Form.Item>
            </Col>
            {this.fields(fields, form)}
          </Row>
        </Form>
        <Row gutter={[32, 8]} type="flex">
          <Col sm={24} md={12}>
            <Button
              type="submit"
              className="bg-primary-color bradius-xs hv-link"
              onClick={this.onSubmit}
            >
              Continuar
            </Button>
          </Col>
        </Row>
      </>
    )
  }
}

export default PayInformation
