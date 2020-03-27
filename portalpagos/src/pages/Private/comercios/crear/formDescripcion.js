import React from 'react'
import { Form, Input, Select, Row, Col, Checkbox, Button, Icon } from 'antd'
import GenericLabel from 'components/CustomComponent/GenericLabel'
import ViewButtonWizzardHandler from 'components/CustomComponent/SimpleWizzard/ViewButtonWizzardHandler'
import {
  ACTION_LoadAllCities,
  ACTION_LoadPaymenMethods,
  ACTION_LoadCommerceDocuments,
  ACTION_LoadTypeTickets,
  ACTION_LoadPaymentCycle,
  ACTION_LoadTypeService,
  ACTION_LoadTypeAccount,
} from 'models/redux/general/actions'
import { ACTION_LoadCommerceCategories } from 'models/redux/commerce/actions'
import { connect } from 'react-redux'

const stateToProps = ({ general, config }) => ({
  cities: general.cities || [],
  paymentMethods: general.paymentMethods || [],
  documents: general.commerceDocuments || [],
  typeTickets: general.typeTickets || [],
  reLoading: config.loading,
})
const dispatchToProps = dispatch => ({
  getData: () => {
    dispatch(ACTION_LoadAllCities())
    dispatch(ACTION_LoadPaymenMethods())
    dispatch(ACTION_LoadCommerceDocuments())
    dispatch(ACTION_LoadTypeTickets())
    dispatch(ACTION_LoadPaymentCycle())
    dispatch(ACTION_LoadTypeService())
    dispatch(ACTION_LoadTypeAccount())
    dispatch(ACTION_LoadCommerceCategories())
  },
})

let id = 0

@connect(stateToProps, dispatchToProps)
@Form.create()
class FormDescripcion extends React.Component {
  componentDidMount() {
    const { getData } = this.props
    getData()
  }

  onSubmit = event => {
    event.preventDefault()
    const { form, onSubmit } = this.props
    form.validateFields((error, values) => {
      if (error) {
        console.log(error)
      } else {
        console.log(values)
        onSubmit(values)
      }
    })
  }

  getUrlWebservice = () => {
    const { form, typeTickets } = this.props
    const type = form.getFieldValue('ticket_type')
    if (type) {
      let selecionado = {}
      typeTickets.forEach(element => {
        if (element.id === type) selecionado = element
      })
      if (selecionado.code === 'webservice') {
        return (
          <Form.Item
            label={
              <GenericLabel
                title="Url redireccionamiento"
                content="Ingresa la url de redireccionamiento"
              />
            }
          >
            {form.getFieldDecorator('url_redirect', {
              rules: [{ required: true, message: 'Ingresa la url de redireccionamiento' }],
            })(<Input placeholder="Url webservice" />)}
          </Form.Item>
        )
      }
    }
    return false
  }

  remove = k => {
    const { form } = this.props
    const contactos = form.getFieldValue('contactos')
    /*if (contactos.length === 1) {
      return;
    }*/
    form.setFieldsValue({
      contactos: contactos.filter(key => key !== k),
    })
  }

  add = () => {
    const { form } = this.props
    const contactos = form.getFieldValue('contactos')

    const nextKeys = contactos.concat((id += 1))
    form.setFieldsValue({
      contactos: nextKeys,
    })
  }
  render() {
    const { cities, paymentMethods, dataSource, formLayout, documents, typeTickets } = this.props

    const { form, schemaSource } = this.props
    const { onSubmit } = this
    form.getFieldDecorator('contactos', { initialValue: [] })
    const contactos = form.getFieldValue('contactos')
    // form.formItemLayoutWithOutLabel
    const formItems = contactos.map((k, index) => (
      <Form.Item
        label={`Contacto ${index + 1}`}
        key={`contacto-${k}`}
        style={{ width: '100%' }}
        wrapperCol={{ sm: 24 }}
      >
        <Form.Item
          key={`name-${k}`}
          style={{ display: 'inline-block', width: 'calc(20% - 1px)', marginRight: 8 }}
        >
          {form.getFieldDecorator(`names[${k}]`, {
            validateTrigger: ['onChange', 'onBlur'],
            rules: [
              {
                required: true,
                message: 'Ingresa el nombre del contacto',
              },
            ],
          })(<Input placeholder="Nombre" style={{ width: '100%', marginRight: 8 }} />)}
        </Form.Item>
        <Form.Item
          key={`area-${k}`}
          style={{ display: 'inline-block', width: 'calc(20% - 1px)', marginRight: 8 }}
        >
          {form.getFieldDecorator(`areas[${k}]`, {
            validateTrigger: ['onChange', 'onBlur'],
            rules: [
              {
                required: true,
                message: 'Ingresa el área del contacto',
              },
            ],
          })(<Input placeholder="Área" style={{ width: '100%', marginRight: 8 }} />)}
        </Form.Item>
        <Form.Item
          key={`telefono-${k}`}
          style={{ display: 'inline-block', width: 'calc(20% - 1px)', marginRight: 8 }}
        >
          {form.getFieldDecorator(`telefonos[${k}]`, {
            validateTrigger: ['onChange', 'onBlur'],
            rules: [
              {
                required: true,
                message: 'Ingresa el teléfono del contacto',
              },
            ],
          })(<Input placeholder="Teléfono" style={{ width: '100%', marginRight: 8 }} />)}
        </Form.Item>
        <Form.Item
          key={`correo-${k}`}
          style={{ display: 'inline-block', width: 'calc(30% - 1px)', marginRight: 8 }}
        >
          {form.getFieldDecorator(`correos[${k}]`, {
            validateTrigger: ['onChange', 'onBlur'],
            rules: [
              {
                required: true,
                type: 'email',
                message: 'Ingresa el correo del contacto',
              },
            ],
          })(<Input placeholder="Correo" style={{ width: '75%', marginRight: 8 }} />)}
          {/* <Button type="link" onClick={() => this.remove(k)}>Eliminar</Button> */}
          <Icon
            className="dynamic-delete-button"
            type="minus-circle-o"
            onClick={() => this.remove(k)}
          />
        </Form.Item>
      </Form.Item>
    ))

    return (
      <>
        <Form {...formLayout} className="mb-3">
          <Form.Item label="Ciudad">
            {form.getFieldDecorator('city', {
              initialValue: dataSource.city,
              rules: [
                {
                  required: true,
                  message: 'Porfavor seleccione la ciudad',
                },
              ],
            })(
              <Select style={{ width: '100%' }} placeholder="Seleccionar ciudad">
                {cities.map(city => (
                  <Select.Option key={city.id} value={city.id}>
                    {city.name}
                  </Select.Option>
                ))}
              </Select>,
            )}
          </Form.Item>

          <Form.Item label="Tipo y número de documento">
            <Form.Item
              style={{ display: 'inline-block', width: 'calc(30% - 1px)', marginBottom: 0 }}
            >
              {form.getFieldDecorator('tipoDoc', {
                initialValue: dataSource.tipoDoc,
                placeholder: 'Seleccionar tipo documento',
                rules: [
                  {
                    required: true,
                    message: 'Por favor seleccione el tipo de documento',
                  },
                ],
              })(
                <Select style={{ width: '100%' }}>
                  {documents.map(doc => (
                    <Select.Option key={doc.id} value={doc.id}>
                      {doc.name}
                    </Select.Option>
                  ))}
                </Select>,
              )}
            </Form.Item>

            <Form.Item
              style={{ display: 'inline-block', width: 'calc(70% - 1px)', marginBottom: 0 }}
            >
              {form.getFieldDecorator('numDoc', {
                initialValue: dataSource.numDoc,
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
          <Form.Item
            label={
              <GenericLabel title="Razón social" content="Ingresa la razón social del comercio" />
            }
          >
            {form.getFieldDecorator('trade_name', {
              initialValue: dataSource.trade_name,
              rules: [{ required: true, message: 'Ingresa la razón social del comercio' }],
            })(<Input placeholder="Razón social" />)}
          </Form.Item>
          <Form.Item
            label={
              <GenericLabel
                title="Nombre comercial"
                content="Ingresa la razón social del comercio"
              />
            }
          >
            {form.getFieldDecorator('fiscal_name', {
              initialValue: dataSource.fiscal_name,
              rules: [{ required: true, message: 'Ingresa el nombre comercial' }],
            })(<Input placeholder="Nombre comercial" />)}
          </Form.Item>
          <Form.Item
            label={
              <>
                Teléfono <small>(Opcional)</small>
              </>
            }
          >
            {form.getFieldDecorator('phone', { initialValue: dataSource.phone })(
              <Input style={{ width: '100%' }} placeholder="Teléfono principal" />,
            )}
          </Form.Item>
          <Form.Item
            label={
              <>
                Dirección administrativa <small>(Opcional)</small>
              </>
            }
          >
            {form.getFieldDecorator('address', { initialValue: dataSource.address })(
              <Input placeholder="Dirección administrativa" />,
            )}
          </Form.Item>
          <Form.Item
            label={
              <GenericLabel
                title="Tipo de taquilla"
                content="Ingresa la razón social del comercio"
              />
            }
          >
            {form.getFieldDecorator('ticket_type', {
              initialValue: dataSource.ticket_type,
              rules: [{ required: true, message: 'Ingresa la razón social del comercio' }],
            })(
              <Select style={{ width: '100%' }} placeholder="Seleccionar tipo de taquilla">
                {typeTickets.map(type => (
                  <Select.Option key={type.id} value={type.id}>
                    {type.name}
                  </Select.Option>
                ))}
              </Select>,
            )}
          </Form.Item>
          {this.getUrlWebservice()}
          <Form.Item
            label={
              <GenericLabel
                title="Métodos de pago"
                content="Ingresa la razón social del comercio"
              />
            }
          >
            {form.getFieldDecorator('payment_method', {
              initialValue: dataSource.payment_method,
              rules: [{ required: true, message: 'Seleccione los métodos de pago' }],
            })(
              <Checkbox.Group style={{ width: '100%' }}>
                <Row>
                  {paymentMethods.map(paymentMethod => (
                    <Col xs={12} key={paymentMethod.id}>
                      <Checkbox value={paymentMethod.id}>{paymentMethod.name}</Checkbox>
                    </Col>
                  ))}
                </Row>
              </Checkbox.Group>,
            )}
          </Form.Item>
          <hr />
          <h3>Contactos</h3>
          {formItems}
          <Form.Item {...form.formItemLayoutWithOutLabel}>
            <Button type="link" onClick={this.add} style={{ width: '60%' }}>
              <Icon type="plus" /> Agregar contacto
            </Button>
          </Form.Item>
        </Form>
        <ViewButtonWizzardHandler urlBack={schemaSource.urlBack} onSubmit={onSubmit} />
      </>
    )
  }
}

export default FormDescripcion
