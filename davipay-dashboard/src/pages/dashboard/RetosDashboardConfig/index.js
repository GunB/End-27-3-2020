import React from 'react'
import moment from 'moment'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'
import { withRouter, Link } from 'react-router-dom'
import { getAsyncChallenges } from 'redux/challenge/actions'
import { Card, Row, Col, Table, Select, Avatar } from 'antd'
import * as uuidv4 from 'uuid/v4'
import MessageBox from 'components/CustomComponents/messageBox'
import Authorize from 'components/LayoutComponents/Authorize'
import StatusDropdown from 'components/AuthComponents/statusDropdown'
import RetosPopUp from './RetosPopUp'
import ROLES from '../../../constant/roles'

const mapStateToProps = state => ({
  rawRetos: state.challenges
    ? state.challenges.map(reto => ({
        ...reto,
        key: reto.id || reto.key || uuidv4(),
      }))
    : [],
})

const dispatchToProps = dispatch => ({
  getChallenges: () => {
    dispatch(getAsyncChallenges())
  },
})

@withRouter
@connect(
  mapStateToProps,
  dispatchToProps,
)
class RetosDashboardConfig extends React.Component {
  state = {
    pagination: 5,
  }

  componentDidMount() {
    // const { getChallenges } = this.props
    // getChallenges()
  }

  render() {
    const { rawRetos } = this.props
    const { pagination } = this.state

    return (
      <>
        <Authorize roles={[ROLES.RETOS_ADMIN.NAME, ROLES.RETOS_ANALIST.NAME]} redirect to="/">
          <Helmet title="Retos DaviPay" />
          {rawRetos.length ? (
            <>
              <h4>CONFIGURACIÓN</h4>
              <Card>
                <p>
                  En el historial de campañas puedes crear, apagar/encender, editar y eliminar las
                  campañas de DaviPay.
                </p>
                <Row type="flex" align="middle" gutter={24}>
                  <Col span={6}>
                    <RetosPopUp />
                  </Col>
                  <Col offset={12} span={2}>
                    Mostrar:
                  </Col>
                  <Col span={4}>
                    <Select
                      defaultValue={pagination}
                      style={{ width: '100%' }}
                      onChange={value => {
                        this.setState({ pagination: value })
                      }}
                    >
                      <Select.Option value={5}>5</Select.Option>
                      <Select.Option value={10}>10</Select.Option>
                      <Select.Option value={15}>15</Select.Option>
                    </Select>
                  </Col>
                </Row>
                <br />
                <Table
                  pageSize={2}
                  dataSource={rawRetos}
                  columns={ColumnConstruct}
                  pagination={{
                    pageSize: pagination,
                    hideOnSinglePage: true,
                  }}
                />
              </Card>
            </>
          ) : (
            <MessageBox
              titulo="Aun no se ha creado un programa de lealtad"
              mensaje="Cuando se haya creado uno o más programas de lealtad, se mostrarán en esta sección. Crea un programa de lealtad a continuación:"
            >
              <RetosPopUp />
            </MessageBox>
          )}
        </Authorize>
      </>
    )
  }
}

const uriView = 'configuracion_retos/ver_reto'

const ColumnConstruct = [
  {
    title: <b>Programa</b>,
    dataIndex: 'icon',
    key: 'icon',
    render: (icon, record) => (
      <>
        <Avatar shape="square" className="mr-2" src={icon} />
        <Link to={`${uriView}/${record.id}`}>
          <u>
            <b>{record.name}</b>
          </u>
        </Link>
      </>
    ),
  },

  {
    title: <b>Descripcion</b>,
    dataIndex: 'description',
    key: 'descripcion',
  },
  {
    title: <b>Ciclo</b>,
    dataIndex: 'cycle',
    key: 'cycle',
    render: x => `${x} días`,
  },
  {
    title: <b>Fecha de inicio</b>,
    dataIndex: 'date_from',
    key: 'date_from',
    render: x => moment(x).format('DD/MM/YYYY - hh:mm A'),
  },
  {
    title: <b>Estado</b>,
    dataIndex: 'status',
    render: (x, record) => {
      return <StatusDropdown key={record.key} dataSource={record} />
    },
    key: 'status',
  },
  {
    title: 'Accion',
    dataIndex: 'key',
    render: (x, record) => (
      <>
        <Link to={`${uriView}/${record.id}`}>Ver</Link>
      </>
    ),
    key: 'action',
  },
]

export default RetosDashboardConfig
