import React from 'react'
import { Form, Input, Button } from 'antd'
import TextArea from 'antd/lib/input/TextArea'
import { validateCupon } from 'services/cupon'

@Form.create()
class FormDescripcion extends React.Component {
  onSubmit = event => {
    event.preventDefault()
    const { form, onSubmit, activeTab, tabList, updating } = this.props
    form.validateFields((error, values) => {
      if (error) {
        console.log(error)
      } else {
        console.log(updating)
        if (!updating) {
          validateCupon(values.code).then(() => {
            onSubmit(values, { activeTab, tabList })
          })
        } else {
          onSubmit(values, { activeTab, tabList })
        }
      }
    })
  }

  onDiscard = () => {
    const { onDiscard } = this.props
    onDiscard()
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
    const { form, cupon, schema } = this.props
    return (
      <>
        <Form layout="vertical" className="mb-3" onSubmit={this.onSubmit}>
          <Form.Item label="Nombre del cupón">
            {form.getFieldDecorator('code', {
              initialValue: cupon.code,
              rules: [{ required: true, message: 'Porfavor ingrese el identificador del cupón' }],
            })(
              <Input
                readOnly={schema.code ? schema.code : false}
                placeholder="Nombre del cupón"
                size="default"
              />,
            )}
          </Form.Item>
          <Form.Item label="Descripcion del cupón">
            {form.getFieldDecorator('description', {
              initialValue: cupon.description,
              rules: [{ required: true, message: 'Porfavor ingrese la descripción' }],
            })(<TextArea placeholder="Descripcion del cupón" size="default" />)}
          </Form.Item>
          <Form.Item label="Términos y condiciones">
            {form.getFieldDecorator('terms', {
              initialValue: cupon.terms,
              rules: [{ required: true, message: 'Porfavor ingrese los terminos y condiciones' }],
            })(<TextArea placeholder="Terminos y condiciones" size="default" />)}
          </Form.Item>
        </Form>
        {this.placeButtons()}
      </>
    )
  }
}

export default FormDescripcion
