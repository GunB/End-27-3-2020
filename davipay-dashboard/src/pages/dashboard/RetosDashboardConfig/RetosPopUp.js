import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Button, Form, Modal, Input } from 'antd'

@Form.create()
@withRouter
class RetosPopUp extends Component {
  state = {
    open: false,
  }

  handleOpen = () => {
    this.setState({ open: true })
  }

  handleClose = () => {
    this.setState({ open: false })
  }

  onSubmit = event => {
    event.preventDefault()
    const { form, history } = this.props
    form.validateFields((error, values) => {
      if (!error) {
        history.push({
          pathname: `/dashboard/configuracion_retos/crear_reto`,
          state: {
            code: values.code,
          },
        })
        this.handleClose()
      }
    })
  }

  render() {
    const { handleOpen, handleClose, onSubmit } = this
    const { open } = this.state
    const { form } = this.props
    return (
      <>
        <Button type="primary" className="col-12" onClick={handleOpen}>
          Crear nuevo programa de lealtad
        </Button>

        <Modal
          title="Crear nuevo programa de lealtad"
          visible={open}
          closable={false}
          footer={[
            <Button key="back" onClick={handleClose}>
              Cancelar
            </Button>,
            <Button key="submit" type="primary" onClick={onSubmit}>
              Continuar
            </Button>,
          ]}
        >
          <Form layout="vertical" className="mb-3" hideRequiredMark onSubmit={onSubmit}>
            <Form.Item label="Nombre del programa">
              {form.getFieldDecorator('code', {
                // initialValue: 'admin@mediatec.org',
                rules: [{ required: true, message: 'Porfavor ingrese el nombre del programa' }],
              })(<Input size="default" />)}
            </Form.Item>
          </Form>
          <p>
            El nombre del programa de lealtad no será visible para los usuarios de la app, será
            visible únicamente para los usuarios del Administrador DaviPay
          </p>
        </Modal>
      </>
    )
  }
}

export default RetosPopUp
