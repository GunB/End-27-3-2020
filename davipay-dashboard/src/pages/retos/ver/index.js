import React, { Component } from 'react'
import { Button, Row, Col, Card, Avatar, List, Spin } from 'antd'
import * as uuidv4 from 'uuid/v4'
import StatusDropdown from 'components/AuthComponents/statusDropdown'
import JsonTesting from 'components/CustomComponents/JsonTesting'
import Authorize from 'components/LayoutComponents/Authorize'
import roles from 'constant/roles'

class VerReto extends Component {
  state = {
    isLoading: false,
    page: 1,
    pageSize: 4,
  }

  onPageChange = page => {
    this.setState({ page })
  }

  render() {
    const { onPageChange } = this
    const { dataSource } = this.props
    const { isLoading, page, pageSize } = this.state

    return (
      <>
        <Authorize roles={[roles.RETOS_ADMIN.NAME, roles.RETOS_ANALIST.NAME]} redirect to="/">
          <Spin spinning={isLoading} tip="Cargando...">
            <Row type="flex" justify="space-between" align="middle" gutter={24}>
              <Col xs={12}>
                <h5>PROGRAMA</h5>
              </Col>
              <Col xs={12} lg={6}>
                <Button style={{ width: '100%' }}>Exportar resultados</Button>
              </Col>
            </Row>
            <br />
            <Card>
              <Row type="flex" align="middle" justify="space-between" gutter={24}>
                <Col xs={14}>
                  <Row>
                    <Col xs={6} sm={4} lg={2}>
                      <Avatar size={40} shape="square" />
                    </Col>
                    <Col xs={18} sm={16} lg={14}>
                      <span className="h2">Retos Davipay 2019</span>
                      <br />
                      <small>Ultima actualizacion 16/22/222 - 10:20</small>
                    </Col>
                  </Row>
                </Col>
                <Col xs={10} className="text-right">
                  <StatusDropdown dataSource={dataSource} />
                  <br />
                  <small>Publicación: 01/01/2020 - 7:00 AM</small>
                </Col>
              </Row>
            </Card>
            <br />
            <Row type="flex" justify="space-between" align="middle" gutter={24}>
              <Col>
                <h5>NIVELES</h5>
              </Col>
              <Col>
                <Button.Group>
                  <Button className="mr-2">Exportar resultados</Button>
                  <Button>Actulizar resultados</Button>
                </Button.Group>
              </Col>
            </Row>

            <List
              grid={{
                gutter: 16,
                xs: 1,
                sm: 1,
                md: 4,
                lg: 4,
                xl: 4,
                xxl: 4,
              }}
              pagination={{
                pageSize,
                position: 'top',
                disabled: true,
                onChange: onPageChange,
                current: page,
              }}
              dataSource={dataSource.level}
              renderItem={item => (
                <List.Item key={uuidv4()}>
                  <Card>
                    <JsonTesting dataSource={item} />
                  </Card>
                </List.Item>
              )}
            />
            <br />

            <Row type="flex" justify="space-between" align="middle" gutter={24}>
              <Col>
                <h5>MANTENCION</h5>
              </Col>
              <Col>
                <Button.Group>
                  <Button className="mr-2">Exportar resultados</Button>
                  <Button>Actulizar resultados</Button>
                </Button.Group>
              </Col>
            </Row>
            <br />

            <List
              grid={{
                gutter: 16,
                xs: 1,
                sm: 1,
                md: 4,
                lg: 4,
                xl: 4,
                xxl: 4,
              }}
              pagination={{
                pageSize,
                onChange: onPageChange,
                current: page,
              }}
              dataSource={dataSource.level}
              renderItem={item => (
                <List.Item key={uuidv4()}>
                  <Card>
                    <JsonTesting dataSource={item} />
                  </Card>
                </List.Item>
              )}
            />
          </Spin>
        </Authorize>
      </>
    )
  }
}

VerReto.defaultProps = {
  dataSource: {
    id: 88,
    icon: 'xxx',
    name: 'Retos Davipay',
    cycle: 90,
    date_from: '2019-01-28 00:00:00',
    amount: '20000',
    points_for_transaction: 50,
    points_for_amount: 25,
    description: 'Description',
    status: 0,
    level: [
      {
        name: 'Name',
        description: 'Description',
        objetive: '1275',
        icon: 'xxx',
        cycle_maintenance: '',
        objective_maintenance: '',
      },
      {
        name: 'Name 2',
        description: 'Description',
        objetive: '2550',
        icon: 'xxx',
        cycle_maintenance: '30',
        objective_maintenance: '1500',
      },
      {
        name: 'Name 2',
        description: 'Description',
        objetive: '2550',
        icon: 'xxx',
        cycle_maintenance: '30',
        objective_maintenance: '1500',
      },
      {
        name: 'Name 2',
        description: 'Description',
        objetive: '2550',
        icon: 'xxx',
        cycle_maintenance: '30',
        objective_maintenance: '1500',
      },
      {
        name: 'Name 2',
        description: 'Description',
        objetive: '2550',
        icon: 'xxx',
        cycle_maintenance: '30',
        objective_maintenance: '1500',
      },
      {
        name: 'Name 2',
        description: 'Description',
        objetive: '2550',
        icon: 'xxx',
        cycle_maintenance: '30',
        objective_maintenance: '1500',
      },
      {
        name: 'Name 2',
        description: 'Description',
        objetive: '2550',
        icon: 'xxx',
        cycle_maintenance: '30',
        objective_maintenance: '1500',
      },
    ],
  },
}

export default VerReto
