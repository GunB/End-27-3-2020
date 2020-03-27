import React from 'react'
import { Helmet } from 'react-helmet'
import MenuLayout from 'components/LayoutComponents/MenuLayout'
import { Tabs, Empty, Select, Card } from 'antd'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { ACTION_facturaInitData } from 'models/redux/factura/actions'
import FacturaManual from './facturamanual'
import FacturaFile from './facturafile'
//import { Form, Input, Select, DatePicker, Row, Col, InputNumber } from 'antd'
//import moment from 'moment'

const { TabPane } = Tabs
const no_comercio = (
  <span style={{ textAlign: 'center', width: '100%', display: 'block' }}>
    De acuerdo a su taquilla este comercio no cuenta con esta opción, Por favor comuníquese con el
    Administrador
  </span>
)
const title_tab_manual = 'Carga manual'
const title_tab_archivo = 'Carga archivo'

const dispatchToProps = dispatch => ({
  getData: () => {
    dispatch(ACTION_facturaInitData())
  },
})

@withRouter
@connect(
  state => ({
    user: state.user.user_data,
    isAdmin: state.factura.isAdmin,
    isCommerce: state.factura.isCommerce,
    isValidCommerce: state.factura.isValidCommerce,
    commerce: state.factura.commerce,
    commerces: state.factura.commerces,
    documents: state.factura.documents,
  }),
  dispatchToProps,
)
class CargarFacturas extends React.Component {
  /*state = {
    fileList: [],
    uploading: false,
    datasource : []
  };*/

  componentDidMount() {
    const { getData } = this.props
    getData()
  }

  cambioTab = key => {
    console.log(key)
  }

  getValidCommerce = cambioTabF => {
    const { isValidCommerce } = this.props
    if (!isValidCommerce) {
      return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={no_comercio} />
    }
    return (
      <Tabs onChange={cambioTabF} type="card">
        <TabPane tab={title_tab_manual} key="1">
          <FacturaManual />
        </TabPane>
        <TabPane tab={title_tab_archivo} key="2">
          <FacturaFile />
        </TabPane>
      </Tabs>
    )
  }

  getSelectDocuments = () => {
    const { documents } = this.props
    console.log(documents)
    console.log('documents')
    documents.map(value => {
      console.log(value)
      console.log('select')
      return false
    })
    const documentsElemts = documents.map(value => {
      console.log(value)
      console.log('select')
      return <Select.Option value={value.id}>{value.name}</Select.Option>
    })
    return documentsElemts
  }

  render() {
    const title = 'Cargar facturas'

    const { cambioTab } = this

    return (
      <MenuLayout>
        <Helmet title={title} />
        <Card title={title}>{this.getValidCommerce(cambioTab)}</Card>
      </MenuLayout>
    )
  }
}

export default CargarFacturas
