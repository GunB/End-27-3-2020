import React from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

const UpperLineBranding = ({ currentTheme }) => {
    return (<div className={`o-headerline`} style={{ background: `${currentTheme.primary_color}` }}></div>);
}

const mapStateToProps = (state) => {
    return {
        currentTheme: state.theme,
    }
}

UpperLineBranding.propTypes = {
    currentTheme: PropTypes.object
}

const ConnectedUpperLineBranding = connect(mapStateToProps)(UpperLineBranding)

export default ConnectedUpperLineBranding;