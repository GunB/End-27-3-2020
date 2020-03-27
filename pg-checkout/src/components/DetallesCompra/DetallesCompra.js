import React from 'react';
import { Textbox } from 'react-inputs-validation';
import PropTypes, { arrayOf } from 'prop-types';
import { I18n } from 'react-i18nify';

export const DetallesCompra = ({ detalles, onSubmit, ...props }) => {
    let detallesCompra = [];
    for (let key in detalles) {
        const value = detalles[key];
        detallesCompra = [
            ...detallesCompra,
            <React.Fragment key={value.key}>
                <span className="col-md-2 col-sm-4 mb-3 input-describer">{I18n.t(value.key)}:</span >
                <div className="col-md-10 col-sm-8 mb-3">
                    <Textbox
                        autoComplete="off"
                        classNameWrapper=""
                        classNameInput="col-12 form-control"
                        classNameContainer="col-12 input-group"
                        className="form-control"
                        disabled={true}
                        {...props}
                        value={value.value}
                        id={value.key}
                        readOnly={true}
                        validationOption={{
                            name: value.key,
                            check: true,
                            required: true,
                            type: 'string'
                        }} />
                </div>
            </React.Fragment>
        ]
    }
    return (
        <form className="row" onSubmit={onSubmit}>
            {detallesCompra}
        </form>
    );
}
DetallesCompra.propTypes = {
    detalles: arrayOf(PropTypes.object),
    onSubmit: PropTypes.any
};