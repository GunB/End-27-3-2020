import { MDBBtn, MDBCol, MDBModal, MDBModalBody, MDBModalFooter, MDBModalHeader } from 'mdbreact';
import propTypes from "prop-types";
import React, { Component } from 'react';
import { I18n } from 'react-i18nify';
import Image from 'react-image';
import ReactForm from "react-jsonschema-form";
import { connect } from 'react-redux';
import { asyncfetchOtherPaymentStatus } from '../../actions/serverAnswerActions';
//import JSONPretty from 'react-json-pretty';
import { multiUpdateSingleMulti } from '../../utils/convertMultiLevelIntoSingle';
import { formInterpreterPSE } from '../../utils/formInterpreterPSE';
import { schemaTranspiler } from '../../utils/schemaTranspiler';
import ModalPaymentLoading from '../PageBuilder/ModalPaymentLoading';
import { TransformErrors } from '../../utils/TransformErrors';

export class PSEPaymentComponent extends Component {
    state = {
        modalLoading: false,
        isPaying: false
    }

    constructor() {
        super();
        this.modalForm = this.modalForm.bind(this);
        this.DoTogglePayment = this.DoTogglePayment.bind(this);
        this.myRef = React.createRef();
    }

    sendData = (formData = { formData: undefined }) => {
        const { url } = this.props.payment;
        const { responseStatus, orderDetails, orderData } = this.props;
        this.DoTogglePayment();
        this.DoToggle();

        const newData = multiUpdateSingleMulti(orderData, orderDetails.data);
        const newOrderData = {
            ...orderDetails, data: { ...newData }
        }

        const dataForm = formInterpreterPSE(newOrderData, formData.formData);
        responseStatus(url, dataForm)
    }

    DoToggle = () => {
        this.setState((prevState) => {
            const newState = !prevState.modalLoading;
            return { modalLoading: newState }
        });
    }

    DoTogglePayment = () => {
        this.setState((prevState) => {
            const newState = !prevState.isPaying;
            return { isPaying: newState }
        });
    }

    modalForm() {
        const { orderId, logo = "", payment, typeOrder = "" } = this.props;
        let { isPaying } = this.state;
        const formId = `${typeOrder}-payment`;
        const { sendData, DoTogglePayment } = this;
        return (
            <MDBModal className="modal-notify" isOpen={isPaying} size="lg" toggle={DoTogglePayment}>
                <MDBModalHeader toggle={DoTogglePayment}>
                    <strong>{I18n.t(`payment-title-${typeOrder}`)}</strong>
                </MDBModalHeader>
                <MDBModalBody>
                    <div className="row" key={`${orderId}`}>
                        <div className="col-12">
                            {
                                (() => {
                                    const { extra_fields } = payment;
                                    if (extra_fields && Object.entries(extra_fields).length > 0) {
                                        const schema = schemaTranspiler(extra_fields, `${typeOrder}`);
                                        return <ReactForm {...schema}
                                            showErrorList={false}
                                            transformErrors={TransformErrors}
                                            id={formId}
                                            name={formId}
                                            idPrefix={`${typeOrder}`}
                                            ref={input => this.myRef = input}
                                            onSubmit={sendData}>
                                            <div>
                                                <MDBBtn size="lg" className="d-none" type="submit" color={"none"}>
                                                    {I18n.t(`payment-action-button-${typeOrder}`)}
                                                </MDBBtn>
                                            </div>
                                        </ReactForm>
                                    } else {
                                        return (
                                            <>
                                                {/*} <JSONPretty id="json-pretty" data={payment}></JSONPretty> {*/}
                                                <span>{I18n.t(`payment-description-${typeOrder}`)}</span>
                                            </>
                                        )
                                    }
                                })()
                            }
                        </div>
                    </div>
                </MDBModalBody>
                <MDBModalFooter className="">
                    <MDBBtn color="grey" onClick={DoTogglePayment}>{I18n.t(`payment-cancel-button`)}</MDBBtn>
                    <MDBBtn color="blue" onClick={() => { this.myRef.submit() }}>{I18n.t(`payment-action-button-${typeOrder}`)}</MDBBtn>
                    <MDBCol sm="3" md="2">
                        <Image
                            className={`img-fluid mb-3`}
                            src={logo}
                        />
                    </MDBCol>
                </MDBModalFooter>
            </MDBModal>
        )
    }

    render() {
        const { logo = "", typeOrder = "", currentTheme } = this.props;
        const { DoToggle, DoTogglePayment, modalForm } = this;
        const { modalLoading } = this.state;
        return (<>
            {modalForm()}
            <ModalPaymentLoading {...{ modalLoading, typeOrder, logo, DoToggle }} />
            <div className="full-centering">
                <MDBBtn
                    onClick={DoTogglePayment}
                    color="none"
                    style={{ "background": currentTheme.primary_color, width: "100%" }}>
                    {I18n.t(`payment-action-button-${typeOrder}`)}
                </MDBBtn>
            </div>
        </>);
    }
}

PSEPaymentComponent.propTypes = {
    orderId: propTypes.string,
    currentTheme: propTypes.object,
    typeOrder: propTypes.string,
    color: propTypes.string,
    logo: propTypes.string,
    payment: propTypes.object,
    responseStatus: propTypes.any,
    orderDetails: propTypes.object
}

const mapStateToProps = (state) => ({ //state, ownProps
    currentTheme: state.theme,
    orderDetails: state.detalles
});

const mapDispatchToProps = (dispatch) => ({
    responseStatus: (url, data) => dispatch(asyncfetchOtherPaymentStatus(url, data)),
})

const ConnectedPSEPaymentComponent = connect(
    mapStateToProps, mapDispatchToProps
)(PSEPaymentComponent)

export default ConnectedPSEPaymentComponent;