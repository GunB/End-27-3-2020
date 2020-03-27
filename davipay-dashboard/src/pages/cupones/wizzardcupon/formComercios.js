import React from 'react'
import { connect } from 'react-redux'
import { Form, Button, TreeSelect } from 'antd'
import { getAsyncStores, cleanStores } from 'redux/stores/actions'
import {
  commerceToTree,
  categoryShowToTree,
  commerceUnique,
  uniqueCommerceSelected,
  commerceSelectedToTree,
  storeSelectedToTree,
  productsSelectedToTree,
  storesToTree,
  selectedTreesToCupon,
} from 'factories/cupon'
import { getAsyncCommerce } from 'redux/commerce/actions'
import { cleanProducts, getAsyncProducts } from 'redux/products/actions'
import CardOpaque from 'components/CustomComponents/CardOpaque'

const { SHOW_PARENT } = TreeSelect

const mapStateToProps = (state, ownProps) => ({
  rawCommerce: state.commerce,
  rawProducts: state.products,
  rawStores: state.stores,
  commerce: commerceToTree(state.commerce, 'Todos los comercios'),
  stores: storesToTree(state.stores, 'Todas las tiendas'),
  products: categoryShowToTree(state.products),
  cuponCommerce: commerceSelectedToTree(ownProps),
  cuponStore: storeSelectedToTree(ownProps),
  cuponProducts: (({ cupon }) => {
    console.log(cupon)
    let category = []
    if (uniqueCommerceSelected(cupon.commerce)) {
      category = productsSelectedToTree(cupon.commerce[0].category)
    }
    return category
  })(ownProps),
  onlyCommerce: (({ cupon }) => commerceUnique(cupon.commerce))(ownProps),
})

const dispatchToProps = dispatch => ({
  getCommerce: () => {
    dispatch(getAsyncCommerce())
  },
  getStores: id => {
    /**
     * id = commerce_id
     */
    dispatch(getAsyncStores(id))
  },
  getProducts: id => {
    /**
     * id = commerce_id
     */
    dispatch(getAsyncProducts(id))
  },
  cleanSyncStores: () => {
    dispatch(cleanStores())
  },
  cleanSyncProducts: () => {
    dispatch(cleanProducts())
  },
})

@Form.create()
@connect(
  mapStateToProps,
  dispatchToProps,
  null,
  { forwardRef: true },
)
class FormComercios extends React.Component {
  state = {
    commerceChanged: false,
  }

  componentDidMount() {
    this.getStoresAndProducts()
  }

  getStoresAndProducts = (value = undefined) => {
    const {
      form,
      cuponCommerce,
      cleanSyncProducts,
      cleanSyncStores,
      getProducts,
      getStores,
    } = this.props

    const commerceSelected = value || form.getFieldValue('commerce') || cuponCommerce
    if (uniqueCommerceSelected(commerceSelected) && commerceSelected[0] !== 'ALL') {
      getProducts(commerceSelected[0])
      getStores(commerceSelected[0])
    } else {
      cleanSyncProducts()
      cleanSyncStores()
    }
  }

  onSubmit = event => {
    event.preventDefault()
    const { form, onSubmit, activeTab, tabList } = this.props
    form.validateFields((error, values) => {
      if (error) {
        console.log(error)
      } else {
        const { rawCommerce, rawProducts, rawStores } = this.props
        const resp = selectedTreesToCupon({ rawCommerce, rawProducts, rawStores, ...values })
        onSubmit(resp, { activeTab, tabList })
      }
    })
  }

  onDiscard = () => {
    console.log(this.props)
    const { onDiscard } = this.props
    onDiscard()
  }

  onChange = value => {
    console.log('onChange ', value)
  }

  onCommerceChage = value => {
    this.getStoresAndProducts(value)
    this.setState({ commerceChanged: true })
    this.onChange(value)
  }

  placeButtons = () => {
    return (
      <>
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

  render() {
    const { placeButtons } = this
    // const { expandedKeys, autoExpandParent, checkedKeys, selectedKeys } = this.state
    // const { value } = this.state
    const { commerceChanged } = this.state
    const {
      commerce,
      stores,
      products,
      cuponCommerce,
      cuponStore,
      cuponProducts,
      form,
    } = this.props
    const commerceSelected = form.getFieldValue('commerce') || cuponCommerce

    return (
      <>
        <Form layout="vertical" className="mb-3 row" onSubmit={this.onSubmit}>
          <div className="col-8">
            <Form.Item label="Comercios">
              {form.getFieldDecorator('commerce', {
                initialValue: cuponCommerce,
                rules: [{ required: false, message: 'Porfavor seleccione comercios' }],
              })(
                <TreeSelect
                  showSearch
                  style={{ width: '100%' }}
                  treeData={commerce}
                  treeCheckable
                  showCheckedStrategy={SHOW_PARENT}
                  treeNodeFilterProp="title"
                  // value={value}
                  dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                  placeholder="Please select"
                  allowClear
                  multiple
                  treeDefaultExpandAll
                  onChange={this.onCommerceChage}
                />,
              )}
            </Form.Item>

            {uniqueCommerceSelected(commerceSelected) && commerceSelected[0] !== 'ALL' ? (
              <>
                <Form.Item label="Puntos de venta">
                  {form.getFieldDecorator('stores', {
                    initialValue: commerceChanged ? [] : cuponStore,
                    rules: [{ required: false, message: 'Porfavor seleccione comercios' }],
                  })(
                    <TreeSelect
                      showSearch
                      style={{ width: '100%' }}
                      treeData={stores}
                      treeCheckable
                      showCheckedStrategy={SHOW_PARENT}
                      treeNodeFilterProp="title"
                      // value={value}
                      dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                      placeholder="Please select"
                      allowClear
                      multiple
                      treeDefaultExpandAll
                      onChange={this.onChange}
                    />,
                  )}
                </Form.Item>

                <Form.Item label="Productos">
                  {form.getFieldDecorator('products', {
                    initialValue: commerceChanged ? [] : cuponProducts,
                    rules: [{ required: false, message: 'Porfavor seleccione comercios' }],
                  })(
                    <TreeSelect
                      showSearch
                      style={{ width: '100%' }}
                      treeData={products}
                      treeCheckable
                      showCheckedStrategy={SHOW_PARENT}
                      treeNodeFilterProp="title"
                      dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                      placeholder="Please select"
                      allowClear
                      multiple
                      treeDefaultExpandAll
                      onChange={this.onChange}
                    />,
                  )}
                </Form.Item>
              </>
            ) : (
              <></>
            )}
          </div>
          <div className="col-4">
            <CardOpaque>
              <h4>¿Quieres segmentar el cupón por producto o punto de venta?</h4>
              <div>
                Recuerda que si quieres segmentar un cupón por punto(s) de venta o producto(s),
                debes seleccionar únicamente un ‘Comercio’
              </div>
            </CardOpaque>
          </div>
        </Form>
        {placeButtons()}
      </>
    )
  }
}

export default FormComercios
