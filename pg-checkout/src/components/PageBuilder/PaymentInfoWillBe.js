import React from "react";
import PropTypes from "prop-types";
import { I18n } from "react-i18nify";
import { STATUS_CHECKOUT } from "../../constants/transactionStatus";
import PaymentWillBe from "./PaymentWillBe";
import Color from "color";
import { MDBIcon } from "mdbreact";

const PaymentInfoWillBe = ({
  amount,
  currency,
  currentTheme,
  status,
  paymentMethods
}) => {
  const statusList = [...STATUS_CHECKOUT];

  const selectStatus = status => {
    let result = null;
    statusList.map(statusElement => {
      if (
        RegExp(statusElement.list.join("|"), "i").test(status.toLowerCase())
      ) {
        result = statusElement;
      }
    });
    return result;
  };

  return (() => {
    const newStatus = selectStatus(status);
    return (
      <>
        <div
          className="o-amount mx-auto"
          style={{ color: currentTheme.primary_color }}
        >
          <PaymentWillBe
            className="o-amount--payment"
            amount={amount}
            currency={currency}
          />
          <span className="o-amount--currency">{currency}</span>
        </div>
        <div
          className="full-centering text-center o-seudo-info"
          style={{
            color: Color(currentTheme.side_bar_color)
              .darken(0.2)
              .hex()
          }}
        >
          {newStatus || paymentMethods ? null : (
            <React.Fragment>
              <div>
                <MDBIcon far icon="comment-alt" size="4x" />
              </div>
              {I18n.t("payment-loading-description")}
            </React.Fragment>
          )}
        </div>
      </>
    );
  })();
};

PaymentInfoWillBe.propTypes = {
  amount: PropTypes.any,
  currency: PropTypes.any,
  paymentMethods: PropTypes.any,
  status: PropTypes.any,
  currentTheme: PropTypes.any
};

export default PaymentInfoWillBe;
