import React from 'react'
import JSONPretty from 'react-json-pretty'
import { connect } from 'react-redux'
import { Form, Button, Collapse } from 'antd'
import { PROCESS_ENV } from 'constant/base'
import moment from 'moment'
import { getAsyncStores, cleanStores } from 'redux/stores/actions'
import { getAsyncProducts, cleanProducts } from 'redux/products/actions'
import CuponCommerceToResume from 'components/CustomComponents/cuponCommerceToResume'
import { uniqueCommerceSelected } from 'factories/cupon'
import CuponProductsToResume from 'components/CustomComponents/cuponProductsToResume'
import CuponSegmentsToResume from 'components/CustomComponents/cuponSegmentsToResume'
import { getAsyncSegments, cleanSegments } from 'redux/segments/actions'
import AskAdminModal from 'components/CustomComponents/askAdminModal'
import { validateRole } from 'factories/user'
import roles from 'constant/roles'

const JSONPrettyMon = require('react-json-pretty/dist/monikai')

const { Panel } = Collapse

const DescriptionElement = ({
  cupon,
  index = '',
  label = '',
  prefix = '',
  sufix = '',
  ...props
}) => {
  return (
    <>
      {cupon[index] ? (
        <>
          <div {...props}>
            <span>{label}</span>
            <span>{`${prefix}${cupon[index]}${sufix}`}</span>
          </div>
        </>
      ) : null}
    </>
  )
}

const mapStateToProps = (state, ownProps) => ({
  segmentos: state.segments,
  comercios: state.commerce,
  tiendas: state.stores,
  productos: state.products,
  comercioUnico: (({ cupon }) => {
    const comercio = cupon.commerce || cupon.Commerce
    if (Array.isArray(comercio) && comercio.length === 1) {
      return comercio[0]
    }
    return null
  })(ownProps),
})

const dispatchToProps = dispatch => ({
  getSegments: () => {
    dispatch(getAsyncSegments())
  },
  cleanSyncSegments: () => {
    dispatch(cleanSegments())
  },
  getStores: id => {
    dispatch(getAsyncStores(id))
  },
  getProducts: id => {
    dispatch(getAsyncProducts(id))
  },
  cleanSyncStores: () => {
    dispatch(cleanStores())
  },
  cleanSyncProducts: () => {
    dispatch(cleanProducts())
  },
})

@connect(
  mapStateToProps,
  dispatchToProps,
)
class ResumeForm extends React.Component {
  state = {
    needAdmin: false,
  }

  componentDidMount() {
    const {
      cleanSyncSegments,
      cleanSyncStores,
      cleanSyncProducts,
      getSegments,
      getStores,
      getProducts,
      comercioUnico,
    } = this.props
    cleanSyncSegments()
    cleanSyncStores()
    cleanSyncProducts()
    getSegments()
    if (comercioUnico) {
      getStores(comercioUnico.id || comercioUnico.commerce_id)
      getProducts(comercioUnico.id || comercioUnico.commerce_id)
    }
  }

  onSubmit = event => {
    event.preventDefault()
    const { onSubmit, cupon } = this.props
    if (validateRole([roles.BONOS_ADMIN])) {
      onSubmit(cupon)
    } else {
      this.setState({ needAdmin: true })
    }
  }

  onDiscard = () => {
    const { onDiscard } = this.props
    onDiscard()
  }

  placeButtons = () => {
    const { onSubmit, cupon } = this.props
    const { needAdmin } = this.state
    return (
      <>
        {needAdmin ? (
          <AskAdminModal
            onSubmit={onSubmit}
            onClose={() => {
              this.setState({ needAdmin: false })
            }}
            data={cupon}
          />
        ) : null}
        <hr />
        <div className="text-right">
          <Button.Group size="big">
            <Button type="link" className="gray mr-3" onClick={this.onDiscard}>
              <u>Descartar</u>
            </Button>
            <Button type="primary" onClick={this.onSubmit}>
              Continuar
            </Button>
          </Button.Group>
        </div>
      </>
    )
  }

  placeRegresar = () => {
    return (
      <>
        <hr />
        <div className="text-right">
          <Button.Group size="big">
            <Button type="link" className="gray mr-3" onClick={this.onDiscard}>
              <u>Regresar</u>
            </Button>
          </Button.Group>
        </div>
      </>
    )
  }

  render() {
    const { cupon, comercios, tiendas, productos, segmentos, isDetalles } = this.props
    return (
      <>
        <Form layout="vertical" className="mb-3" hideRequiredMark onSubmit={this.onSubmit}>
          {PROCESS_ENV === 'development' ? (
            <>
              <Collapse bordered={false} className="mb-5">
                <Panel header={`Datos solo visibles en modo ${PROCESS_ENV}`} key="1">
                  <JSONPretty data={cupon} theme={JSONPrettyMon} />
                </Panel>
              </Collapse>
            </>
          ) : null}
          <div className="content">
            <div className="row">
              <div className="col-3 mb-3">
                <h5>Código</h5>
              </div>
              <div className="col-9 mb-3">{cupon.code}</div>
              <div className="col-3 mb-3">
                <h5>Descripción</h5>
              </div>
              <div className="col-9 mb-3">{cupon.description}</div>

              <div className="col-3 mb-3">
                <h5>Términos y condiciones</h5>
              </div>
              <div className="col-9 mb-3">{cupon.terms}</div>

              <div className="col-3 mb-3">
                <h5>Condiciones</h5>
              </div>
              <div className="col-9 mb-3">
                <div>
                  Periodo:
                  {`${moment(cupon.date_from).format('DD/MM/YYYY')} a ${moment(
                    cupon.date_to,
                  ).format('DD/MM/YYYY')}`}
                </div>

                <DescriptionElement
                  {...{ cupon, index: 'percentage', label: 'Descuento: ', sufix: '%' }}
                />
                <DescriptionElement
                  {...{ cupon, index: 'amount', label: 'Descuento: ', prefix: '$' }}
                />
                <DescriptionElement
                  {...{ cupon, index: 'min_amount', label: 'Compra minima: ', prefix: '$' }}
                />
                <DescriptionElement
                  {...{ cupon, index: 'max_amount', label: 'Compra maxima: ', prefix: '$' }}
                />
                <DescriptionElement {...{ cupon, index: 'stock', label: 'Stock: ' }} />
                <DescriptionElement
                  {...{ cupon, index: 'amount_limit_redeem', label: 'Presupuesto: ', prefix: '$' }}
                />
                <DescriptionElement
                  {...{ cupon, index: 'user_limit_redeem', label: 'Limite de usos: ' }}
                />
              </div>

              {cupon.commerce && cupon.commerce.length ? (
                <div className="col-12">
                  <CuponCommerceToResume
                    {...{
                      commerce: cupon.commerce,
                      rawStores: tiendas,
                      rawCommerce: comercios,
                    }}
                  />
                </div>
              ) : null}

              {uniqueCommerceSelected(cupon.commerce) &&
              Array.isArray(cupon.commerce[0].category) ? (
                <>
                  <div className="col-3 mb-3">
                    <h5>Productos</h5>
                  </div>
                  <div className="col-9 mb-3">
                    <CuponProductsToResume
                      {...{
                        rawProducts: productos,
                        productos: cupon.commerce[0].category,
                      }}
                    />
                  </div>
                </>
              ) : null}

              <div className="col-3 mb-3">
                <h5>Segmentos</h5>
              </div>
              <div className="col-9 mb-3">
                <CuponSegmentsToResume {...{ segments: cupon.segments, rawSegments: segmentos }} />
              </div>
            </div>
          </div>
        </Form>
        {!isDetalles ? this.placeButtons() : this.placeRegresar()}
      </>
    )
  }
}

export default ResumeForm
