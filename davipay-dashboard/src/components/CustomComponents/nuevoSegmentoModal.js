/* eslint camelcase: 0 */

import React from 'react'
import { connect } from 'react-redux'
import { CSVLink } from 'react-csv'
import { Button, Modal, Spin, Form, Input, notification } from 'antd'
import * as uuidv4 from 'uuid/v4'
import { createSegment } from 'services/segments'
import { getAsyncSegments, cleanSegments } from 'redux/segments/actions'
import { ENDPOINTS } from 'constant/endPoints'

const dispatchToProps = dispatch => ({
  getSegments: () => {
    dispatch(cleanSegments())
    dispatch(getAsyncSegments())
  },
})

@connect(
  undefined,
  dispatchToProps,
)
@Form.create()
class NuevoSegmentoModal extends React.Component {
  state = {
    loading: false,
    base64File: null,
    nameFile: null,
    uploaded: false,
    data: {},
  }

  onSubmit = () => {
    const { form } = this.props
    const { base64File } = this.state
    form.validateFields((error, values) => {
      if (error) {
        console.log(error, values)
      } else {
        console.log(values)
        if (base64File && base64File[0]) {
          const resp = { ...values, csv: base64File[0] }
          this.submitData(resp)
        } else {
          notification.warning({
            message: 'El archivo seleccionado no es valido',
            description: 'Verifique el archivo seleccionado e intente nuevamente',
          })
        }
      }
    })
  }

  submitData = data => {
    const { getSegments } = this.props
    this.setState({ loading: true })
    createSegment(data)
      .then(response => {
        this.setState({ loading: false, uploaded: true, data: response.data.data })
        getSegments()
      })
      .catch(() => {
        this.setState({ loading: false })
      })
  }

  onChangeFile = e => {
    const { form } = this.props
    e.persist()
    if (e.target.files && e.target.files[0]) {
      console.log(e.target.files)
      const nameFile = e.target.files[0] ? e.target.files[0].name : null
      this.setState({ base64File: e.target.files, nameFile })
      form.setFieldsValue({ csv: e.target.files })
    }
  }

  cerrar = () => {
    const { onSubmit } = this.props
    if (onSubmit) {
      onSubmit()
    }
  }

  render() {
    const { closeModal, form } = this.props
    const { loading, nameFile, uploaded, data } = this.state
    const { onSubmit, onChangeFile, cerrar } = this
    const csvData = ({ listUserNotFound }) => {
      return listUserNotFound.map(({ person_id_type, person_id }) => {
        return [person_id_type, person_id]
      })
    }

    return (
      <>
        <Modal
          title={<h3>Crear nuevo segmento</h3>}
          visible
          closable={false}
          footer={[
            <Spin spinning={loading} tip="Cargando..." key={uuidv4()}>
              {!uploaded ? (
                <Button key="back" onClick={closeModal}>
                  Cancelar
                </Button>
              ) : null}
              <Button key="submit" type="primary" onClick={!uploaded ? onSubmit : cerrar}>
                Continuar
              </Button>
            </Spin>,
          ]}
        >
          {!uploaded ? (
            <>
              <Form layout="vertical" className="mb-3">
                <p>
                  Los usuario duplicados y los que no se encuetren en la base de registrados de
                  DaviPay serán removidos automáticamente. Puedes descargar la plantilla del archivo
                  .csv{' '}
                  <a
                    href={ENDPOINTS.EXAMPLES.CSV_SEGMENTOS}
                    className="utils__link--underlined"
                    download
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    aquí
                  </a>
                </p>

                <Form.Item label="Nombre">
                  {form.getFieldDecorator('name', {
                    rules: [
                      { required: true, message: 'Porfavor ingrese el nombre del nuevo segmento' },
                    ],
                  })(<Input placeholder="Nombre del segmento" size="default" />)}
                </Form.Item>
                <Form.Item
                  label={
                    <>
                      <a className="btn custom-input-btn">
                        <i className="fa fa-cloud-upload" />{' '}
                        {!nameFile ? 'Subir archivo' : 'Cambiar archivo'}
                      </a>
                      &nbsp;&nbsp;
                      {nameFile === '' ? 'Carga archivo .csv' : nameFile}
                    </>
                  }
                >
                  {form.getFieldDecorator('csv', {
                    rules: [{ required: true, message: 'Porfavor seleccione un archivo CSV' }],
                  })(
                    <>
                      <Input
                        type="file"
                        accept=".csv"
                        onChange={e => onChangeFile(e)}
                        id="csv"
                        style={{ display: 'none' }}
                      />
                    </>,
                  )}
                </Form.Item>
              </Form>
            </>
          ) : (
            <>
              <p>El segmento se ha cargado con éxito.</p>
              <div className="row">
                <div className="col-5">
                  <strong>Usuarios encontrados:</strong>
                </div>
                <div className="col-7">{data.user_found}</div>
                {data && data.listUserNotFound && data.listUserNotFound.length ? (
                  <>
                    <div className="col-5">
                      <strong>Usuarios no encontrados:</strong>
                    </div>
                    <div className="col-7">{data.user_not_found}</div>
                    <div className="col-12 mt-3">
                      Puedes descargar la lista de usuarios no encontrados{' '}
                      <CSVLink
                        className="utils__link--underlined"
                        enclosingCharacter=""
                        filename={`${nameFile}-noEncontrados.csv`}
                        data={csvData(data)}
                        target="_blank"
                      >
                        aquí
                      </CSVLink>
                    </div>
                  </>
                ) : null}
              </div>
            </>
          )}
        </Modal>
      </>
    )
  }
}

export default NuevoSegmentoModal
