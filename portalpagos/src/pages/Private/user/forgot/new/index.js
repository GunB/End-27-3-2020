/*eslint prefer-promise-reject-errors: 0*/

import React, { Component } from 'react'
import { Form, Input, Button, Card, Row, Col } from 'antd'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { ACTION_Login } from 'models/redux/user/actions'
import Logo from 'assets/img/logo-high-contrast.png'
import LoginLayout from 'components/LayoutComponents/LoginLayout'
import T from 'components/SystemComponent/T'
import { withTranslation } from 'react-i18next'

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

  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props
    if (value && value !== form.getFieldValue('password')) {
      callback('Las contraseñas deben ser iguales')
    } else {
      callback()
    }
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
          <Col xs={24} sm={15}>
            <Card className="full-centering h-100 px-4 py-4" bodyStyle={{ width: '100%' }}>
              <div className="mb-4">
                <h1>
                  <b>Nueva contraseña</b>
                </h1>
              </div>
              <Form layout="vertical" hideRequiredMark>
                <Form.Item label={<T>Ingresa tu nueva contraseña</T>}>
                  {form.getFieldDecorator('password', {
                    rules: [{ required: true, message: <T>Please type in your password</T> }],
                  })(<Input.Password placeholder={t('Please type in your password')} />)}
                </Form.Item>
              </Form>
              <Form layout="vertical" hideRequiredMark>
                <Form.Item label={<T>Confirma la contraseña</T>}>
                  {form.getFieldDecorator('confirm', {
                    rules: [
                      { required: true, message: <T>Please type in your password</T> },
                      {
                        validator: this.compareToFirstPassword,
                      },
                    ],
                  })(<Input.Password placeholder={t('Please type in your password')} />)}
                </Form.Item>
              </Form>
              <p>
                Recuerda que tu contraseña debe ser de al menos 6 caracteres y contener minúsculas,
                mayúsculas números y símbolos (!”#$%&/=?)
              </p>
              <Button
                type="primary"
                className="width-150 mr-4"
                htmlType="submit"
                loading={loading}
                onClick={this.onSubmit}
              >
                Confirmar
              </Button>
            </Card>
          </Col>
        </Row>
      </LoginLayout>
    )
  }
}

export default LoginForm
