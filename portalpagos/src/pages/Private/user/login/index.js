import React, { Component } from 'react'
import { Form, Input, Button, Card, Row, Col } from 'antd'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import T from 'components/SystemComponent/T'
import { withTranslation } from 'react-i18next'
import { ACTION_Login } from 'models/redux/user/actions'
import Logo from 'assets/img/logo-high-contrast.png'
import LoginLayout from 'components/LayoutComponents/LoginLayout'

@withTranslation()
@Form.create()
@connect(({ config: { loading } }) => ({ loading }))
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
    const { form, t, loading } = this.props
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
          <Col xs={24} sm={12}>
            <Card className="full-centering h-100 px-4 py-4" bodyStyle={{ width: '100%' }}>
              <Form layout="vertical" hideRequiredMark>
                <Form.Item label={<T>Email</T>}>
                  {form.getFieldDecorator('email', {
                    rules: [{ required: true, message: <T>Please type in your email</T> }],
                  })(<Input size="default" />)}
                </Form.Item>
                <Form.Item label={<T>Password</T>}>
                  {form.getFieldDecorator('password', {
                    rules: [{ required: true, message: <T>Please type in your password</T> }],
                  })(<Input.Password placeholder={t('Please type in your password')} />)}
                </Form.Item>
              </Form>
              <Row type="flex" align="middle">
                <Col xs={12}>
                  <Button
                    type="primary"
                    className="width-150 mr-4"
                    htmlType="submit"
                    loading={loading}
                    onClick={this.onSubmit}
                  >
                    <T>Login</T>
                  </Button>
                </Col>
                <Col xs={12}>
                  <Link to="/user/forgot" className="utils__link--underlined pull-right">
                    <T>Olvidé mi contraseña</T>
                  </Link>
                </Col>
              </Row>
            </Card>
          </Col>
          <Col xs={0} sm={12}>
            <Card
              style={{ borderLeft: '0' }}
              className="bg-color-light h-100 px-4 py-4"
              bodyStyle={{ width: '100%', height: '100%' }}
            >
              <div className="h-100 full-centering">
                <div>
                  <div className="mb-2">
                    <strong className="text-left" style={{ fontSize: '1.35rem' }}>
                      <T>Bienvenido</T>
                    </strong>
                  </div>
                  <div className="mb-4">
                    <T>
                      A través de esta herramienta podrás conocer a detalle la transaccionalidad de
                      tus cuentas y hacer seguimiento a la operación minuto a minuto.
                    </T>
                  </div>
                  <div className="mb-2">
                    Descubre el poder de la información accediendo a gráficas con el comportamiento
                    de usuarios en tiempo real.
                  </div>
                </div>
              </div>
            </Card>
          </Col>
        </Row>
      </LoginLayout>
    )
  }
}

export default LoginForm
