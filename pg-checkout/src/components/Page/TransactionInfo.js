import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  BASE_PAGE_FORBIDEN_ACESS,
  MAX_CHARACTER_SIDE_BAR
} from "../../constants/config";
import { MDBBtn, MDBRow, MDBCol, MDBContainer, MDBIcon } from "mdbreact";
import { asyncFetchGetServerData } from "../../actions/serverAnswerActions";
import { INFORMATION_TRANSACTION } from "../../constants/endpoints";
import JSONPretty from "react-json-pretty";
import TransactionStatusBadge from "../TransactionStatusBadge";
import {
  clean,
  convertMultiLevelIntoArrayKeySingleObject
} from "../../utils/convertMultiLevelIntoSingle";
import ResponseCodeBarInfo from "../ResponseCodeBarInfo";
import { I18n } from "react-i18nify";
import Barcode from "react-barcode";
import ConnectedBackgroundImage from "../PageBuilder/BackgroundImage";

/* eslint-disable no-console */

class TransactionInfo extends Component {
  componentDidMount() {
    const { fetchInitData } = this.props;
    fetchInitData();
  }

  showButtons() {
    const { currentTheme } = this.props;
    let redirect = null;
    const style = {
      background: currentTheme.primary_color,
      color: currentTheme.primary_color_text_over,
      width: "100%"
    };
    let index = [
      {
        key: "router_redirect",
        outbox: {
          className: "col-lg-8 pr-4"
        },
        button: {
          style
        }
      },
      {
        key: "url_redirect",
        outbox: {
          className: "col-lg-8 pr-4"
        },
        button: {
          style
        }
      },
      {
        key: "url_finalize",
        outbox: {
          className: "col-lg-4 pr-4"
        },
        button: {
          style: {
            ...style,
            background: currentTheme.secondary_color
          }
        }
      },
      {
        key: "url_return",
        outbox: {
          className: "col-lg-8 pr-4"
        },
        button: {
          style
        }
      }
    ];

    const { serverAnswer } = this.props;
    clean(serverAnswer);
    if (serverAnswer) {
      return index.map(inx => {
        const { key } = inx;
        if (serverAnswer[key]) {
          redirect = serverAnswer[key];
          delete serverAnswer[key];
          return (
            <div key={key} {...inx.outbox}>
              <MDBBtn href={redirect} {...inx.button} color="none">
                {I18n.t(`info-description-${key}`)}
              </MDBBtn>
            </div>
          );
        }
      });
    } else {
      return (
        <MDBBtn
          className="col-lg-auto"
          style={{ ...style }}
          key="NOTHING-INFO"
          href={BASE_PAGE_FORBIDEN_ACESS}
          color="none"
        >
          {I18n.t("info-description-continue")}
        </MDBBtn>
      );
    }
  }

  joinData = ({ joinedKeys, entries, response, separator }) => {
    const notitlesKeys = ["transaction"];
    const id = joinedKeys;
    response = [
      ...response,
      <React.Fragment key={id}>
        <MDBRow>
          <MDBCol lg="12">
            <MDBRow>
              {RegExp(notitlesKeys.join("|")).test(id) ? null : (
                <MDBCol lg="12" className="pt-4">
                  <h5>
                    <strong>{I18n.t(id)}</strong>
                  </h5>
                </MDBCol>
              )}
              {(() =>
                entries.map(entry => {
                  const [key, value] = entry;
                  return (
                    <React.Fragment key={`${id}-${key}`}>
                      {this.parseData({
                        joinedKeys,
                        separator,
                        key,
                        value,
                        entries
                      })}
                    </React.Fragment>
                  );
                }))()}
            </MDBRow>
          </MDBCol>
        </MDBRow>
      </React.Fragment>
    ];
    return response;
  };

  parseData({ joinedKeys, separator, key, value, entries }) {
    const { currentTheme } = this.props;
    let code;
    let date;
    const newKey = `${joinedKeys}${separator}${key}`;
    let element = [
      <MDBCol key={`${newKey}-key`} size="6">
        <strong>{I18n.t(key)}</strong>
      </MDBCol>
    ];
    const generalProperties = {
      className: "text-right"
    };

    switch (true) {
      case new RegExp("transaction-agreement", "i").test(newKey):
        element.pop();
        code = entries.filter(obj => obj.includes("reference"))[0][1];
        date = entries.filter(obj => obj.includes("expiration_date"))[0][1];
        element.push(
          <MDBCol size="12" {...generalProperties} key={`${newKey}-value`}>
            <ResponseCodeBarInfo
              {...{
                data: value,
                currentTheme: currentTheme,
                code,
                date
              }}
            ></ResponseCodeBarInfo>
          </MDBCol>
        );
        break;
      case new RegExp("object", "i").test(typeof value):
        element.push(
          <MDBCol key={`${newKey}-value`} {...generalProperties} size="6">
            <JSONPretty data={value} />
          </MDBCol>
        );
        break;
      case new RegExp(["transaction-expiration_date"].join("|")).test(newKey):
        element = [];
        break;
      case new RegExp(["transaction-barcode"].join("|")).test(newKey):
        element.pop();
        element.push(
          <MDBCol
            key={`${newKey}-value`}
            {...generalProperties}
            className="full-centering"
            size="12"
          >
            <Barcode
              key={`${newKey}-value`}
              {...{
                width: 1,
                height: 37.795275591,
                fontSize: 11
              }}
              value={value}
            />
          </MDBCol>
        );
        break;
      case value.length > MAX_CHARACTER_SIDE_BAR:
        element.pop();
        element.push(
          <MDBCol key={`${newKey}-key`} size="12">
            <strong>{I18n.t(key)}</strong>
          </MDBCol>
        );
        element.push(
          <MDBCol key={`${newKey}-value`} size="12" className="long-text-font">
            {value}
          </MDBCol>
        );
        break;
      default:
        if (!/[^a-zA-Z]/.test(value)) {
          element.push(
            <MDBCol {...generalProperties} key={`${newKey}-value`} size="6">
              {I18n.t(value)}
            </MDBCol>
          );
        } else {
          element.push(
            <MDBCol {...generalProperties} key={`${newKey}-value`} size="6">
              {value}
            </MDBCol>
          );
        }
        break;
    }
    return element;
  }

  objectOrganize(fields) {
    return convertMultiLevelIntoArrayKeySingleObject(fields, this.joinData);
  }

  render() {
    const { serverAnswer, currentTheme } = this.props;
    const statusPaymenet =
      serverAnswer && serverAnswer.order
        ? serverAnswer.order.status
        : undefined;
    const transaction = { transaction: { ...serverAnswer.transaction } };
    delete serverAnswer.transaction;

    let buttons = this.showButtons();
    let organize = this.objectOrganize(serverAnswer);
    const organizeTransactions = this.objectOrganize(transaction);

    const payment_will_be = statusPaymenet ? (
      <div>
        <div className="py-5">{`${" "}`}</div>
        <div
          className="o-amount mx-auto"
          style={{ color: currentTheme.primary_color }}
        >
          <span className="o-amount--payment">{serverAnswer.order.amount}</span>
          <span className="o-amount--currency">
            {serverAnswer.order.currency || "COP"}
          </span>
        </div>
      </div>
    ) : null;

    if (currentTheme.close_window_on_end) {
      window.close();
      console.log("CERRADO POR TEMA");
    }

    return statusPaymenet ? (
      <>
        <ConnectedBackgroundImage>
          <MDBContainer
            className="card card-noshadow-sm"
            style={{ backgroundColor: currentTheme.primary_color_contrast }}
          >
            <MDBRow>
              <MDBCol lg="7" className="px-4 pb-3">
                <h3
                  className="mt-5"
                  style={{
                    color: `${currentTheme.primary_color}`
                  }}
                >
                  <strong>{I18n.t("info-landing-title")}</strong>
                </h3>

                <div className="">{organize}</div>

                {transaction.transaction &&
                transaction.transaction.agreement ? (
                  <div className="my-4 d-none d-md-block">
                    <div>{I18n.t("generate-payment-code-recommendation")}</div>
                    <ul>
                      <li>
                        {I18n.t("generate-payment-code-recommendation-list.1")}
                      </li>
                      <li>
                        {I18n.t("generate-payment-code-recommendation-list.2")}
                      </li>
                      <li>
                        {I18n.t("generate-payment-code-recommendation-list.3")}
                      </li>
                    </ul>
                  </div>
                ) : null}

                <MDBCol className="full-centering d-flex d-lg-none">
                  <TransactionStatusBadge
                    status={statusPaymenet}
                    currentTheme={currentTheme}
                  />
                  <MDBCol lg="12" className="pb-3">
                    {payment_will_be}
                    {organizeTransactions}
                  </MDBCol>
                </MDBCol>
              </MDBCol>
              <MDBCol
                lg="5"
                className="d-none d-lg-flex"
                style={{ background: currentTheme.side_bar_color }}
              >
                <TransactionStatusBadge
                  status={statusPaymenet}
                  currentTheme={currentTheme}
                />
                <MDBCol lg="12" className="pb-3">
                  {payment_will_be}
                  {organizeTransactions}
                </MDBCol>
              </MDBCol>
              <MDBCol lg="7" className="pb-3">
                <MDBRow>
                  <div className="col-lg-12 d-flex d-lg-none">
                    <MDBBtn
                      onClick={() => {
                        window.print();
                      }}
                      style={{
                        background: currentTheme.primary_color,
                        color: currentTheme.primary_color_text_over,
                        width: "100%"
                      }}
                      color="none"
                    >
                      <MDBIcon icon="print" className="mr-2" />
                      <span>{I18n.t(`print`)}</span>
                    </MDBBtn>
                  </div>
                  {buttons}
                </MDBRow>
              </MDBCol>
              <MDBCol
                lg="5"
                className="pb-3 full-centering d-none d-lg-flex"
                style={{ background: currentTheme.side_bar_color }}
              >
                <MDBBtn
                  onClick={() => {
                    window.print();
                  }}
                  style={{ background: currentTheme.primary_color }}
                  color="none"
                >
                  <MDBIcon icon="print" className="mr-2" />
                  <span>{I18n.t(`print`)}</span>
                </MDBBtn>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </ConnectedBackgroundImage>
      </>
    ) : null;
  }
}

const mapStateToProps = (state, props) => {
  const { id } = props.match.params;
  return {
    currentTheme: state.theme,
    serverAnswer: state.serverAnswer ? state.serverAnswer.data : {},
    orderId: id
  };
};

const mapDispatchToProps = (dispatch, props) => {
  const { id } = props.match.params;
  return {
    fetchInitData: () =>
      dispatch(asyncFetchGetServerData(`${INFORMATION_TRANSACTION}${id}`))
  };
};

TransactionInfo.propTypes = {
  currentTheme: PropTypes.object,
  serverAnswer: PropTypes.object,
  fetchInitData: PropTypes.any
};

const ConnectedTransactionInfo = connect(
  mapStateToProps,
  mapDispatchToProps
)(TransactionInfo);

export default ConnectedTransactionInfo;
