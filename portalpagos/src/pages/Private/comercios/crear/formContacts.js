import React, { Component } from 'react'
import { Form, Input, InputNumber, Row, Col, Button, Icon, Table } from 'antd'

@Form.create()
class FormContacts extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
    }
  }

  componentDidMount() {
    const { dataSource = [] } = this.props
    this.setState({ data: dataSource })
  }

  onSubmit = event => {
    event.preventDefault()
    const { form, onSubmit } = this.props
    form.validateFields((error, values) => {
      if (error) {
        console.log(error)
      } else {
        onSubmit(values)
      }
    })
  }

  render() {
    const columns = [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: text => <a>{text}</a>,
      },
      {
        title: 'Age',
        dataIndex: 'age',
        key: 'age',
      },
      {
        title: 'Address',
        dataIndex: 'address',
        key: 'address',
      },
      {
        title: 'Action',
        key: 'action',
        render: () => (
          <span>
            <a>Delete</a>
          </span>
        ),
      },
    ]

    const formItemLayout = {
      labelCol: { md: 24 },
      wrapperCol: { md: 24 },
      labelAlign: 'left',
      layout: 'horizontal',
      hideRequiredMark: true,
    }
    const responsive = { md: 12, lg: 6 }
    const { form } = this.props
    const { data } = this.state

    return (
      <>
        <Form {...formItemLayout} className="mb-3" onSubmit={this.onSubmit}>
          <Row gutter={[{ xs: 8, sm: 16, md: 24, lg: 32 }, 20]}>
            <Col {...responsive}>
              <Form.Item label="Nombre">
                {form.getFieldDecorator(`name`, {
                  //initialValue: contact.name,
                })(<Input placeholder="Nombre" />)}
              </Form.Item>
            </Col>
            <Col {...responsive}>
              <Form.Item label="Area">
                {form.getFieldDecorator(`area`, {
                  //initialValue: contact.area,
                })(<Input placeholder="Area" />)}
              </Form.Item>
            </Col>
            <Col {...responsive}>
              <Form.Item label="Teléfono">
                {form.getFieldDecorator(`contact_phone`, {
                  //initialValue: contact.phone,
                  rules: [
                    {
                      required: true,
                      message: 'Porfavor seleccione la ciudad',
                    },
                  ],
                })(<InputNumber style={{ width: '100%' }} placeholder="Teléfono" />)}
              </Form.Item>
            </Col>
            <Col {...responsive}>
              <Form.Item label="Correo electrónico">
                {form.getFieldDecorator(`email`, {
                  //initialValue: contact.email,
                  rules: [
                    {
                      type: 'email',
                      message: 'Ingresa el correo electrónico',
                    },
                  ],
                })(<Input placeholder="Ingresa el correo electrónico" />)}
              </Form.Item>
            </Col>
          </Row>
        </Form>
        <Button type="link" htmlType="submit">
          <Icon type="plus" />
          Agregar nuevo contacto
        </Button>
        <Table columns={columns} className="mt-3" dataSource={data} />
      </>
    )
  }
}

export default FormContacts
