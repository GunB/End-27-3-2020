import React from 'react'
import { Empty, Form, Row, Col, Input, Button, Upload, Icon, Table, Select, Modal } from 'antd'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { ACTION_createFacturaFile, ACTION_closeSuccessFactura } from 'models/redux/factura/actions'

const no_file = (
  <span style={{ textAlign: 'center', width: '100%', display: 'block' }}>
    <b>Aún no ha cargado archivo .csv</b>
    <br />
    Seleccione un archivo .csv para visualizar las facturas que contiene
  </span>
)

@withRouter
@connect(state => ({
  user: state.user.user_data,
  isAdmin: state.factura.isAdmin,
  isCommerce: state.factura.isCommerce,
  isValidCommerce: state.factura.isValidCommerce,
  commerce: state.factura.commerce,
  commerces: state.factura.commerces,
  documents: state.factura.documents,
  loading: state.factura.loading,
  success: state.factura.success,
  onError: state.factura.onError,
}))
@Form.create()
class FacturaFile extends React.Component {
  state = {
    fileList: [],
    datasource: [],
    statusUpload: '',
    messageUpload: '',
  }

  componentDidMount() {}

  handleUpload = () => {
    const { fileList } = this.state
    const { form, commerce, dispatch, isAdmin } = this.props
    const formData = new FormData()
    form.validateFields((error, values) => {
      if (fileList.length === 0) {
        this.setState(() => ({
          statusUpload: 'error',
          messageUpload: 'Seleccione un archivo',
        }))
        return
      }
      if (!error) {
        fileList.forEach(file => {
          formData.append('csv', file)
        })

        if (!isAdmin) {
          formData.append('commerce_id', commerce.commerce_id)
        } else {
          formData.append('commerce_id', values.comercio)
        }

        dispatch(ACTION_createFacturaFile(formData))
      }
    })
  }

  cleanForm = event => {
    event.preventDefault()
    this.cleanComponent()
  }
  cleanComponent = () => {
    const { form } = this.props
    this.setState(() => ({
      fileList: [],
      datasource: [],
      statusUpload: '',
      messageUpload: '',
    }))
    form.resetFields()
  }
  showFacturaOk = ok => {
    const { dispatch } = this.props
    if (ok) {
      const secondsToGo = 5
      const modal = Modal.success({
        title: 'Cargar facutra',
        content: `La factura se cargo correctamente`,
      })
      setTimeout(() => {
        modal.destroy()
      }, secondsToGo * 1000)
      dispatch(ACTION_closeSuccessFactura())
      this.cleanComponent()
    }
  }

  showFacturaError = error => {
    const { dispatch } = this.props
    if (error) {
      const secondsToGo = 5
      const modal = Modal.error({
        title: 'Cargar facutra',
        content: `No se pudo cargar la factura`,
      })
      setTimeout(() => {
        modal.destroy()
      }, secondsToGo * 1000)
      dispatch(ACTION_closeSuccessFactura())
    }
  }

  getAdminCommerce = form => {
    const { isAdmin, commerces } = this.props
    if (isAdmin) {
      return (
        <Form.Item label="Comercio">
          {form.getFieldDecorator('comercio', {
            placeholder: 'Comercio',
            rules: [
              {
                required: true,
                message: 'Por favor ingrese el comercio',
              },
            ],
          })(
            <Select style={{ width: '100%' }}>
              {commerces.map(value => {
                return (
                  <Select.Option value={value.id} key={value.id}>
                    {value.fiscal_name}
                  </Select.Option>
                )
              })}
            </Select>,
          )}
        </Form.Item>
      )
    }
    return <span />
  }

  getDataFacturaFile = (datasource, columns) => {
    const { fileList } = this.state
    if (fileList.length > 0) {
      return <Table dataSource={datasource} columns={columns} />
    }
    return <Empty image={Empty.PRESENTED_IMAGE_DEFAULT} description={no_file} />
  }

  render() {
    const { form, loading } = this.props
    const responsive = { xs: 30, sm: 20 }
    const { fileList, datasource, messageUpload, statusUpload } = this.state
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
      },
    }

    const props = {
      onRemove: file => {
        this.setState(state => {
          const index = state.fileList.indexOf(file)
          const newFileList = state.fileList.slice()
          newFileList.splice(index, 1)
          return {
            fileList: newFileList,
          }
        })
      },
      beforeUpload: file => {
        let fileError = false
        const reader = new FileReader()

        reader.onload = event => {
          const text = event.target.result
          const lines = text.split('\n')
          const datos = []
          for (let j = 0; j < lines.length; j += 1) {
            if (lines[j] !== '') {
              const renglon = {}
              const information = lines[j].split(',')
              if (information.length !== 9) {
                fileError = true
              } else {
                ;[
                  renglon.tipo,
                  renglon.documento,
                  renglon.nombre,
                  renglon.email,
                  renglon.telefono,
                  renglon.referencia,
                  renglon.concepto,
                  renglon.monto,
                  renglon.vencimiento,
                ] = information
                datos.push(renglon)
              }
            }
          }
          this.setState(() => ({
            datasource: datos,
          }))
          if (fileError) {
            this.setState(() => ({
              fileList: [],
              statusUpload: 'error',
              messageUpload: 'Contenido del archivo incorrecto',
            }))
          }
        }

        this.setState(() => ({
          fileList: [file],
          statusUpload: '',
          messageUpload: '',
        }))
        reader.readAsText(file)
        return false
      },
      fileList,
      accept: '.csv',
      multiple: false,
      showUploadList: false,
    }

    const columns = [
      {
        title: 'Tipo',
        dataIndex: 'tipo',
        key: 'tipo',
      },
      {
        title: 'Documento',
        dataIndex: 'documento',
        key: 'documento',
      },
      {
        title: 'Nombre',
        dataIndex: 'nombre',
        key: 'nombre',
      },
      {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
      },
      {
        title: 'Teléfono',
        dataIndex: 'telefono',
        key: 'telefono',
      },
      {
        title: 'Referencia',
        dataIndex: 'referencia',
        key: 'referencia',
      },
      {
        title: 'Concepto',
        dataIndex: 'concepto',
        key: 'concepto',
      },
      {
        title: 'Monto',
        dataIndex: 'monto',
        key: 'monto',
      },
      {
        title: 'Vencimiento',
        dataIndex: 'vencimiento',
        key: 'vencimiento',
      },
    ]
    return (
      <div>
        <br />
        <Form {...formItemLayout} labelAlign="left" className="mb-3" hideRequiredMark>
          <Row gutter={36}>
            <Col {...responsive}>
              <h4>Facturas</h4>
              {this.getAdminCommerce(form)}
              <Form.Item
                label="Seleccionar archivo .csv"
                validateStatus={statusUpload}
                help={messageUpload}
              >
                <Upload style={{ width: '100%' }} {...props}>
                  <Input
                    prefix={<Icon type="file-text" theme="outlined" />}
                    style={{ width: '75%' }}
                    value={fileList.length === 0 ? 'Seleccione archivo' : fileList[0].name}
                  />
                  <Button type="primary" style={{ width: '25%' }}>
                    Buscar
                  </Button>
                </Upload>
              </Form.Item>
            </Col>
          </Row>
          <hr />
          <br />
          <h4>Previsualización</h4>
          {this.getDataFacturaFile(datasource, columns)}
        </Form>
        <br />
        <Row type="flex" align="middle">
          <Col xs={24} style={{ textAlign: 'right' }}>
            <Button type="link" htmlType="submit" onClick={this.cleanForm} disabled={loading}>
              Descartar
            </Button>
            <Button type="primary" onClick={this.handleUpload} loading={loading}>
              Cargar Facturas
            </Button>
          </Col>
        </Row>
      </div>
    )
  }
}

export default FacturaFile
