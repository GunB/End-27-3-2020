import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { MDBModal, MDBModalBody, MDBRow, MDBCol, MDBModalFooter, MDBBtn } from 'mdbreact';

const ModalPaymentLoading = ({ modalLoading = false, DoToggle = () => { }, currentTheme }) => {
    return (<MDBModal className="modal-notify" centered isOpen={modalLoading} size="sm" toggle={() => { }}>
        <MDBModalBody className="text-center full-centering">
            <MDBRow className="full-centering">
                <MDBCol size="12" className="full-centering">
                    <div className="spinner-border preloader-big" style={{
                        borderColor: currentTheme.primary_color,
                        borderRightColor: "transparent"
                    }} role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </MDBCol>
            </MDBRow>
        </MDBModalBody>
        <MDBModalFooter className="justify-content-center d-none">
            <MDBBtn color="primary" onClick={DoToggle}>Yes</MDBBtn>
            <MDBBtn color="primary" outline onClick={DoToggle}>No</MDBBtn>
        </MDBModalFooter>
    </MDBModal>);
}

ModalPaymentLoading.propTypes = {
    modalLoading: PropTypes.bool,
    currentTheme: PropTypes.any,
    //typeOrder: PropTypes.string,
    //logo: PropTypes.string,
    DoToggle: PropTypes.any
}

const mapStateToProps = (state) => ({ //state, ownProps
    currentTheme: state.theme
});

const conectedModalPaymentLoading = connect(
    mapStateToProps
)(ModalPaymentLoading)

export default conectedModalPaymentLoading;