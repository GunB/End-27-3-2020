import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
const { I18n } = require('react-i18nify');
import JSONPretty from 'react-json-pretty';
import { MDBRow, MDBCol, MDBCardHeader, MDBCard, MDBCardTitle, MDBCardBody } from 'mdbreact';
import { convertMultiLevelIntoSingleArray } from '../utils/convertMultiLevelIntoSingle';
import TransactionStatusBadge from './TransactionStatusBadge';

class JsonParsingPage extends Component {

    transformData(jsonData) {
        return convertMultiLevelIntoSingleArray({ ...jsonData });
    }

    state = {}
    render() {
        const { currentTheme, titleKey, descriptionKey, jsonData = {}, children = null, plain = true } = this.props;
        const statusPaymenet = jsonData && jsonData.data ? jsonData.data.status : undefined;
        return (
            <MDBRow>
                <MDBCol size="12">
                    <MDBCard>
                        <MDBCardHeader color={`${currentTheme.color}`}>{I18n.t(titleKey)}</MDBCardHeader>
                        <MDBCardBody>
                            <MDBCardTitle>{I18n.t(descriptionKey)}</MDBCardTitle>
                            <MDBCol size="12" className="full-centering">
                                <MDBCol size="3">
                                    <TransactionStatusBadge className={`img-fluid mb-3`} status={statusPaymenet} />
                                </MDBCol>
                            </MDBCol>
                            {
                                (() => {
                                    if (plain) {
                                        const data = this.transformData(jsonData);
                                        return <MDBRow>
                                            {
                                                data.map((element) => (
                                                    <React.Fragment key={element.key}>
                                                        <MDBCol size="4">{I18n.t(element.key)}</MDBCol>
                                                        <MDBCol size="8">{(new String(element.value))}</MDBCol>
                                                    </React.Fragment>
                                                ))
                                            }
                                        </MDBRow>
                                    } else {
                                        return <JSONPretty id="json-pretty" data={jsonData}></JSONPretty>
                                    }
                                })()
                            }
                            <br></br>
                            {children}
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
            </MDBRow>
        );
    }
}

const mapStateToProps = (state) => ({
    currentTheme: state.theme
});

JsonParsingPage.propTypes = {
    currentTheme: PropTypes.object,
    jsonData: PropTypes.object,
    titleKey: PropTypes.string,
    descriptionKey: PropTypes.string,
    children: PropTypes.any,
    plain: PropTypes.bool
}

const ConnectedJsonParsingPage = connect(mapStateToProps)(JsonParsingPage);

export default ConnectedJsonParsingPage;