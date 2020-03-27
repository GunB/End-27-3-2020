import {BASE_SERVER, DEFAULT_THEME} from "../constants/config";

const PaymentezTheme = {
  name: 'Paymentez',
  logo: BASE_SERVER + "/img/paymentez-1.png",
  primary_color: "#00BF84",
  primary_color_contrast: "rgba(255,255,255,0.85)",
  primary_color_text_over: "white",
  secondary_color: "#545454",
  side_bar_color: "#F8F8F8",
  background_image: null,
  site: "https://paymentez.com/",
  favicon: "/favicon.ico",
  domain: "paymentez.com"
};

const GlobalPayTheme = {
  name: 'GlobalPay Redeban',
  logo: BASE_SERVER + "/img/logo_global.png",
  primary_color: "#F49D31",
  primary_color_contrast: "rgba(255,255,255,0.85)",
  primary_color_text_over: "white",
  secondary_color: "#545454",
  side_bar_color: "#F8F8F8",
  background_image: null,
  site: "https://www.rbmcolombia.com",
  favicon: "/favicon_click.ico",
  domain: "globalpay.com.co"
};

const Themes = {
  paymentez: PaymentezTheme,
  link: PaymentezTheme,
  globalpay: GlobalPayTheme,
  localhost: GlobalPayTheme,
  netlify: GlobalPayTheme,

  getThemeByLocation: () => {
    const hostname = window.location.hostname;
    let domain = hostname === 'localhost' ? hostname : hostname.split('.')[1];
    if (domain === 'netlify' && DEFAULT_THEME) {
      domain = DEFAULT_THEME
    }
    return Themes[domain]
  }
};

export default Themes;
