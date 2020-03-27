import React from 'react'
import moment from 'moment'
import { Form, Input, Select, DatePicker, Row, Col, InputNumber } from 'antd'
import TextArea from 'antd/lib/input/TextArea'
import { ViewButtonWizzardHandler } from 'components/WizzardComponent/SimpleWizzard'
import GenericLabel from 'components/CustomComponents/genericLabel'
import MoneyInput, { moneyTransform } from 'components/CustomComponents/moneyInput'

@Form.create()
class FormDescripcion extends React.Component {
  onSubmit = event => {
    event.preventDefault()
    const { form, onSubmit } = this.props
    form.validateFields((error, values) => {
      if (error) {
        console.log(error)
      } else {
        onSubmit(values)
      }
    })
  }

  onChangeFile = e => {
    e.persist()
    this.encodeImageFileAsURL(e.target)
  }

  encodeImageFileAsURL = (element, key = 'icon') => {
    const file = element.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const { form } = this.props
        form.setFieldsValue({ [key]: reader.result })
        // console.log('RESULT', reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  render() {
    const { form, schemaSource, dataSource } = this.props
    const { getFieldValue } = form
    const image = getFieldValue('icon') || dataSource.icon
    const amount = getFieldValue('amount') || dataSource.amount || 0
    const descripcion = getFieldValue('description') || dataSource.description || ``
    const { onSubmit, onChangeFile } = this

    return (
      <>
        <Form layout="vertical" className="mb-3" hideRequiredMark>
          <Row gutter={24}>
            <Col span={24}>
              <Form.Item
                label={<GenericLabel title="Nombre" content="Escribe el codigo del Reto DaviPay" />}
              >
                {form.getFieldDecorator('name', {
                  initialValue: dataSource.name,
                  rules: [
                    {
                      required: true,
                      message: 'Porfavor ingrese el identificador del reto DaviPay',
                    },
                  ],
                })(
                  <Input
                    readOnly={schemaSource.name ? schemaSource.name : false}
                    placeholder="Porfavor ingrese el identificador del reto DaviPay"
                    size="default"
                  />,
                )}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label={<GenericLabel title="Ciclos" content="Selecciona el numero de ciclos" />}
              >
                {form.getFieldDecorator('cycle', {
                  initialValue: dataSource.cycle,
                  rules: [{ required: true, message: 'Porfavor seleccione el numero de ciclos' }],
                })(
                  <Select style={{ width: '100%' }}>
                    <Select.Option value="30">30 dias</Select.Option>
                    <Select.Option value="60">60 dias</Select.Option>
                    <Select.Option value="90">90 dias</Select.Option>
                  </Select>,
                )}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label={
                  <GenericLabel
                    title="Fecha de Inicio"
                    content="Selecciona la fecha de inicio del Reto DaviPay"
                  />
                }
              >
                {form.getFieldDecorator('date_from', {
                  initialValue: dataSource.date_from ? moment(dataSource.date_from) : undefined,
                  rules: [{ required: true, message: 'Porfavor seleccione la fecha de inicio' }],
                })(<DatePicker showTime placeholder="Select Time" style={{ width: '100%' }} />)}
              </Form.Item>
            </Col>
            <Col span={24}>
              <hr />
              <h4>Puntos</h4>
              <br />
            </Col>
            <Col span={8}>
              <Form.Item label="Puntos por transaccion">
                {form.getFieldDecorator('points_for_transaction', {
                  initialValue: dataSource.points_for_transaction,
                  rules: [{ required: true, message: 'Porfavor seleccione el numero de ciclos' }],
                })(
                  <InputNumber
                    style={{ width: '100%' }}
                    readOnly={schemaSource.code ? schemaSource.code : false}
                    placeholder="Puntos por transaccion"
                    size="default"
                  />,
                )}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Monto por transaccion">
                {form.getFieldDecorator('amount', {
                  initialValue: dataSource.amount,
                  rules: [
                    { required: true, message: 'Porfavor seleccione el monto por transaccion' },
                  ],
                })(<MoneyInput />)}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label={`Puntos por cada ${moneyTransform(amount)}`}>
                {form.getFieldDecorator('points_for_amount', {
                  initialValue: dataSource.points_for_amount,
                  rules: [{ required: true, message: 'Ingresa el valor en puntos deseado' }],
                })(
                  <InputNumber
                    style={{ width: '100%' }}
                    readOnly={schemaSource.code ? schemaSource.code : false}
                    placeholder="Ingresa el valor en puntos deseado"
                    size="default"
                  />,
                )}
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                label={
                  <>
                    <GenericLabel
                      title="Imagen / Icono"
                      content="Selecciona la imagen que representara el reto DaviPay"
                    />
                    <br />
                    <br />
                    <a className="btn custom-input-btn">
                      <i className="fa fa-cloud-upload" /> Cargar Imagen
                    </a>
                    {image ? (
                      <a className="btn custom-input-btn ml-3">
                        <img src={image} alt="Icono" />
                      </a>
                    ) : null}
                  </>
                }
              >
                {form.getFieldDecorator('icon', {
                  initialValue: dataSource.icon,
                  rules: [
                    {
                      required: true,
                      message: 'Selecciona la imagen que representara el reto DaviPay',
                    },
                  ],
                })(
                  <>
                    <Input
                      type="file"
                      id="icon"
                      accept="image/*"
                      onChange={e => onChangeFile(e)}
                      style={{ display: 'none' }}
                    />
                  </>,
                )}
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                label={
                  <GenericLabel
                    title={`Descripción (${descripcion.length} / 200)`}
                    content="Escribe la descripción del Reto DaviPay"
                  />
                }
              >
                {form.getFieldDecorator('description', {
                  initialValue: dataSource.description,
                  rules: [
                    {
                      required: true,
                      message: 'Porfavor ingrese la descripción no mayor a 200 caracteres',
                      max: 200,
                    },
                  ],
                })(
                  <TextArea
                    placeholder="Porfavor ingrese la descripción no mayor a 200 caracteres"
                    size="default"
                  />,
                )}
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="Términos y condiciones">
                {form.getFieldDecorator('terms', {
                  initialValue: dataSource.terms,
                  rules: [
                    { required: true, message: 'Porfavor ingrese los terminos y condiciones' },
                  ],
                })(<TextArea placeholder="Terminos y condiciones" size="default" />)}
              </Form.Item>
            </Col>
          </Row>
        </Form>
        <ViewButtonWizzardHandler urlBack={schemaSource.urlBack} onSubmit={onSubmit} />
      </>
    )
  }
}

export default FormDescripcion
