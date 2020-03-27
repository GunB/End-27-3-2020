import React from 'react'
import MenuLayout from 'components/LayoutComponents/MenuLayout'
import { Card } from 'antd'
import FiltroComercios from 'pages/Private/resume/filtroComercios'
import TableHistorialTransacciones from './tableHistorialTransacciones'

class Transacciones extends React.Component {
  render() {
    return (
      <MenuLayout subtitleComponent={<h4>Resumen</h4>}>
        <Card>
          <FiltroComercios />
        </Card>
        <br />
        <Card className="ant-card-type-inner" title="Historial de transacciones">
          <TableHistorialTransacciones />
        </Card>
      </MenuLayout>
    )
  }
}

export default Transacciones
