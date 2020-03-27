import React, { Component } from 'react'
import { Row, Col, Breadcrumb, Select, Layout } from 'antd'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { ACTION_LoadCommerceCategories } from 'models/redux/commerce/actions'
import SearchbarLink from 'components/Common/SearchbarLink/SearchbarLink'
import BasicLayout from 'components/LayoutComponents/BasicLayout'
import Banner from 'components/Common/Banner'
import { mergeAttribute } from 'factories/mergeAttribute'
import { filterData } from 'factories/filter'
import ListCommerce from './ListCommerce/ListCommerce'

const { Option } = Select

const stateToProps = (state, props) => ({
  rawCommerce: state.commerce.publicCategorized[props.match.params.id] || [],
  category: state.commerce.categories.find(c => {
    return `${c.id}` === `${props.match.params.id}`
  }) || {
    name: 'Otros',
  },
  loading: state.config.loading,
})
const dispatchToProps = dispatch => ({
  getData: () => {
    dispatch(ACTION_LoadCommerceCategories())
  },
})

@withRouter
@connect(stateToProps, dispatchToProps)
class Directory extends Component {
  state = {
    sort: 'A - Z',
    city: 'Todas las ciudades',
  }

  componentDidMount() {
    const { getData } = this.props
    getData()
  }

  handleSortLetter = ({ key: value }) => {
    this.setState(() => ({
      sort: value,
    }))
  }

  handleFilterCity = ({ key: value }) => {
    this.setState(() => ({
      city: value,
    }))
  }

  render() {
    const { rawCommerce, loading, category } = this.props
    const { sort, city } = this.state
    const orderedCommerce = rawCommerce.sort((a, b) =>
      sort === 'A - Z'
        ? a.public_name.toLowerCase().localeCompare(b.public_name.toLowerCase())
        : b.public_name.toLowerCase().localeCompare(a.public_name.toLowerCase()),
    )
    const cities = mergeAttribute(rawCommerce, 'city')
    const filteredCommerce =
      city === 'Todas las ciudades' ? orderedCommerce : filterData(orderedCommerce, { city })
    return (
      <BasicLayout loading={loading}>
        <Layout.Content className="container container--y">
          <Row>
            <Col>
              <Breadcrumb>
                <Breadcrumb.Item>
                  <Link to="/">Inicio</Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                  <Link to="/categorias">Categorias</Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>{category.name}</Breadcrumb.Item>
              </Breadcrumb>
            </Col>
          </Row>
          <div className="container--y">
            <Banner>{category.name}</Banner>
          </div>
          <Row gutter={[{ xs: 8, sm: 16, md: 24, lg: 32 }, 20]}>
            <Col md={24} lg={14} xl={14}>
              <SearchbarLink size="default" pageRoute="/comercio" dataSource={filteredCommerce} />
            </Col>
            <Col md={12} lg={6}>
              <Select
                labelInValue
                defaultValue={{ key: 'Todas las ciudades' }}
                style={{ width: '100%' }}
                onChange={this.handleFilterCity}
              >
                <Option value="Todas las ciudades">Todas las ciudades</Option>
                {cities.map(c => (
                  <Option value={c} key={c}>
                    {c}
                  </Option>
                ))}
              </Select>
            </Col>
            <Col md={12} lg={4}>
              <Select
                labelInValue
                defaultValue={{ key: 'A - Z' }}
                style={{ width: '100%' }}
                onChange={this.handleSortLetter}
              >
                <Option value="A - Z">A - Z</Option>
                <Option value="Z - A">Z - A</Option>
              </Select>
            </Col>
          </Row>
          <ListCommerce pageRoute="/comercio" dataSource={filteredCommerce} />
        </Layout.Content>
      </BasicLayout>
    )
  }
}

export default Directory
