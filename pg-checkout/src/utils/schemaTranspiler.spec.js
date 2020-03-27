import { schemaTranspiler } from "./schemaTranspiler";

const extraFields = {
   "name": {
      "type": "text"
   },
   "last_name": {
      "type": "text"
   },
   "fiscal_number_type": {
      "type": "select",
      "options": {
         "CC": "Cédula de ciudadanía",
         "CE": "Cédula de extranjería",
         "NIT": "Número de identificación tributario",
         "TI": "Tarjeta de identidad",
         "PP": "Pasaporte",
         "IDC": "Identificador único de cliente",
         "CEL": "línea del móvil",
         "RC": "Registro civil de nacimiento",
         "DE": "Documento de identificación extranjero"
      }
   },
   "fiscal_number": {
      "type": "integer"
   },
   "type": {
      "type": "select",
      "options": {
         "N": "Natural",
         "J": "Juridica"
      }
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
            "name": "CITIBANK COLOMBIAS.A."
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

const expected = {
   "schema": {
      "description": undefined,
      "properties": {
         "bank": {
            "enum": [
               "0@A continuación seleccione su banco",
               "1552@BAN.CO",
               "1040@BANCO AGRARIO",
               "1081@BANCO AGRARIO DESARROLLO",
               "1080@BANCO AGRARIO QA DEFECTOS",
               "10322@BANCO CAJA SOCIAL",
               "1032@BANCO CAJA SOCIAL DESARROLLO",
               "1019@BANCO COLPATRIA DESARROLLO",
               "1078@BANCO COLPATRIA UAT",
               "1052@BANCO COMERCIAL AVVILLAS S.A.",
               "1061@BANCO COOMEVA S.A. - BANCOOMEVA",
               "1016@BANCO COOPERATIVO COOPCENTRAL",
               "1051@BANCO DAVIVIENDA",
               "10512@BANCO DAVIVIENDA Desarrollo",
               "1039@BANCO DE BOGOTA",
               "1001@BANCO DE BOGOTA DESARROLLO 2013",
               "1023@BANCO DE OCCIDENTE",
               "1062@BANCO FALABELLA",
               "1010@BANCO GNB COLOMBIA (ANTES HSBC)",
               "1012@BANCO GNB SUDAMERIS",
               "1060@BANCO PICHINCHA S.A.",
               "1002@BANCO POPULAR",
               "1058@BANCO PROCREDIT COLOMBIA",
               "1203@BANCO PRODUCTOS POR SEPARADO",
               "1101@Banco PSE",
               "1065@BANCO SANTANDER COLOMBIA",
               "1035@BANCO TEQUENDAMA",
               "1004@Banco union Colombia Credito",
               "1005@Banco union Colombia credito FD",
               "1022@BANCO UNION COLOMBIANO",
               "1055@Banco Web Service ACH",
               "1055@Banco Web Service ACH WSE 3.0",
               "10072@BANCOLOMBIA DATAPOWER",
               "10071@BANCOLOMBIA DESARROLLO",
               "1007@BANCOLOMBIA QA",
               "1013@BBVA COLOMBIA S.A.",
               "1009@CITIBANK COLOMBIAS.A.",
               "1292@CONFIAR COOPERATIVA FINANCIERA",
               "1551@DAVIPLATA",
               "1006@ITAU",
               "1508@NEQUI CERTIFICACION",
               "121212@Prueba Steve"
            ],
            "enumNames": [
               "A continuación seleccione su banco",
               "BAN.CO",
               "BANCO AGRARIO",
               "BANCO AGRARIO DESARROLLO",
               "BANCO AGRARIO QA DEFECTOS",
               "BANCO CAJA SOCIAL",
               "BANCO CAJA SOCIAL DESARROLLO",
               "BANCO COLPATRIA DESARROLLO",
               "BANCO COLPATRIA UAT",
               "BANCO COMERCIAL AVVILLAS S.A.",
               "BANCO COOMEVA S.A. - BANCOOMEVA",
               "BANCO COOPERATIVO COOPCENTRAL",
               "BANCO DAVIVIENDA",
               "BANCO DAVIVIENDA Desarrollo",
               "BANCO DE BOGOTA",
               "BANCO DE BOGOTA DESARROLLO 2013",
               "BANCO DE OCCIDENTE",
               "BANCO FALABELLA",
               "BANCO GNB COLOMBIA (ANTES HSBC)",
               "BANCO GNB SUDAMERIS",
               "BANCO PICHINCHA S.A.",
               "BANCO POPULAR",
               "BANCO PROCREDIT COLOMBIA",
               "BANCO PRODUCTOS POR SEPARADO",
               "Banco PSE",
               "BANCO SANTANDER COLOMBIA",
               "BANCO TEQUENDAMA",
               "Banco union Colombia Credito",
               "Banco union Colombia credito FD",
               "BANCO UNION COLOMBIANO",
               "Banco Web Service ACH",
               "Banco Web Service ACH WSE 3.0",
               "BANCOLOMBIA DATAPOWER",
               "BANCOLOMBIA DESARROLLO",
               "BANCOLOMBIA QA",
               "BBVA COLOMBIA S.A.",
               "CITIBANK COLOMBIAS.A.",
               "CONFIAR COOPERATIVA FINANCIERA",
               "DAVIPLATA",
               "ITAU",
               "NEQUI CERTIFICACION",
               "Prueba Steve"
            ],
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
                  "name": "CITIBANK COLOMBIAS.A."
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
            ],
            "title": "form-bank",
            "type": "string"
         },
         "fiscal_number": {
            "title": "form-fiscal_number",
            "type": "integer"
         },
         "fiscal_number_type": {
            "enum": [
               "CC@Cédula de ciudadanía",
               "CE@Cédula de extranjería",
               "NIT@Número de identificación tributario",
               "TI@Tarjeta de identidad",
               "PP@Pasaporte",
               "IDC@Identificador único de cliente",
               "CEL@línea del móvil",
               "RC@Registro civil de nacimiento",
               "DE@Documento de identificación extranjero"
            ],
            "enumNames": [
               "Cédula de ciudadanía",
               "Cédula de extranjería",
               "Número de identificación tributario",
               "Tarjeta de identidad",
               "Pasaporte",
               "Identificador único de cliente",
               "línea del móvil",
               "Registro civil de nacimiento",
               "Documento de identificación extranjero"
            ],
            "options": {
               "CC": "Cédula de ciudadanía",
               "CE": "Cédula de extranjería",
               "CEL": "línea del móvil",
               "DE": "Documento de identificación extranjero",
               "IDC": "Identificador único de cliente",
               "NIT": "Número de identificación tributario",
               "PP": "Pasaporte",
               "RC": "Registro civil de nacimiento",
               "TI": "Tarjeta de identidad"
            },
            "title": "form-fiscal_number_type",
            "type": "string"
         },
         "last_name": {
            "title": "form-last_name",
            "type": "string"
         },
         "name": {
            "title": "form-name",
            "type": "string"
         },
         "type": {
            "enum": [
               "N@Natural",
               "J@Juridica"
            ],
            "enumNames": [
               "Natural",
               "Juridica"
            ],
            "options": {
               "J": "Juridica",
               "N": "Natural"
            },
            "title": "form-type",
            "type": "string"
         }
      },
      "required": [
         "name",
         "last_name",
         "fiscal_number_type",
         "fiscal_number",
         "type",
         "bank"
      ],
      "title": "form_test",
      "type": "object",
      "uniqueItems": false
   },
   "uiSchema": {
      "bank": {
         "ui:widget": "select",
         "ui:disabled": false,
         "ui:readonly": false,
      },
      "fiscal_number": {
         "ui:widget": "updown",
         "ui:disabled": false,
         "ui:readonly": false,
      },
      "fiscal_number_type": {
         "ui:widget": "select",
         "ui:disabled": false,
         "ui:readonly": false,
      },
      "last_name": {
         "ui:emptyValue": "",
         "ui:disabled": false,
         "ui:readonly": false,
      },
      "name": {
         "ui:emptyValue": "",
         "ui:disabled": false,
         "ui:readonly": false,
      },
      "type": {
         "ui:widget": "select",
         "ui:disabled": false,
         "ui:readonly": false,
      }
   },
   "formData": {
      "bank": undefined,
      "fiscal_number": undefined,
      "fiscal_number_type": undefined,
      "last_name": undefined,
      "name": undefined,
      "type": undefined,
   }
}

const library = {
   url: "https://github.com/mozilla-services/react-jsonschema-form",
   name: "react-jsonschema-form"
}

describe("ShemaTranspile::Utils", () => {
   it(`Should interpretate json and create a json compatible with ${library.name}`, () => {
      expect(schemaTranspiler(extraFields, "form", { titleKey: "form_test" })).toEqual(expected);
   })
})