/* eslint-disable react/jsx-no-target-blank */
import React from 'react'
import { Row, Col, Layout, Button } from 'antd'
import logo from 'assets/img/logo.png'
import { Link } from 'react-router-dom'

const CustomHeader = () => {
  const headerLogo = () => (
    <Row type="flex" justify="space-between">
      <Col xs={12}>
        <Link to="/">
          <img src={logo} alt="logo" className="w-100" />
        </Link>
      </Col>
      <Col xs={12}>
        <Button type="link" className="fc-inverse">
          <b>Pagos virtuales</b>
        </Button>
      </Col>
    </Row>
  )

  // const menuQuery = { sm: 12 }
  const linkClass = {
    className: 'fc-inverse--link',
    target: '_blank',
    rel: 'noopener noreferrer',
  }
  const headerMenu = () => (
    <Row type="flex" justify="space-between">
      <Col>
        <a
          href="https://psedian.pse.com.co/PSEHostingUI/DIANTicketOffice.aspx?Banco=1051"
          {...linkClass}
        >
          Impuestos
        </a>
      </Col>
      <Col>
        <a href="https://servicio.nuevosoi.com.co/soi/index.do?codigoBanco=51" {...linkClass}>
          Seguridad social
        </a>
      </Col>
      <Col>
        <a href="https://www.zonapagos.com/ws_cartera_davivienda/index.aspx" {...linkClass}>
          Productos Davivienda
        </a>
      </Col>
      <Col>
        <Link className={linkClass.className} to="/">
          Volver
        </Link>
      </Col>
    </Row>
  )

  return (
    <Layout.Header className="ant-layout-header--main">
      <div className="container">
        <Row>
          <Col lg={12} xl={14}>
            {headerLogo()}
          </Col>
          <Col lg={12} xl={10}>
            {headerMenu()}
          </Col>
        </Row>
      </div>
    </Layout.Header>
  )
}

export default CustomHeader
