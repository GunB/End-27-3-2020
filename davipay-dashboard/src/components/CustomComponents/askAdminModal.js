import React from 'react'
import * as uuidv4 from 'uuid/v4'
import { Button, Modal, Spin, Form, Select } from 'antd'
import { getAdmins } from 'services/user'
import { validateRole } from 'factories/user'
import roles from 'constant/roles'

@Form.create()
class AskAdminModal extends React.Component {
  state = {
    loading: true,
    admin: validateRole([roles.BONOS_ADMIN]),
    adminList: [],
  }

  componentDidMount() {
    getAdmins()
      .then(adminList => {
        console.log(adminList)
        this.setState({ adminList, loading: false })
      })
      .catch(() => {
        this.closeModal()
      })
  }

  closeModal = () => {
    const { onClose } = this.props
    onClose()
  }

  onSubmit = () => {
    const { form, onSubmit, data } = this.props

    form.validateFields((error, values) => {
      if (error) {
        console.log(error, values)
      } else {
        this.setState({ loading: true })
        onSubmit({ ...data, ...values })
      }
    })
  }

  render() {
    const { loading, admin, adminList } = this.state
    const { onSubmit, closeModal } = this
    const { form } = this.props

    return admin ? (
      onSubmit()
    ) : (
      <Modal
        title={<h3>Solicitud de aprobación</h3>}
        visible
        closable={false}
        footer={[
          <Spin spinning={loading} indicator={<></>} key={uuidv4()}>
            <Button key="back" onClick={closeModal}>
              Cancelar
            </Button>
            <Button key="submit" type="primary" onClick={onSubmit}>
              Continuar
            </Button>
          </Spin>,
        ]}
      >
        <Form layout="vertical" className="mb-3">
          <Spin spinning={loading} tip="Cargando..." key={uuidv4()}>
            <p>
              Has ingresado en el Administrador DaviPay como analista, este elemento debe ser
              aprobado por un administrador para que sea publicado. Selecciona un administrador:
            </p>
            <Form.Item label="Administrador">
              {form.getFieldDecorator('admin_users_received_id', {
                rules: [{ required: true, message: 'Porfavor seleccione un admiistrador' }],
              })(
                <Select style={{ width: '100%' }}>
                  {adminList.map(a => (
                    <Select.Option value={a.ID} key={a.ID}>
                      {a.Name} <span style={{ color: '#D2D8E5' }}>{a.Email}</span>
                    </Select.Option>
                  ))}
                </Select>,
              )}
            </Form.Item>
          </Spin>
        </Form>
      </Modal>
    )
  }
}

export default AskAdminModal
