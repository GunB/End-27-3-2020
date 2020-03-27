import React from 'react'
import { Row, Col, Empty } from 'antd'
import { formatCurrency } from 'utils/numberFormat'
import moment from 'moment'

const ResumeData = props => {
  const { statusDisplay, infoSummary, facturaDB } = props
  const displayResume = statusDisplay === 2 ? 'display-none' : ''

  const no_data = (
    <span style={{ textAlign: 'center', width: '100%', display: 'block' }}>
      <b>Ingresa la información de pago y usuario</b>
    </span>
  )
  if (infoSummary && infoSummary.totalPay) {
    return (
      <Row>
        <div className={`${displayResume} commerce__resumeData container--t`}>
          <Row type="flex" justify="space-between">
            <Col>
              <h2 className="fc-gray bold">Pago</h2>
            </Col>
            <Col>
              <h2 className="fc-gray bold">$ {formatCurrency(infoSummary.totalPay)}</h2>
            </Col>
          </Row>
          <Row type="flex" align="middle" justify="space-between" className="bbottom">
            <Col md={12} lg={12} xl={12}>
              <p>
                <strong>Identificador:</strong> <span>{infoSummary.numberPaper}</span>
              </p>
              <p>
                <strong>Concepto:</strong> <span>{infoSummary.concept}</span>
              </p>
            </Col>
          </Row>
        </div>
      </Row>
    )
  }
  if (facturaDB && facturaDB.ticket_number) {
    return (
      <Row>
        <div className={`${displayResume} commerce__resumeData container--t`}>
          <Row type="flex" justify="space-between">
            <Col>
              <h2 className="fc-gray bold">Pago</h2>
            </Col>
            <Col>
              <h2 className="fc-gray bold">$ {formatCurrency(facturaDB.amount)}</h2>
            </Col>
          </Row>
          <Row type="flex" align="middle" justify="space-between" className="bbottom">
            <Col md={12} lg={12} xl={12}>
              <p>
                <strong>Identificador:</strong> <span>{facturaDB.reference}</span>
              </p>
              <p>
                <strong>Concepto:</strong> <span>{facturaDB.concept}</span>
              </p>
              <p>
                <strong>Vencimiento:</strong>{' '}
                <span>{moment(facturaDB.date_end, 'YYYY-MM-DD').format('DD/MM/YYYY')}</span>
              </p>
            </Col>
          </Row>
          <Row className="container--t">
            <Col>
              <h3 className="fc-gray bold">{facturaDB.name}</h3>
              <p>
                <strong>Email:</strong> <span>{facturaDB.email}</span>
              </p>
              <p>
                <strong>Teléfono:</strong> <span>{facturaDB.phone}</span>
              </p>
            </Col>
          </Row>
        </div>
      </Row>
    )
  }
  return (
    <div className={`${displayResume} commerce__resumeData container--t centering-vertical`}>
      <Empty image={Empty.PRESENTED_IMAGE_DEFAULT} description={no_data} />
    </div>
  )
}

export default ResumeData
