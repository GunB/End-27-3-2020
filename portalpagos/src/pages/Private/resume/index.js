import React from 'react'
import MenuLayout from 'components/LayoutComponents/MenuLayout'
import { Card, Row, Col } from 'antd'
import FiltroComercios from 'pages/Private/resume/filtroComercios'
import GraficoHistorialTransacciones from './graficoHistorialTransacciones'
import GraficoHorarioActividad from './graficoHorarioActividad'
import GraficoTipoRechazo from './graficoTipoRechazo'
import GraficoEstadoActividad from './graficoEstadoActividad'
import GraficoCarriers from './graficoCarriers'

class Resume extends React.Component {
  render() {
    return (
      <MenuLayout subtitleComponent={<h4>Resumen</h4>}>
        <Card>
          <FiltroComercios />
        </Card>
        <br />
        <Card className="ant-card-type-inner" title="Historial de transacciones">
          <GraficoHistorialTransacciones />
        </Card>
        <br />
        <Row gutter={[{ xs: 8, sm: 16, md: 24, lg: 32 }]} type="flex" align="middle">
          <Col xs={24} lg={14}>
            <Card className="ant-card-type-inner" title="Horario de actividad">
              <GraficoHorarioActividad />
            </Card>
            <br />
            <Card className="ant-card-type-inner" title="Estado de actividad">
              <GraficoEstadoActividad />
            </Card>
          </Col>
          <Col xs={24} lg={10}>
            <br />
            <Card className="ant-card-type-inner" title="Tipos de rechazo">
              <GraficoTipoRechazo />
            </Card>
          </Col>
        </Row>
        <br />
        <Card className="ant-card-type-inner" title="Carriers">
          <GraficoCarriers />
        </Card>
      </MenuLayout>
    )
  }
}

export default Resume
