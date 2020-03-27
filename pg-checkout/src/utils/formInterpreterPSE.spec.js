
import { formInterpreterPSE } from "./formInterpreterPSE";

const formData = {
    bank: "1039@BANCO DE BOGOTA",
    fiscal_number: 123123123,
    fiscal_number_type: "TI@Tarjeta de identidad",
    type: "N@Natural"
}

const extraParams = {
    "success": true,
    "detail": "Operation completed successfully.",
    "data": {
        "user": {
            "id": "1177",
            "email": "test@paymentez.com",
            "name": "Prueba",
            "last_name": "Test",
            "fiscal_number_type": null,
            "fiscal_number": null
        },
        "order": {
            "id": "9zGNlVA",
            "status": "Init",
            "dev_reference": "zaa12",
            "description": "Quiero un producto",
            "amount": 5001,
            "installments": null,
            "installments_type": 1,
            "currency": "COP",
            "vat": 0
        },
        "configuration": {
            "expiration_date": "2019-02-23 23:42:38",
            "partial_payment": true,
            "allowed_payment_methods": [
                "All"
            ],
            "success_url": "https://paymentez.com/",
            "failure_url": "https://paymentez.com/error",
            "pending_url": "https://paymentez.com/pending",
            "review_url": "https://paymentez.com/review"
        },
        "payment": {
            "payment_url": "https://pg-checkout.netlify.com/9zGNlVA",
            "card": {
                "name": "Card",
                "app_code": "LINKTOPAY-CLIENT",
                "app_key": "2icAlgAXm6J0YIdY3DIfyJz6pfS3jT",
                "url": "https://noccapi-stg.paymentez.com/linktopay/pay_card/9zGNlVA/"
            },
            "bank_transfer": {
                "name": "BankTransfer",
                "url": "https://noccapi-stg.paymentez.com/linktopay/pay_bank_transfer/9zGNlVA/",
                "extra_fields": {
                    "fiscal_number_type": {
                        "type": "select",
                        "options": [
                            {
                                "code": "CC",
                                "name": "Cédula de ciudadanía"
                            },
                            {
                                "code": "CE",
                                "name": "Cédula de extranjería"
                            },
                            {
                                "code": "NIT",
                                "name": "Número de identificación tributario"
                            },
                            {
                                "code": "TI",
                                "name": "Tarjeta de identidad"
                            },
                            {
                                "code": "PP",
                                "name": "Pasaporte"
                            },
                            {
                                "code": "IDC",
                                "name": "Identificador único de cliente"
                            },
                            {
                                "code": "CEL",
                                "name": "Línea del móvil"
                            },
                            {
                                "code": "RC",
                                "name": "Registro civil de nacimiento"
                            },
                            {
                                "code": "DE",
                                "name": "Documento de identificación extranjero"
                            }
                        ]
                    },
                    "fiscal_number": {
                        "type": "integer"
                    },
                    "type": {
                        "type": "select",
                        "options": [
                            {
                                "code": "N",
                                "name": "Natural"
                            },
                            {
                                "code": "J",
                                "name": "Juridica"
                            }
                        ]
                    },
                    "bank": {
                        "type": "select",
                        "options": [
                            {
                                "code": "0",
                                "name": "A continuación seleccione su banco"
                            },
                            {
                                "code": "1552",
                                "name": "BAN.CO"
                            },
                            {
                                "code": "1040",
                                "name": "BANCO AGRARIO"
                            },
                            {
                                "code": "1081",
                                "name": "BANCO AGRARIO DESARROLLO"
                            },
                            {
                                "code": "1080",
                                "name": "BANCO AGRARIO QA DEFECTOS"
                            },
                            {
                                "code": "10322",
                                "name": "BANCO CAJA SOCIAL"
                            },
                            {
                                "code": "1032",
                                "name": "BANCO CAJA SOCIAL DESARROLLO"
                            },
                            {
                                "code": "1019",
                                "name": "BANCO COLPATRIA DESARROLLO"
                            },
                            {
                                "code": "1078",
                                "name": "BANCO COLPATRIA UAT"
                            },
                            {
                                "code": "1052",
                                "name": "BANCO COMERCIAL AVVILLAS S.A."
                            },
                            {
                                "code": "1061",
                                "name": "BANCO COOMEVA S.A. - BANCOOMEVA"
                            },
                            {
                                "code": "1016",
                                "name": "BANCO COOPERATIVO COOPCENTRAL"
                            },
                            {
                                "code": "1051",
                                "name": "BANCO DAVIVIENDA"
                            },
                            {
                                "code": "10512",
                                "name": "BANCO DAVIVIENDA Desarrollo"
                            },
                            {
                                "code": "1039",
                                "name": "BANCO DE BOGOTA"
                            },
                            {
                                "code": "1001",
                                "name": "BANCO DE BOGOTA DESARROLLO 2013"
                            },
                            {
                                "code": "1023",
                                "name": "BANCO DE OCCIDENTE"
                            },
                            {
                                "code": "1062",
                                "name": "BANCO FALABELLA"
                            },
                            {
                                "code": "1010",
                                "name": "BANCO GNB COLOMBIA (ANTES HSBC)"
                            },
                            {
                                "code": "1012",
                                "name": "BANCO GNB SUDAMERIS"
                            },
                            {
                                "code": "1060",
                                "name": "BANCO PICHINCHA S.A."
                            },
                            {
                                "code": "1002",
                                "name": "BANCO POPULAR"
                            },
                            {
                                "code": "1058",
                                "name": "BANCO PROCREDIT COLOMBIA"
                            },
                            {
                                "code": "1203",
                                "name": "BANCO PRODUCTOS POR SEPARADO"
                            },
                            {
                                "code": "1101",
                                "name": "Banco PSE"
                            },
                            {
                                "code": "1065",
                                "name": "BANCO SANTANDER COLOMBIA"
                            },
                            {
                                "code": "1035",
                                "name": "BANCO TEQUENDAMA"
                            },
                            {
                                "code": "1004",
                                "name": "Banco union Colombia Credito"
                            },
                            {
                                "code": "1005",
                                "name": "Banco union Colombia credito FD"
                            },
                            {
                                "code": "1022",
                                "name": "BANCO UNION COLOMBIANO"
                            },
                            {
                                "code": "1055",
                                "name": "Banco Web Service ACH"
                            },
                            {
                                "code": "1055",
                                "name": "Banco Web Service ACH WSE 3.0"
                            },
                            {
                                "code": "10072",
                                "name": "BANCOLOMBIA DATAPOWER"
                            },
                            {
                                "code": "10071",
                                "name": "BANCOLOMBIA DESARROLLO"
                            },
                            {
                                "code": "1007",
                                "name": "BANCOLOMBIA QA"
                            },
                            {
                                "code": "1013",
                                "name": "BBVA COLOMBIA S.A."
                            },
                            {
                                "code": "1009",
                                "name": "CITIBANK COLOMBIA S.A."
                            },
                            {
                                "code": "1292",
                                "name": "CONFIAR COOPERATIVA FINANCIERA"
                            },
                            {
                                "code": "1551",
                                "name": "DAVIPLATA"
                            },
                            {
                                "code": "1006",
                                "name": "ITAU"
                            },
                            {
                                "code": "1508",
                                "name": "NEQUI CERTIFICACION"
                            },
                            {
                                "code": "121212",
                                "name": "Prueba Steve"
                            }
                        ]
                    }
                }
            },
            "cash": {
                "name": "Cash",
                "url": "https://noccapi-stg.paymentez.com/linktopay/pay_cash/9zGNlVA/",
                "extra_fields": []
            }
        }
    }
}

const expected = {
    "bank": {
        "code": "1039",
        "name": "BANCO DE BOGOTA"
    },
    "order": {
        "amount": 5001,
        "currency": "COP",
        "description": "Quiero un producto",
        "dev_reference": "zaa12",
        "id": "9zGNlVA",
        "installments": null,
        "installments_type": 1,
        "status": "Init",
        "vat": 0
    },
    "user": {
        "email": "test@paymentez.com",
        "fiscal_number": 123123123,
        "fiscal_number_type": "TI",
        "id": "1177",
        "last_name": "Test",
        "name": "Prueba",
        "type": "N"
    }
}

describe("formInterpreterPSE::Utils", () => {
    it(`Should interpretate correctly the data`, () => {
        expect(formInterpreterPSE(extraParams, formData)).toEqual(expected);
    })
})