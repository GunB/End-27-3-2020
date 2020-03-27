import React, { Component } from 'react'
import { Card, Spin } from 'antd'
import _ from 'lodash'

class PageBase extends Component {
  render() {
    const { children, title, loading } = this.props
    const loadingText = _.isBoolean(loading) ? 'Cargando...' : loading
    return (
      <>
        {typeof title === 'string' ? <h4>{title}</h4> : title}
        <Card>
          <Spin spinning={!!loading} tip={loadingText}>
            {children}
          </Spin>
        </Card>
      </>
    )
  }
}

export default PageBase
