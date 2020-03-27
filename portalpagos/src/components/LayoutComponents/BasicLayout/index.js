import React, { Component } from 'react'
import { Layout, Spin } from 'antd'
import Header from 'components/Common/Header'
import Footer from 'components/Common/Footer/Footer'
import PublicSpecialStyles from 'components/Style/PublicSpecialStyles'

const { Content } = Layout

class BasicLayout extends Component {
  render() {
    const { children = null, loading = false } = this.props
    return (
      <Layout className="container-view">
        <PublicSpecialStyles />
        <Header />

        <Content>
          <Spin spinning={loading}>{children}</Spin>
        </Content>

        <Footer />
      </Layout>
    )
  }
}

export default BasicLayout
