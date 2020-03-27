import React from 'react';
import { connect } from 'react-redux';
import { changeCurrentTheme } from '../../actions/themeActions';
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";
import { I18n } from 'react-i18nify';

const showPCIImage = name => {
  if (name === 'Paymentez') {
    return (
      <MDBCol className="text-center" md="8" sm="6">
        <a href="https://seal.controlcase.com/index.php?page=showCert&cId=2595630504"
           rel="noopener noreferrer" target="_blank">
          <img src="https://paymentez.com/img/PCI_logo.gif" />
        </a>
      </MDBCol>
    )
  }
};

export const Footer = ({ currentTheme }) => (
    <>
        <MDBFooter className="font-small pt-4 mt-5" style={{ background: currentTheme.primary_color }}>
            <MDBContainer className="text-md-left mb-4">
                <MDBRow>
                    <MDBCol md="4" sm="6">
                        <h5 className="text-left">{I18n.t("footer-title")}</h5>
                        <ul>
                            <li className="list-unstyled">
                                <a href="#!">{I18n.t("footer1")}</a>
                            </li>
                            <li className="list-unstyled">
                                <a href="#!">{I18n.t("footer2")}</a>
                            </li>
                            <li className="list-unstyled">
                                <a href="#!">{I18n.t("footer3")}</a>
                            </li>
                        </ul>
                    </MDBCol>
                  { showPCIImage(currentTheme.name)}
                </MDBRow>
            </MDBContainer>
            <div className="py-2" style={{ background: currentTheme.secondary_color }}>
                <MDBContainer>
                    <small>
                        &copy; 2018 - {new Date().getFullYear()} Copyright: <a rel="noopener noreferrer" href={currentTheme.site} target="_blank"> {currentTheme.name}®. All rights reserved. </a>
                    </small>
                </MDBContainer>
            </div>
        </MDBFooter>
        {/** }
        <footer className={`page-footer font-small ${currentTheme.color} pt-4 mt-3`}>
            <div className="container text-center text-md-left">
                <div className="row">
                    <div className="col-md-6 mt-md-0 mt-3">
                        <h5 className="text-uppercase">Checkout Landing</h5>
                        <p>La mejor forma de pagar con el medio que prefieras...</p>
                    </div>
                    <hr className="clearfix w-100 d-md-none pb-3" />
                    <div className="col-md-3 mb-md-0 mb-3">
                        <a href="https://seal.controlcase.com/index.php?page=showCert&cId=2595630504"
                            rel="noopener noreferrer" target="_blank">
                            <img src="https://paymentez.com/img/PCI_logo.gif" />
                        </a>
                    </div>
                    <div className="col-md-3 mb-md-0 mb-3">
                        <h5 className="text-uppercase">Encuentranos en:</h5>
                        <ul className="list-unstyled">
                            <li>
                                <a>Twitter</a>
                            </li>
                        </ul>
                    </div>

                    <div className="col-md-3 mb-md-0 mb-3">
                        <h5 className="text-uppercase">Nuestros Aliados</h5>
                        <ul className="list-unstyled">
                            <li>
                                <a onClick={(() => { changeTheme('Yanbal') })}>Yanbal</a>
                            </li>
                            <li>
                                <a onClick={(() => { changeTheme('Seguros Bolivar') })}>Seguros Bolivar</a>
                            </li>
                            <li>
                                <a onClick={(() => { changeTheme('') })}>Paymentez</a>
                            </li>
                        </ul>
                    </div>

                </div>
            </div>
            <div className="footer-copyright text-center py-3">
                Copyright © 2008 – 2017 Paymentez®. All rights reserved.
            </div>
        </footer>{ */}
    </>
)

const mapStateToProps = (state) => ({
    currentTheme: state.theme,
});

const mapDispatchToProps = (dispatch) => ({
    "changeTheme": (theme) => {
        dispatch(changeCurrentTheme(theme));
    }
});

const conectedFooter = connect(
    mapStateToProps,
    mapDispatchToProps
)(Footer)


export default conectedFooter;
