import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { List } from 'antd'
import CuponItem from './cuponItem'

const mapStateToProps = (state, ownProps) => ({
  cupones: ownProps.cupones.filter(cupon => {
    const { search } = ownProps
    if (search && search.length > 0) {
      return cupon.code.toLowerCase().includes(search.toLowerCase())
    }
    return true
  }),
})
@connect(mapStateToProps)
export default class CuponList extends PureComponent {
  render() {
    const { pageSize = 3, cupones = [] } = this.props
    return (
      <List
        itemLayout="vertical"
        size="large"
        pagination={{
          onChange: page => {
            console.log(page)
          },
          pageSize,
        }}
        dataSource={cupones}
        footer={<div />}
        renderItem={item => (
          <List.Item key={item.id}>
            <CuponItem cupon={{ ...item }} />
          </List.Item>
        )}
      />
    )
  }
}
