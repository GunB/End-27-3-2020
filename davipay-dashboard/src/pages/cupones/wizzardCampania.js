/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/void-dom-elements-no-children */
/* eslint-disable no-lonely-if */

import React from 'react'
import { connect } from 'react-redux'
import {
  Form,
  Card,
  Input,
  Select,
  Button,
  Icon,
  notification,
  Modal,
  DatePicker,
  TimePicker,
  message,
  Popconfirm,
  Spin,
  Collapse,
} from 'antd'
import { Helmet } from 'react-helmet'
import { isEmpty } from 'lodash'
import GenericLabel from 'components/CustomComponents/genericLabel'
import TabTitle from 'components/CustomComponents/tabTitle'
import { withRouter } from 'react-router-dom'
import Authorize from 'components/LayoutComponents/Authorize'
import TextArea from 'antd/lib/input/TextArea'
import moment from 'moment'
import roles from 'constant/roles'
import { getAsyncSegments, cleanSegments } from 'redux/segments/actions'
import NuevoSegmentoModal from 'components/CustomComponents/nuevoSegmentoModal'
import CuponSegmentsToResume from 'components/CustomComponents/cuponSegmentsToResume'
import { getCupones } from '../../services/cupon'
import {
  createCampania,
  editCampania,
  getAllCampaignById,
  duplicateCampania,
} from '../../services/campania'
import './styles.scss'

moment.locale('es')
const mapStateToProps = state => ({
  totalSegmentos: state.segments,
})
const dateFormat = 'YYYY-MM-DD'
const format = 'HH:mm'

const dispatchToProps = dispatch => ({
  getSegments: () => {
    dispatch(getAsyncSegments())
  },
  cleanSyncSegments: () => {
    dispatch(cleanSegments())
  },
})
@Form.create()
@withRouter
@connect(mapStateToProps, dispatchToProps)
class WizzardCampania extends React.Component {
  state = {
    key: 'tab1',
    segment: [],
    createCampaign: {},
    cuponName: '',
    sendCampaingModal: false,
    totalCupons: [],
    editCampaing: 0,
    base64Image: '',
    terms: '',
    imageURL: '',
    dateExist: '',
    hoursExist: '',
    commerce: [],
    nameFile: '',
    typeCampaing: 0,
    isCreatingSegments: false,
    loading: false,
  }

  componentDidMount() {
    const { match } = this.props
    if (match.params.type === '1') {
      this.setState({
        key: 'tab3',
      })
    }
    const { createCampaign } = this.state
    createCampaign.name = match.params.nombreCampaing
    createCampaign.id = match.params.id
    this.setState({ loading: true })
    getCupones().then(cupons => {
      this.setState({ loading: false })
      this.getAllSegments()
      if (createCampaign.id !== '0') {
        const hide = message.loading('Cargando campaña...', 0)
        this.setState({ loading: true })
        getAllCampaignById(createCampaign.id).then(res => {
          this.setState({ loading: false })
          if (res[0]) {
            hide()
            const response = res[0]
            if (response.Date) {
              const datePublish = response.Date
              this.setState({
                dateExist: datePublish.substr(0, 10),
                hoursExist: datePublish.substr(11, 5),
              })
              createCampaign.dateSelect = datePublish.substr(0, 10)
              createCampaign.timeSelect = datePublish.substr(11, 5)
            }
            createCampaign.email = response.Email
            createCampaign.type = Number(response.Type)
            createCampaign.image = {}
            createCampaign.email = response.Email
            createCampaign.title = response.Title
            createCampaign.message = response.Message
            createCampaign.sub_type = Number(response.SubType)
            createCampaign.message = response.Message
            createCampaign.segments = response.segments
            this.setState({
              imageURL: response.Image || '',
            })
            if (response.DiscountCode && response.DiscountCode.id) {
              this.setSelectCupon(response.DiscountCode.id)
              createCampaign.discount_code_id = response.DiscountCode.id
            } else {
              if (response.segments) this.setSelectSegmento(response.segments.map(data => data.id))
            }
          } else {
            notification.error({
              message: 'Error',
              description: 'No se encontro la campaña.',
            })
          }
        })
      }
      this.setState({
        totalCupons: cupons,
      })
    })

    this.getAllSegments()

    this.setState({
      createCampaign,
      editCampaing: Number(createCampaign.id),
      typeCampaing: match.params.type !== '2' ? '0' : '2',
    })
  }

  normalizeSegmentos = (value = []) => {
    const todos = [1]
    if (value.indexOf(1) >= 0) {
      return todos
    }
    return value
  }

  getAllSegments = () => {
    const { cleanSyncSegments, getSegments } = this.props
    cleanSyncSegments()
    getSegments()
  }

  onTabChange = (key, type) => {
    this.setState({ [type]: key })
  }

  onSubmit = (event, actualTab, tabList) => {
    event.preventDefault()
    const { form } = this.props
    tabList.forEach((element, key) => {
      if (element.key === actualTab) {
        let allFields = []
        switch (element.key) {
          case 'tab1':
            allFields = ['tipoCampana', 'cupon', 'segmento']
            break
          case 'tab2':
            allFields = ['title', 'message']
            break
          default:
            break
        }
        form.validateFields(allFields, fields => {
          if (!fields) {
            const next = key + 1
            if (next >= tabList.length) console.log('end')
            else this.onTabChange(tabList[next].key, `key`)
          }
        })
      }
    })
  }

  buttonsDisabled = () => {
    return new Promise(resolve => {
      const { createCampaign } = this.state
      if (
        ((createCampaign.discount_code_id && createCampaign.image && createCampaign.type) ||
          createCampaign.type === 0) &&
        createCampaign.title &&
        createCampaign.message &&
        createCampaign.segments
      ) {
        resolve(true)
      } else {
        resolve(false)
        notification.error({
          message: 'Error',
          description: 'Debe llenar todos los campos.',
        })
      }
    })
  }

  setSelectCupon = value => {
    const { totalCupons, createCampaign } = this.state
    const cupon = totalCupons.filter(c => c.id === value)
    const segment = {}
    if (cupon[0] && cupon[0].Segments && cupon[0].Segments.length >= 1) {
      segment.id = cupon[0].Segments[0].id
      segment.name = cupon[0].Segments[0].name
    } else {
      notification.error({
        message: 'Error',
        description: 'Este cupon no tiene segmento asignado.',
      })
    }

    createCampaign.discount_code_id = value
    createCampaign.segments = [segment.id]
    this.setState({
      createCampaign,
      segment: [segment.id],
      cuponName: cupon[0].code,
      terms: cupon[0].terms,
      commerce: cupon[0].Commerce,
    })
  }

  setSelectSegmento = value => {
    this.setState(prevState => {
      const { createCampaign } = prevState
      return {
        ...prevState,
        segment: [...value],
        createCampaign: {
          ...createCampaign,
          segments: [...value],
        },
      }
    })
  }

  sendCampaingOpenModal = type => {
    const { createCampaign } = this.state
    this.buttonsDisabled().then(vald => {
      createCampaign.sub_type = type

      if (vald) {
        this.setState({
          sendCampaingModal: true,
          createCampaign,
        })
      }
    })
  }

  sendCampaingModalOk = () => {
    const { createCampaign, editCampaing, typeCampaing } = this.state
    if (!createCampaign.email) {
      notification.error({
        message: 'Error',
        description: 'Debe ingresar un correo electrónico.',
      })
      return
    }

    const emailsArray = createCampaign.email.split(',')
    let validEmails = ''
    emailsArray.forEach(email => {
      const emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i
      if (!emailRegex.test(email)) {
        validEmails = email
      }
    })

    if (validEmails !== '') {
      notification.error({
        message: 'Error',
        description: `El correo ${validEmails} No es valido`,
      })
      return
    }

    this.setState({
      sendCampaingModal: false,
    })

    if (typeCampaing === '1') {
      const data = {
        id: Number(createCampaign.id),
        name: createCampaign.name,
        date: createCampaign.sub_type
          ? `${createCampaign.dateSelect} ${createCampaign.timeSelect}:00`
          : null,
        sub_type: createCampaign.sub_type.toString(),
      }
      const hide = message.loading('Cargando...', 0)
      duplicateCampania(data).then(() => {
        hide()
        const { history } = this.props
        history.push(`/dashboard/campania`)
      })
    } else {
      const bodyFormData = new FormData()
      if (createCampaign.type) {
        bodyFormData.append('image', createCampaign.image[0])
        bodyFormData.append('discount_code_id', createCampaign.discount_code_id)
      }
      bodyFormData.append('name', createCampaign.name)
      bodyFormData.append('type', createCampaign.type)
      bodyFormData.append('title', createCampaign.title)
      bodyFormData.append('message', createCampaign.message)
      bodyFormData.append('email', createCampaign.email)
      bodyFormData.append(
        'date_publish',
        createCampaign.dateSelect
          ? `${createCampaign.dateSelect} ${createCampaign.timeSelect}:00`
          : '',
      )
      bodyFormData.append('sub_type', createCampaign.sub_type)
      createCampaign.segments.map(s => {
        return bodyFormData.append('segments', s)
      })
      // bodyFormData.append('segments', createCampaign.segments)

      if (editCampaing && typeCampaing === '2') {
        bodyFormData.append('id', editCampaing)
        const hide = message.loading('Cargando...', 0)
        editCampania(bodyFormData).then(() => {
          hide()
          const { history } = this.props
          history.push(`/dashboard/campania`)
        })
      } else {
        const hide = message.loading('Cargando...', 0)
        createCampania(bodyFormData).then(() => {
          hide()
          const { history } = this.props
          history.push(`/dashboard/campania`)
        })
      }
    }
  }

  sendCampaingModalCancel = () => {
    this.setState({
      sendCampaingModal: false,
    })
  }

  render() {
    const {
      createCampaign,
      key,
      totalCupons,
      segment,
      cuponName,
      sendCampaingModal,
      imageURL,
      editCampaing,
      typeCampaing,
    } = this.state
    const { form, totalSegmentos } = this.props

    if (!form.getFieldDecorator) {
      return null
    }
    const { Option } = Select

    const validTab1 = () => {
      if (createCampaign.type && createCampaign.discount_code_id && createCampaign.segments) {
        return true
      }
      if (
        createCampaign.type === 0 &&
        createCampaign.segments &&
        createCampaign.segments.length >= 1
      ) {
        return true
      }
      return false
    }

    const validTab2 = () => {
      if (
        createCampaign.title &&
        createCampaign.message &&
        createCampaign.type &&
        !isEmpty(createCampaign.image)
      ) {
        return true
      }
      if (createCampaign.type === 0 && createCampaign.title && createCampaign.message) {
        return true
      }
      return false
    }

    const tabList = [
      {
        key: 'tab1',
        tab: <TabTitle title="Tipo de campaña" check={validTab1()} />,
      },
      {
        key: 'tab2',
        tab: <TabTitle title="Mensaje" check={validTab2()} />,
      },
      {
        key: 'tab3',
        tab: <TabTitle title="Finalizar" check={validTab2() && validTab1()} />,
      },
    ]

    const getInputCupon = () => {
      if (createCampaign.type === 1) {
        return (
          <Form.Item label="Cupón">
            {form.getFieldDecorator('cupon', {
              rules: [{ required: true, message: 'Seleccione un cupón' }],
              initialValue: createCampaign.discount_code_id,
            })(
              <Select style={{ width: '100%' }} onChange={value => this.setSelectCupon(value)}>
                {Object.keys(totalCupons).map(keyCupon => (
                  <Option key={keyCupon} value={totalCupons[keyCupon].id}>
                    {totalCupons[keyCupon].code}
                  </Option>
                ))}
              </Select>,
            )}
          </Form.Item>
        )
      }
      return null
    }

    const getSegmanto = () => {
      const { isCreatingSegments } = this.state
      const modalSegmentoClose = () => {
        this.setState({ isCreatingSegments: false })
      }
      const modalSegmentoOpen = () => {
        this.setState({ isCreatingSegments: true })
      }

      return (
        <>
          <Form.Item label="Segmento">
            {form.getFieldDecorator('segmento', {
              normalize: this.normalizeSegmentos,
              rules: [{ required: true, message: 'Por favor seleccione un segmento' }],
              initialValue: segment,
            })(
              <Select
                allowClear
                mode="multiple"
                style={{ width: '100%' }}
                onChange={value => this.setSelectSegmento(value)}
                disabled={createCampaign.type === 1}
              >
                {totalSegmentos.map(segmento => (
                  <Option value={segmento.id} key={segmento.id}>
                    {segmento.name}
                  </Option>
                ))}
              </Select>,
            )}
            {isCreatingSegments ? (
              <NuevoSegmentoModal closeModal={modalSegmentoClose} onSubmit={modalSegmentoClose} />
            ) : null}
          </Form.Item>
          {createCampaign.type === 0 ? (
            <Form.Item label="Agregar nuevos segmentos">
              <Button onClick={modalSegmentoOpen} style={{ cursor: 'pointer' }}>
                <Icon type="plus" /> Cargar nuevo segmento desde archivo CSV
              </Button>
            </Form.Item>
          ) : null}
        </>
      )
    }

    const setTipeCampaign = value => {
      createCampaign.type = value
      createCampaign.discount_code_id = null
      this.setState({
        segment: [],

        createCampaign,
      })
    }

    const returnForm = keyCard => {
      const tab1Fields = () => {
        if (keyCard === 'tab1') {
          return (
            <>
              <Form.Item label="Tipo de campaña">
                {form.getFieldDecorator('tipoCampana', {
                  rules: [{ required: true, message: 'Seleccione el tipo de campaña' }],
                  initialValue: createCampaign.type,
                })(
                  <Select
                    onChange={value => setTipeCampaign(value)}
                    placeholder="Seleccione el tipo de campaña"
                  >
                    <Option value={0}>Campaña informativa</Option>
                    <Option value={1}>Campaña para cupón</Option>
                  </Select>,
                )}
              </Form.Item>
              {getInputCupon()}
              {getSegmanto()}
            </>
          )
        }
        return null
      }

      const handleInput = e => {
        if (e.target.id === 'title') {
          let title = e.target.value
          title = title.replace(/[#]/g, '')
          if (title.length >= 31) {
            return null
          }
          createCampaign.title = title
          this.setState({
            createCampaign,
          })
        }
        if (e.target.id === 'message') {
          let mensajeL = e.target.value
          mensajeL = mensajeL.replace(/[#]/g, '')
          if (mensajeL.length >= 171) {
            return null
          }
          createCampaign.message = mensajeL
          this.setState({
            createCampaign,
          })
        }
        return null
      }

      const getTitleForm = field => {
        if (field === 'title') {
          return (
            <>
              Título &nbsp;
              <a style={{ color: 'silver' }}>
                ({createCampaign.title ? createCampaign.title.length : 0} / 30 )
              </a>
            </>
          )
        }
        if (field === 'message') {
          return (
            <>
              Mensaje &nbsp;
              <a style={{ color: 'silver' }}>
                ({createCampaign.message ? createCampaign.message.length : 0} / 170 )
              </a>
            </>
          )
        }
        return null
      }

      const uploadImage = e => {
        let valdimage = false
        if (e.target.files && e.target.files[0]) {
          valdimage = true
          if (e.target.files[0].size > 500000) {
            notification.warning({
              message: 'Error',
              description: `Esta imagen excede el peso estipulado (500kb)`,
            })
            valdimage = false
          }

          const nameFile = e.target.files[0] ? e.target.files[0].name : ''
          const reader = new FileReader()
          reader.onload = en => {
            const image = new Image()
            image.src = reader.result
            image.addEventListener('load', () => {
              if (image.width !== 628 && image.height !== 250) {
                valdimage = false
                notification.warning({
                  message: 'Error',
                  description: `Esta imagen tiene ancho(${image.width}px) alto (${image.height}px) y no cuenta con las dimenciones estipuladas. `,
                })
              }
              if (valdimage) {
                this.setState({
                  base64Image: en.target.result,
                  nameFile,
                })
              }
            })
          }
          reader.readAsDataURL(e.target.files[0])
        }
        if (valdimage) {
          createCampaign.image = e.target.files
          this.setState({
            createCampaign,
          })
        }
      }

      const getInputImage = () => {
        const { nameFile } = this.state
        if (createCampaign.type) {
          return (
            <Form.Item
              label={
                <GenericLabel
                  title="Imagen de campaña"
                  content={
                    <>
                      <div>
                        <p>
                          La imagen de campaña aparecera en la
                          <br />
                          parte superior del popup cuando el
                          <br />
                          usuario abra la aplicación.
                        </p>
                        <p>
                          Dimensiones: 628 x 250 px
                          <br />
                          Peso máx: 500kb
                        </p>
                      </div>
                    </>
                  }
                />
              }
            >
              {form.getFieldDecorator(
                'image',
                {},
              )(
                <>
                  {nameFile === '' ? 'Carga archivo .jpg o .png' : nameFile} &nbsp;&nbsp;
                  <label className="btn custom-input-btn">
                    <input
                      type="file"
                      accept="image/png, .jpeg, .jpg"
                      onChange={e => uploadImage(e)}
                      id="upload"
                      name="photo"
                      style={{ display: 'none' }}
                    />
                    <i className="fa fa-cloud-upload" />{' '}
                    {nameFile === '' ? 'Subir archivo' : 'Cambiar archivo'}
                  </label>
                </>,
              )}
            </Form.Item>
          )
        }
        return null
      }

      const tab2Fields = () => {
        if (keyCard === 'tab2') {
          return (
            <>
              <Form.Item label={getTitleForm('title')}>
                {form.getFieldDecorator('title', {
                  rules: [{ required: true, message: 'Porfavor ingrese título' }],
                  initialValue: createCampaign.title,
                })(<Input onChange={handleInput} maxLength="30" />)}
              </Form.Item>
              <Form.Item label={getTitleForm('message')}>
                {form.getFieldDecorator('message', {
                  rules: [{ required: true, message: 'Porfavor ingrese un mensaje' }],
                  initialValue: createCampaign.message,
                })(
                  <TextArea
                    onChange={handleInput}
                    placeholder="Mensaje..."
                    size="default"
                    maxLength="170"
                  />,
                )}
              </Form.Item>
              {getInputImage()}
            </>
          )
        }
        return null
      }

      const viewImagePush = () => {
        if (createCampaign.title && createCampaign.message) {
          return (
            <div className="card chartCard">
              <div className="card chartCardNotification">
                <div className="chartCard__amount">
                  <img className="imgNotification" src="resources/favicon.ico" alt="check" />
                  <p className="messages">MESSAGES</p>
                  <p className="messageNow">now</p>
                </div>
                <div className="title">
                  <b>{createCampaign.title}</b>
                </div>
                <div className="message">{createCampaign.message}</div>
              </div>
            </div>
          )
        }
        return null
      }

      const viewImagePushApp = () => {
        const { base64Image } = this.state

        const returnButtons = () => {
          if (createCampaign.type) {
            return (
              <div align="center">
                <div className="card chartCardButton2 px-3 text-left">
                  <p className="tex1">
                    <b>Usar cupón</b>
                  </p>
                </div>
                <div className="card chartCardButton px-3 text-left" align="center">
                  <p className="tex2">
                    <b>Eliminar</b>
                  </p>
                </div>
                <div className="card chartCardButton3" align="center">
                  <p className="tex2">
                    <b>Ver términos y condiciones</b>
                  </p>
                </div>
              </div>
            )
          }
          return null
        }
        if (createCampaign.title && createCampaign.message) {
          return (
            <div className="card chartCard cardApp">
              <div className="card chartCardNotification">
                {createCampaign.type ? (
                  <div>
                    <img className="imgApp" src={base64Image || imageURL} alt="" />
                  </div>
                ) : null}
                <div className="titleApp" align="center">
                  <b>{createCampaign.title}</b>
                </div>
                <div className="messageApp" align="center">
                  {createCampaign.message}
                </div>
                {returnButtons()}
              </div>
            </div>
          )
        }
        return null
      }

      const viewTerminosYcondiciones = () => {
        const { terms } = this.state
        if (terms) {
          return (
            <div className="card chartCard cardApp">
              <div className="card chartCardNotification">
                <div className="chartTC">
                  <p className="titleTC">
                    <Icon type="left" />
                    &nbsp; &nbsp; &nbsp; TÉRMINOS Y CONDICIONES
                  </p>
                </div>
                <div>
                  <p className="tyc">{terms}</p>
                </div>
              </div>
            </div>
          )
        }
        return null
      }

      const tab3Fields = () => {
        if (keyCard === 'tab3') {
          const { commerce, nameFile } = this.state
          const cuponesView = () => {
            if (cuponName) {
              return (
                <div className="row">
                  <div className="col-3">
                    <b>Cupón</b>
                  </div>
                  <div className="col-9">
                    <Button type="link" onClick={this.toggleDesc}>
                      <u>{cuponName || ''}</u>
                    </Button>
                  </div>
                  <br />
                  <div className="col-12" />
                </div>
              )
            }
            return null
          }
          const RedireccionamientoView = () => {
            const customPanelStyle = {
              borderRadius: 4,
              marginBottom: 0,
              border: 0,
              // paddingLeft: 0,
              overflow: 'hidden',
            }
            if (commerce && commerce.length >= 1) {
              return (
                <Collapse bordered={false} expandIconPosition="right">
                  <Collapse.Panel
                    style={customPanelStyle}
                    header={
                      <div className="row">
                        <div className="col-3 mb-3 pl-0">
                          <b>Redireccionamiento:</b>
                        </div>
                        <div className="col-9 mb-3">{`Seleccionados (${commerce.length})`}</div>
                      </div>
                    }
                    key="1"
                  >
                    {Object.keys(commerce).map(c => (
                      <p key={c}>Comercio: {commerce[c].name}</p>
                    ))}
                  </Collapse.Panel>
                </Collapse>
              )
            }
            return null
          }
          return (
            <>
              {cuponesView()}
              {RedireccionamientoView()}
              <div className="row">
                <div className="col-3">
                  <b>Segmento</b>
                </div>
                <div className="col-9">
                  <CuponSegmentsToResume
                    rawSegments={totalSegmentos}
                    segments={segment}
                    showLabel={false}
                  />
                </div>
                <div className="col-12">
                  <br />
                </div>
                <div className="col-3">
                  <b>Título</b>
                </div>
                <div className="col-9">{createCampaign.title}</div>
                <div className="col-12">
                  <br />
                </div>
                <div className="col-3">
                  <b>Mensaje</b>
                </div>
                <div className="col-9">{createCampaign.message}</div>
                <div className="col-12">
                  <br />
                </div>
                <div className="col-3">
                  <GenericLabel
                    title="Imagen de campaña"
                    content={
                      <>
                        <div>
                          <p>
                            La imagen de camapa aparecera en la
                            <br />
                            parte superior del popup cuando el
                            <br />
                            usuario abra la aplicación.
                          </p>
                          <p>
                            Dimensiones: 628 x 250 px
                            <br />
                            Peso máx: 500kb
                          </p>
                        </div>
                      </>
                    }
                  />
                </div>
                <div className="col-9">{nameFile || imageURL}</div>
                <div className="col-12">
                  <br />
                </div>
                <div className="col-3">
                  <GenericLabel
                    title="Previsualización del push"
                    content={
                      <>
                        <div>
                          <p>
                            El push notification mostrará el titulo y
                            <br />
                            el mensaje de la campaña.
                          </p>
                          <p>
                            Los push notifications pueden verse
                            <br />
                            diferentes según el dispositivo (IOS o
                            <br />
                            Android).
                          </p>
                        </div>
                      </>
                    }
                  />
                </div>
                <div className="col-9">{viewImagePush()}</div>
                <div className="col-12">
                  <br />
                </div>
                <div className="col-3">
                  <GenericLabel
                    title="Previsualización del push en el app"
                    content={
                      <>
                        <div>
                          <p>
                            El popup se desplegará cuando el usuario
                            <br />
                            abra la aplicación. Contiene el titulo,
                            <br />
                            mensaje e imagen de la Campaña.
                          </p>
                        </div>
                      </>
                    }
                  />
                </div>
                <div className="col-9">{viewImagePushApp()}</div>
                <div className="col-12">
                  <br />
                </div>
                <div className="col-3">
                  <GenericLabel
                    title="Previsualización del Términos y condiciones"
                    content={
                      <>
                        <div>
                          <p>
                            El usuario sería redirigido a una página híbrida
                            <br />
                            en donde encontrará los términos y condiciones
                            <br />
                            asociados a la Campaña.
                          </p>
                        </div>
                      </>
                    }
                  />
                </div>
                <div className="col-9">{viewTerminosYcondiciones()}</div>
                <div className="col-12">
                  <br />
                </div>
              </div>
            </>
          )
        }
        return null
      }
      return (
        <>
          {tab1Fields()}
          {tab2Fields()}
          {tab3Fields()}
        </>
      )
    }

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 20 },
      },
    }

    const getOptionsButtons = keyCard => {
      const { history } = this.props
      if (keyCard === 'tab3') {
        if (editCampaing && typeCampaing === '2') {
          return (
            <>
              <Popconfirm
                title="¿Esta seguro de descartar?"
                onConfirm={() => history.push(`/dashboard/campania`)}
                okText="Si"
                cancelText="No"
              >
                <Button type="link" className="gray mr-3" onClick={this.onDiscard}>
                  <u>Descartar</u>
                </Button>
              </Popconfirm>
              <Button
                type="primary"
                onClick={() => this.sendCampaingOpenModal(createCampaign.sub_type)}
              >
                Guardar cambios
              </Button>
            </>
          )
        }
        return (
          <Button.Group size="big">
            <Popconfirm
              title="¿Esta seguro de descartar?"
              onConfirm={() => history.push(`/dashboard/campania`)}
              okText="Si"
              cancelText="No"
            >
              <Button type="link" className="gray mr-3" onClick={this.onDiscard}>
                <u>Descartar</u>
              </Button>
            </Popconfirm>
            <Button onClick={() => this.sendCampaingOpenModal(0)}>Enviar ahora</Button>
            &nbsp;&nbsp;
            <Button type="primary" onClick={() => this.sendCampaingOpenModal(1)}>
              Programar
            </Button>
          </Button.Group>
        )
      }
      return (
        <Button.Group size="big">
          <Popconfirm
            title="¿Esta seguro de descartar?"
            onConfirm={() => history.push(`/dashboard/campania`)}
            okText="Si"
            cancelText="No"
          >
            <Button type="link" className="gray mr-3" onClick={this.onDiscard}>
              <u>Descartar</u>
            </Button>
          </Popconfirm>
          <Button type="primary" onClick={e => this.onSubmit(e, keyCard, tabList)}>
            Continuar
          </Button>
        </Button.Group>
      )
    }
    const changeEmail = e => {
      const email = e.target.value

      createCampaign.email = email
      this.setState({
        createCampaign,
      })
    }

    const getFieldsModal = () => {
      const onChangeDataPicker = (_, dateString) => {
        createCampaign.dateSelect = dateString
        this.setState({
          createCampaign,
        })
      }
      const onChange = (_, timeString) => {
        createCampaign.timeSelect = timeString
        this.setState({
          createCampaign,
        })
      }
      if (createCampaign.sub_type) {
        const { dateExist, hoursExist } = this.state
        return (
          <>
            <div className="row">
              <div className="col-6">
                <p>
                  <b>Fecha:</b>
                </p>
                <DatePicker
                  locale="es"
                  placeholder={dateExist !== '' ? 'Cambiar la fecha' : 'Seleccione la fecha'}
                  defaultValue={dateExist !== '' ? moment(dateExist, dateFormat) : false}
                  onChange={onChangeDataPicker}
                  style={{ width: '100%' }}
                />
              </div>
              <div className="col-6">
                <p>
                  <b>Hora:</b>
                </p>
                <TimePicker
                  locale="es"
                  placeholder={hoursExist !== '' ? 'Cambiar la hora' : 'Seleccione la hora'}
                  defaultValue={hoursExist !== '' ? moment(hoursExist, format) : false}
                  format={format}
                  onChange={onChange}
                  style={{ width: '100%' }}
                />
              </div>
            </div>
            <br />
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
              has been the industry standard dummy text ever since
            </p>
          </>
        )
      }
      return (
        <>
          <p>¿Seguro deseas enviar la campaña ahora?</p>
        </>
      )
    }

    const getInputEmails = () => {
      if (typeCampaing !== '1') {
        return (
          <>
            <p>Notificar cuando se envíe la campaña al (o los) siguiente correo:</p>
            <p>
              <b>Correo electrónico</b>
            </p>
            <Input
              placeholder="Separe los correos con comas ','"
              value={createCampaign.email}
              onChange={changeEmail}
            />
          </>
        )
      }
      return null
    }

    const { loading } = this.state

    return (
      <>
        <Authorize
          roles={[roles.BONOS_ADMIN.NAME, roles.BONOS_ANALIST.NAME]}
          redirect
          to="/dashboard/campania"
        >
          <Helmet title="Crear campaña" />
          <Modal
            title={createCampaign.sub_type ? 'Programar campaña' : 'Enviar campaña'}
            visible={sendCampaingModal}
            onOk={this.sendCampaingModalOk}
            onCancel={this.sendCampaingModalCancel}
            okText="Enviar"
            cancelText="Cancelar"
          >
            {getFieldsModal()}
            {getInputEmails()}
          </Modal>

          <div className="mb-5">
            <Spin spinning={loading} tip="Cargando...">
              <Card
                style={{ width: '100%' }}
                title={typeCampaing !== '0' ? 'Editar campaña' : 'Nueva campaña'}
                tabList={tabList}
                activeTabKey={key}
                onTabChange={tab => {
                  this.onTabChange(tab, 'key')
                }}
              >
                <Form {...formItemLayout} layout="vertical" className="mb-3" hideRequiredMark>
                  {returnForm(key)}
                </Form>

                <hr />
                <div className="text-right">{getOptionsButtons(key)}</div>
              </Card>
            </Spin>
          </div>
          {console.log(this.state)}
        </Authorize>
      </>
    )
  }
}

export default WizzardCampania
