import React from "react";
import { connect } from "react-redux";
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import { PropTypes } from "prop-types";
import { I18n } from "react-i18nify";
import store from "store";
import { changeCurrentTheme } from "../../actions/themeActions";
import {
  changeDetailsOrder,
  asyncChangeDetailsOrder
} from "../../actions/detallesCompraActions";
import { filterDetallesOrden } from "../../filters/filterDetalleOrden";
import ConectedPaymentMethodCollapse from "../PaymentMethodCollapse";
//import ReactForm from "react-jsonschema-form";
//import { schemaTranspilerSimpleObject } from '../../utils/schemaTranspiler';
import ConnectedBackgroundImage from "../PageBuilder/BackgroundImage";
import FormGenerator from "../PageBuilder/FormGenerator";
import PaymentInfoWillBe from "../PageBuilder/PaymentInfoWillBe";

import { lang } from "../../utils/Translations";

export class CheckoutLanding extends React.Component {
  static propTypes = {
    fecthOrderData: PropTypes.any,
    currentTheme: PropTypes.object,
    detalles: PropTypes.array,
    orderId: PropTypes.any,
    prefix: PropTypes.string,
    orderStatus: PropTypes.string
  };

  constructor() {
    super();
    this.formDataChange = this.formDataChange.bind(this);
    //this.initialValues = FormGenerator.initialValues.bind(this);
  }

  componentDidMount() {
    this.props.fecthOrderData();
  }

  state = {
    formData: {}
  };

  formDataChange(fields) {
    this.setState({ formData: fields });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.detalles !== this.props.detalles) {
      //this.setState({ formData: this.initialValues({ prefix: this.props.prefix, fields: this.props.detalles }) })
    }
  }

  render() {
    const { currentTheme, detalles, orderId, orderStatus } = this.props;
    let payment_will_be = detalles ? (
      <PaymentInfoWillBe
        status={orderStatus}
        amount={this.state.formData["order-amount"]}
        currency={this.state.formData["order-currency"]}
        currentTheme={currentTheme}
        paymentMethods={this.state.formData}
      />
    ) : null;

    const { pay_button_up_mobile = false } = currentTheme;

    return (
      <>
        <ConnectedBackgroundImage>
          <MDBContainer
            className="card card-noshadow-sm"
            style={{ backgroundColor: currentTheme.primary_color_contrast }}
          >
            <MDBRow>
              <MDBCol lg="7" className="px-4 pb-2">
                {pay_button_up_mobile ? (
                  <MDBCol className="d-block d-lg-none pt-4">
                    {payment_will_be}
                    <ConectedPaymentMethodCollapse
                      orderId={orderId}
                      orderData={this.state.formData}
                    />
                  </MDBCol>
                ) : null}
                <h3
                  className="mt-5"
                  style={{
                    color: `${currentTheme.primary_color}`
                  }}
                >
                  <strong>{I18n.t("checkout-landing-title")}</strong>
                </h3>
                {detalles
                  ? (() => {
                      return (
                        <FormGenerator
                          prefix={"order"}
                          scheme={{
                            "order-currency": {
                              className: "form-group col-md-2 col-sm-3"
                            },
                            "order-amount": {
                              className: "form-group col-md-4 col-sm-9"
                            }
                          }}
                          subscribeValuesCallback={this.formDataChange}
                          fields={detalles}
                        />
                      );
                    })()
                  : null}
                {pay_button_up_mobile ? null : (
                  <MDBCol className="d-block d-lg-none pb-4">
                    {payment_will_be}
                    <ConectedPaymentMethodCollapse
                      orderId={orderId}
                      orderData={this.state.formData}
                    />
                  </MDBCol>
                )}
              </MDBCol>
              <MDBCol
                lg="5"
                className="d-none d-lg-flex"
                style={{ background: currentTheme.side_bar_color }}
              >
                <MDBCol lg="12" className="py-4 equal-distribution">
                  {payment_will_be}
                  <ConectedPaymentMethodCollapse
                    orderId={orderId}
                    orderData={this.state.formData}
                  />
                </MDBCol>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </ConnectedBackgroundImage>
      </>
    );
  }
}

const mapStateToProps = state => ({
  //state, ownProps
  detalles:
    state.detalles && state.detalles.data
      ? filterDetallesOrden(state.detalles.data.data_buy)
      : null,
  currentTheme: state.theme,
  orderStatus:
    state.detalles && state.detalles.data
      ? state.detalles.data.order.status
      : null,
  orderId:
    state.detalles && state.detalles.data ? state.detalles.data.order.id : null
});

const mapDispatchToProps = (dispatch, props) => ({
  //props, ownProps
  changeCurrentTheme: (name, e) => {
    dispatch(changeCurrentTheme(e));
  },
  fecthOrderData: () => {
    store.set("linktopay", {
      lang: props.match.params.lang || lang[0] || "es"
    });
    const configs = store.get("linktopay");
    I18n.setLocale(configs.lang);
    dispatch(asyncChangeDetailsOrder(props.match.params.id));
  },
  handleInputChange: (name, e) => {
    const { id, value } = e.target;
    dispatch(changeDetailsOrder(id, value));
  }
});

const conectedCheckoutLanding = connect(
  mapStateToProps,
  mapDispatchToProps
)(CheckoutLanding);

export default conectedCheckoutLanding;
