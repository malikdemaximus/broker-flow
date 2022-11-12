import mutations from './mutations'
import actions from './actions'
import getters from './getters'

const initialState = {
  cities: {},
  servicePoints: {},
  paymentTypes: {},
  productCategories: {},
}

export const core = {
  namespaced: true,
  state: () => initialState,
  mutations,
  actions,
  getters,
}
