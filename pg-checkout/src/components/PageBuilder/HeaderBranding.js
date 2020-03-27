import React from 'react'
import Image from 'react-image'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

export const HeaderBranding = ({ currentTheme }) => {
    return (
        <>
            <br />
            <div className="row">
                <div className="col-md-3 col-sm-6 px-0">
                    <Image
                        className={`img-fluid o-logo`}
                        src={currentTheme.logo}
                    />
                </div>
            </div>
        </>
    );
}

const mapStateToProps = (state) => ({
    currentTheme: state.theme,
});

HeaderBranding.propTypes = {
    currentTheme: PropTypes.object
}

const ConnectedHeaderBranding = connect(
    mapStateToProps
)(HeaderBranding)


export default ConnectedHeaderBranding;
