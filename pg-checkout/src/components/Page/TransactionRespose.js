import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import { BASE_PAGE_FORBIDEN_ACESS } from "../../constants/config";
//import { MDBBtn, NavLink } from 'mdbreact';
//import ConnectedJsonParsingPage from '../JsonParsingPage';
//const { I18n } = require('react-i18nify');

/* eslint-disable no-console */

class TransactionRespose extends Component {
  componentDidMount() {
    const { doRedirect, redirect, setRedirect, currentTheme } = this.props;
    if (currentTheme.close_window_on_end) {
      window.close();
      console.log("CERRADO POR TEMA")
    }
    if (doRedirect) setRedirect(redirect);
    else window.location = redirect;
  }
  render() {
    /*
        const { serverAnswer, redirect, currentTheme, doRedirect } = this.props;
        const element = <ConnectedJsonParsingPage
            {...{
                jsonData: serverAnswer,
                titleKey: "response-description-title",
                descriptionKey: "response-description-description"
            }}
        >
            {
                doRedirect ?
                    <NavLink to={redirect} style={{ padding: 0 }}>
                        <MDBBtn color={currentTheme.color}>{I18n.t('response-description-continue')}</MDBBtn>
                    </NavLink> :
                    <MDBBtn href={redirect} color={currentTheme.color}>{I18n.t('response-description-continue')}</MDBBtn>
            }
        </ConnectedJsonParsingPage>
         */

    return <React.Fragment></React.Fragment>;
  }
}

const mapStateToProps = (state, props) => {
  const { id } = props.match.params;
  return {
    currentTheme: state.theme,
    serverAnswer: state.serverAnswer,
    redirect:
      state.serverAnswer && state.serverAnswer.data
        ? state.serverAnswer.data["router_redirect"] ||
          state.serverAnswer.data["url_redirect"] ||
          BASE_PAGE_FORBIDEN_ACESS
        : BASE_PAGE_FORBIDEN_ACESS,
    doRedirect: !!(
      state.serverAnswer &&
      state.serverAnswer.data &&
      state.serverAnswer.data["router_redirect"]
    ),
    orderId: id
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setRedirect: redirect => dispatch(push(redirect))
  };
};

TransactionRespose.propTypes = {
  currentTheme: PropTypes.object,
  serverAnswer: PropTypes.object,
  redirect: PropTypes.string,
  doRedirect: PropTypes.bool,
  setRedirect: PropTypes.any
};

const ConnectedTransactionRespose = connect(
  mapStateToProps,
  mapDispatchToProps
)(TransactionRespose);

export default ConnectedTransactionRespose;
