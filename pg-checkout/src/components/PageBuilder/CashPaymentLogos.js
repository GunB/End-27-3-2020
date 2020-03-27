import React from 'react';
import propTypes from "prop-types";
import { MDBCol, MDBRow, MDBCard, MDBCardImage, MDBCardBody } from 'mdbreact';
import { CASH_LOGOS } from '../../constants/resources';

const CashPaymentLogos = ({ data = undefined, isAllLogos = true, currentTheme }) => {

    const renderLogos = () => {
        const isData = data !== undefined;
        const keys = isData ? Object.keys(data) : [];
        let element = null;
        const logos = isAllLogos && !isData ?
            [...CASH_LOGOS] : [...CASH_LOGOS].map(logo => {
                if (keys.includes(logo.name)) {
                    logo.data = data[logo.name];
                    return logo;
                }
                return undefined;
            });
        element = logos.map((element) => {
            return (
                < MDBCol size="6" md="4" sm="6" lg="4" key={element.name} className="full-centering my-2" >
                    <MDBCard>
                        <MDBCardImage top className="img-fluid" src={element.thumbnail1} />
                        {
                            (() => (
                                element.data ?
                                    <MDBCardBody cascade style={{ color: currentTheme.primary_color }} className={`full-centering font-weight-bold`} >
                                        {element.data}
                                    </MDBCardBody>
                                    :
                                    null
                            ))()
                        }
                    </MDBCard>
                </ MDBCol>
            )
        })
        return <MDBCol size="12"><MDBRow center>{element}</MDBRow></MDBCol>
    }


    return (<>{renderLogos()}</>);
}

CashPaymentLogos.propTypes = {
    data: propTypes.any,
    isAllLogos: propTypes.bool,
    theme: propTypes.object
}

export default CashPaymentLogos;