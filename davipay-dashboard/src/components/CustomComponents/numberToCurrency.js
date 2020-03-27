const NumberToCurrency = ({ lang = 'es-CO', currency = 'COP', value }) => {
  return new Intl.NumberFormat(lang, { style: 'currency', currency }).format(value)
}

export default NumberToCurrency
