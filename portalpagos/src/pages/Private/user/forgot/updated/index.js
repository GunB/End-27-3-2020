import React, { Component } from 'react'
import { Card, Row, Col, Icon } from 'antd'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import { ACTION_Login } from 'models/redux/user/actions'
import Logo from 'assets/img/logo-high-contrast.png'
import LoginLayout from 'components/LayoutComponents/LoginLayout'

class LoginForm extends Component {
  onSubmit = event => {
    event.preventDefault()
    const { form, dispatch } = this.props
    form.validateFields((error, values) => {
      const { email, password } = values
      if (!error) {
        dispatch(ACTION_Login({ email, password }))
      }
    })
  }

  render() {
    return (
      <LoginLayout>
        <Helmet title="Login" />
        <div className="full-centering">
          <Link to="/">
            <img src={Logo} className="img-fluid mb-4" alt="DaviPay" />
          </Link>
        </div>
        <br />
        <Row type="flex" justify="center" className="w-100 max-w-md">
          <Col xs={24} sm={15}>
            <Card className="full-centering h-100 px-4 py-4" bodyStyle={{ width: '100%' }}>
              <div className="mb-4">
                <h1>
                  <Icon type="check-circle" className="mr-2" style={{ color: 'green' }} />
                  <b>Contraseña actualizada</b>
                </h1>
              </div>
              <p>Tu contraseña ha sido actualizada exitosamente</p>

              <Row type="flex" align="middle">
                <Col xs={24}>
                  <Link to="/login" className="utils__link--underlined pull-right">
                    Regresar al login
                  </Link>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </LoginLayout>
    )
  }
}

export default LoginForm
