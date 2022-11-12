import currency from 'currency.js'
export default {
  currency(value, symbol = '₸', precision = 2) {
    return (
      currency(value, {
        symbol: '',
        precision: precision,
        separator: ' ',
      }).format() + symbol
    )
  },
}
