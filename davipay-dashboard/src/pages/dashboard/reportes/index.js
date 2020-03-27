import React from 'react'
import { Helmet } from 'react-helmet'
import { Row, Col, Form, Select, Button, Modal, DatePicker } from 'antd'
import moment from 'moment'
import JsonTesting from 'components/CustomComponents/JsonTesting'
import PageBase from 'components/CustomComponents/pageBase'
import GenericLabel from 'components/CustomComponents/genericLabel'
import Authorize from 'components/LayoutComponents/Authorize'
import { getReport } from 'services/reports'
import ROLES from '../../../constant/roles'

@Form.create()
class ReportesDashboard extends React.Component {
  state = {
    loading: false,
  }

  onToggleLoading = () => {
    this.setState(prev => ({
      loading: !prev.loading,
    }))
  }

  onSubmit = event => {
    event.preventDefault()
    const { form } = this.props
    form.validateFields((error, values) => {
      if (error) {
        console.log(error)
      } else {
        this.onToggleLoading()
        const body = {
          type_report: values.type_report,
          to_date: values.periodo[1].format('YYYY-MM-DD HH:mm:ss'),
          from_date: values.periodo[0].format('YYYY-MM-DD HH:mm:ss'),
        }
        getReport(body)
          .then(d => {
            const { report } = d
            this.onToggleLoading()
            Modal.info({
              content: (
                <>
                  <h4>Dascargar reporte</h4>
                  <a href={report} target="blank">
                    Puede descargar el CSV con el reporte haciendo click sobre este mensaje
                  </a>
                  <JsonTesting dataSource={values} />
                  <JsonTesting dataSource={d} />
                </>
              ),
            })
          })
          .catch(d => {
            this.onToggleLoading()
            console.log(d)
          })
      }
    })
  }

  render() {
    const { form } = this.props
    const { onSubmit } = this
    const { loading } = this.state

    return (
      <>
        <Authorize roles={[ROLES.RETOS_ADMIN.NAME, ROLES.RETOS_ANALIST.NAME]} redirect to="/">
          <Helmet title="Reportes" />
          <PageBase title="Reportes" loading={loading}>
            <h4>Reportes</h4>
            <hr />
            <Row type="flex" align="middle" gutter={24}>
              <Col span={16}>
                <Form layout="vertical" className="mb-3" hideRequiredMark>
                  <Form.Item
                    label={
                      <GenericLabel title="Tipo de reporte" content="Seleccionar tipo de reporte" />
                    }
                  >
                    {form.getFieldDecorator('type_report', {
                      rules: [
                        { required: true, message: 'Porfavor seleccione el tipo de reporte' },
                      ],
                    })(
                      <Select style={{ width: '100%' }}>
                        <Select.Option value="5">Reporte de bonos</Select.Option>
                        <Select.Option value="4">Reporte de Davipuntos</Select.Option>
                        <Select.Option value="0">Reporte de usuarios</Select.Option>
                      </Select>,
                    )}
                  </Form.Item>
                  <Form.Item label="Periodo">
                    {form.getFieldDecorator('periodo', {
                      initialValue: [moment().subtract(1, 'month'), moment()],
                      rules: [{ required: true, message: 'Porfavor inrese el período' }],
                    })(<DatePicker.RangePicker style={{ width: '100%' }} />)}
                  </Form.Item>
                </Form>
              </Col>
              <Col span={8} />
            </Row>
            <>
              <hr />
              <div className="text-right">
                <Button.Group size="big">
                  <Button type="primary" onClick={onSubmit}>
                    Generar reporte
                  </Button>
                </Button.Group>
              </div>
            </>
          </PageBase>
        </Authorize>
      </>
    )
  }
}

export default ReportesDashboard
