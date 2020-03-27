import React from 'react'
import { connect } from 'react-redux'
import * as uuidv4 from 'uuid/v4'
import { Button, Modal, Form, Input, List, Select, Icon, Tooltip } from 'antd'
import { Helmet } from 'react-helmet'
import { withRouter } from 'react-router-dom'
import CuponesActivos from 'components/CustomComponents/cuponesActivos'
import Authorize from 'components/LayoutComponents/Authorize'
import { getAsyncCupones, cleanCupons } from 'redux/cupones/actions'
import CuponList from 'components/CustomComponents/cuponList'
import moment from 'moment'
import { validateCupon } from 'services/cupon'
import ROLES from '../../../constant/roles'

const mapStateToProps = state => ({
  cuponesActivos: state.cupones.length
    ? ((cupones = []) => {
        return cupones.filter(cupon => {
          return cupon.status === '1' && moment().diff(cupon.date_to, 'days') <= 0
        })
      })([...state.cupones])
    : [],
  cupones: state.cupones.length ? [...state.cupones] : [],
})

const dispatchToProps = dispatch => ({
  getCupones: () => {
    dispatch(getAsyncCupones())
  },
  cleanSyncCupones: () => {
    dispatch(cleanCupons())
  },
})

@Form.create()
@withRouter
@connect(
  mapStateToProps,
  dispatchToProps,
)
class DashboardAlpha extends React.Component {
  state = {
    nuevoCupon: false,
    pageSize: 5,
    search: '',
  }

  componentDidMount() {
    const { getCupones, cleanSyncCupones } = this.props
    cleanSyncCupones()
    getCupones()
  }

  showModal = () => {
    this.setState({
      nuevoCupon: true,
    })
  }

  onSubmit = event => {
    event.preventDefault()
    const { form, history } = this.props
    form.validateFields((error, values) => {
      if (!error) {
        validateCupon(values.cupon).then(() => {
          history.push({
            pathname: `/dashboard/nuevocupon`,
            state: {
              code: values.cupon,
            },
          })
          this.setState({
            nuevoCupon: false,
          })
        })
      }
    })
  }

  handleCancel = () => {
    this.setState({
      nuevoCupon: false,
    })
  }

  handleChangePageSize = value => {
    this.setState({
      pageSize: parseInt(value, 10),
    })
  }

  handleChangeSearch = ({ target: { value = '' } }) => {
    this.setState({
      search: value,
    })
  }

  render() {
    const { cuponesActivos, form, cupones } = this.props
    const { nuevoCupon, pageSize, search } = this.state
    const { handleChangeSearch, handleChangePageSize } = this

    return (
      <Authorize roles={[ROLES.BONOS_ADMIN.NAME, ROLES.BONOS_ANALIST.NAME]} redirect to="/">
        <Helmet title="Crear Cupon" />

        <Modal
          title="Crear cupon"
          visible={nuevoCupon}
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
            <Form.Item label="Nombre del cupon">
              {form.getFieldDecorator('cupon', {
                // initialValue: 'admin@mediatec.org',
                rules: [{ required: true, message: 'Porfavor ingrese el nombre del cupon' }],
              })(<Input size="default" />)}
            </Form.Item>
          </Form>
          <p>
            Ten en cuenta que el nombre de los cupones debe ser de fácil recordación para los
            usuarios. Recuerda no usar caracteres especiales o tildes.
          </p>
        </Modal>

        <div className="utils__title utils__title--flat mb-3">
          <strong className="text-uppercase font-size-16">
            Cupones Actívos ({cuponesActivos.length})
          </strong>
          <Button className="ml-3" style={{ display: 'none' }}>
            Ver todos
          </Button>
        </div>

        <List
          grid={{
            gutter: 16,
            xs: 1,
            sm: 1,
            md: 3,
            lg: 3,
            xl: 3,
            xxl: 3,
          }}
          pagination={{
            pageSize: 3,
          }}
          dataSource={cuponesActivos}
          renderItem={cupon => (
            <List.Item>
              <CuponesActivos key={uuidv4()} cupon={cupon} />
            </List.Item>
          )}
        />

        <div className="utils__title utils__title--flat mb-3">
          <strong className="text-uppercase font-size-16">Creación de cupones</strong>
        </div>

        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-header">
                <p style={{ color: '#C0BDD0' }}>
                  En el historial de cupones puedes crear, apagar/encender, editar y eliminar los
                  cupones de DaviPay
                </p>
                <div>
                  <Button type="primary" onClick={this.showModal}>
                    Crear cupón
                  </Button>
                  <br className="d-block d-sm-none" />
                  <br className="d-block d-sm-none" />
                  <span className="float-right">
                    <span className="mr-3">Mostrar</span>
                    <Select
                      onChange={handleChangePageSize}
                      defaultValue={pageSize}
                      className="mr-3"
                      style={{ width: 200 }}
                    >
                      <Select.Option value="5">5</Select.Option>
                      <Select.Option value="10">10</Select.Option>
                      <Select.Option value="20">20</Select.Option>
                    </Select>
                    <br className="d-block d-sm-none" />
                    <br className="d-block d-sm-none" />
                    <span className="mr-3">Buscar:</span>
                    <Input
                      suffix={
                        <Tooltip title="Buscar">
                          <Icon type="search" style={{ color: 'rgba(0,0,0,.45)' }} />
                        </Tooltip>
                      }
                      placeholder="Buscar cupones..."
                      onChange={handleChangeSearch}
                      style={{ width: 200 }}
                    />
                  </span>
                </div>
              </div>
              <hr />
              <div className="card-body">
                <CuponList cupones={cupones} pageSize={pageSize} search={search} />
              </div>
            </div>
          </div>
        </div>
      </Authorize>
    )
  }
}

export default DashboardAlpha
