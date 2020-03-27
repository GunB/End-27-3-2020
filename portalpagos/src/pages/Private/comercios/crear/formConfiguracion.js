import React, { Component } from 'react'
import { Form, Input, Select, Row, Col, Radio, Icon, Button, Upload } from 'antd'
import GenericLabel from 'components/CustomComponent/GenericLabel'
import ViewButtonWizzardHandler from 'components/CustomComponent/SimpleWizzard/ViewButtonWizzardHandler'
import { connect } from 'react-redux'
import { uploadImage } from 'services/general'

let id = 0
let idE = 0
const stateToProps = state => ({
  commerceCategory: state.commerce.categories || [],
})
@connect(stateToProps)
@Form.create()
class FormConfiguracion extends Component {
  constructor(props) {
    super(props)
    this.state = {
      urlImage: '',
      loading: false,
      statusUpload: '',
      messageUpload: '',
    }
  }

  componentDidMount() {}

  onSubmit = event => {
    event.preventDefault()
    const { form, onSubmit } = this.props
    const { urlImage } = this.state
    form.validateFields((error, values) => {
      if (urlImage === '') {
        this.setState(() => ({
          statusUpload: 'error',
          messageUpload: 'Seleccione la imagen del comercio',
        }))
      }
      if (error || urlImage === '') {
        console.log(error)
      } else {
        values.commerce_image = urlImage
        onSubmit(values)
      }
    })
  }

  // funciones para manejo de conceptos de pago
  removePaymentConcept = k => {
    const { form } = this.props
    const keyPaymentConcept = form.getFieldValue('keyPaymentConcept')
    if (keyPaymentConcept.length === 1) {
      return
    }
    form.setFieldsValue({
      keyPaymentConcept: keyPaymentConcept.filter(key => key !== k),
    })
  }

  addPaymentConcept = () => {
    const { form } = this.props
    const keyPaymentConcept = form.getFieldValue('keyPaymentConcept')
    const nextKeys = keyPaymentConcept.concat((id += 1))
    form.setFieldsValue({
      keyPaymentConcept: nextKeys,
    })
  }

  // funciones para manejo de datos extra form
  removeExtraData = k => {
    const { form } = this.props
    const keyExtraData = form.getFieldValue('keyExtraData')
    form.setFieldsValue({
      keyExtraData: keyExtraData.filter(key => key !== k),
    })
  }

  addExtraData = () => {
    const { form } = this.props
    const keyExtraData = form.getFieldValue('keyExtraData')
    const nextKeys = keyExtraData.concat((idE += 1))
    form.setFieldsValue({
      keyExtraData: nextKeys,
    })
  }
  // funciones upload

  handleChange = info => {
    console.log(info)
  }

  beforeUpload = file => {
    this.setState(() => ({
      loading: true,
      urlImage: '',
      statusUpload: '',
      messageUpload: '',
    }))
    const formData = new FormData()
    formData.append('file', file)

    uploadImage(formData)
      .then(res => {
        this.setState(() => ({
          urlImage: res.data.url,
          statusUpload: '',
          messageUpload: '',
          loading: false,
        }))
      })
      .catch(err => {
        console.log(err)
        this.setState(() => ({
          urlImage: '',
          statusUpload: 'error',
          messageUpload: 'No se pudo subir el archivo',
          loading: false,
        }))
      })
  }

  render() {
    const { onSubmit } = this
    const { urlImage, loading, statusUpload, messageUpload } = this.state
    const { formLayout, dataSource, form, schemaSource, specialValidators } = this.props
    const { commerceCategory } = this.props
    const formItemLayoutWithOutLabel = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 18, offset: 6 },
        lg: { span: 9 },
      },
    }

    form.getFieldDecorator('keyExtraData', { initialValue: [] })
    const keyExtraData = form.getFieldValue('keyExtraData')
    form.getFieldDecorator('keyPaymentConcept', { initialValue: [] })
    const keyPaymentConcept = form.getFieldValue('keyPaymentConcept')
    const formItems = keyPaymentConcept.map((k, index) => (
      <Form.Item
        {...(index === 0 ? formLayout : formItemLayoutWithOutLabel)}
        label={index === 0 ? 'Conceptos de pago' : ''}
        key={`concept-payment-${k}`}
      >
        {form.getFieldDecorator(`paymentConcept[${k}]`, {
          validateTrigger: ['onChange', 'onBlur'],
          rules: [
            {
              required: true,
              message: 'Ingresa el concepto de pago.',
            },
          ],
        })(<Input placeholder="Concepto de pago" style={{ width: '90%', marginRight: 8 }} />)}
        {keyPaymentConcept.length > 1 ? (
          <Icon
            className="dynamic-delete-button"
            type="minus-circle-o"
            onClick={() => this.removePaymentConcept(k)}
          />
        ) : null}
      </Form.Item>
    ))

    const formItemsExtra = keyExtraData.map(k => (
      <Form.Item key={`extra-${k}`} {...formItemLayoutWithOutLabel}>
        <Form.Item
          key={`extraName-${k}`}
          style={{ display: 'inline-block', width: 'calc(60% - 1px)', marginBottom: 0 }}
        >
          {form.getFieldDecorator(`extraDataName[${k}]`, {
            validateTrigger: ['onChange', 'onBlur'],
            rules: [
              {
                required: true,
                message: 'Ingresa nombre el campo.',
              },
            ],
          })(<Input placeholder="Nombre del campo" style={{ width: '100%', marginRight: 8 }} />)}
        </Form.Item>
        <Form.Item
          key={`extraType-${k}`}
          style={{ display: 'inline-block', width: 'calc(40% - 1px)', marginBottom: 0 }}
        >
          {form.getFieldDecorator(`extraDataType[${k}]`, {
            validateTrigger: ['onChange', 'onBlur'],
            rules: [
              {
                required: true,
                message: 'Ingresa el tipo de campo.',
              },
            ],
          })(
            <Select style={{ width: '85%', marginRight: 8 }}>
              <Select.Option key="extra-text" value="text">
                Texto
              </Select.Option>
              <Select.Option key="extra-number" value="number">
                Numérico
              </Select.Option>
            </Select>,
          )}
          <Icon
            className="dynamic-delete-button"
            type="minus-circle-o"
            onClick={() => this.removeExtraData(k)}
          />
        </Form.Item>
      </Form.Item>
    ))

    const uploadButton = (
      <div>
        <Icon type={loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Subir imagen</div>
      </div>
    )
    return (
      <>
        <Form {...formLayout} className="mb-3">
          <h3>General</h3>
          <Form.Item
            label={
              <>
                <GenericLabel title="Logo" content="Selecciona la imagen" />
              </>
            }
            validateStatus={statusUpload}
            help={messageUpload}
          >
            <Upload
              name="image"
              listType="picture-card"
              className="avatar-uploader"
              accept="image/*"
              showUploadList={false}
              beforeUpload={this.beforeUpload}
              onChange={this.handleChange}
            >
              {urlImage ? (
                <img src={urlImage} alt="imagen comercio" style={{ width: '100%' }} />
              ) : (
                uploadButton
              )}
            </Upload>
          </Form.Item>
          <Form.Item
            label={<GenericLabel title="Nombre visible" content="Ingresa el nombre visible" />}
          >
            {form.getFieldDecorator('public_name', {
              initialValue: dataSource.public_name,
              rules: [{ required: true, message: 'Ingresa el nombre visible' }],
            })(<Input placeholder="Nombre visible" />)}
          </Form.Item>
          <Form.Item
            label={
              <GenericLabel title="Dirección visible" content="Ingresa la dirección visible" />
            }
          >
            {form.getFieldDecorator('public_address', {
              initialValue: dataSource.public_address,
              rules: [{ required: true, message: 'Ingresa la dirección visible' }],
            })(<Input placeholder="Dirección visible" />)}
          </Form.Item>
          <Form.Item
            label={<GenericLabel title="Teléfono visible" content="Ingresa el Teléfono visible" />}
          >
            {form.getFieldDecorator('public_phone', {
              initialValue: dataSource.public_phone,
              rules: [
                {
                  required: true,
                  validator: specialValidators.validateNumber,
                  message: 'Ingresa el Teléfono visible',
                },
              ],
            })(<Input placeholder="Teléfono visible" />)}
          </Form.Item>
          <Form.Item
            label={
              <GenericLabel
                title="Categoría del comercio"
                content="Ingresa la Categoría del comercio"
              />
            }
          >
            {form.getFieldDecorator('category', {
              initialValue: dataSource.category,
              rules: [{ required: true, message: 'Ingresa la Categoría del comercio' }],
            })(
              <Select style={{ width: '100%' }} placeholder="Seleccionar tipo de taquilla">
                {commerceCategory.map(category => (
                  <Select.Option key={category.id} value={category.id}>
                    {category.name}
                  </Select.Option>
                ))}
              </Select>,
            )}
          </Form.Item>
          <hr />
          <h4 className="my-4">Formulario</h4>
          <Form.Item
            label={
              <GenericLabel
                title="Campos del formulario"
                content="Ingresa los campos extra del formulario"
              />
            }
          >
            <Form.Item
              style={{ display: 'inline-block', width: 'calc(60% - 1px)', marginBottom: 0 }}
            >
              <Input
                placeholder="Nombre del campo"
                style={{ width: '100%', marginRight: 8 }}
                disabled
                value="Número (Hoja, pedido, factura u orden)"
              />
            </Form.Item>
            <Form.Item
              style={{ display: 'inline-block', width: 'calc(40% - 1px)', marginBottom: 0 }}
            >
              <Select style={{ width: '100%' }} disabled defaultValue="text">
                <Select.Option value="text">Texto</Select.Option>
              </Select>
            </Form.Item>
          </Form.Item>
          <Form.Item {...formItemLayoutWithOutLabel}>
            <Form.Item
              style={{ display: 'inline-block', width: 'calc(60% - 1px)', marginBottom: 0 }}
            >
              <Input
                placeholder="Nombre del campo"
                style={{ width: '100%', marginRight: 8 }}
                disabled
                value="Total a pagar"
              />
            </Form.Item>
            <Form.Item
              style={{ display: 'inline-block', width: 'calc(40% - 1px)', marginBottom: 0 }}
            >
              <Select style={{ width: '100%' }} disabled defaultValue="number">
                <Select.Option value="number">Numérico</Select.Option>
              </Select>
            </Form.Item>
          </Form.Item>
          <Form.Item {...formItemLayoutWithOutLabel}>
            <Form.Item
              style={{ display: 'inline-block', width: 'calc(60% - 1px)', marginBottom: 0 }}
            >
              <Input
                placeholder="Nombre del campo"
                style={{ width: '100%', marginRight: 8 }}
                disabled
                value="Concepto de pago"
              />
            </Form.Item>
            <Form.Item
              style={{ display: 'inline-block', width: 'calc(40% - 1px)', marginBottom: 0 }}
            >
              <Select style={{ width: '100%' }} disabled defaultValue="text">
                <Select.Option value="text">Texto</Select.Option>
              </Select>
            </Form.Item>
          </Form.Item>
          {formItemsExtra}
          <Form.Item {...formItemLayoutWithOutLabel}>
            <Button type="link" onClick={this.addExtraData}>
              <Icon type="plus" /> Agregar campo
            </Button>
          </Form.Item>
          <br />
          <hr />
          <h4 className="my-4">Conceptos de pago</h4>
          {formItems}
          <Form.Item {...formItemLayoutWithOutLabel}>
            <Button type="link" onClick={this.addPaymentConcept}>
              <Icon type="plus" /> Agregar concepto de pago
            </Button>
          </Form.Item>
          <Form.Item
            label={
              <GenericLabel title="Concepto de pago abierto" content="Selecciona el tipo de pago" />
            }
          >
            {form.getFieldDecorator('free_payment_concept', {
              initialValue: dataSource.free_payment_concept,
              rules: [{ required: true, message: 'Selecciona el tipo de concepto de pago' }],
            })(
              <Radio.Group style={{ width: '100%' }}>
                <Row>
                  <Col xs={12}>
                    <Radio value="0">No</Radio>
                  </Col>
                  <Col xs={12}>
                    <Radio value="1">Si</Radio>
                  </Col>
                </Row>
              </Radio.Group>,
            )}
          </Form.Item>
        </Form>
        <ViewButtonWizzardHandler urlBack={schemaSource.urlBack} onSubmit={onSubmit} />
      </>
    )
  }
}

export default FormConfiguracion
