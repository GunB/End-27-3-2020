import Themes from "./themes";

export default {
  serverAnswer: null,
  theme: Themes.getThemeByLocation(),
  detalles: {},
  detallesConfig: [
    'data-user-name', 'data-user-last_name', 'data-user-email',
    'data-order-dev_reference', 'data-order-description', 'data-order-amount', 'data-order-currency'
  ]
};
