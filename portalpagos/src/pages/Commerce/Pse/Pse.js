import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import { Form, Row, Col, Input, Select, Button, Modal, InputNumber, Card } from 'antd'
import logoPse from 'assets/img/pse.png'
import { ReCaptcha } from 'react-recaptcha-v3'
import { RECAPTCHA_KEY } from 'constants/base'
import { payTicketCommercePSE } from '../../../models/redux/payTicket/actions'

const { Option } = Select

const personas = [
  { code: 'N', name: 'Persona natural' },
  { code: 'J', name: 'Persona jurídica' },
]

const stateToProps = state => ({
  documents: state.commercePublic.documents,
  commerce: state.commercePublic.commercePublicData || {},
  facturaDB: state.commercePublic.facturaSelect,
  banks: state.commercePublic.banks,
  infoSummary: state.commercePublic.infoSummary,
  loadingPay: state.payTicket.loading,
  responsePSE: state.payTicket.responsePSE,
  payTicket: state.payTicket.payTicket,
})

@withRouter
@connect(stateToProps)
@Form.create()
class Pse extends Component {
  constructor() {
    super()
    this.state = {
      modalConfirm: false,
      modalRedirect: false,
      token: '',
    }
  }

  componentDidMount() {
    const { form } = this.props
    form.setFieldsValue({ amount: this.getAmount() })
  }

  verifyCallback = recaptchaToken => {
    this.setState({ token: recaptchaToken })
  }

  reloadRecaptcha = () => {
    if (this.recaptcha) {
      this.recaptcha.execute()
    }
  }

  getDataFormBasic = () => {
    const { form, infoSummary } = this.props
    if (infoSummary && infoSummary.totalPay) {
      return (
        <>
          <Row type="flex" justify="space-between" gutter={[32, 32]}>
            <Col md={12} sm={24}>
              <Form.Item label="Nombre o razón social">
                {form.getFieldDecorator('name', {
                  placeholder: 'Nombre o razón social',
                  rules: [
                    {
                      required: true,
                      message: 'Por favor ingrese el nombre o razón social',
                    },
                  ],
                })(<Input placeholder="Nombre" size="default" />)}
              </Form.Item>
            </Col>
            <Col md={12} sm={24}>
              <Form.Item label="Correo electrónico">
                {form.getFieldDecorator('email', {
                  placeholder: 'Correo electrónico',
                  rules: [
                    {
                      required: true,
                      type: 'email',
                      message: 'Por favor ingrese el correo electrónico',
                    },
                  ],
                })(<Input placeholder="Correo electrónico" size="default" />)}
              </Form.Item>
            </Col>
          </Row>
          <Row type="flex" justify="space-between" gutter={[32, 32]}>
            <Col md={12} sm={24}>
              <Form.Item label="Teléfono">
                {form.getFieldDecorator('phone', {
                  placeholder: 'Teléfono',
                  rules: [
                    {
                      required: true,
                      message: 'Por favor ingrese el teléfono',
                    },
                  ],
                })(<Input placeholder="Teléfono" size="default" />)}
              </Form.Item>
            </Col>
          </Row>
        </>
      )
    }
    return false
  }
  validateForm = () => {
    const { form } = this.props
    form.validateFields((error, values) => {
      if (!error) {
        console.log(values)
        this.setState({ modalConfirm: true })
      }
    })
  }

  closeConfirm = () => {
    this.setState({ modalConfirm: false })
  }

  okConfirm = () => {
    const { dispatch, commerce, facturaDB, infoSummary, form } = this.props
    const { token } = this.state
    form.validateFields((error, values) => {
      if (!error) {
        this.reloadRecaptcha()
        values.token = token
        const data = { factura: facturaDB, facturaCapturada: infoSummary, commerce, pse: values }
        dispatch(payTicketCommercePSE(data))
      }
    })
    this.setState({ modalConfirm: false })
    this.setState({ modalRedirect: true })
  }

  getInfoFactura = () => {
    const { facturaDB, infoSummary, form } = this.props
    if (facturaDB && facturaDB.ticket_number) {
      return (
        <div>
          <p className="modal__content">
            <strong style={{ color: 'black' }}>Identificador:</strong>{' '}
            <span>{facturaDB.reference}</span>
          </p>
          <p className="modal__content">
            <strong style={{ color: 'black' }}>Concepto:</strong> <span>{facturaDB.concept}</span>
          </p>
          <p className="modal__content">
            <strong style={{ color: 'black' }}>Método de pago:</strong> <span>PSE</span>
          </p>
          <p className="modal__content">
            <strong style={{ color: 'black' }}>A nombre de:</strong> <span>{facturaDB.name}</span>
          </p>
          <p className="modal__content">
            <strong style={{ color: 'black' }}>Email:</strong> <span>{facturaDB.email}</span>
          </p>
          <p className="modal__content">
            <strong style={{ color: 'black' }}>Teléfono:</strong> <span>{facturaDB.phone}</span>
          </p>
        </div>
      )
    }

    if (infoSummary && infoSummary.totalPay) {
      const data = form.getFieldsValue()
      return (
        <div>
          <p className="modal__content">
            <strong style={{ color: 'black' }}>Identificador:</strong>{' '}
            <span>{infoSummary.numberPaper}</span>
          </p>
          <p className="modal__content">
            <strong style={{ color: 'black' }}>Concepto:</strong> <span>{infoSummary.concept}</span>
          </p>
          <p className="modal__content">
            <strong style={{ color: 'black' }}>Método de pago:</strong> <span>PSE</span>
          </p>
          <p className="modal__content">
            <strong style={{ color: 'black' }}>A nombre de:</strong> <span>{data.name}</span>
          </p>
          <p className="modal__content">
            <strong style={{ color: 'black' }}>Email:</strong> <span>{data.email}</span>
          </p>
          <p className="modal__content">
            <strong style={{ color: 'black' }}>Teléfono:</strong> <span>{data.phone}</span>
          </p>
        </div>
      )
    }
    return false
  }

  getAmount = () => {
    const { facturaDB, infoSummary } = this.props
    if (facturaDB && facturaDB.amount) {
      return facturaDB.amount
    }
    if (infoSummary && infoSummary.totalPay) {
      return infoSummary.totalPay
    }
    return 0
  }

  getEmptyResult = () => {
    const { responsePSE } = this.props
    if (responsePSE === 'error') {
      return (
        <Row style={{ width: '100%' }}>
          <Col md={2} sm={2} />
          <Col md={20} sm={2}>
            <Card style={{ borderRadius: '14px', boxShadow: '0 4px 15px rgba(0, 0, 0, 0.15' }}>
              <span style={{ textAlign: 'center', width: '100%', display: 'block' }}>
                <h4>Parece que algo salió mal</h4>
                <b>Lo sentimos no pudimos procesar tu pago.</b>
                <br />
                <Link to="/categorias">Volver al inicio</Link>
              </span>
            </Card>
          </Col>
        </Row>
      )
    }
    return false
  }

  getFormPSE = () => {
    const { documents, form, changeMethod, banks, responsePSE } = this.props
    const { modalConfirm, modalRedirect } = this.state
    if (responsePSE !== 'error') {
      return (
        <Form hideRequiredMark style={{ width: '95%' }}>
          <Row type="flex" justify="space-between">
            <h2 className="fc-gray bold">PSE</h2>
          </Row>
          <Row type="flex" justify="space-between" gutter={[32, 32]}>
            <Col md={12} sm={24}>
              <Form.Item label="Valor a pagar">
                {form.getFieldDecorator('amount', {
                  placeholder: 'Valor a pagar',
                  rules: [
                    {
                      required: true,
                      message: 'Por favor ingrese el valor a pagar',
                    },
                  ],
                })(
                  <InputNumber
                    disabled
                    formatter={value => `$ ${value}`}
                    placeholder="Valor a pagar"
                    style={{ width: '100%' }}
                  />,
                )}
              </Form.Item>
            </Col>
            <Col md={12} sm={24}>
              <Form.Item label="Documento de identidad" style={{ marginBottom: 0 }}>
                <Form.Item
                  style={{
                    display: 'inline-block',
                    width: 'calc(30% - 10px)',
                    margin: '0 20px 0 0',
                  }}
                >
                  {form.getFieldDecorator('tipoDoc', {
                    placeholder: 'Seleccionar tipo documento',
                    rules: [
                      {
                        required: true,
                        message: 'Por favor seleccione el tipo de documento',
                      },
                    ],
                  })(
                    <Select style={{ width: '100%' }}>
                      {documents.map(item => {
                        return (
                          <Option value={item.code} key={`${item.code}-${item.name}`}>
                            {item.name}
                          </Option>
                        )
                      })}
                    </Select>,
                  )}
                </Form.Item>
                <Form.Item
                  style={{ display: 'inline-block', width: 'calc(70% - 10px)', marginBottom: 0 }}
                >
                  {form.getFieldDecorator('numDoc', {
                    placeholder: 'Número de documento',
                    rules: [
                      {
                        required: true,
                        message: 'Por favor ingrese el número de documento',
                      },
                    ],
                  })(<Input placeholder="Número de documento" style={{ width: '100%' }} />)}
                </Form.Item>
              </Form.Item>
            </Col>
          </Row>
          <Row type="flex" justify="space-between" gutter={[32, 32]}>
            <Col md={12} sm={24}>
              <Form.Item label="Banco">
                {form.getFieldDecorator('banco', {
                  placeholder: 'Banco',
                  rules: [
                    {
                      required: true,
                      message: 'Por favor ingrese el Banco',
                    },
                  ],
                })(
                  <Select style={{ width: '100%' }}>
                    {banks.map(item => {
                      return (
                        <Option value={item.code} key={`${item.code}-${item.name}`}>
                          {item.name}
                        </Option>
                      )
                    })}
                  </Select>,
                )}
              </Form.Item>
            </Col>
            <Col md={12} sm={24}>
              <Form.Item label="Tipo de persona">
                {form.getFieldDecorator('person', {
                  placeholder: 'Tipo de persona',
                  rules: [
                    {
                      required: true,
                      message: 'Por favor ingrese el tipo de persona',
                    },
                  ],
                })(
                  <Select style={{ width: '100%' }}>
                    {personas.map(item => {
                      return (
                        <Option value={item.code} key={item.code}>
                          {item.name}
                        </Option>
                      )
                    })}
                  </Select>,
                )}
              </Form.Item>
            </Col>
          </Row>
          {this.getDataFormBasic()}
          <br />
          <Row className="form__buttons" type="flex" align="middle">
            <Col md={6} lg={3} xl={3}>
              <Button className="border-gray bradius-xs hv-link" onClick={changeMethod}>
                Volver
              </Button>
            </Col>
            <Col md={6} lg={3} xl={3}>
              <Button className="bg-primary-color bradius-xs hv-link" onClick={this.validateForm}>
                Ir a PSE
              </Button>
              <Modal
                title="Confirme la información de su pago"
                visible={modalConfirm}
                onOk={this.okConfirm}
                onCancel={this.closeConfirm}
                footer={[
                  <Button key="back" onClick={this.closeConfirm}>
                    Volver
                  </Button>,
                  <Button key="submit" type="primary" onClick={this.okConfirm} className="hv-link">
                    Continuar
                  </Button>,
                ]}
              >
                <p>Antes de avanzar, verifique que la información de su pago sea correcta.</p>
                {this.getInfoFactura()}
              </Modal>
              <Modal
                title="Redireccionando a PSE"
                visible={modalRedirect}
                onOk={this.closeRedirect}
                onCancel={this.closeRedirect}
                footer={[]}
              >
                <p>
                  Usted está siendo redireccionado al sitio web de PSE. Una vez concluya el proceso
                  de pago, no olvide regresar a nuestro sitio para finalizar adecuadamente el
                  proceso y descargar el comprobante de pago.
                </p>
                <p>
                  *Esta transacción está sujeta a verificación. El total a pagar es en pesos
                  Colombianos.
                </p>
              </Modal>
            </Col>
            <Col md={6} lg={6} xl={6}>
              <div style={{ width: '50px' }}>
                <img src={logoPse} alt="logo PSE" className="w-100" />
              </div>
            </Col>
          </Row>
          <Row className="btop fs-minimized form__smLetters">
            <p>
              Al presionar el botón ‘Ir a PSE’, usted ingresará al sitio web de PSE. Una vez
              concluya el proceso de pago, no olvide regresar a nuestro sitio para finalizar
              adecuadamente el proceso y descargar el comprobante de pago.
            </p>
            <p>
              *Esta transacción está sujeta a verificación. El total a pagar es en pesos
              Colombianos.
            </p>
          </Row>
        </Form>
      )
    }
    return false
  }

  closeRedirect = () => {
    this.setState({ modalRedirect: false })
  }
  getRedirectPSE = () => {
    const { responsePSE, payTicket } = this.props
    if (responsePSE === '' && payTicket && payTicket.pse_url !== '') {
      console.log(payTicket)
      setTimeout(function tm() {
        window.location.href = payTicket.transaction.pse_url
      }, 5000)
    }
  }

  render() {
    return (
      <>
        {this.getEmptyResult()}
        {this.getFormPSE()}
        {this.getRedirectPSE()}
        <ReCaptcha
          sitekey={RECAPTCHA_KEY}
          action="pay_pse"
          verifyCallback={this.verifyCallback}
          ref={ref => {
            this.recaptcha = ref
            return this.recaptcha
          }}
        />
      </>
    )
  }
}

export default Pse
