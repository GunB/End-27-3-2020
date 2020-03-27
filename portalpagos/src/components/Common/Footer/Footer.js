import React from 'react'
import { Row, Col, Layout } from 'antd'
import vigilado from '../../../assets/img/vigilado.png'

const Footer = () => {
  return (
    <Layout.Footer className="bg-footer footer full-centering">
      <div className="container">
        <Row type="flex" align="middle">
          <Col md={12} lg={6} xl={5}>
            <div className="footer__img">
              <img src={vigilado} alt="vigilado" className="w-100" />
            </div>
          </Col>
          <Col md={12} lg={12} xl={12}>
            <h6 className="fc-white bold">
              Banco Davivienda S.A. todos los derechos reservados 2020
            </h6>
          </Col>
        </Row>
      </div>
    </Layout.Footer>
  )
}

export default Footer
