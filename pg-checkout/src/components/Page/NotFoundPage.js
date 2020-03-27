import React from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { I18n } from 'react-i18nify';
import IMAGE_ERROR from '../../../resources/img/404-500.png'
import { MDBContainer } from 'mdbreact';
import Image from 'react-image';

const NotFoundPage = ({ statusCode = "404", currentTheme = {} }) => {
  return (
    <MDBContainer fluid>
      <Image className="o-background o-background--error d-none d-md-flex" src={IMAGE_ERROR} />
      <div className="container notFound pb-5">
        <h1 className="status-error-text">
          {statusCode}
        </h1>
        <h4 style={{ color: currentTheme.primary_color }} className="pt-4">
          <strong>{I18n.t(`${statusCode}-title`)}</strong>
        </h4>
        {I18n.t(`${statusCode}-message`)}
      </div>
    </MDBContainer>

  );
};

NotFoundPage.propTypes = {
  statusCode: PropTypes.string,
  currentTheme: PropTypes.object
};

const mapStateToProps = (state) => {
  return ({
    currentTheme: state.theme
  })
};

const ConectedNotFoundPage = connect(
  mapStateToProps
)(NotFoundPage)

export default ConectedNotFoundPage;
