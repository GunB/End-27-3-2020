import React, { Component } from 'react'
import { Form, Input, Button, Card, Row, Col } from 'antd'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { ACTION_Login } from 'models/redux/user/actions'
import Logo from 'assets/img/logo-high-contrast.png'
import LoginLayout from 'components/LayoutComponents/LoginLayout'
import T from 'components/SystemComponent/T'

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
    const { form, loading } = this.props
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
                  <b>Recuperar contraseña</b>
                </h1>
              </div>
              <Form layout="vertical" hideRequiredMark>
                <Form.Item label={<T>Email</T>}>
                  {form.getFieldDecorator('email', {
                    rules: [{ required: true, message: <T>Please type in your email</T> }],
                  })(<Input size="default" />)}
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
                    Confirmar
                  </Button>
                </Col>
                <Col xs={12}>
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
