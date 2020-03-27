import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'
import { withRouter } from 'react-router-dom'
import { Card, Modal, Button } from 'antd'
import SimpleWizzard from 'components/CustomComponent/SimpleWizzard'
import MenuLayout from 'components/LayoutComponents/MenuLayout'
import { createCommerceSaga } from 'models/redux/commerce/sagas'
import FormDescripcion from './formDescripcion'
import ResumeForm from './resumeForm'
import FormContrato from './formContrato'
import FormDocumentos from './formDocumentos'
import FormConfiguracion from './formConfiguracion'

@withRouter
@connect(({ config }) => ({ loading: config.loading }))
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

    console.log(data, history)
    createCommerceSaga(data)
      .then(() => {
        this.toggleLoading()
        const secondsToGo = 5
        const modal = Modal.success({
          title: 'Crear comercio',
          content: `Comercio creado correctamente`,
        })
        setTimeout(() => {
          modal.destroy()
          history.push('/resume')
          history.push('/comercios/crear')
        }, secondsToGo * 1000)
      })
      .catch(() => {
        this.toggleLoading()
        const secondsToGo = 5
        const modal = Modal.error({
          title: 'Crear comercio',
          content: `No se pudo crear el comercio`,
        })
        setTimeout(() => {
          modal.destroy()
        }, secondsToGo * 1000)
      })
  }

  render() {
    const title = 'Crear comercio'
    const { onConfirm, onCancel, onSubmit } = this
    const { modal, loading } = this.state
    const { props } = this

    const data = {}

    return (
      <>
        <MenuLayout loading={props.loading}>
          <Helmet title={title} />
          <Card style={{ width: '100%' }} title={title}>
            <SimpleWizzard
              type="card"
              onSubmit={onConfirm}
              dataSource={data}
              schemaSource={{ urlBack: '/resume' }}
              isLoading={loading}
              title="Crear nuevo comercio"
              renderList={[
                {
                  title: 'Comercio',
                  content: <FormDescripcion />,
                },
                {
                  title: 'Contrato',
                  content: <FormContrato />,
                },
                {
                  title: 'Documentos',
                  content: <FormDocumentos />,
                },
                {
                  title: 'Configración',
                  content: <FormConfiguracion />,
                },
                {
                  title: 'Finalizar',
                  content: <ResumeForm />,
                },
              ]}
            />
          </Card>
          <Modal
            title="Crear comercio"
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
            <h5>El comercio quedará en estado de aprobación</h5>
            <p>
              Será necesario aprobar todos los documentos previamente para poder acceder a este
              comercio desde la sección pública
            </p>
          </Modal>
        </MenuLayout>
      </>
    )
  }
}

export default CrearReto
