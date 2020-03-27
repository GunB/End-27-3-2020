import React, { Component } from 'react'
import { Layout } from 'antd'

class Login extends Component {
  render() {
    const { children } = this.props
    return (
      <Layout className="container-view">
        <Layout.Content className="full-centering container-content">{children}</Layout.Content>
      </Layout>
    )
  }
}

export default Login
