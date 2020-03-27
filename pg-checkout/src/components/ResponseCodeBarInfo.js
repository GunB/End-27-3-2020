import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { MDBRow, MDBCol } from 'mdbreact';
import CashPaymentLogos from './PageBuilder/CashPaymentLogos';

class ResponseCodeBarInfo extends Component {
  static propTypes = {
    date: PropTypes.any,
    code: PropTypes.string,
    data: PropTypes.any,
    currentTheme: PropTypes.object
  }

  render() {
    const { data, currentTheme } = this.props;
    return (
      <>
        <MDBRow>
          <MDBCol size="12">
            <CashPaymentLogos data={data} currentTheme={currentTheme}></CashPaymentLogos>
          </MDBCol>
        </MDBRow>
      </>
    )
  }
}

export default ResponseCodeBarInfo
