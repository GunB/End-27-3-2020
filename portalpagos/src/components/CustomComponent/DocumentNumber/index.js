import React, { Component } from 'react'
import { Row, Col, Form, Select, InputNumber } from 'antd'

class DocumentNumber extends Component {
  render() {
    const { form, dataSource } = this.props
    const isCC = form.getFieldValue('document_type') === '2' || dataSource.document_type === '2'
    return (
      <>
        <Row>
          <Col xs={6}>
            <Form.Item>
              {form.getFieldDecorator('document_type', {
                initialValue: dataSource.document_type,
                rules: [
                  {
                    required: true,
                    message: ' ',
                  },
                ],
              })(
                <Select style={{ width: '100%' }} placeholder="Tipo de documento">
                  <Select.Option value="1">NIT</Select.Option>
                  <Select.Option value="2">CC</Select.Option>
                </Select>,
              )}
            </Form.Item>
          </Col>
          <Col xs={!isCC ? 15 : 18}>
            <Form.Item>
              {form.getFieldDecorator('document_number', {
                initialValue: dataSource.document_number,
                rules: [
                  {
                    required: true,
                    message: ' ',
                  },
                ],
              })(
                <InputNumber
                  style={{ width: '100%' }}
                  placeholder="Ingrese el número del documento"
                  size="default"
                />,
              )}
            </Form.Item>
          </Col>
          {!isCC ? (
            <>
              <Col xs={1} style={{ textAlign: 'center' }}>
                -
              </Col>
              <Col xs={2}>
                <Form.Item>
                  {form.getFieldDecorator('document_number_verify', {
                    initialValue: dataSource.document_number_verify,
                    rules: [
                      {
                        required: true,
                        message: ' ',
                      },
                    ],
                  })(<InputNumber style={{ width: '100%' }} />)}
                </Form.Item>
              </Col>
            </>
          ) : null}
        </Row>
      </>
    )
  }
}

export default DocumentNumber
