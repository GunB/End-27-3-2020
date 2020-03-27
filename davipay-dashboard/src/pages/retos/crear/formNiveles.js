import React, { Component } from 'react'
import CardOpaque from 'components/CustomComponents/CardOpaque'
import {
  Form,
  Input,
  Row,
  Col,
  Table,
  Button,
  Divider,
  InputNumber,
  Modal,
  Popconfirm,
  Avatar,
  Select,
} from 'antd'
import GenericLabel from 'components/CustomComponents/genericLabel'
import { ViewButtonWizzardHandler } from 'components/WizzardComponent/SimpleWizzard'
import * as uuidv4 from 'uuid/v4'

/* eslint camelcase: 0 */

export const ColumnsTable = [
  {
    title: 'Icono',
    dataIndex: 'icon',
    key: 'icon',
    render: icon => <Avatar shape="square" src={icon} />,
  },
  {
    title: 'Nombre',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Descripcion',
    dataIndex: 'description',
    key: 'descripcion',
  },
  {
    title: 'Meta',
    dataIndex: 'objetive',
    key: 'objective',
  },
  {
    title: 'Ciclo mantencion',
    dataIndex: 'cycle_maintenance',
    render: nivel_mantencion => nivel_mantencion || '-',
    key: 'cycle_maintenance',
  },
  {
    title: 'Meta mantencion',
    dataIndex: 'objective_maintenance',
    render: objective_maintenance => objective_maintenance || '-',
    key: 'objective_maintenance',
  },
]

@Form.create()
class FormNiveles extends Component {
  state = {
    level: [],
  }

  componentDidMount() {
    const { dataSource } = this.props
    const { level = [] } = dataSource
    this.updateNiveles([...level.map(lvl => ({ ...lvl, key: lvl.key || uuidv4() }))])
  }

  updateNiveles = level => {
    this.setState({ level })
  }

  onSubmit = event => {
    event.preventDefault()
    const { onSubmit } = this.props
    const { level } = this.state
    if (level.length <= 0) {
      Modal.warning({
        title: 'No hay niveles agregados',
        content: 'Necesitas agregar niveles para poder continuar',
      })
    } else {
      onSubmit({
        level,
      })
    }
  }

  actionBorrarNivel = levelIndex => {
    this.setState(prevState => {
      const { level } = prevState
      if (levelIndex > -1) {
        level.splice(levelIndex, 1)
      }
      return {
        level,
      }
    })
  }

  actionAgregarNivel = event => {
    event.preventDefault()
    const { form } = this.props
    form.validateFields((error, values) => {
      if (error) {
        console.log(error)
      } else {
        this.setState(prevState => {
          form.resetFields()
          return {
            level: [...prevState.level, { key: uuidv4(), ...values }],
          }
        })
      }
    })
  }

  onChangeFile = (e, key) => {
    e.persist()
    this.encodeImageFileAsURL(e.target, key)
  }

  encodeImageFileAsURL = (element, key = 'file') => {
    const file = element.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const { form } = this.props
        form.setFieldsValue({ [key]: reader.result })
      }
      reader.readAsDataURL(file)
    }
  }

  columnsBuild = () => [
    ...ColumnsTable,
    {
      title: 'Acciones',
      // key: 'action',
      render: (text, record, index) => (
        <>
          <a>Editar</a>
          <Divider type="vertical" />
          <Popconfirm
            title="Deseas realmente eliminar este nivel?"
            onConfirm={() => this.actionBorrarNivel(index)}
          >
            <a>Eliminar</a>
          </Popconfirm>
        </>
      ),
    },
  ]

  render() {
    const columns = this.columnsBuild()
    const { onSubmit, onChangeFile, actionAgregarNivel } = this
    const { level } = this.state
    const { schemaSource = {}, form } = this.props
    const { getFieldValue, resetFields } = form

    const nombre = getFieldValue('name') || ''
    const descripcion = getFieldValue('description') || ''
    const image = getFieldValue('icon') || null

    const mantencionRequired = !!(
      getFieldValue('cycle_maintenance') || getFieldValue('objective_maintenance')
    )

    if (!mantencionRequired) {
      resetFields('cycle_maintenance')
      resetFields('objective_maintenance')
    }

    return (
      <>
        <CardOpaque className="mb-5">
          <h4>Agregar Nivel</h4>
          <div>
            Agrega niveles a tu programa de lealtad para segmentar los retos y beneficios a los que
            pueden acceder tus usuarios según su nivel de interacción con la app. Recuerda que el
            nombre y descripción de los niveles serán visibles desde el app de DaviPay.
          </div>
          <br />
          <Form layout="vertical" className="mb-3">
            <Row gutter={24}>
              <Col span={6}>
                <Form.Item
                  label={
                    <GenericLabel
                      title={`Nombre (${nombre.length} / 25)`}
                      content="Escribe el codigo del nivel no mayor a 25 caracteres"
                    />
                  }
                >
                  {form.getFieldDecorator('name', {
                    // initialValue: dataSource.code,
                    rules: [
                      {
                        max: 25,
                        required: true,
                        message: 'Escribe el codigo del nivel no mayor a 25 caracteres',
                      },
                    ],
                  })(
                    <Input
                      readOnly={schemaSource.code ? schemaSource.code : false}
                      placeholder="Nombre del nivel"
                      size="default"
                    />,
                  )}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label={
                    <GenericLabel
                      title={`Descripcion (${descripcion.length} / 130)`}
                      content="Escribe la descripcion del Reto DaviPay"
                    />
                  }
                >
                  {form.getFieldDecorator('description', {
                    // initialValue: dataSource.code,
                    rules: [
                      {
                        required: true,
                        max: 130,
                        message: 'Porfavor ingrese la descripcion del nivel',
                      },
                    ],
                  })(
                    <Input
                      readOnly={schemaSource.code ? schemaSource.code : false}
                      placeholder="Descripcion del nivel"
                      size="default"
                    />,
                  )}
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  label={
                    <GenericLabel
                      title="Meta (Puntos)"
                      content="Escribe el numero de meta en puntos"
                    />
                  }
                >
                  {form.getFieldDecorator('objetive', {
                    // initialValue: dataSource.code,
                    rules: [
                      {
                        required: true,
                        message: 'Porfavor el numero de meta en puntos DaviPay',
                      },
                    ],
                  })(
                    <InputNumber
                      style={{ width: '100%' }}
                      readOnly={schemaSource.code ? schemaSource.code : false}
                      placeholder="Nombre del cupón"
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
                          <img src={image} alt="Red dot" />
                        </a>
                      ) : null}
                    </>
                  }
                >
                  {form.getFieldDecorator('icon', {
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
                        onChange={e => onChangeFile(e, 'icon')}
                        style={{ display: 'none' }}
                      />
                    </>,
                  )}
                </Form.Item>
              </Col>
              <Col span={24}>
                <h4>
                  Agregar mantención <small>(Opcional)</small>
                </h4>
                <p>
                  Puedes agregar una mantención a una nivel para permitirle a los usuarios que se
                  encuentren en dicha nivel acceder a más retos y beneficios.
                </p>
              </Col>
              <Col span={12}>
                <Form.Item
                  label={
                    <GenericLabel
                      title="Ciclo de mantención"
                      content="Escribe el ciclo de mantención"
                    />
                  }
                >
                  {form.getFieldDecorator('cycle_maintenance', {
                    // initialValue: dataSource.code,
                    rules: [
                      {
                        required: mantencionRequired,
                        message: 'Porfavor seleccione el el ciclo de mantención',
                      },
                    ],
                  })(
                    <Select style={{ width: '100%' }}>
                      <Select.Option value="">N/A</Select.Option>
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
                    <GenericLabel title="Meta (Puntos)" content="Escribe el ciclo de mantención" />
                  }
                >
                  {form.getFieldDecorator('objective_maintenance', {
                    // initialValue: dataSource.code,
                    rules: [
                      {
                        required: mantencionRequired,
                        message: 'Porfavor ingrese el el ciclo de mantención',
                      },
                    ],
                  })(
                    <InputNumber
                      style={{ width: '100%' }}
                      readOnly={schemaSource.code ? schemaSource.code : false}
                      placeholder="Porfavor ingrese el el ciclo de mantención"
                      size="default"
                    />,
                  )}
                </Form.Item>
              </Col>
            </Row>
          </Form>
          <hr />
          <div className="text-right">
            <Button type="primary" onClick={actionAgregarNivel}>
              Agregar Nivel
            </Button>
          </div>
        </CardOpaque>

        <Table dataSource={level} columns={columns} />

        <ViewButtonWizzardHandler urlBack={schemaSource.urlBack} onSubmit={onSubmit} />
      </>
    )
  }
}

export default FormNiveles
