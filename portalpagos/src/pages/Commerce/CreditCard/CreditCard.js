import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Form, Card, Input, InputNumber, Row, Col, Select, DatePicker, Modal, Button } from 'antd'
import { Link } from 'react-router-dom'
import moment from 'moment'
import { ReCaptcha } from 'react-recaptcha-v3'
import { RECAPTCHA_KEY } from 'constants/base'

const { Option } = Select
const { MonthPicker } = DatePicker

const stateToProps = state => ({
  responseTC: state.payTicket.responseTC,
  loadingTC: state.payTicket.loading,
  payTicket: state.payTicket.payTicket,
})

@Form.create()
@connect(stateToProps)
class CreditCard extends Component {
  constructor() {
    super()
    this.state = {
      openModal: false,
      token: '',
    }
  }

  componentDidMount() {
    const { form } = this.props
    form.setFieldsValue({
      name: this.getName(),
      phone: this.getPhone(),
      numDoc: this.getDocNum(),
      amount: this.getAmount(),
    })
  }

  verifyCallback = recaptchaToken => {
    this.setState({ token: recaptchaToken })
  }

  reloadRecaptcha = () => {
    if (this.recaptcha) {
      this.recaptcha.execute()
    }
  }

  getEmptyResult = () => {
    const { responseTC } = this.props
    if (responseTC === 'error') {
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
  nextStep = () => {
    const { responseTC, setSelect } = this.props
    if (responseTC === 'success') {
      setSelect()
    }
    return false
  }

  onSubmit = event => {
    event.preventDefault()
    const { form } = this.props
    form.validateFields((error, values) => {
      if (error) {
        console.log(error)
      } else {
        console.log(values)
        this.setState({ openModal: true })
      }
    })
  }

  acceptPayment = () => {
    const { form, handleDataCC } = this.props
    const { token } = this.state
    form.validateFields((error, values) => {
      if (error) {
        console.log(error)
      } else {
        console.log(values)
        this.setState({ openModal: false })
        this.reloadRecaptcha()
        values.token = token
        handleDataCC(values)
      }
    })
  }

  getName = () => {
    const { invoiceDB, infoSummary } = this.props
    if (invoiceDB && invoiceDB.name) {
      return invoiceDB.name
    }
    if (infoSummary && infoSummary.name) {
      return infoSummary.name
    }
    return null
  }

  getPhone = () => {
    const { invoiceDB, infoSummary } = this.props
    if (invoiceDB && invoiceDB.phone) {
      return invoiceDB.phone
    }
    if (infoSummary && infoSummary.phone) {
      return infoSummary.phone
    }
    return null
  }

  getDocNum = () => {
    const { invoiceDB, infoSummary } = this.props
    if (invoiceDB && invoiceDB.document_number) {
      return invoiceDB.document_number
    }
    if (infoSummary && infoSummary.docNum) {
      return infoSummary.docNum
    }
    return null
  }

  getAmount = () => {
    const { invoiceDB, infoSummary } = this.props
    if (invoiceDB && invoiceDB.amount) {
      return invoiceDB.amount
    }
    if (infoSummary && infoSummary.totalPay) {
      return infoSummary.totalPay
    }
    return 0
  }

  closeModal = () => {
    this.setState({ openModal: false })
  }

  tdcFields = (form, commerce) => {
    if (commerce && commerce.ticket_type && commerce.ticket_type.code === 'db') {
      return (
        <Form.Item label="Valor a pagar">
          {form.getFieldDecorator('amount', {
            rules: [{ required: true, message: 'Campo requerido' }],
          })(
            <InputNumber
              // readOnly={schemaSource.code ? schemaSource.code : false}
              disabled
              formatter={value => `$ ${value}`}
              placeholder="Valor a pagar"
              style={{ width: '100%' }}
            />,
          )}
        </Form.Item>
      )
    }
    return (
      <Form.Item label="Email">
        {form.getFieldDecorator('email', {
          rules: [{ required: true, message: 'Campo requerido' }],
        })(
          <Input
            // readOnly={schemaSource.code ? schemaSource.code : false}
            placeholder="Email"
            style={{ width: '100%' }}
          />,
        )}
      </Form.Item>
    )
  }

  getFormTC = () => {
    const { form, changeMethod, documents, commerce, loadingTC, responseTC } = this.props
    const monthFormat = 'MM/YYYY'
    const { openModal } = this.state
    if (responseTC !== 'error') {
      return (
        <Form hideRequiredMark style={{ width: '95%' }}>
          <Row type="flex">
            <h2 className="fc-gray bold">Tarjeta de crédito</h2>
          </Row>
          <Row gutter={[16, 8]} type="flex">
            <Col sm={24} md={12}>
              {/* <p className="fc-gray reset-margin">Nombre del titular</p> */}
              <Form.Item label="Nombre del titular">
                {form.getFieldDecorator('name', {
                  // initialValue: dataSource.nameOwner,
                  rules: [{ required: true, message: 'Campo requerido' }],
                })(
                  <Input
                    // readOnly={schemaSource.code ? schemaSource.code : false}
                    allowClear
                    placeholder="Igual que en la tarjeta"
                    style={{ width: '100%' }}
                  />,
                )}
              </Form.Item>
            </Col>
            <Col sm={24} md={12}>
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
                          <Option value={item.ID || item.id} key={`${item.code}-${item.name}`}>
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
          <Row gutter={[16, 8]} type="flex">
            <Col sm={24} md={12}>
              <Form.Item label="Número de tarjeta">
                {form.getFieldDecorator('card_number', {
                  initialValue: '',
                  rules: [{ required: true, message: 'Campo requerido' }],
                })(
                  <InputNumber
                    // readOnly={schemaSource.code ? schemaSource.code : false}
                    maxLength={16}
                    placeholder="Número de tarjeta"
                    style={{ width: '100%' }}
                  />,
                )}
              </Form.Item>
            </Col>
            <Col sm={24} md={6}>
              <Form.Item label="Fecha de vencimiento">
                {form.getFieldDecorator('expiry_date', {
                  rules: [{ required: true, message: 'Campo requerido' }],
                })(
                  <MonthPicker
                    format={monthFormat}
                    disabledDate={this.disabledDate}
                    placeholder="00/0000"
                  />,
                )}
              </Form.Item>
            </Col>
            <Col sm={24} md={6}>
              <Form.Item label="CVC/CVV">
                {form.getFieldDecorator('cvc', {
                  rules: [{ required: true, message: 'Campo requerido' }],
                })(
                  <InputNumber
                    // readOnly={schemaSource.code ? schemaSource.code : false}
                    maxLength={3}
                    placeholder="000"
                    style={{ width: '100%' }}
                  />,
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[16, 8]} type="flex">
            <Col sm={24} md={12}>
              <Form.Item label="Dirección de facturación">
                {form.getFieldDecorator('address', {
                  initialValue: '',
                  rules: [{ required: true, message: 'Campo requerido' }],
                })(
                  <Input
                    // readOnly={schemaSource.code ? schemaSource.code : false}
                    placeholder="Dirección de facturación"
                    style={{ width: '100%' }}
                  />,
                )}
              </Form.Item>
            </Col>
            <Col sm={24} md={6}>
              <Form.Item label="Código postal">
                {form.getFieldDecorator('postal_code', {
                  initialValue: '',
                  rules: [{ required: true, message: 'Campo requerido' }],
                })(
                  <InputNumber
                    // readOnly={schemaSource.code ? schemaSource.code : false}
                    placeholder="Código postal"
                    style={{ width: '100%' }}
                  />,
                )}
              </Form.Item>
            </Col>
            <Col sm={24} md={6}>
              <Form.Item label="Teléfono">
                {form.getFieldDecorator('phone', {
                  initialValue: '',
                  rules: [{ required: true, message: 'Campo requerido' }],
                })(
                  <InputNumber
                    // readOnly={schemaSource.code ? schemaSource.code : false}
                    placeholder="Teléfono"
                    style={{ width: '100%' }}
                  />,
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[16, 8]} type="flex">
            <Col sm={24} md={12}>
              <Form.Item label="Cuotas">
                {form.getFieldDecorator('installments', {
                  initialValue: '',
                  placeholder: 'Seleccionar cuotas',
                  rules: [
                    {
                      required: true,
                      message: 'Seleccione el tipo cuotas',
                    },
                  ],
                })(<Select style={{ width: '100%' }}>{this.installments()}</Select>)}
              </Form.Item>
            </Col>
            <Col sm={24} md={12}>
              {this.tdcFields(form, commerce)}
            </Col>
          </Row>
          <br />
          <Row className="form__buttons" type="flex" align="middle">
            <Col md={6} lg={3} xl={3}>
              <Button className="border-gray bradius-xs hv-link" onClick={changeMethod}>
                Volver
              </Button>
            </Col>
            <Col md={6} lg={3} xl={3}>
              <Button
                type="submit"
                className="bg-primary-color bradius-xs hv-link"
                onClick={this.onSubmit}
                loading={loadingTC}
              >
                Pagar
              </Button>
            </Col>
          </Row>
          <Modal
            title="Confirme la información de su pago"
            visible={openModal}
            onOk={this.closeModal}
            onCancel={this.closeModal}
            footer={[
              <Button key="back" onClick={this.closeModal}>
                Volver
              </Button>,
              <Button key="submit" type="primary" className="hv-link" onClick={this.acceptPayment}>
                Continuar
              </Button>,
            ]}
          >
            <p>Antes de avanzar, verifique que la información de su pago sea correcta.</p>
            {this.bodyModal()}
          </Modal>
        </Form>
      )
    }
    return false
  }

  installments = i => {
    const fees = []
    // eslint-disable-next-line no-plusplus
    for (i = 1; i <= 60; i++) {
      fees.push(i)
    }
    return fees.map(fee => {
      return (
        <Option key={`cuotas-${fee}`} value={fee}>
          {fee}
        </Option>
      )
    })
  }

  disabledDate = current => {
    // Can not select days before today and today
    return current && current < moment().endOf('day')
  }

  bodyModal = () => {
    const { invoiceDB, infoSummary, form } = this.props
    if (invoiceDB && invoiceDB.ticket_number) {
      return (
        <div>
          <p className="modal__content">
            <strong>Identificador:</strong> <span>{invoiceDB.reference}</span>
          </p>
          <p className="modal__content">
            <strong>Concepto:</strong> <span>{invoiceDB.concept}</span>
          </p>
          <p className="modal__content">
            <strong>Método de pago:</strong> <span>Tarjeta de crédito</span>
          </p>
          <p className="modal__content">
            <strong>A nombre de:</strong> <span>{invoiceDB.name}</span>
          </p>
          <p className="modal__content">
            <strong>Email:</strong> <span>{invoiceDB.email}</span>
          </p>
          <p className="modal__content">
            <strong>Teléfono:</strong> <span>{invoiceDB.phone}</span>
          </p>
        </div>
      )
    }

    if (infoSummary && infoSummary.totalPay) {
      const data = form.getFieldsValue()
      return (
        <div>
          <p className="modal__content">
            <strong>Identificador:</strong> <span>{infoSummary.numberPaper}</span>
          </p>
          <p className="modal__content">
            <strong>Concepto:</strong> <span>{infoSummary.concept}</span>
          </p>
          <p className="modal__content">
            <strong>Método de pago:</strong> <span>Tarjeta de crédito</span>
          </p>
          <p className="modal__content">
            <strong>A nombre de:</strong> <span>{data.name}</span>
          </p>
          <p className="modal__content">
            <strong>Email:</strong> <span>{data.email}</span>
          </p>
          <p className="modal__content">
            <strong>Teléfono:</strong> <span>{data.phone}</span>
          </p>
        </div>
      )
    }
    return false
  }

  render() {
    return (
      <>
        {this.getFormTC()}
        {this.nextStep()}
        {this.getEmptyResult()}
        <ReCaptcha
          sitekey={RECAPTCHA_KEY}
          action="pay_tc"
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

export default CreditCard
