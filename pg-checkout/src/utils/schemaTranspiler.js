import { I18n } from 'react-i18nify';
import * as INPUTTYPES from '../constants/inputTypes';
import { CONCAT_ID_BASES } from '../constants/config';
const weblog = require('webpack-log');
const log = weblog({ name: 'wds' }) // webpack-dev-server

const schemaSwitcher = (idForm, schema, uiSchema, formData, key, value) => {
    const { type } = value;
    formData[key] = value.value || undefined;

    let element = {
        title: I18n.t(`${idForm}-${key}`),
        ...value
    }
    const editable = Boolean(value.editable);
    let uiElement = {
        "ui:readonly": editable ? !editable : false,
        "ui:disabled": editable ? !editable : false
    }
    let enumData = null;
    switch (true) {
        case new RegExp(INPUTTYPES.TEXT.join("|"), "i").test(type):
            schema.properties[key] = {
                ...element,
                type: "string"
            }
            uiSchema[key] = {
                ...uiElement,
                "ui:emptyValue": ""
            }
            break;
        case new RegExp(INPUTTYPES.NUMBER.join("|"), "i").test(type):
            schema.properties[key] = {
                ...element,
                //"minimum": 42,
                //"maximum": 100,
                type: "integer"
            }
            uiSchema[key] = {
                ...uiElement,
                "ui:widget": "updown"
            }
            break;
        case new RegExp(INPUTTYPES.SELECT.join("|"), "i").test(type):
            enumData = interpretateSelect(value);
            schema.properties[key] = {
                ...element,
                type: "string",
                enum: [...enumData.enumConcat],
                enumNames: [...enumData.enumLabel]
            };
            uiSchema[key] = {
                ...uiElement,
                "ui:widget": "select"
                //"classNames": "browser-default custom-select"
            }
            break;
        default:
            log.error("DATA NOT ITENDIFIED TYPE:" + type, key, value);
            break;
    }
}

const interpretateSelect = (value) => {
    const { options } = value;
    switch (true) {
        case Array.isArray(options):
            return arraySelect(options);
        case typeof options === 'object' && options !== null:
            return objectSelect(options);
        default:
            //console.error("DATA NOT VALID SELECT", value);
            return {
                enum: [],
                enumValue: [],
                enumLabel: [],
                enumConcat: []
            }
    }
}

const objectSelect = (field) => {
    let dataEnum = [];
    let dataEnumValue = [];
    let dataEnumLabel = [];
    let dataEnumConcat = [];
    const keys = Object.keys(field);
    keys.map((key) => {
        const label = field[key]
        const value = key;
        addElement({ value, label }, { dataEnum, dataEnumValue, dataEnumLabel, dataEnumConcat })
    })
    const returnValue = {
        enum: [...dataEnum],
        enumValue: [...dataEnumValue],
        enumLabel: [...dataEnumLabel],
        enumConcat: [...dataEnumConcat]
    }
    return returnValue;
}

const arraySelect = (field) => {
    let dataEnum = [];
    let dataEnumValue = [];
    let dataEnumLabel = [];
    let dataEnumConcat = [];
    field.map((element) => {
        const value = element.code;
        const label = element.name;
        addElement({ value, label }, { dataEnum, dataEnumValue, dataEnumLabel, dataEnumConcat })
    })
    const returnValue = {
        enum: [...dataEnum],
        enumValue: [...dataEnumValue],
        enumLabel: [...dataEnumLabel],
        enumConcat: [...dataEnumConcat]
    }
    return returnValue;
}

const addElement = (values = { value: undefined, label: undefined }, enums = {
    dataEnum: [],
    dataEnumValue: [],
    dataEnumLabel: [],
    dataEnumConcat: []
}) => {
    const { value, label } = values;
    const concatId = `${value}${CONCAT_ID_BASES}${label}`;
    const { dataEnum, dataEnumValue, dataEnumLabel, dataEnumConcat } = enums;
    if (!dataEnumConcat.includes(concatId)) {
        dataEnum.push({ value, label })
        dataEnumValue.push(value);
        dataEnumLabel.push(label);
        dataEnumConcat.push(concatId);
    }
}

export const schemaTranspiler = (fields = {}, idForm, options = {}) => {
    let uiSchema = {};
    let formData = {};
    let schema = {}
    if (!fields) return { schema, uiSchema, formData };
    const data = { ...fields };
    const { titleKey = "", descriptionKey = "", requiredAll = true, keysRequired = [], type = "object", uniqueItems = false } = options;
    const dataKeys = Object.keys(data)
    schema = {
        title: titleKey ? I18n.t(titleKey) : undefined,
        description: descriptionKey ? I18n.t(descriptionKey) : undefined,
        type,
        uniqueItems,
        required: requiredAll ? [...dataKeys] : keysRequired.length ? [...keysRequired] : undefined,
        properties: {}
    }

    dataKeys.map((key) => {
        const value = data[key];
        schemaSwitcher(idForm, schema, uiSchema, formData, key, value);
    });

    return { schema, uiSchema, formData };
}

export const schemaTranspilerSimpleObject = (fields = {}, idForm, options = {}) => {
    let uiSchema = {};
    let formData = {};
    let schema = {}
    if (!fields) return { schema, uiSchema, formData };
    const data = [...fields];
    const { titleKey = "", descriptionKey = "", requiredAll = true, keysRequired = [], type = "object", uniqueItems = false } = options;
    const dataKeys = data.map((element) => (element.key));


    schema = {
        title: titleKey ? I18n.t(titleKey) : undefined,
        description: descriptionKey ? I18n.t(descriptionKey) : undefined,
        type,
        uniqueItems,
        required: requiredAll ? [...dataKeys] : keysRequired.length ? [...keysRequired] : undefined,
        properties: {}
    }


    data.map((element) => {
        const { value, key } = element;
        schemaSwitcher(idForm, schema, uiSchema, formData, key, value);
    })

    return { schema, uiSchema, formData };
}



export const splitSelectValueLabel = (concat) => ({
    value: concat.substr(0, concat.indexOf(CONCAT_ID_BASES)),
    label: concat.substr(concat.indexOf(CONCAT_ID_BASES) + 1)
})