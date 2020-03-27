import React from 'react';
import { withRouter, Redirect } from 'react-router';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { BASE_PAGE_FORBIDEN_ACESS } from '../../constants/config';

export default function backEndAnswerComponent(Component) {

  class BackEndAnswerComponent extends React.Component {

    static propTypes = {
      match: PropTypes.object.isRequired,
      location: PropTypes.object.isRequired,
      history: PropTypes.object.isRequired,
      serverAnswer: PropTypes.object
    };

    checkData() {
      const { serverAnswer } = this.props;
      if (serverAnswer) {
        return <Component {...this.props} />
      }
      return <Redirect to={BASE_PAGE_FORBIDEN_ACESS} />;
    }

    render() {
      return this.checkData()
    }

  }

  const mapStateToProps = (state) => ({
    serverAnswer: state.serverAnswer
  });

  const ConnectedBackEndAnswerComponent = withRouter(connect(
    mapStateToProps
  )(BackEndAnswerComponent))

  return ConnectedBackEndAnswerComponent;
}