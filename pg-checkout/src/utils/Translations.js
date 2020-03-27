const { I18n } = require("react-i18nify");
import store from "store";

I18n.setTranslations({
  en: {
    "404-title": "Page not found",
    "404-message": "The redirect page could not be found",
    "order@user-name": "Name",
    "order@user-last_name": "Lastname",
    "order@user-email": "E-mail",
    "order@order-dev_reference": "Reference number",
    "order@order-description": "Description",
    "order@order-amount": "Purchase amount",
    "order@order-currency": "Currency",
    "pick-payment-method": "Payment methods",
    payment_will_be: "Your payment will be",
    "paymentez-conf_invalid_card_type_message":
      "Invalid credit card for this operation",
    "payment-title-pse": "Bank transfer",
    "payment-title-cash": "Pay with cash",
    "payment-method-card": "Pay with credit card",
    "payment-method-banktransfer": "Bank transfer",
    "payment-method-cash": "Generate payment code",
    "payment-description-paymentez": "Safety pay using your credit card",
    "payment-description-pse":
      "Paymentez® process local payments in computer games, web pages and movile applications in Latam. We are	conected to local credit card carriers in 6 countries, we offer	bank transfer and cash payments in every country to	provide	a wide payment gateway to our customers.",
    "payment-description-cash":
      "Paymentez® process local payments in computer games, web pages and movile applications in Latam. We are	conected to local credit card carriers in 6 countries, we offer	bank transfer and cash payments in every country to	provide	a wide payment gateway to our customers.",
    "payment-action-button-paymentez": "Pay with credit card",
    "payment-action-button-pse": "Pay with bank transfer",
    "payment-action-button-cash": "Pay with cash",
    "payment-cancel-button": "Cancel",
    "payment-title-description-cash":
      "You will be redirected to the cash payment page, remember to keep in mind the following:",
    "payment-cash-recommend-1":
      "A payment code will be generated for your purchase.",
    "payment-cash-recommend-2":
      "A payment place list will be appear, where you could make the payment.",
    "payment-cash-recommend-3":
      "Take the payment code of your purchase and the establishment code to make the payment.",
    "payment-cash-recommend-4":
      "You will get an e-mail when you finish your payment",
    "loading-payment": "We are processing your payment",
    "transaction-info-title": "Transaction details",
    "info-description-title": "Transaction information",
    "info-description-description": "This page could be reached in any moment.",
    "info-description-continue": "Continue...",
    "pse-fiscal_number_type": "Document type",
    "pse-fiscal_number": "Document number",
    "pse-type": "Person type",
    "pse-bank": "Bank",
    "checkout-landing-title": "Purchase details",
    /** INFO PAGE TRANSACTION */
    id: "Identification",
    description: "Description",
    amount: "Amount",
    dev_reference: "Reference",
    payment_method: "Payment method",
    nit: "Identification number",
    status: "Status",
    bank_code: "Bank code",
    bank_name: "Bank name",
    paid_date: "Paid date",
    ticket_id: "Ticket identification",
    error_message: "ERROR MESSAGE", //Contactar a Adrian Montiel. Estos son detalles de PSE. Return message
    details: "Details",
    trazability_code: "Traceability code",
    first_name: "Name",
    last_name: "Lastname",
    email: "E-mail",
    order: "Order",
    transaction: "Transaction",
    user: "User",
    agreement: "Agreement",
    reference: "Reference code",
    expiration_date: "Expiration date",
    "info-description-url_finalize": "Finalize",
    "info-description-url_return": "Return to transaction...",
    "generate-payment-code-title": "Code to generate payment",
    "generate-payment-code-description":
      "The following code to pay your order will be valid until",
    "payment-code": "Code por payment",
    init: "Initiate",
    pending: "Pending",
    payed: "Payed",
    rejected: "Rejected",
    cancelled: "Cancelled",
    expired: "Expired",
    failed: "Failed",
    Card: "Credit card",
    card: "Credit card",
    number: "Number",
    type: "Type",
    installments: "Installments",
    message: "Message",
    payment_date: "Payment date",
    authorization_code: "Authorization code",
    BankTransfer: "Bank transfer",
    Cash: "Cash payment",
    PSE: "Bank transfer",
    Init: "Initiate",
    Pending: "Pending",
    Payed: "Payed",
    Rejected: "Rejected",
    Cancelled: "Cancelled",
    Expired: "Expired",
    Failed: "Failed",
    approved: "Approved",
    failure: "Failure",
    success: "Success",
    "read-more": "Read more",
    "generate-payment-code-recommendation":
      "Your cash payment is pending, remember to keep in mind the following:",
    "generate-payment-code-recommendation-list": {
      1: "Check the list of points where you can make the purchase in the purchase summary",
      2: "Take the payment code of your purchase and the establishment code to make the payment",
      3: "You will receive a confirmation e-mail when the payment will be done."
    },
    error: {
      "required-field": "Required field"
    },
    "footer-title": "About Link to Pay",
    footer1: "Terms and conditions",
    footer2: "FAQs",
    footer3: "Contact and support",
    print: "Print",
    "info-landing-title": "Summary payment",
    "payment-loading-description":
      "Processing the transaction with some payment method"
  },
  es: {
    "404-title": "Lo sentimos, no encontramos la página",
    "404-message":
      "La página que buscas o a la que fuiste redirigido, no puede ser encontrada",
    "order@user-name": "Nombre",
    "order@user-last_name": "Apellido",
    "order@user-email": "Correo electronico",
    "order@order-dev_reference": "Número de referencia",
    "order@order-description": "Descripción",
    "order@order-amount": "Valor de la compra",
    "order@order-currency": "Moneda",
    "pick-payment-method": "Métodos de pago",
    payment_will_be: "Tu pago será de:",
    "paymentez-conf_invalid_card_type_message":
      "Tarjeta de crédito inválida para esta operación",
    "payment-title-pse": "Pago con PSE",
    "payment-title-cash": "Pago con efectivo",
    "payment-method-card": "Pagar con tarjeta de crédito",
    "payment-method-banktransfer": "Pago con PSE",
    "payment-method-cash": "Generar código de pago",
    "payment-description-paymentez":
      "Paga de forma segura usando tu tarjeta de crédito",
    "payment-description-pse":
      "Paymentez® procesa pagos locales en juegos de computador, sitios web y aplicaciones móviles en Latinoamérica. Estamos conectados con adquirientes locales de tarjetas de crédito en 6 países, ofrecemos transferencia bancaria y pagos en efectivo en cada país para proveer una plataforma de pagos amplia para nuestros clientes.",
    "payment-description-cash":
      "Paymentez® procesa pagos locales en juegos de computador, sitios web y aplicaciones móviles en Latinoamérica. Estamos conectados con adquirientes locales de tarjetas de crédito en 6 países, ofrecemos transferencia bancaria y pagos en efectivo en cada país para proveer una plataforma de pagos amplia para nuestros clientes.",
    "payment-action-button-paymentez": "Pagar con Tarjeta de crédito",
    "payment-action-button-pse": "Pagar con PSE",
    "payment-action-button-cash": "Pagar con Efectivo",
    "payment-cancel-button": "Cancelar",
    "payment-title-description-cash":
      "A continuación serás redirigido a la página de Pago con efectivo, recuerda tener en cuenta lo siguiente:",
    "payment-cash-recommend-1": "Se generará un código de pago para tu compra.",
    "payment-cash-recommend-2":
      "Aparecerá una lista de puntos en donde podrás realizar tu pago.",
    "payment-cash-recommend-3":
      "Lleva el código de pago de tu compra y el código del punto para realizar el pago.",
    "payment-cash-recommend-4":
      "Recibirás un correo de confirmación cuando realices tu pago.",
    "loading-payment": "Estamos procesando tu pago",
    "transaction-info-title": "Detalles de la transacción",
    "info-description-title": "Información de la transacción",
    "info-description-description":
      "Esta página puede ser consultada en cualquier momento.",
    "info-description-continue": "Continuar...",
    "pse-fiscal_number_type": "Tipo de documento",
    "pse-fiscal_number": "Número de documento",
    "pse-type": "Tipo de persona",
    "pse-bank": "Banco",
    "checkout-landing-title": "Detalles de tu compra",
    /** INFO PAGE TRANSACTION */
    id: "Identificación",
    description: "Descripción",
    amount: "Monto",
    dev_reference: "Referencia",
    payment_method: "Método de pago",
    nit: "Número de identificación",
    status: "Estado",
    bank_code: "Código del banco",
    bank_name: "Nombre del Banco",
    paid_date: "Fecha de pago",
    ticket_id: "Identificación del ticket",
    error_message: "Detalles", //Contactar a Adrian Montiel. Estos son detalles de PSE.
    details: "Detalles",
    trazability_code: "Código de trazabilidad",
    first_name: "Nombre",
    last_name: "Apellido",
    email: "Correo electrónico",
    order: "Orden",
    transaction: "Transacción",
    user: "Usuario",
    agreement: "Convenio",
    reference: "Código para pago",
    expiration_date: "Fecha de expiración",
    "info-description-url_finalize": "Finalizar",
    "info-description-url_return": "Regresar a la transacción...",
    "generate-payment-code-title": "Código para generar pago",
    "generate-payment-code-description":
      "El siguiente código para pagar tu producto está vigente hasta",
    "payment-code": "Código para pago",
    init: "Iniciado",
    pending: "Pendiente",
    payed: "Pagado",
    rejected: "Rechazado",
    cancelled: "Cancelado",
    expired: "Expirado",
    failed: "Fallado",
    Card: "Tarjeta de crédito",
    card: "Tarjeta de crédito",
    number: "Número",
    type: "Tipo",
    installments: "Cuotas",
    message: "Mensaje",
    payment_date: "Fecha de pago",
    authorization_code: "Código de autorización",
    BankTransfer: "Transferencia bancaria",
    Cash: "Pago en efectivo",
    PSE: "Pago con PSE",
    Init: "Iniciado",
    Pending: "Pendiente",
    Payed: "Pagado",
    Rejected: "Rechazado",
    Cancelled: "Cancelado",
    Expired: "Expirado",
    Failed: "Fallida",
    approved: "Aprobada",
    failure: "Fallida",
    success: "Aprobada",
    "read-more": "Leer más",
    "generate-payment-code-recommendation":
      "Tu pago en efectivo se encuentra pendiente, recuerda tener en cuenta lo siguiente:",
    "generate-payment-code-recommendation-list": {
      1: "Consulta en el resumen de la compra la lista de puntos en donde podrás realizar tu pago.",
      2: "Lleva el código de pago de tu compra y el código del punto para realizar el pago.",
      3: "Recibirás un correo de confirmación cuando realices tu pago."
    },
    error: {
      "required-field": "Este campo es requerido"
    },
    "footer-title": "Sobre Link to Pay",
    footer1: "Términos y condiciones de uso",
    footer2: "Preguntas frecuentes",
    footer3: "Contacto y soporte",
    print: "Imprimir",
    "info-landing-title": "Resumen de tu compra",
    "payment-loading-description":
      "La transacción se esta procesando con algun métodos de pago"
  },
  pt: {
    "404-title": "Desculpe, não conseguimos a página",
    "404-message":
      "A página que você está procurando ou que foi redirecionado não pode ser encontrada",
    "order@user-name": "Nome",
    "order@user-last_name": "Sobrenome",
    "order@user-email": "E-mail",
    "order@order-dev_reference": "Número de referência",
    "order@order-description": "Descrição",
    "order@order-amount": "Valor da compra",
    "order@order-currency": "Moeda",
    "pick-payment-method": "Formas de pagamento",
    payment_will_be: "Seu pagamento será:",
    "paymentez-conf_invalid_card_type_message":
      "Cartão de crédito inválido para esta operação",
    "payment-title-pse": "Pagamento com transferência bancária",
    "payment-title-cash": "Pagamento com dinheiro",
    "payment-method-card": "Pagar com cartão de crédito",
    "payment-method-banktransfer": "Pagamento com transferência bancária",
    "payment-method-cash": "Gerar código de pagamento",
    "payment-description-paymentez":
      "Pague com segurança usando seu cartão de crédito",
    "payment-description-pse":
      "Paymentez® processa pagamentos locais em jogos de computador, sites e aplicativos móveis na América Latina. Estamos conectados com emissores locais de cartões de crédito em 6 países, oferecemos transferências bancárias e pagamentos em dinheiro em cada país para fornecer uma plataforma abrangente de pagamento para nossos clientes.",
    "payment-description-cash":
      "Paymentez® processa pagamentos locais em jogos de computador, sites e aplicativos móveis na América Latina. Estamos conectados com emissores locais de cartões de crédito em 6 países, oferecemos transferências bancárias e pagamentos em dinheiro em cada país para fornecer uma plataforma abrangente de pagamento para nossos clientes.",
    "payment-action-button-paymentez": "Pagar com cartão de crédito",
    "payment-action-button-pse": "Pagar com transferência bancária",
    "payment-action-button-cash": "Pagar com dinheiro",
    "payment-cancel-button": "Cancelar",
    "payment-title-description-cash":
      "Você será redirecionado para a página Pagamento em dinheiro. Lembre-se de considerar o seguinte:",
    "payment-cash-recommend-1":
      "Um código de pagamento será gerado para sua compra.",
    "payment-cash-recommend-2":
      "Uma lista de pontos aparecerá onde você poderá efetuar seu pagamento",
    "payment-cash-recommend-3":
      "Pegue o código de pagamento da sua compra e o código do ponto para efetuar o pagamento.",
    "payment-cash-recommend-4":
      "Você receberá um e-mail de confirmação quando efetuar seu pagamento.",
    "loading-payment": "Estamos processando seu pagamento",
    "transaction-info-title": "Detalhes da transação",
    "info-description-title": "Informações sobre transações",
    "info-description-description":
      "Esta página pode ser consultada a qualquer momento.",
    "info-description-continue": "Continuar...",
    "pse-fiscal_number_type": "Tipo de documento",
    "pse-fiscal_number": "Número de documento",
    "pse-type": "Tipo de pessoa",
    "pse-bank": "Banco",
    "checkout-landing-title": "Detalhes da sua compra",
    /** INFO PAGE TRANSACTION */
    id: "Identificação",
    description: "Descrição",
    amount: "Valor",
    dev_reference: "Referência",
    payment_method: "Forma de pagamento",
    nit: "Número de identificação",
    status: "Status",
    bank_code: "Código do banco",
    bank_name: "Nome do banco",
    paid_date: "Data de pagamento",
    ticket_id: "Identificação da compra",
    error_message: "Detalles", //Contactar a Adrian Montiel. Estos son detalles de PSE. Detalhes
    details: "Detalhes",
    trazability_code: "Código de rastreio",
    first_name: "Nome",
    last_name: "Sobrenome",
    email: "E-mail",
    order: "Pedido",
    transaction: "Transação",
    user: "Usuário",
    agreement: "Acordo",
    reference: "Código de pagamento",
    expiration_date: "Data de validade",
    "info-description-url_finalize": "Concluir",
    "info-description-url_return": "Retornar à transação...",
    "generate-payment-code-title": "Código para gerar o pagamento",
    "generate-payment-code-description":
      "Para pagar o seu pedido use esse código válido até",
    "payment-code": "Código para pagamento",
    init: "Iniciado",
    pending: "Pendente",
    payed: "Pago",
    rejected: "Rejeitado",
    cancelled: "Cancelado",
    expired: "Expirado",
    failed: "Falhou",
    Card: "Cartão de crédito",
    card: "Cartão de crédito",
    number: "Número",
    type: "Tipo",
    installments: "Parcelas",
    message: "Mensagem",
    payment_date: "Data de pagamento",
    authorization_code: "Código de autorização",
    BankTransfer: "Transferência bancária",
    Cash: "Pagamento em dinheiro",
    PSE: "Pagamento com transferência bancária",
    Init: "Inciando",
    Pending: "Pendente",
    Payed: "Pago",
    Rejected: "Rejeitado",
    Cancelled: "Cancelado",
    Expired: "Expirado",
    Failed: "Falhou",
    approved: "Aprovado",
    failure: "Falhou",
    success: "Aprovado",
    "read-more": "Ler mais",
    "generate-payment-code-recommendation":
      "Seu pagamento em dinheiro está pendente, lembre-se de considerar o seguinte",
    "generate-payment-code-recommendation-list": {
      1: "Verifique o resumo da compra para obter a lista de pontos em que você pode efetuar seu pagamento.",
      2: "Pegue o código de pagamento da sua compra e o código do ponto para efetuar o pagamento",
      3: "Você receberá um email de confirmação quando efetuar seu pagamento"
    },
    error: {
      "required-field": "Este campo é obrigatório."
    },
    "footer-title": "Sobre o Link to Pay",
    footer1: "Termos e condições de uso",
    footer2: "Perguntas frequentes",
    footer3: "Contato e suporte",
    print: "Salvar",
    "info-landing-title": "Resumo da sua compra",
    "payment-loading-description":
      "A transação está sendo processada com algumas formas de pagamento"
  }
});

export const getFirstBrowserLanguage = function() {
  let nav = window.navigator,
    browserLanguagePropertyKeys = [
      "language",
      "browserLanguage",
      "systemLanguage",
      "userLanguage"
    ],
    i,
    language;

  // support for HTML 5.1 "navigator.languages"
  if (Array.isArray(nav.languages)) {
    for (i = 0; i < nav.languages.length; i++) {
      language = nav.languages[i];
      if (language && language.length) {
        return language;
      }
    }
  }

  // support for other well known properties in browsers
  for (i = 0; i < browserLanguagePropertyKeys.length; i++) {
    language = nav[browserLanguagePropertyKeys[i]];
    if (language && language.length) {
      return language;
    }
  }

  return null;
};

export const lang = getFirstBrowserLanguage().split("-");

const configs = store.get("linktopay") || {};

I18n.setLocale(configs.lang || lang[0] || "es");
