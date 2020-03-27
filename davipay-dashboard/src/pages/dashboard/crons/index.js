import React from 'react'
import moment from 'moment'
import 'moment/locale/es'
import _ from 'lodash'
import { Helmet } from 'react-helmet'
import { Row, Col, Form, Select, Button, Table, Modal, Progress, Spin } from 'antd'
import { TYPES } from 'constant/cronTypes'
import CardOpaque from 'components/CustomComponents/CardOpaque'
import PageBase from 'components/CustomComponents/pageBase'
import GenericLabel from 'components/CustomComponents/genericLabel'
import Authorize from 'components/LayoutComponents/Authorize'
import { runCron } from 'services/cron'
import { getAllStores } from 'services/stores'
import StatusDropdown from '../../../components/AuthComponents/statusDropdown'
import ROLES from '../../../constant/roles'

moment.locale('es')

const statusList = [
  {
    name: 'En progreso',
    color: 'orange',
    key: 'in progress',
  },
  {
    name: 'Terminado',
    color: 'green',
    key: 'finished',
  },
]

@Form.create()
class CronsDashBoard extends React.Component {
  state = {
    stores: [],
    showTiendas: false,
    isLoading: false,
  }

  componentDidMount() {
    this.toggleLoading()
    getAllStores()
      .then(d => {
        this.setState({ stores: [...d] })
        this.toggleLoading()
      })
      .catch(d => {
        console.log(d)
        this.toggleLoading()
      })
  }

  toggleLoading = () => {
    this.setState(prevState => ({ isLoading: !prevState.isLoading }))
  }

  onSubmit = event => {
    event.preventDefault()
    const { form } = this.props
    const { toggleLoading } = this
    form.validateFields((error, values) => {
      if (error) {
        console.log(error)
      } else {
        toggleLoading()
        const bodyFormData = new FormData()
        Object.keys(values).map(v => {
          return bodyFormData.append(v, values[v])
        })

        runCron(bodyFormData)
          .then(response => {
            Modal.info({
              content: response.Msg,
            })
            form.resetFields()
            toggleLoading()
          })
          .catch(() => {
            form.resetFields()
            toggleLoading()
          })
        this.setState({ showTiendas: false })
      }
    })
  }

  checkStatusCrons = (crons = []) => {
    const cronsInProgress = []
    crons.map(cron => {
      if (cron.status === 'in progress') {
        cronsInProgress.push(cron)
      }
      return cron
    })
    return cronsInProgress
  }

  onTypeChange = () => {
    const { form } = this.props
    const { getFieldValue, resetFields } = form
    const showTiendas = !!(getFieldValue('cron') === TYPES[2].key)
    if (!showTiendas) {
      resetFields('store')
    }
    this.setState({ showTiendas })
  }

  render() {
    const { form, crons } = this.props
    const { onSubmit, checkStatusCrons, onTypeChange } = this
    const { stores, showTiendas, isLoading } = this.state

    const cronsDisabled = checkStatusCrons(crons)

    return (
      <>
        <Authorize roles={[ROLES.RETOS_ADMIN.NAME, ROLES.RETOS_ANALIST.NAME]} redirect to="/">
          <Helmet title="Crons" />
          <PageBase title="Crons">
            <Spin spinning={!!isLoading} tip="Cargando...">
              <h4>Ejecutar cron para actualizar</h4>
              <hr />
              <Row type="flex" align="middle" gutter={24}>
                <Col md={16} xs={24}>
                  <Form layout="vertical" className="mb-3" hideRequiredMark>
                    <Form.Item
                      label={
                        <GenericLabel
                          title="Seleccionar tipo de cron"
                          content="Seleccionar tipo de cron"
                        />
                      }
                    >
                      {form.getFieldDecorator('cron', {
                        rules: [{ required: true, message: 'Porfavor seleccione el cron' }],
                      })(
                        <Select
                          style={{ width: '100%' }}
                          placeholder="Seleccione un tipo de cron"
                          onSelect={onTypeChange}
                        >
                          {TYPES.map(type => {
                            const disabled = cronsDisabled.find(x => x.type === type.key)
                            return (
                              <Select.Option disabled={!!disabled} key={type.key} value={type.key}>
                                {disabled ? (
                                  <>
                                    <span>{type.text}</span>
                                    <span className="float-right">{moment().to(disabled.end)}</span>
                                  </>
                                ) : (
                                  type.text
                                )}
                              </Select.Option>
                            )
                          })}
                        </Select>,
                      )}
                    </Form.Item>
                    {showTiendas ? (
                      <Form.Item
                        label={
                          <GenericLabel
                            title="Seleccionar tienda"
                            content="Seleccionar tienda de la lista"
                          />
                        }
                      >
                        {form.getFieldDecorator('store', {
                          rules: [
                            { required: showTiendas, message: 'Porfavor seleccione una tienda' },
                          ],
                        })(
                          <Select
                            showSearch
                            style={{ width: '100%' }}
                            placeholder="Seleccione una tienda"
                            filterOption={(input, option) =>
                              option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                          >
                            {stores.map(s => (
                              <Select.Option key={s.store} value={s.store}>
                                {s.name}
                              </Select.Option>
                            ))}
                          </Select>,
                        )}
                      </Form.Item>
                    ) : null}
                  </Form>
                </Col>
                <Col md={8} xs={24}>
                  <CardOpaque>
                    <h4>Sobre los cron</h4>
                    <p>
                      Cada cron tomara un tiempo en ejecutarse por completo; debes esperar a que se
                      finalice antes de ejecutarlo de nuevo.
                    </p>
                    <ul>
                      <li>Actualizar estado de tiendas: 15 minutos</li>
                      <li>Actualizar todos los menus: 45 minutos</li>
                      <li>Actualizar menu especifico: 5 minutos</li>
                    </ul>
                  </CardOpaque>
                </Col>
              </Row>
              <>
                <hr />
                <div className="text-right">
                  <Button.Group size="big">
                    <Button type="primary" disabled={!crons} onClick={onSubmit}>
                      Ejecutar
                    </Button>
                  </Button.Group>
                </div>
              </>
            </Spin>
          </PageBase>
          {!_.isEmpty(crons) ? (
            <>
              <br />
              <PageBase title="Historial de actualizaciones">
                <Table
                  pagination={{
                    pageSize: 10,
                    hideOnSinglePage: true,
                  }}
                  dataSource={crons}
                  columns={columns}
                />
              </PageBase>
            </>
          ) : null}
        </Authorize>
      </>
    )
  }
}

const columns = [
  {
    title: 'Tipo de cron',
    dataIndex: 'type',
    key: 'type',
    render: x => {
      const tipo = TYPES.find(s => s.key === x)
      return tipo.text
    },
  },
  {
    title: 'Detalles',
    dataIndex: 'details',
    key: 'details',
  },
  {
    title: 'Usuario',
    dataIndex: 'user',
    key: 'user',
  },
  {
    title: 'Estado',
    dataIndex: 'status',
    key: 'status',
    render: (x, record) => {
      return (
        <StatusDropdown statusList={statusList} actions={[]} key={record.key} dataSource={record} />
      )
    },
  },
  {
    title: 'Progreso',
    dataIndex: 'progress',
    key: 'progress',
    render: (x, record) => {
      const status = statusList.find(s => s.key === record.status)

      const min = moment(record.start).unix()
      const max = moment(record.end).unix()
      const input = moment().unix()

      const now = max - input

      const percent = now < 0 ? 100 : ((input - min) * 100) / (max - min)
      return (
        <>
          <Progress strokeColor={status.color} showInfo={false} percent={percent} />
          {status.key === statusList[0].key ? <>Finaliza {moment().to(record.end)}</> : null}
        </>
      )
    },
  },
]

CronsDashBoard.defaultProps = {
  crons: [
    /*{
      key: 1,
      type: TYPES[1].key,
      details: 'Todas las tiendas',
      user: 'Monica',
      status: 'in progress',
      start: moment().subtract(1, 'hour'),
      end: moment().add(15, 'minutes'),
    },
    {
      key: 2,
      type: TYPES[2].key,
      details: 'Todas las tiendas',
      user: 'Monica',
      status: 'finished',
      start: moment().subtract(1, 'hour'),
      end: moment(),
    },*/
  ],
}

export default CronsDashBoard
