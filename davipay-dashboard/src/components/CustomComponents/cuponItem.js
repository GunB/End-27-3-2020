import React from 'react'
import { withRouter } from 'react-router-dom'
import * as uuidv4 from 'uuid/v4'
import moment from 'moment'
import {
  Tag,
  Button,
  Menu,
  Dropdown,
  Icon,
  Modal,
  Form,
  DatePicker,
  Spin,
  notification,
} from 'antd'
import { statusToReadableStatus } from 'factories/cupon'
import { validateRole } from 'factories/user'
import roles from 'constant/roles'
import { aproveCupon, rejectCupon, deleteCupon, updateCupon, detenerCupon } from 'services/cupon'
import IconText from './iconText'
import NumberToCurrency from './numberToCurrency'

/* eslint camelcase: 0 */
/* eslint no-unused-vars: 0 */
/* eslint react/jsx-indent: 0 */

@Form.create()
@withRouter
class CuponItem extends React.Component {
  state = {
    open: false,
    aprobar: false,
    rechazar: false,
    editarFechas: false,
    eliminar: false,
    detener: false,
    loading: false,
    cupon: {},
  }

  toggleDesc = () => {
    this.setState(prevState => ({
      open: !prevState.open,
    }))
  }

  editarCupon = () => {
    const { history, cupon } = this.props
    const { code, id } = cupon
    history.push({
      pathname: `/dashboard/editarcupon/${code}/${id}`,
    })
  }

  detallesCupon = () => {
    const { history, cupon } = this.props
    const { code, id } = cupon
    history.push({
      pathname: `/dashboard/detallescupon/${code}/${id}`,
    })
  }

  toTitleCase = s => s.substr(0, 1).toUpperCase() + s.substr(1).toLowerCase()

  modalHandler = (data = {}) => {
    const state = {
      aprobar: false,
      rechazar: false,
      editarFechas: false,
      eliminar: false,
      detener: false,
      loading: false,
      ...data,
    }
    this.setState({ ...state })
  }

  handleMenuClick = e => {
    const { modalHandler } = this
    const { state, props } = this
    const cupon = {
      ...props.cupon,
      ...state.cupon,
    }

    let { date_from, date_to } = cupon
    let date_between = false
    switch (e.key) {
      case '1':
        date_from = 0
        date_to = moment().diff(date_to, 'days')
        date_between = moment(cupon.date_to).diff(cupon.date_from, 'days') > 0
        if (date_from <= 0 && date_to <= 0 && date_between) {
          modalHandler({ aprobar: true })
        } else {
          modalHandler({ editarFechas: true })
        }
        break
      case '2':
        modalHandler({ rechazar: true })
        break
      case '3':
        modalHandler({ eliminar: true })
        break
      default:
    }
  }

  onSubmit = () => {
    this.setState({ loading: true })
    const { modalHandler, handleMenuClick } = this
    const {
      aprobar = false,
      rechazar = false,
      editarFechas = false,
      eliminar = false,
      detener = false,
    } = this.state

    const { state, props } = this
    const cupon = {
      ...props.cupon,
      ...state.cupon,
    }

    const { form } = this.props
    if (aprobar) {
      aproveCupon(cupon).then(() => {
        modalHandler()
        this.setState(prev => ({
          ...prev,
          cupon: {
            ...prev.cupon,
            status: '1',
          },
        }))
        window.location.reload()
      })
    }
    if (editarFechas) {
      form.validateFields((error, values) => {
        if (error) {
          console.log(error)
        } else {
          const date_from = 0
          const date_to = moment().diff(values.periodo[1], 'days')
          const date_between = moment(values.periodo[1]).diff(values.periodo[0], 'days') > 0
          if (date_from <= 0 && date_to <= 0 && date_between) {
            updateCupon({
              ...cupon,
              date_from: moment(values.periodo[0]).format('YYYY-MM-DD hh:mm:ss'),
              date_to: moment(values.periodo[1]).format('YYYY-MM-DD hh:mm:ss'),
            }).then(() => {
              modalHandler()
              this.setState(prev => ({
                ...prev,
                cupon: {
                  ...prev.cupon,
                  date_from: moment(values.periodo[0]).format('YYYY-MM-DD hh:mm:ss'),
                  date_to: moment(values.periodo[1]).format('YYYY-MM-DD hh:mm:ss'),
                },
              }))
              handleMenuClick({ key: '1' })
            })
          } else {
            this.setState({ loading: false })
            notification.warning({
              message: 'Las fechas no son correctas',
              description:
                'Verifique el rango de fechas seleccionado. La fecha de finalización debe ser mayor a la fecha actual',
            })
          }
        }
      })
    }
    if (detener) {
      detenerCupon(cupon).then(() => {
        modalHandler()
        this.setState(prev => ({
          ...prev,
          cupon: {
            ...prev.cupon,
            status: '3',
          },
        }))
        window.location.reload()
      })
    }
    if (rechazar) {
      rejectCupon(cupon).then(() => {
        modalHandler()
        this.setState(prev => ({
          ...prev,
          cupon: {
            ...prev.cupon,
            status: '2',
          },
        }))
        window.location.reload()
      })
    }
    if (eliminar) {
      deleteCupon(cupon).then(() => {
        modalHandler()
        window.location.reload()
      })
    }
  }

  aprobarModal = () => {
    const { loading } = this.state
    const { state, props } = this
    const cupon = {
      ...props.cupon,
      ...state.cupon,
    }
    return (
      <Modal
        title={<h3>Aprobar cupon {cupon.code}</h3>}
        visible
        closable={false}
        footer={[
          <Spin spinning={loading} tip="Cargando..." key={uuidv4()}>
            <Button key="back" onClick={this.modalHandler}>
              Cancelar
            </Button>
            ,
            <Button key="submit" type="primary" onClick={this.onSubmit}>
              Continuar
            </Button>
          </Spin>,
        ]}
      >
        <h5>¿Esta seguro de aprobar este cupon?</h5>
        <p>La información será aprobada por el usuario actual</p>
      </Modal>
    )
  }

  rechazarModal = () => {
    const { loading } = this.state
    const { state, props } = this
    const cupon = {
      ...props.cupon,
      ...state.cupon,
    }
    return (
      <Modal
        title={<h3>Rechazar cupon {cupon.code}</h3>}
        visible
        closable={false}
        footer={[
          <Spin spinning={loading} tip="Cargando..." key={uuidv4()}>
            <Button key="back" onClick={this.modalHandler}>
              Cancelar
            </Button>
            ,
            <Button key="submit" type="primary" onClick={this.onSubmit}>
              Continuar
            </Button>
          </Spin>,
        ]}
      >
        <h5>¿Esta seguro de rechazar este cupon?</h5>
        <p>La información será rechazada por el usuario actual</p>
      </Modal>
    )
  }

  editarModal = () => {
    const { form } = this.props
    const { loading } = this.state
    const { state, props } = this
    const cupon = {
      ...props.cupon,
      ...state.cupon,
    }
    return (
      <Modal
        title={<h3>Editar cupon {cupon.code}</h3>}
        visible
        closable={false}
        footer={[
          <Spin spinning={loading} tip="Cargando..." key={uuidv4()}>
            <Button key="back" onClick={this.modalHandler}>
              Cancelar
            </Button>
            ,
            <Button key="submit" type="primary" onClick={this.onSubmit}>
              Continuar
            </Button>
          </Spin>,
        ]}
      >
        <h5>¿Esta seguro de editar este cupon?</h5>
        <p>La fecha de finalizacion del cupon debe ser mayor al día actual</p>
        <Form layout="vertical" className="mb-3">
          <div className="col-lg-8">
            <Form.Item label="Periodo">
              {form.getFieldDecorator('periodo', {
                initialValue: [moment(cupon.date_from), moment(cupon.date_to)],
                rules: [{ required: true, message: 'Porfavor ingrese el período' }],
              })(<DatePicker.RangePicker style={{ width: '100%' }} />)}
            </Form.Item>
          </div>
        </Form>
      </Modal>
    )
  }

  eliminarModal = () => {
    const { loading } = this.state
    const { state, props } = this
    const cupon = {
      ...props.cupon,
      ...state.cupon,
    }
    return (
      <Modal
        title={<h3>Eliminar cupon {cupon.code}</h3>}
        visible
        closable={false}
        footer={[
          <Spin spinning={loading} tip="Cargando..." key={uuidv4()}>
            <Button key="back" onClick={this.modalHandler}>
              Cancelar
            </Button>
            ,
            <Button key="submit" type="primary" onClick={this.onSubmit}>
              Continuar
            </Button>
          </Spin>,
        ]}
      >
        <h5>Esta seguro de borrar este cupon?</h5>
        <p>Se perdera toda la informacion asociada a este cupon</p>
      </Modal>
    )
  }

  detenerModal = () => {
    const { form } = this.props
    const { loading } = this.state
    const { state, props } = this
    const cupon = {
      ...props.cupon,
      ...state.cupon,
    }
    return (
      <Modal
        title={<h3>Detener cupon {cupon.code}</h3>}
        visible
        closable={false}
        footer={[
          <Spin spinning={loading} tip="Cargando..." key={uuidv4()}>
            <Button key="back" onClick={this.modalHandler}>
              Cancelar
            </Button>
            ,
            <Button key="submit" type="primary" onClick={this.onSubmit}>
              Continuar
            </Button>
          </Spin>,
        ]}
      >
        <h5>Esta seguro de detener este cupon?</h5>
      </Modal>
    )
  }

  render() {
    const { cupon } = this.props
    const { state } = this
    const data = {
      ...cupon,
      ...state.cupon,
    }

    const {
      Commerce,
      Segments,
      amount,
      amount_redeem,
      budget,
      code,
      date_from,
      date_to,
      description,
      id,
      max_amount,
      min_amount,
      percentage,
      status,
      stock,
      stock_redeem,
      terms,
      type,
      amount_current_redeem,
      amount_limit_redeem,
      user_limit_redeem,
    } = data

    const header = () => {
      const { open } = this.state
      const statusReadable = statusToReadableStatus(status)
      return (
        <div className="row mb-2">
          <div className="col-2">
            <span className="utils__link--underlined">{id}</span>
            {Array.isArray(Commerce) ? (
              <Button onClick={this.toggleDesc} type="link">
                {open ? (
                  <IconText type="minus-circle" theme="filled" />
                ) : (
                  <IconText type="plus-circle" theme="filled" />
                )}
              </Button>
            ) : null}
          </div>
          <div className="col-8 text-right">
            <NumberToCurrency value={amount_current_redeem} /> /{' '}
            <strong>
              <NumberToCurrency value={amount_limit_redeem} />
            </strong>
          </div>
          {statusReadable ? (
            <div className="col-2 text-center">
              {statusReadable.type === 'STATUS_PENDING' && validateRole([roles.BONOS_ADMIN]) ? (
                <Dropdown
                  overlay={
                    <Menu onClick={this.handleMenuClick}>
                      <Menu.Item key="1">Aprobar</Menu.Item>
                      <Menu.Item key="2">Rechazar</Menu.Item>
                      <Menu.Divider />
                      <Menu.Item key="3">
                        Eliminar <Icon type="delete" />
                      </Menu.Item>
                    </Menu>
                  }
                >
                  <Button type="link">
                    <Tag color={statusReadable.color}>
                      {statusReadable.name} <Icon type="down" />
                    </Tag>
                  </Button>
                </Dropdown>
              ) : (
                <Tag color={statusReadable.color}>{statusReadable.name}</Tag>
              )}
            </div>
          ) : null}
        </div>
      )
    }

    const table = (
      <div className="row">
        <div className="col-4">
          <div>
            <h5>Descuento</h5>
          </div>
          {percentage ? <div>{percentage}%</div> : null}
          {amount ? <div>${amount}</div> : null}
        </div>
        <div className="col-4">
          <div>
            <h5>Presupuesto</h5>
          </div>
          <div>${amount_limit_redeem}</div>
        </div>
        <div className="col-4">
          <div>
            <h5>Inicio</h5>
          </div>
          <div>{moment(date_from).format('DD/MM/YYYY')}</div>
        </div>
        <div className="col-4">
          <div>
            <h5>Límite de usos</h5>
          </div>
          <div>{user_limit_redeem}</div>
        </div>
        <div className="col-4">
          <div>
            <h5>Segmento</h5>
          </div>
          <div>
            {(() => {
              if (Segments)
                return (
                  <ul className="pl-4">
                    {Segments.map(segment => (
                      <React.Fragment key={uuidv4()}>
                        <li>{`${segment.name} `}</li>
                      </React.Fragment>
                    ))}
                  </ul>
                )
              return null
            })()}
          </div>
        </div>
        <div className="col-4">
          <div>
            <h5>Fin</h5>
          </div>
          <div>{moment(date_to).format('DD/MM/YYYY')}</div>
        </div>
      </div>
    )

    const body = (
      <div className="row">
        <div className="col-12 col-lg-7">{description}</div>
        <div className="col-12 col-lg-5">{table}</div>
      </div>
    )

    const listComercios = Array.isArray(Commerce) ? (
      <div className="row mt-3">
        {Commerce.map(c => (
          <React.Fragment key={uuidv4()}>
            <div className="col-12">
              <div className="row">
                <div className="col-12">
                  <hr />
                </div>
                <h5 className="col-4">Comercio</h5>
                <div className="col-8">{c.name}</div>
              </div>
            </div>
            {Array.isArray(c.Store)
              ? c.Store.map(s => (
                  <React.Fragment key={uuidv4()}>
                    <div className="col-12">
                      <div className="row">
                        <div className="col-12">
                          <hr />
                        </div>
                        <h5 className="col-4">Punto de venta</h5>
                        <div className="col-8">{s.name}</div>
                      </div>
                    </div>
                  </React.Fragment>
                ))
              : null}
          </React.Fragment>
        ))}
        <div className="col-12">
          <hr />
        </div>
      </div>
    ) : null

    const actions = (
      <div className="mt-2">
        <Button.Group size="big">
          <Button type="link" className="gray pl-0" onClick={this.detallesCupon}>
            <u>Detalles</u>
          </Button>
          <Button type="link" className="gray" onClick={this.editarCupon}>
            <u>Editar</u>
          </Button>
          <Button
            type="link"
            onClick={() => {
              this.modalHandler({ detener: true })
            }}
          >
            <u>Detener</u>
          </Button>
        </Button.Group>
      </div>
    )

    const { open, aprobar, rechazar, eliminar, editarFechas, detener } = this.state

    return cupon ? (
      <div className="col-12 mb-3">
        <h3>{code}</h3>
        {aprobar ? this.aprobarModal() : null}
        {rechazar ? this.rechazarModal() : null}
        {eliminar ? this.eliminarModal() : null}
        {editarFechas ? this.editarModal() : null}
        {detener ? this.detenerModal() : null}
        {header()}
        {body}
        {open ? listComercios : null}
        {actions}
      </div>
    ) : null
  }
}

export default CuponItem
