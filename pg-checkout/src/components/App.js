/* eslint-disable import/no-named-as-default */
import { Route, Switch } from "react-router-dom";

//import AboutPage from "./AboutPage";
import NotFoundPage from "./Page/NotFoundPage";
import PropTypes from "prop-types";
import React from "react";
import { hot } from "react-hot-loader";
import ConnectedCheckoutLanding from "./Page/CheckoutLanding";
import Footer from "./PageBuilder/Footer";
import backEndAnswerComponent from "./Routers/BackEndAnswerComponent";
import { MDBContainer } from "mdbreact";
import ConnectedHeaderBranding from "./PageBuilder/HeaderBranding";
import ConnectedTransactionRespose from "./Page/TransactionRespose";
import ConnectedTransactionInfo from "./Page/TransactionInfo";
import ConnectedUpperLineBranding from "./PageBuilder/UpperLineBranding";

// This is a class-based component because the current
// version of hot reloading won't hot reload a stateless
// component at the top-level.

class App extends React.Component {
  render() {
    return (
      <>
        <ConnectedUpperLineBranding />
        <div className="appWrapped">
          <MDBContainer>
            <ConnectedHeaderBranding />
          </MDBContainer>
          {/**
          <div>
            <NavLink exact to="/" activeStyle={activeStyle}>Home</NavLink>
            {' | '}
            <NavLink to="/fuel-savings" activeStyle={activeStyle}>Demo App</NavLink>
            {' | '}
            <NavLink to="/about" activeStyle={activeStyle}>About</NavLink>
          </div>
          */}

          <Switch>
            <Route
              exact
              path="/checkout/:id/:lang?"
              component={ConnectedCheckoutLanding}
            />
            <Route
              exact
              path="/transaction/response"
              component={backEndAnswerComponent(ConnectedTransactionRespose)}
            />
            <Route
              exact
              path="/transaction/info/:id"
              component={ConnectedTransactionInfo}
            />
            <Route component={NotFoundPage} />
          </Switch>

          <Footer />
        </div>
      </>
    );
  }
}

App.propTypes = {
  children: PropTypes.element
};

export default hot(module)(App);
