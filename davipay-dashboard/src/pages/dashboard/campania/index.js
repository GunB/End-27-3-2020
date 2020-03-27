/* eslint-disable react/no-unused-state */
import React from 'react'
// import * as uuidv4 from 'uuid/v4'
import { Button, Modal, Form, Input, List, message, Select } from 'antd'
import { Helmet } from 'react-helmet'
import { withRouter } from 'react-router-dom'
import CampanaItem from 'components/CustomComponents/campanaItem'
import {
  getAllCampaigns,
  removeCampaignService,
  validateCampaign,
} from '../../../services/campania'

const { Option } = Select
@Form.create()
@withRouter
class DashboardBeta extends React.Component {
  state = {
    newCampaing: false,
    campanas: [],
    campañaID: 0,
    name: '',
    typeCampaing: 0,
    pageSize: 5,
  }

  componentDidMount() {
    this.getAllData('')
  }

  getAllData = search => {
    const hide = message.loading('Cargando las campañas...', 0)
    getAllCampaigns(search).then(response => {
      this.setState({
        campanas: response,
      })
      hide()
    })
  }

  removeCampaign = id => {
    removeCampaignService(id).then(() => {
      this.getAllData('')
    })
  }

  duplicateCampaign = (name, id) => {
    this.setState({
      campañaID: id,
      newCampaing: true,
      name,
      typeCampaing: 1,
    })
  }

  editCampaing = (name, id) => {
    this.setState({
      campañaID: id,
      newCampaing: true,
      name,
      typeCampaing: 2,
    })
  }

  showModal = () => {
    this.setState({
      newCampaing: true,
    })
  }

  onSubmit = event => {
    event.preventDefault()
    const { form, history } = this.props
    const redirect = values => {
      const { campañaID, typeCampaing } = this.state
      validateCampaign(values.campania).then(() => {
        history.push(`/dashboard/nuevacampania/${values.campania}/${campañaID}/${typeCampaing}`)
        this.setState({
          newCampaing: false,
        })
      })
    }

    form.validateFields((error, values) => {
      if (!error) {
        const { typeCampaing } = this.state
        if (typeCampaing !== 2) {
          validateCampaign(values.campania).then(() => {
            redirect(values)
          })
        } else {
          redirect(values)
        }
      }
    })
  }

  handleCancel = () => {
    this.setState({
      newCampaing: false,
      campañaID: 0,
      name: '',
      typeCampaing: 0,
    })
  }

  show = value => {
    this.setState({
      pageSize: value,
    })
  }

  render() {
    const { form } = this.props
    const { newCampaing, campanas, name, typeCampaing, pageSize } = this.state

    let titleModal = 'Crear campaña'

    switch (typeCampaing) {
      case 1:
        titleModal = 'Duplicar campaña'
        break
      case 2:
        titleModal = 'Editar campaña'
        break
      default:
        break
    }
    return (
      <>
        <Helmet title="Crear campaña" />

        <Modal
          title={titleModal}
          visible={newCampaing}
          closable={false}
          footer={[
            <Button key="back" onClick={this.handleCancel}>
              Cancelar
            </Button>,
            <Button key="submit" type="primary" onClick={this.onSubmit}>
              Continuar
            </Button>,
          ]}
        >
          <Form layout="vertical" className="mb-3" hideRequiredMark onSubmit={this.onSubmit}>
            <Form.Item label="Nombre de la campaña">
              {form.getFieldDecorator('campania', {
                // initialValue: 'admin@mediatec.org',
                rules: [{ required: true, message: 'Porfavor ingrese nombre de la campaña' }],
                initialValue: name,
              })(<Input size="default" />)}
            </Form.Item>
          </Form>
          <p>
            Los nombres de las campañas no son visibles en la app DaviPay, unicamente serán visibles
            para los usuarios del Administrador
          </p>
        </Modal>

        <div className="utils__title utils__title--flat mb-3">
          <strong className="text-uppercase font-size-16">Creacion de campañas</strong>
        </div>

        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-header">
                <p style={{ color: '#C0BDD0' }}>
                  En el historial de cupones puedes crear, apagar/encender, editar y eliminar los
                  cupones de DaviPay
                </p>
                <div className="row">
                  <div className="col-lg-6">
                    <Button type="primary" onClick={this.showModal}>
                      Crear campaña
                    </Button>
                  </div>
                  <div className="col-lg-6" align="right">
                    Mostrar:&nbsp;
                    <Select
                      defaultValue={5}
                      size="small"
                      style={{ width: 80 }}
                      onChange={this.show}
                    >
                      <Option value={3}>3</Option>
                      <Option value={5}>5</Option>
                      <Option value={10}>10</Option>
                      <Option value={20}>20</Option>
                    </Select>
                    &nbsp; Buscar:&nbsp;
                    <Input.Search
                      placeholder="Buscar"
                      onSearch={value => this.getAllData(value)}
                      style={{ width: 200 }}
                      size="small"
                    />
                  </div>
                </div>
              </div>
              <hr />
              <div className="card-body">
                <List
                  itemLayout="vertical"
                  size="large"
                  pagination={{
                    pageSize,
                  }}
                  dataSource={campanas}
                  footer={<div />}
                  renderItem={item => (
                    <CampanaItem
                      {...item}
                      removeCampaign={this.removeCampaign}
                      editCampaing={this.editCampaing}
                      duplicateCampaign={this.duplicateCampaign}
                    />
                  )}
                />
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default DashboardBeta
