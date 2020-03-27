export const formatCurrency = value => {
  if (value) {
    return Intl.NumberFormat('de-DE').format(value)
    //return value.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
  }
  return ''
}

export default {
  formatCurrency,
}
