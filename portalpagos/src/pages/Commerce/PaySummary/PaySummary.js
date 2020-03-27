import React from 'react'
import { Row, Col, Button } from 'antd'
import DiffConcept from './DiffConcept/DiffConcept'

const PaySummary = props => {
  const { transaction, commerce } = props
  return (
    <>
      <div className="bg-white shadow-card container-content container--y">
        <Row className="bbottom">
          <DiffConcept transaction={transaction} />
        </Row>
        <Row>
          <Col className="bbottom pd-10">
            <h3 className="bold fs-secondary fc-gray">{commerce ? commerce.public_name : ''}</h3>
            <p>
              <strong>Dirección:</strong> <span>{commerce ? commerce.public_address : ''}</span>
            </p>
            <p>
              <strong>Teléfono:</strong> <span>{commerce ? commerce.public_phone : ''}</span>
            </p>
          </Col>
        </Row>
        <Row>
          <Col className="pd-10">
            <h3 className="bold fs-secondary fc-gray">{transaction ? transaction.name : ''}</h3>
            <p>
              <strong>Email:</strong> <span>{transaction ? transaction.email : ''}</span>
            </p>
            <p>
              <strong>Teléfono:</strong> <span>{transaction ? transaction.phone : ''}</span>
            </p>
            <p>
              <strong>Identificador:</strong>{' '}
              <span>{transaction ? transaction.payment_reference : ''}</span>
            </p>
          </Col>
        </Row>
      </div>
      <div className="container--t">
        <Button
          onClick={() => {
            window.print()
          }}
          style={{ marginRight: '15px' }}
        >
          Imprimir
        </Button>
        <Button className="bg-primary-color hv-link">
          <a href="/#/categorias">Finalizar</a>
        </Button>
      </div>
    </>
  )
}

export default PaySummary
