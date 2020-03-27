import React, { Component } from 'react'
import Authorize from 'components/LayoutComponents/Authorize'
import { Helmet } from 'react-helmet'
import { withRouter } from 'react-router-dom'
import { Card, Modal, Button } from 'antd'
import { createChallenge } from 'services/challenge'
import roles from 'constant/roles'
import SimpleWizzard from 'components/WizzardComponent/SimpleWizzard'
import FormDescripcion from './formDescripcion'
import FormNiveles from './formNiveles'
import ResumeForm from './resumeForm'

@withRouter
class CrearReto extends Component {
  state = {
    modal: false,
    loading: false,
    data: {},
  }

  onConfirm = data => {
    this.setState({ modal: true, data })
  }

  onCancel = () => {
    this.setState({ modal: false })
  }

  toggleLoading = () => {
    let { loading } = this.state
    loading = !loading
    this.setState({ loading })
  }

  onSubmit = () => {
    this.onCancel()
    this.toggleLoading()
    const { data } = this.state
    const { history } = this.props
    createChallenge(data)
      .then(() => {
        this.toggleLoading()
        history.push('/configuracion_retos')
      })
      .catch(() => {
        this.toggleLoading()
      })
  }

  render() {
    const title = 'Crear nuevo reto'
    const { onConfirm, onCancel, onSubmit } = this
    const { location = {} } = this.props
    const { modal, loading } = this.state
    const { state = {} } = location
    const { code = null } = state

    const data = {
      name: code,
    }

    return (
      <>
        <Authorize roles={[roles.RETOS_ADMIN.NAME, roles.RETOS_ANALIST.NAME]} redirect to="/">
          <Helmet title={title} />
          <Card style={{ width: '100%' }} className="mb-5" title={title}>
            <SimpleWizzard
              onSubmit={onConfirm}
              dataSource={data}
              schemaSource={{ urlBack: '/dashboard/configuracion_retos' }}
              isLoading={loading}
              title="Crear nuevo Reto DaviPay"
              renderList={[
                {
                  title: 'Descripción',
                  content: <FormDescripcion />,
                },
                {
                  title: 'Niveles',
                  content: <FormNiveles />,
                },
                {
                  title: 'Finalizar',
                  content: <ResumeForm />,
                },
              ]}
            />
          </Card>
          <Modal
            title="Crear programa de lealtad"
            visible={modal}
            onCancel={onCancel}
            footer={[
              <Button key="back" onClick={onCancel}>
                Cancelar
              </Button>,
              <Button key="submit" type="primary" onClick={onSubmit}>
                Continuar
              </Button>,
            ]}
          >
            <h5>
              El programa se creará y se publicará automáticamente en la fecha de inicio
              seleccionada.
            </h5>
            <p>
              Podrás ver tus programas de lealtad creados en la sección de Configuración para
              modificarlos y/o publicarlos manualmente.
            </p>
          </Modal>
          <br />
          <br />
          <br />
        </Authorize>
      </>
    )
  }
}

export default CrearReto
