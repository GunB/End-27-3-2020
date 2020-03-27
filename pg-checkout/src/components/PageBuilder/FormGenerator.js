import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { I18n } from 'react-i18nify';
import * as INPUTTYPES from '../../constants/inputTypes';
import { CONCAT_ID_BASES } from '../../constants/config';
import 'babel-polyfill';
import weblog from 'webpack-log';
const log = weblog({ name: 'wds' }) // webpack-dev-server

class FormGenerator extends Component {
    static propTypes = {
        fields: PropTypes.any,
        prefix: PropTypes.any,
        children: PropTypes.any
    }

    state = {
        formData: {}
    }

    constructor() {
        super()
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeNumber = this.handleChangeNumber.bind(this);
    }

    handleChange(e) {
        e.persist();
        const value = e.target.value;
        const key = e.target.name;
        this.setState((prevState) => {
            let formData = { ...prevState.formData };
            formData[key] = value;
            this.subscribeTrigger(formData);
            return { formData };
        })
    }

    handleChangeNumber(e) {
        e.persist();
        const value = e.target.value;
        if (new RegExp('^[0-9]+$').test(value)) this.handleChange(e);
    }

    createInputCustom = ({ value, key }, { prefix, onChange = this.handleChange }) => {
        let back = prefix ? `${prefix}${CONCAT_ID_BASES}` : ``;
        let data = {
            type: value.type,
            disabled: typeof value.editable !== "undefined" ? !value.editable : false,
            className: "form-control",
            id: `${back}${key}`,
            name: `${key}`,
            value: this.state.formData[key] || '',
            onChange
        }
        let wrapper = { className: "form-group col-md-6" };
        this.props.scheme && this.props.scheme[key] ? wrapper = {
            ...wrapper,
            ...this.props.scheme[key]
        } : null;
        return <React.Fragment key={`${back}${key}`}>
            <div {...wrapper}>
                <label htmlFor={`${back}${key}`}>{I18n.t(`${back}${key}`)}</label>
                <input {...data} />
            </div>
        </React.Fragment>
    }

    subscribeTrigger(data) {
        this.props.subscribeValuesCallback ?
            this.props.subscribeValuesCallback(data) : null
    }

    initialValues() {
        this.props && this.props.fields ? this.props.fields.map((field) => {
            this.setState((prevState) => {
                let formData = { ...prevState.formData }
                formData[field.key] = field.value.value;
                this.subscribeTrigger(formData)
                return { formData }
            });
            return field;
        }) : null
    }

    componentDidUpdate(prevProps) {
        if (this.props.fields && prevProps.fields !== this.props.fields) {
            this.initialValues();
        }
    }

    componentDidMount() {
        this.initialValues();
    }

    inputGenerator(field) {
        const { type } = field.value;
        const { prefix } = this.props;
        let element = null;
        const createInput = this.createInputCustom.bind(this);

        switch (true) {
            case new RegExp(INPUTTYPES.TEXT.join("|"), "i").test(type):
                field.value.type = "text";
                element = createInput(field, { prefix })
                break;
            case new RegExp(INPUTTYPES.NUMBER.join("|"), "i").test(type):
                field.value.type = "number";
                element = createInput(field, { prefix, onChange: this.handleChangeNumber })
                break;
            case new RegExp(INPUTTYPES.SELECT.join("|"), "i").test(type):
                break;
            default:
                log.error("DATA NOT ITENDIFIED TYPE:" + type, field);
                break;
        }
        return element;
    }

    render() {
        const form = <form className="form-row">
            {this.props.fields.map((field) => {
                return this.inputGenerator(field);
            })}
        </form>

        return form;
    }
}

export default FormGenerator;