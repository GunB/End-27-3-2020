/* eslint no-nested-ternary: "off" */

import React from 'react'
import { connect } from 'react-redux'
import { Card, Button, Spin } from 'antd'
import { Helmet } from 'react-helmet'
import { withRouter } from 'react-router-dom'
import TabTitle from 'components/CustomComponents/tabTitle'
import { getAsyncCommerce } from 'redux/commerce/actions'
import { cleanStores } from 'redux/stores/actions'
import { cleanProducts } from 'redux/products/actions'
import { cleanSegments } from 'redux/segments/actions'
import { getCupon, createCupon, updateCupon, validateCupon } from 'services/cupon'
import roles from 'constant/roles'
import FormDescripcion from './formDescripcion'
import FormComercios from './formComercios'
import FormDetails from './formDetails'
import FormSegmentos from './formSegmentos'
import ResumeForm from './resumeForm'
import Authorize from '../../../components/LayoutComponents/Authorize'

const dispatchToProps = dispatch => ({
  getCommerce: () => {
    dispatch(getAsyncCommerce())
  },
  cleanSyncStores: () => {
    dispatch(cleanStores())
  },
  cleanSyncProducts: () => {
    dispatch(cleanProducts())
  },
  cleanSyncSegments: () => {
    dispatch(cleanSegments())
  },
})

@withRouter
@connect(
  undefined,
  dispatchToProps,
)
class WizzardCupon extends React.Component {
  state = {
    key: 'tab1',
    nuevoCupon: {},
    schema: {},
    loading: false,
    cuponExistente: false,
    isDetalles: false,
    updating: false,
  }

  componentDidMount() {
    const { location = {}, getCommerce, match, cupon } = this.props

    const { id = null } = match.params
    if (location.state) {
      const { code = null } = location.state
      this.updateCupon({ code })
    }
    if (cupon) {
      this.updateCupon({ ...cupon })
    }
    if (id) {
      this.setState({ updating: true })
      this.loadCupon(id)
    }
    const { nuevoCupon } = this.state
    this.selectDiscountType(nuevoCupon)
    getCommerce()
  }

  selectDiscountType = nuevoCupon => {
    const { amount, percentage } = nuevoCupon
    this.updateCupon({ ...nuevoCupon, tipoDescuento: amount ? '1' : percentage ? '2' : null })
  }

  loadSchema = cupon => {
    let schema = {}
    if (`${cupon.status}` === '1') {
      schema = {
        ...schema,
        code: true,
      }
    }
    return schema
  }

  onDetalles = () => {
    this.setState({ key: 'tab5', isDetalles: true })
  }

  loadCupon = id => {
    this.onLoading(true)
    this.setState({ cuponExistente: true })
    getCupon(id)
      .then(cupon => {
        if (cupon) {
          const translateCupon = {
            ...cupon,
            segments: cupon.Segments,
            commerce: Array.isArray(cupon.Commerce)
              ? cupon.Commerce.map(c => {
                  const newC = {
                    ...c,
                    store: Array.isArray(c.Store)
                      ? c.Store.map(s => ({
                          ...s,
                          store_id: s.id,
                        }))
                      : c.Store,
                    category: Array.isArray(c.Category)
                      ? c.Category.map(ca => ({
                          ...ca,
                          category_id: ca.id,
                        }))
                      : c.Category,
                  }
                  delete newC.Store
                  delete newC.Category
                  return newC
                })
              : cupon.Commerce,
          }

          delete translateCupon.Segments
          delete translateCupon.Commerce

          console.log(cupon, translateCupon)

          const { match } = this.props
          this.updateCupon({ ...translateCupon })
          this.selectDiscountType(translateCupon)
          this.setState({ schema: this.loadSchema(translateCupon) })
          if (match.path === '/dashboard/detallescupon/:code/:id') {
            this.onDetalles()
          }
          this.onLoading(false)
        } else {
          this.onDiscard()
        }
      })
      .catch(() => {
        this.onDiscard()
      })
  }

  tabCheck = (tab, tabList) => {
    const { key } = this.state
    let indexKey = -1
    let tabKey = -1
    tabList.forEach((element, index) => {
      if (element.key === key) indexKey = index
      if (element.key === tab) tabKey = index
    })
    return tabKey < indexKey
  }

  onLoading = (value = false) => {
    this.setState({ loading: value })
  }

  onTabChange = (key, type) => {
    this.setState({ [type]: key })
  }

  onTabChangeManual = (key, type, actualTab) => {
    const { isDetalles } = this.state
    if (key < actualTab && !isDetalles) {
      const { cleanSyncProducts, cleanSyncStores, cleanSyncSegments } = this.props
      this.setState({ [type]: key })
      cleanSyncSegments()
      cleanSyncProducts()
      cleanSyncStores()
    }
  }

  onSubmit = (cupon, tabInfo = { activeTab: '', tabList: {} }) => {
    const { activeTab, tabList } = tabInfo
    this.updateCupon(cupon)
    this.nextPage(activeTab, tabList)
  }

  onDiscard = () => {
    const { history } = this.props
    history.push({
      pathname: `/dashboard/cupon`,
    })
  }

  onCrearCupon = cupon => {
    validateCupon(cupon.code).then(() => {
      this.onLoading(true)
      createCupon(cupon).then(() => {
        this.onLoading()
        this.onDiscard()
      })
    })
  }

  onEditarCupon = cupon => {
    this.onLoading(true)
    updateCupon(cupon).then(() => {
      this.onLoading()
      this.onDiscard()
    })
  }

  nextPage(actualTab, tabList) {
    tabList.forEach((element, key) => {
      if (element.key === actualTab) {
        const next = key + 1
        if (next >= tabList.length) console.log('end')
        else this.onTabChange(tabList[next].key, `key`)
      }
    })
  }

  updateCupon(cupon) {
    this.setState(state => ({
      nuevoCupon: {
        ...state.nuevoCupon,
        ...cupon,
      },
    }))
  }

  render() {
    const { key, nuevoCupon, loading, cuponExistente, schema, isDetalles, updating } = this.state
    const { onSubmit, onDiscard, onCrearCupon, onEditarCupon } = this

    let tabList = [
      {
        key: 'tab1',
        tab: <TabTitle title="Descripción" />,
      },
      {
        key: 'tab2',
        tab: <TabTitle title="Condiciones" />,
      },
      {
        key: 'tab3',
        tab: <TabTitle title="Comercios" />,
      },
      {
        key: 'tab4',
        tab: <TabTitle title="Segmento" />,
      },
      {
        key: 'tab5',
        tab: <TabTitle title="Finalizar" />,
      },
    ]

    tabList = tabList.map(element => ({
      ...element,
      tab: React.cloneElement(element.tab, { check: this.tabCheck(element.key, tabList) }),
    }))

    const contentList = {
      tab1: (
        <FormDescripcion
          cupon={nuevoCupon}
          onSubmit={onSubmit}
          onDiscard={onDiscard}
          schema={schema}
          updating={updating}
        />
      ),
      tab2: (
        <FormDetails cupon={nuevoCupon} onSubmit={onSubmit} onDiscard={onDiscard} schema={schema} />
      ),
      tab3: (
        <FormComercios
          cupon={nuevoCupon}
          onSubmit={onSubmit}
          onDiscard={onDiscard}
          schema={schema}
        />
      ),
      tab4: (
        <FormSegmentos
          cupon={nuevoCupon}
          onSubmit={onSubmit}
          onDiscard={onDiscard}
          schema={schema}
        />
      ),
      tab5: (
        <ResumeForm
          updating={updating}
          cupon={nuevoCupon}
          onSubmit={cuponExistente ? onEditarCupon : onCrearCupon}
          onDiscard={onDiscard}
          isDetalles={isDetalles}
        />
      ),
    }

    return (
      <>
        <Authorize roles={[roles.BONOS_ADMIN.NAME, roles.BONOS_ANALIST.NAME]} redirect to="/">
          <Helmet title="Administrador de cupones" />
          <Spin spinning={loading} tip="Cargando...">
            <div className="mb-5">
              <Card
                style={{ width: '100%' }}
                title="Manejador de cupones"
                tabList={tabList}
                activeTabKey={key}
                onTabChange={tab => {
                  this.onTabChangeManual(tab, 'key', key)
                }}
              >
                {React.cloneElement(contentList[key], { activeTab: key, tabList })}

                <div className="text-right d-none">
                  <Button.Group size="big">
                    <Button type="link" className="gray mr-3" onClick={this.onDiscard}>
                      <u>Descartar</u>
                    </Button>
                    <Button type="primary" onClick={e => this.onSubmit(e, key, tabList)}>
                      Continuar
                    </Button>
                  </Button.Group>
                </div>
              </Card>
            </div>
          </Spin>
        </Authorize>
      </>
    )
  }
}

export default WizzardCupon
