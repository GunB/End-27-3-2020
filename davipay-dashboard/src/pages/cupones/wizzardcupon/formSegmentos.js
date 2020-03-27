import React from 'react'
import { connect } from 'react-redux'
import { Form, Select, Button, Icon } from 'antd'
import { segmentosSelectedToTree, segmentosTreeToCupon } from 'factories/segmentos'
import { cleanSegments, getAsyncSegments } from 'redux/segments/actions'
import NuevoSegmentoModal from 'components/CustomComponents/nuevoSegmentoModal'
import CardOpaque from 'components/CustomComponents/CardOpaque'

const mapStateToProps = (state, ownProps) => ({
  segmentos: state.segments,
  cuponSegmentos: segmentosSelectedToTree(ownProps.cupon),
})

const dispatchToProps = dispatch => ({
  getSegments: () => {
    dispatch(getAsyncSegments())
  },
  cleanSyncSegments: () => {
    dispatch(cleanSegments())
  },
})

@connect(
  mapStateToProps,
  dispatchToProps,
)
@Form.create()
class FormSegmentos extends React.Component {
  state = {
    isCreatingSegments: false,
  }

  componentDidMount() {
    const { cleanSyncSegments, getSegments } = this.props
    cleanSyncSegments()
    getSegments()
  }

  onSubmit = event => {
    event.preventDefault()
    const { form, onSubmit, activeTab, tabList } = this.props
    form.validateFields((error, values) => {
      if (error) {
        console.log(error)
      } else {
        const resp = { segments: segmentosTreeToCupon(values.segmento) }
        onSubmit(resp, { activeTab, tabList })
      }
    })
  }

  onDiscard = () => {
    const { onDiscard } = this.props
    onDiscard()
  }

  normalizeSegmentos = (value = []) => {
    const todos = [1]
    if (value.indexOf(1) >= 0) {
      return todos
    }
    return value
  }

  placeButtons = () => {
    return (
      <>
        <hr />
        <div className="text-right">
          <Button.Group size="big">
            <Button type="link" className="gray mr-3" onClick={this.onDiscard}>
              <u>Descartar</u>
            </Button>
            <Button type="primary" onClick={this.onSubmit}>
              Continuar
            </Button>
          </Button.Group>
        </div>
      </>
    )
  }

  agregarSegmento = () => {
    console.log(this.state)
    this.setState({ isCreatingSegments: true })
  }

  closeModal = () => {
    this.setState({ isCreatingSegments: false })
  }

  modalNuevoSegmento = () => {
    return <NuevoSegmentoModal closeModal={this.closeModal} onSubmit={this.closeModal} />
  }

  render() {
    const { form, cuponSegmentos, segmentos } = this.props
    const { Option } = Select
    const { isCreatingSegments } = this.state
    return (
      <>
        <Form layout="vertical" className="mb-3 row">
          <div className="col-8">
            <p>
              Los cupones segmentados solo se habilitarán para los usuarios que pertenezcan al
              segmento.
            </p>

            {isCreatingSegments ? this.modalNuevoSegmento() : null}

            <Form.Item label="Seleccionar segmento">
              {form.getFieldDecorator('segmento', {
                initialValue: cuponSegmentos,
                normalize: this.normalizeSegmentos,
                rules: [{ required: true, message: 'Porfavor seleccione segmentos' }],
              })(
                <Select
                  allowClear
                  mode="multiple"
                  onChange={this.onChangeSegments}
                  style={{ width: '100%' }}
                  dropdownRender={menu => <div>{menu}</div>}
                >
                  {segmentos.map(segmento => (
                    <Option value={segmento.id} key={segmento.id}>
                      {segmento.name}
                    </Option>
                  ))}
                </Select>,
              )}
            </Form.Item>
            <Form.Item>
              <Button onClick={this.agregarSegmento} style={{ padding: '8px', cursor: 'pointer' }}>
                <Icon type="plus" /> Cargar nuevo segmento desde archivo CSV
              </Button>
            </Form.Item>
          </div>
          <div className="col-4">
            <CardOpaque>
              <h4>¿Quieres segmentar el cupón para usuarios específicos?</h4>
              <div>
                Los cupones segmentados solo se habilitarán para los usuarios que pertenezcan al
                segmento.
              </div>
            </CardOpaque>
          </div>
        </Form>
        {this.placeButtons()}
      </>
    )
  }
}

export default FormSegmentos
