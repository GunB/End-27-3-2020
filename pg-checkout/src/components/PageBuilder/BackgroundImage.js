import React from 'react';
import { MDBContainer } from "mdbreact";
import Image from 'react-image';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const BackgroundImage = ({ children, currentTheme }) => {
    return (
        currentTheme.background_image ?
            <MDBContainer fluid>
                <Image className="o-background d-none d-md-flex" src={currentTheme.background_image} />
                {children}
            </MDBContainer> : children
    );
}

BackgroundImage.propTypes = {
    children: PropTypes.any,
    currentTheme: PropTypes.object
}

const mapStateToProps = (state) => ({
    currentTheme: state.theme,
});

const ConnectedBackgroundImage = connect(mapStateToProps)(BackgroundImage);

export default ConnectedBackgroundImage;