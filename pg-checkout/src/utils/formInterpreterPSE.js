import { splitSelectValueLabel } from './schemaTranspiler';

/**
 *
 * @param {*} formData Data incoming from a form filled by the user. It is already validated
 * @param {*} extreParams OrderDetails
 * @returns
{
  "bank": {
            "code": 1022,
            "name": "BANCO"
        },
    "user": {
      "id": "117",
      "email": "gcruz@paymentez.com",
      "name": "Gabriel",
      "last_name": "Cruz",
      "fiscal_number_type": "CC",
      "fiscal_number": 123123123,
            "type": "N"
    },
    "order": {
      "dev_reference": "1",
      "description": "Quiero un producto",
      "amount": 1000.0,
      "installments": null,
      "installments_type": 1,
      "currency": "COP",
      "vat": 0.0
    }
}
 */

export const formInterpreterPSE = (extreParams, formData = {}) => {
    const { user, order } = extreParams.data;
    const { bank, fiscal_number_type, fiscal_number, type } = formData;
    let response = {
        bank: {
            code: bank ? splitSelectValueLabel(bank).value : null,
            name: bank ? splitSelectValueLabel(bank).label : null
        },
        user: {
            ...user,
            fiscal_number_type: fiscal_number_type ? splitSelectValueLabel(fiscal_number_type).value : null,
            fiscal_number,
            type: type ? splitSelectValueLabel(type).value : null
        },
        order: { ...order }
    }
    return response;
}