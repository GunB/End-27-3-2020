import { I18n } from "react-i18nify";

export const TransformErrors = (errors) => {
    return errors.map(error => {
        if (error.name === "required") {
            error.message = I18n.t(`error.required-field`)
        }
        return error;
    });
}