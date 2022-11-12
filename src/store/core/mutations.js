import { MUTATION } from './constants'

const updateCities = (state, cities) => {
  state.cities = cities
}

const updateServicePoints = (state, servicePoints) => {
  state.servicePoints = servicePoints
}

const updatePaymentTypes = (state, paymentTypes) => {
  state.paymentTypes = paymentTypes
}
const updateProductCategories = (state, categories) => {
  state.productCategories = categories
}

export default {
  [MUTATION.UPDATE_CITIES]: updateCities,
  [MUTATION.UPDATE_SERVICE_POINTS]: updateServicePoints,
  [MUTATION.UPDATE_PAYMENT_TYPES]: updatePaymentTypes,
  [MUTATION.UPDATE_PRODUCT_CATEGORIES]: updateProductCategories,
}
