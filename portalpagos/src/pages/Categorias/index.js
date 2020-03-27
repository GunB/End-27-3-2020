import React, { Component } from 'react'
import { Row, Col } from 'antd'
import { connect } from 'react-redux'
import { ACTION_LoadCommerceCategories } from 'models/redux/commerce/actions'
import Searchbar from 'components/Common/SearchbarLink/SearchbarLink'
import BasicLayout from 'components/LayoutComponents/BasicLayout'
import CardItem from './CardItem/CardItem'
import travels from '../../assets/img/01.png'
import sports from '../../assets/img/02.png'
import schools from '../../assets/img/03.png'
import dealership from '../../assets/img/04.png'
import residency from '../../assets/img/05.png'
import commission from '../../assets/img/06.png'
import hotels from '../../assets/img/07.png'
import notaries from '../../assets/img/08.png'
import industries from '../../assets/img/09.png'
import medicine from '../../assets/img/10.png'
import publicService from '../../assets/img/11.png'

const dispatchToProps = dispatch => ({
  getData: () => {
    dispatch(ACTION_LoadCommerceCategories())
  },
})
const stateToProps = state => ({
  rawCommerce: state.commerce.public || [],
  commerceCategory: state.commerce.categories || [],
  loading: state.config.loading,
})
@connect(stateToProps, dispatchToProps)
class Home extends Component {
  componentDidMount() {
    const { getData } = this.props
    getData()
  }

  findImage = category => {
    return images.find(image => image.id === category.id)
  }

  render() {
    const { rawCommerce, commerceCategory, loading } = this.props
    const gridSize = {
      sm: 12,
      md: 6,
    }

    return (
      <BasicLayout loading={loading}>
        <div className="home__img">
          <div className="container">
            <Row>
              <Col md={12} sm={24}>
                <h2 className="fc-white fs-title bold home__title">
                  Busca el comercio en donde quieras hacer un pago
                </h2>
                <Searchbar pageRoute="/comercio" dataSource={rawCommerce} />
              </Col>
            </Row>
          </div>
        </div>
        <div className="container container--y">
          {/** }
          <div>
            <Row>
              <Col>
                <h3 className="fc-gray fs-title bold">Has buscado antes</h3>
              </Col>
              <Col {...gridSize}>
                <Card>hola card</Card>
              </Col>
            </Row>
          </div>
    { **/}
          <div className="home__cards">
            <div>
              <h3 className="fc-gray fs-title bold">Categorías de comercios</h3>
            </div>
            <Row gutter={[{ xs: 8, sm: 16, md: 24, lg: 32 }, 20]}>
              {commerceCategory.map(category => (
                <Col {...gridSize} key={category.id}>
                  <CardItem
                    to={`directorio/${category.id}/${category.name}`}
                    title={category.name}
                    img={category.image}
                  />
                </Col>
              ))}
            </Row>
          </div>
        </div>
      </BasicLayout>
    )
  }
}

const images = [
  {
    image: travels,
    id: 1,
  },
  {
    image: sports,
    id: 1,
  },
  {
    image: schools,
    id: 1,
  },
  {
    image: dealership,
    id: 1,
  },
  {
    image: residency,
    id: 1,
  },
  {
    image: commission,
    id: 1,
  },
  {
    image: hotels,
    id: 1,
  },
  {
    image: notaries,
    id: 1,
  },
  {
    image: industries,
    id: 1,
  },
  {
    image: medicine,
    id: 13,
  },
  {
    image: publicService,
    id: 1,
  },
]

export default Home
