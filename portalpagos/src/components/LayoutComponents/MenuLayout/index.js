import React, { Component } from 'react'
import { Layout, Icon, Spin } from 'antd'
import Menu from 'components/Common/Menu'
import Logo from 'assets/img/logo.png'
import LogoMini from 'assets/img/logo-mini.png'
import { Link } from 'react-router-dom'
import Footer from 'components/Common/Footer/Footer'
import Authorize from 'components/Common/Authorize'
import { connect } from 'react-redux'

const { Header, Content, Sider } = Layout

const stateToProps = ({ user }) => ({
  usuario: user.user_data || {},
})

@connect(stateToProps)
class MenuLayout extends Component {
  state = {
    collapsed: false,
  }

  toggle = () => {
    this.setState(prevState => ({
      collapsed: !prevState.collapsed,
    }))
  }

  getCommerce = usuario => {
    if (usuario.roles && usuario.roles.length > 0 && this.contieneRol(usuario.roles)) {
      return 'Administrador'
    }
    if (usuario.commerce) {
      return usuario.commerce.public_name
    }
    return ''
  }

  contieneRol = rolesUser => {
    let valido = false
    rolesUser.forEach(function validar(rolUser) {
      if (rolUser.code === 'admin') {
        valido = true
      }
    })
    return valido
  }
  render() {
    const { children = null, subtitleComponent = null, loading = false, usuario } = this.props
    const { collapsed } = this.state
    const extraClassHeader = `${subtitleComponent ? `header--private--with-subtitle` : ''} ${
      collapsed ? 'header--collapsed' : ''
    }`
    return (
      <>
        <Authorize redirect to="/login">
          <Layout className="container-view">
            <Sider
              collapsible
              collapsed={collapsed}
              onCollapse={this.toggle}
              style={{
                overflow: 'auto',
                height: '100%',
                position: 'fixed',
                left: 0,
                zIndex: 1,
                overflowX: 'hidden',
              }}
            >
              <div className={`logo ${collapsed ? 'container--x' : 'container-content'}`}>
                <img src={collapsed ? LogoMini : Logo} className="img-fluid" alt="DaviPay" />
              </div>
              <Menu />
            </Sider>
            <Sider collapsible collapsed={collapsed} trigger={null}>
              {' '}
            </Sider>
            <Layout>
              <Header className={`header--private ${extraClassHeader} `}>
                <div className="header__component">
                  <div className="container-content">
                    <Icon
                      className="trigger"
                      type={collapsed ? 'menu-unfold' : 'menu-fold'}
                      onClick={this.toggle}
                    />
                    <span style={{ marginLeft: '50px', fontSize: 'large' }}>
                      {`${usuario.name} - ${this.getCommerce(usuario)}`}
                    </span>
                    <Link to="/logout" className="pull-right">
                      {' '}
                      <Icon className="trigger" type="lock" onClick={this.toggle} />
                      Logout
                    </Link>
                  </div>
                </div>
                {subtitleComponent ? (
                  <div className="header__component header__subtitle">
                    <div className="container-content">{subtitleComponent}</div>
                  </div>
                ) : null}
              </Header>
              <Header className={extraClassHeader}> </Header>
              <Spin spinning={loading}>
                <Content className="container-content container-view--lessHeader container--y">
                  {children}
                </Content>
              </Spin>
              <Footer />
            </Layout>
          </Layout>
        </Authorize>
      </>
    )
  }
}

export default MenuLayout
