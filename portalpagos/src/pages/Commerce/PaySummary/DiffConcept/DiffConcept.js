import React from 'react'
import { Col, Button } from 'antd'

const DiffConcept = props => {
  const { transaction } = props
  return (
    <>
      <Col className=" pd-10" sm={20} md={20}>
        <h3 className="bold fs-secondary fc-gray">
          Resumen de Pago: {transaction ? transaction.payment_reference : ''}
        </h3>
        <p>
          <strong>Concepto:</strong> <span>{transaction ? transaction.concept : ''}</span>
        </p>
        <p>
          <strong>Monto:</strong> <span>$ {transaction ? transaction.amount : ''}</span>
        </p>
        <p>
          <strong>Estado :</strong> <span>{transaction ? transaction.status : ''}</span>
        </p>
        <p>
          <strong>Fecha de pago:</strong> <span>{transaction ? transaction.payment_date : ''}</span>
        </p>
      </Col>
      <Col className=" pd-10" sm={4} md={4}>
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
      </Col>
    </>
  )
}

export default DiffConcept
