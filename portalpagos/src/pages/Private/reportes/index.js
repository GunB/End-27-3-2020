import React from 'react'
import MenuLayout from 'components/LayoutComponents/MenuLayout'
import { Card } from 'antd'
import { connect } from 'react-redux'
import { ACTION_LoadAllReportes } from 'models/redux/reportes/actions'
import TableReportes from './tableReportes'

const mapStateToProps = state => ({
  rawData: state.hitorialTransacciones || [],
  isLoading: state.config.loading,
})

const dispatchToProps = dispatch => ({
  getData: () => {
    dispatch(ACTION_LoadAllReportes())
  },
})

@connect(mapStateToProps, dispatchToProps)
class Reportes extends React.Component {
  render() {
    return (
      <MenuLayout subtitleComponent={<h4>Resumen</h4>}>
        <Card className="ant-card-type-inner" title="Reportes">
          <TableReportes />
        </Card>
      </MenuLayout>
    )
  }
}

export default Reportes
