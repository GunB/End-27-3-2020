import React, { Component } from 'react'
import { Form, Input, Upload, Icon, Button } from 'antd'
import ViewButtonWizzardHandler from 'components/CustomComponent/SimpleWizzard/ViewButtonWizzardHandler'
import { uploadFile } from 'services/general'

@Form.create()
class FormDocumentos extends Component {
  //TODO el file upload se podria convertir en un componente para no repetri por cada uno
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      fileListRut: [],
      statusUploadRut: '',
      messageUploadRut: '',
      fileRutUrl: '',

      fileListChamber: [],
      statusUploadChamber: '',
      messageUploadChamber: '',
      fileChamberUrl: '',

      fileListNetwork: [],
      statusUploadNetwork: '',
      messageUploadNetwork: '',
      fileNetworkUrl: '',

      fileListAntiFraud: [],
      statusUploadAntiFraud: '',
      messageUploadAntiFraud: '',
      fileAntiFraudUrl: '',

      fileListLegal: [],
      statusUploadLegal: '',
      messageUploadLegal: '',
      fileLegalUrl: '',
    }
  }

  handleUpload = fileList => {
    const formData = new FormData()
    formData.append('file', fileList)
    this.setState(() => ({ loading: true }))
    return uploadFile(formData)
  }

  onSubmit = event => {
    event.preventDefault()
    const { form, onSubmit } = this.props
    const {
      fileListRut,
      fileRutUrl,
      fileListChamber,
      fileChamberUrl,
      fileListNetwork,
      fileNetworkUrl,
      fileListAntiFraud,
      fileAntiFraudUrl,
      fileListLegal,
      fileLegalUrl,
    } = this.state

    form.validateFields((error, values) => {
      let conError = false
      if (fileListRut.length === 0 || fileRutUrl === '') {
        this.setState(() => ({
          statusUploadRut: 'error',
          messageUploadRut: 'Seleccione un archivo',
        }))
        conError = true
      }
      if (fileListChamber.length === 0 || fileChamberUrl === '') {
        this.setState(() => ({
          statusUploadChamber: 'error',
          messageUploadChamber: 'Seleccione un archivo',
        }))
        conError = true
      }
      if (fileListNetwork.length === 0 || fileNetworkUrl === '') {
        this.setState(() => ({
          statusUploadNetwork: 'error',
          messageUploadNetwork: 'Seleccione un archivo',
        }))
        conError = true
      }
      if (fileListAntiFraud.length === 0 || fileAntiFraudUrl === '') {
        this.setState(() => ({
          statusUploadAntiFraud: 'error',
          messageUploadAntiFraud: 'Seleccione un archivo',
        }))
        conError = true
      }
      if (fileListLegal.length === 0 || fileLegalUrl === '') {
        this.setState(() => ({
          statusUploadLegal: 'error',
          messageUploadLegal: 'Seleccione un archivo',
        }))
        conError = true
      }
      console.log(fileListRut)
      if (error || conError) {
        console.log(error)
      } else {
        values.document_rut_url = fileRutUrl
        values.document_rut_name = fileListRut[0].name
        values.document_chamber_commerce_url = fileChamberUrl
        values.document_chamber_commerce_name = fileListChamber[0].name
        values.document_network_url = fileNetworkUrl
        values.document_network_name = fileListNetwork[0].name
        values.document_anti_fraud_url = fileAntiFraudUrl
        values.document_anti_fraud_name = fileListAntiFraud[0].name
        values.document_legal_url = fileLegalUrl
        values.document_legal_name = fileListLegal[0].name
        onSubmit(values)
      }
    })
  }

  render() {
    const { onSubmit } = this
    const {
      loading,
      fileListRut,
      statusUploadRut,
      messageUploadRut,
      fileListChamber,
      statusUploadChamber,
      messageUploadChamber,
      fileListNetwork,
      statusUploadNetwork,
      messageUploadNetwork,
      fileListAntiFraud,
      statusUploadAntiFraud,
      messageUploadAntiFraud,
      fileListLegal,
      statusUploadLegal,
      messageUploadLegal,
    } = this.state
    const { formLayout, schemaSource } = this.props
    //const { formLayout, dataSource, form, schemaSource } = this.props
    //const { getFieldValue } = form

    const propsRUT = {
      onRemove: file => {
        this.setState(state => {
          const index = state.fileListRut.indexOf(file)
          const newFileList = state.fileListRut.slice()
          newFileList.splice(index, 1)
          return {
            fileListRut: newFileList,
          }
        })
      },
      beforeUpload: file => {
        this.setState(() => ({
          fileListRut: [file],
          statusUploadRut: '',
          messageUploadRut: '',
        }))
        this.handleUpload(file)
          .then(res => {
            this.setState(() => ({
              fileRutUrl: res.data.url,
              statusUploadRut: '',
              messageUploadRut: '',
              loading: false,
            }))
          })
          .catch(err => {
            console.log(err)
            this.setState(() => ({
              fileListRut: [],
              statusUploadRut: 'error',
              messageUploadRut: 'No se pudo subir el archivo',
              loading: false,
            }))
          })
        return false
      },
      fileList: fileListRut,
      multiple: false,
      showUploadList: false,
    }

    const propsChamber = {
      onRemove: file => {
        this.setState(state => {
          const index = state.fileListChamber.indexOf(file)
          const newFileList = state.fileListChamber.slice()
          newFileList.splice(index, 1)
          return {
            fileListChamber: newFileList,
          }
        })
      },
      beforeUpload: file => {
        this.setState(() => ({
          fileListChamber: [file],
          statusUploadChamber: '',
          messageUploadChamber: '',
        }))
        this.handleUpload(file)
          .then(res => {
            this.setState(() => ({
              fileChamberUrl: res.data.url,
              statusUploadChamber: '',
              messageUploadChamber: '',
              loading: false,
            }))
          })
          .catch(err => {
            console.log(err)
            this.setState(() => ({
              fileListChamber: [],
              statusUploadChamber: 'error',
              messageUploadChamber: 'No se pudo subir el archivo',
              loading: false,
            }))
          })
        return false
      },
      fileList: fileListChamber,
      multiple: false,
      showUploadList: false,
    }

    const propsNetwork = {
      onRemove: file => {
        this.setState(state => {
          const index = state.fileListNetwork.indexOf(file)
          const newFileList = state.fileListNetwork.slice()
          newFileList.splice(index, 1)
          return {
            fileListNetwork: newFileList,
          }
        })
      },
      beforeUpload: file => {
        this.setState(() => ({
          fileListNetwork: [file],
          statusUploadNetwork: '',
          messageUploadNetwork: '',
        }))
        this.handleUpload(file)
          .then(res => {
            this.setState(() => ({
              fileNetworkUrl: res.data.url,
              statusUploadNetwork: '',
              messageUploadNetwork: '',
              loading: false,
            }))
          })
          .catch(err => {
            console.log(err)
            this.setState(() => ({
              fileListNetwork: [],
              statusUploadNetwork: 'error',
              messageUploadNetwork: 'No se pudo subir el archivo',
              loading: false,
            }))
          })
        return false
      },
      fileList: fileListNetwork,
      multiple: false,
      showUploadList: false,
    }

    const propsAntiFraud = {
      onRemove: file => {
        this.setState(state => {
          const index = state.fileListAntiFraud.indexOf(file)
          const newFileList = state.fileListAntiFraud.slice()
          newFileList.splice(index, 1)
          return {
            fileList: newFileList,
          }
        })
      },
      beforeUpload: file => {
        this.setState(() => ({
          fileListAntiFraud: [file],
          statusUploadAntiFraud: '',
          messageUploadAntiFraud: '',
        }))
        this.handleUpload(file)
          .then(res => {
            this.setState(() => ({
              fileAntiFraudUrl: res.data.url,
              statusUploadAntiFraud: '',
              messageUploadAntiFraud: '',
              loading: false,
            }))
          })
          .catch(err => {
            console.log(err)
            this.setState(() => ({
              fileListAntiFraud: [],
              statusUploadAntiFraud: 'error',
              messageUploadAntiFraud: 'No se pudo subir el archivo',
              loading: false,
            }))
          })
        return false
      },
      fileList: fileListAntiFraud,
      multiple: false,
      showUploadList: false,
    }

    const propsLegal = {
      onRemove: file => {
        this.setState(state => {
          const index = state.fileListLegal.indexOf(file)
          const newFileList = state.fileListLegal.slice()
          newFileList.splice(index, 1)
          return {
            fileList: newFileList,
          }
        })
      },
      beforeUpload: file => {
        this.setState(() => ({
          fileListLegal: [file],
          statusUploadLegal: '',
          messageUploadLegal: '',
        }))
        this.handleUpload(file)
          .then(res => {
            this.setState(() => ({
              fileLegalUrl: res.data.url,
              statusUploadLegal: '',
              messageUploadLegal: '',
              loading: false,
            }))
          })
          .catch(err => {
            console.log(err)
            this.setState(() => ({
              fileListLegal: [],
              statusUploadLegal: 'error',
              messageUploadLegal: 'No se pudo subir el archivo',
              loading: false,
            }))
          })
        return false
      },
      fileList: fileListLegal,
      multiple: false,
      showUploadList: false,
    }

    return (
      <>
        <Form {...formLayout} className="mb-3">
          <Form.Item label="RUT" validateStatus={statusUploadRut} help={messageUploadRut}>
            <Upload style={{ width: '100%' }} {...propsRUT}>
              <Input
                prefix={<Icon type="file-text" theme="outlined" />}
                style={{ width: '75%' }}
                value={fileListRut.length === 0 ? 'Seleccione archivo' : fileListRut[0].name}
              />
              <Button type="primary" style={{ width: '25%' }} loading={loading}>
                Buscar
              </Button>
            </Upload>
          </Form.Item>
          <Form.Item
            label="Cámara de comercio"
            validateStatus={statusUploadChamber}
            help={messageUploadChamber}
          >
            <Upload style={{ width: '100%' }} {...propsChamber}>
              <Input
                prefix={<Icon type="file-text" theme="outlined" />}
                style={{ width: '75%' }}
                value={
                  fileListChamber.length === 0 ? 'Seleccione archivo' : fileListChamber[0].name
                }
              />
              <Button type="primary" style={{ width: '25%' }} loading={loading}>
                Buscar
              </Button>
            </Upload>
          </Form.Item>
          <Form.Item
            label="Carta a redes"
            validateStatus={statusUploadNetwork}
            help={messageUploadNetwork}
          >
            <Upload style={{ width: '100%' }} {...propsNetwork}>
              <Input
                prefix={<Icon type="file-text" theme="outlined" />}
                style={{ width: '75%' }}
                value={
                  fileListNetwork.length === 0 ? 'Seleccione archivo' : fileListNetwork[0].name
                }
              />
              <Button type="primary" style={{ width: '25%' }} loading={loading}>
                Buscar
              </Button>
            </Upload>
          </Form.Item>
          <Form.Item
            label="Central antifraude"
            validateStatus={statusUploadAntiFraud}
            help={messageUploadAntiFraud}
          >
            <Upload style={{ width: '100%' }} {...propsAntiFraud}>
              <Input
                prefix={<Icon type="file-text" theme="outlined" />}
                style={{ width: '75%' }}
                value={
                  fileListAntiFraud.length === 0 ? 'Seleccione archivo' : fileListAntiFraud[0].name
                }
              />
              <Button type="primary" style={{ width: '25%' }} loading={loading}>
                Buscar
              </Button>
            </Upload>
          </Form.Item>
          <Form.Item
            label="Documento representante legal"
            validateStatus={statusUploadLegal}
            help={messageUploadLegal}
          >
            <Upload style={{ width: '100%' }} {...propsLegal}>
              <Input
                prefix={<Icon type="file-text" theme="outlined" />}
                style={{ width: '75%' }}
                value={fileListLegal.length === 0 ? 'Seleccione archivo' : fileListLegal[0].name}
              />
              <Button type="primary" style={{ width: '25%' }} loading={loading}>
                Buscar
              </Button>
            </Upload>
          </Form.Item>
        </Form>
        <ViewButtonWizzardHandler urlBack={schemaSource.urlBack} onSubmit={onSubmit} />
      </>
    )
  }
}

export default FormDocumentos
