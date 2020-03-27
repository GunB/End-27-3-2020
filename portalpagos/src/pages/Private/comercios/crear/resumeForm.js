import React, { Component } from 'react'
import { Row, Col } from 'antd'
import ViewButtonWizzardHandler from 'components/CustomComponent/SimpleWizzard/ViewButtonWizzardHandler'
import moment from 'moment'
import { formatCurrency } from 'utils/numberFormat'
import { connect } from 'react-redux'

const stateToProps = ({ general, commerce }) => ({
  cities: general.cities || [],
  paymentMethods: general.paymentMethods || [],
  documents: general.commerceDocuments || [],
  typeTickets: general.typeTickets || [],
  paymentCycles: general.paymentCycle || [],
  typeServices: general.typeService || [],
  typeAccounts: general.typeAccount || [],
  commerceCategory: commerce.categories || [],
})

@connect(stateToProps)
class ResumeForm extends Component {
  state = {}

  onSubmit = event => {
    event.preventDefault()
    const { onSubmit, dataSource } = this.props
    onSubmit(dataSource)
  }

  getNameCatalog = (id, catalog) => {
    let name = ''
    catalog.forEach(element => {
      if (element.id === id) {
        name = element.name
      }
    })
    return name
  }
  render() {
    const {
      dataSource,
      schemaSource,
      cities,
      documents,
      paymentCycles,
      typeServices,
      typeAccounts,
      commerceCategory,
      typeTickets,
    } = this.props
    const { onSubmit } = this
    const gutterRow = [16, 8]
    const styleRow = { background: '#E8E8E8' }

    return (
      <>
        <br />
        <br />
        <div className="card">
          <div className="card__img">
            <img src={dataSource.commerce_image} alt="commerce" className="w-100 bradius-sm" />
          </div>
          <div className="card__body">
            <h3 className="reset-margin bold fs-secondary">{dataSource.public_name}</h3>
            <p className="reset-margin">{dataSource.public_phone}</p>
            <p className="reset-margin">
              {`${dataSource.public_address}, ${this.getNameCatalog(dataSource.city, cities)}`}
            </p>
          </div>
        </div>
        <br />
        <br />
        <h3>Comercio</h3>
        <br />
        <Row gutter={gutterRow}>
          <Col md={6} sm={12}>
            Ciudad
          </Col>
          <Col md={18} sm={12}>
            {this.getNameCatalog(dataSource.city, cities)}
          </Col>
        </Row>
        <Row gutter={gutterRow} style={styleRow}>
          <Col md={6} sm={12}>
            Tipo y número de documento
          </Col>
          <Col md={18} sm={12}>
            {`${this.getNameCatalog(dataSource.tipoDoc, documents)} : ${dataSource.numDoc}`}
          </Col>
        </Row>
        <Row gutter={gutterRow}>
          <Col md={6} sm={12}>
            Razón social
          </Col>
          <Col md={18} sm={12}>
            {dataSource.fiscal_name}
          </Col>
        </Row>
        <Row gutter={gutterRow} style={styleRow}>
          <Col md={6} sm={12}>
            Nombre comercial
          </Col>
          <Col md={18} sm={12}>
            {dataSource.trade_name}
          </Col>
        </Row>
        <Row gutter={gutterRow}>
          <Col md={6} sm={12}>
            Teléfono principal
          </Col>
          <Col md={18} sm={12}>
            {dataSource.phone}
          </Col>
        </Row>
        <Row gutter={gutterRow} style={styleRow}>
          <Col md={6} sm={12}>
            Dirección administrativa
          </Col>
          <Col md={18} sm={12}>
            {dataSource.address}
          </Col>
        </Row>
        <Row gutter={gutterRow}>
          <Col md={6} sm={12}>
            Tipo de taquilla
          </Col>
          <Col md={18} sm={12}>
            {this.getNameCatalog(dataSource.ticket_type, typeTickets)}
          </Col>
        </Row>
        <Row gutter={gutterRow} style={styleRow}>
          <Col md={6} sm={12}>
            Contactos
          </Col>
          <Col md={18} sm={12}>
            {dataSource.contactos.map(key => (
              <p key={`contacto-${key}`}>
                {`${dataSource.names[key]}, ${dataSource.areas[key]}, ${dataSource.telefonos[key]}, ${dataSource.correos[key]}`}
              </p>
            ))}
          </Col>
        </Row>
        <br />
        <br />
        <h3>Contrato</h3>
        <br />
        <Row gutter={gutterRow}>
          <Col md={6} sm={12}>
            Fecha de contrato
          </Col>
          <Col md={18} sm={12}>
            {moment(dataSource.agreement.date).format('DD/MM/YYYY')}
          </Col>
        </Row>
        <Row gutter={gutterRow} style={styleRow}>
          <Col md={6} sm={12}>
            Código de venta
          </Col>
          <Col md={18} sm={12}>
            {dataSource.agreement.code}
          </Col>
        </Row>
        <Row gutter={gutterRow}>
          <Col md={6} sm={12}>
            Ciclo de pago
          </Col>
          <Col md={18} sm={12}>
            {this.getNameCatalog(dataSource.agreement.payment_cycle, paymentCycles)}
          </Col>
        </Row>
        <Row gutter={gutterRow} style={styleRow}>
          <Col md={6} sm={12}>
            Tipo y número de cuenta
          </Col>
          <Col md={18} sm={12}>
            {`${this.getNameCatalog(dataSource.agreement.account_type, typeAccounts)}: ${
              dataSource.agreement.account_number
            }`}
          </Col>
        </Row>
        <Row gutter={gutterRow}>
          <Col md={6} sm={12}>
            Titular de la cuenta
          </Col>
          <Col md={18} sm={12}>
            {dataSource.agreement.account_name}
          </Col>
        </Row>
        <Row gutter={gutterRow} style={styleRow}>
          <Col md={6} sm={12}>
            Correo de notificación de pagos
          </Col>
          <Col md={18} sm={12}>
            {dataSource.agreement.email}
          </Col>
        </Row>
        <Row gutter={gutterRow}>
          <Col md={6} sm={12}>
            Tipo de servicios
          </Col>
          <Col md={18} sm={12}>
            {this.getNameCatalog(dataSource.agreement.service_type, typeServices)}
          </Col>
        </Row>
        <Row gutter={gutterRow} style={styleRow}>
          <Col md={6} sm={12}>
            Cantidad de transacciones
          </Col>
          <Col md={18} sm={12}>
            {dataSource.agreement.number_transactions}
          </Col>
        </Row>
        <Row gutter={gutterRow}>
          <Col md={6} sm={12}>
            Cantidad mínima de transacciones
          </Col>
          <Col md={18} sm={12}>
            {dataSource.agreement.min_number_transactions}
          </Col>
        </Row>
        <Row gutter={gutterRow} style={styleRow}>
          <Col md={6} sm={12}>
            Valor unitario (COP)
          </Col>
          <Col md={18} sm={12}>
            ${formatCurrency(dataSource.agreement.transaction_amount)}
          </Col>
        </Row>
        <br />
        <br />
        <h3>Documentos</h3>
        <br />
        <Row gutter={gutterRow}>
          <Col md={6} sm={12}>
            RUT
          </Col>
          <Col md={18} sm={12}>
            {dataSource.document_rut_name}
          </Col>
        </Row>
        <Row gutter={gutterRow} style={styleRow}>
          <Col md={6} sm={12}>
            Cámara de comercio
          </Col>
          <Col md={18} sm={12}>
            {dataSource.document_chamber_commerce_name}
          </Col>
        </Row>
        <Row gutter={gutterRow}>
          <Col md={6} sm={12}>
            Carta a redes
          </Col>
          <Col md={18} sm={12}>
            {dataSource.document_network_name}
          </Col>
        </Row>
        <Row gutter={gutterRow} style={styleRow}>
          <Col md={6} sm={12}>
            Central antifraude
          </Col>
          <Col md={18} sm={12}>
            {dataSource.document_anti_fraud_name}
          </Col>
        </Row>
        <Row gutter={gutterRow}>
          <Col md={6} sm={12}>
            Documento representante legal
          </Col>
          <Col md={18} sm={12}>
            {dataSource.document_legal_name}
          </Col>
        </Row>
        <br />
        <br />
        <h3>Configuración</h3>
        <br />
        <Row gutter={gutterRow}>
          <Col md={6} sm={12}>
            Campos del formulario
          </Col>
          <Col md={18} sm={12}>
            <p>Número (Hoja, pedido, factura u orden)</p>
            <p>Total a pagar</p>
            <p>Concepto</p>
            {dataSource.keyExtraData.map(key => (
              <p key={`extra-${key}`}>{dataSource.extraDataName[key]}</p>
            ))}
          </Col>
        </Row>
        <Row gutter={gutterRow} style={styleRow}>
          <Col md={6} sm={12}>
            Categoria del comercio
          </Col>
          <Col md={18} sm={12}>
            {this.getNameCatalog(dataSource.category, commerceCategory)}
          </Col>
        </Row>
        <Row gutter={gutterRow}>
          <Col md={6} sm={12}>
            Conceptos de pago
          </Col>
          <Col md={18} sm={12}>
            {dataSource.keyPaymentConcept.map(key => (
              <p key={`concepto-${key}`}>{dataSource.paymentConcept[key]}</p>
            ))}
          </Col>
        </Row>
        <Row gutter={gutterRow} style={styleRow}>
          <Col md={6} sm={12}>
            Pago abierto
          </Col>
          <Col md={18} sm={12}>
            {dataSource.free_payment_concept === '1' ? 'Si' : 'No'}
          </Col>
        </Row>
        <ViewButtonWizzardHandler
          urlBack={schemaSource.urlBack}
          onSubmit={onSubmit}
          strNext="Finalizar"
        />
      </>
    )
  }
}

export default ResumeForm
