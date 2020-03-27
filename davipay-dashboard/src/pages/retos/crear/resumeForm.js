import React, { Component } from 'react'
import JsonTesting from 'components/CustomComponents/JsonTesting'
import { Row, Col, Avatar, Table } from 'antd'
import moment from 'moment'
import { moneyTransform } from 'components/CustomComponents/moneyInput'
import { ViewButtonWizzardHandler } from 'components/WizzardComponent/SimpleWizzard'
import { ColumnsTable } from './formNiveles'

class ResumeForm extends Component {
  state = {}

  onSubmit = event => {
    event.preventDefault()
    const { onSubmit, dataSource } = this.props
    onSubmit(dataSource)
  }

  render() {
    const { dataSource, schemaSource } = this.props
    const { onSubmit } = this

    const h5Style = { marginTop: '1rem', marginBottom: '1rem' }

    return (
      <>
        <JsonTesting dataSource={dataSource} />
        <Row type="flex" align="middle" gutter={24}>
          <Col span={6}>
            <h5 style={h5Style}>Nombre</h5>
          </Col>
          <Col span={18}>{dataSource.name}</Col>
          <Col span={6}>
            <h5 style={h5Style}>Ciclo</h5>
          </Col>
          <Col span={16}>{dataSource.cycle}</Col>
          <Col span={6}>
            <h5 style={h5Style}>Fecha de inicio</h5>
          </Col>
          <Col span={16}>{moment(dataSource.date_from).format('DD/MM/YYYY - hh:mm A')}</Col>
          <Col span={6}>
            <h5 style={h5Style}>Puntos por transacción</h5>
          </Col>
          <Col span={16}>{dataSource.points_for_transaction}</Col>
          <Col span={6}>
            <h5 style={h5Style}>Puntos por cada {moneyTransform(dataSource.amount)}</h5>
          </Col>
          <Col span={16}>{dataSource.points_for_amount}</Col>
          <Col span={6}>
            <h5 style={h5Style}>Descripción</h5>
          </Col>
          <Col span={16}>{dataSource.description}</Col>
          <Col span={6}>
            <h5 style={h5Style}>Icono</h5>
          </Col>
          <Col span={16}>
            <Avatar shape="square" src={dataSource.icon} size="large" />
          </Col>
          <Col span={6}>
            <h5 style={h5Style}>Términos y condiciones</h5>
          </Col>
          <Col span={16}>{dataSource.terms}</Col>
          <Col span={6}>
            <h5 style={h5Style}>Niveles</h5>
          </Col>
          <Col span={16}>
            <Table
              bordered={false}
              size="small"
              showHeader={false}
              dataSource={dataSource.level}
              pagination={false}
              columns={ColumnsTable}
            />
          </Col>
        </Row>

        <ViewButtonWizzardHandler
          urlBack={schemaSource.urlBack}
          onSubmit={onSubmit}
          strNext="Crear Programa"
        />
      </>
    )
  }
}

export default ResumeForm
