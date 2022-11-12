import { mutationTypes } from './constants'

export const initialState = {
  data: { result: [], count: 0 },
  filters: { skip: 1, limit: 10, orderBy: 'code', order: 1 },
  isLoading: false,
  loaded: false,
  error: null,
}

export const mutations = {
  [mutationTypes.clearOperationsSuccess](state) {
    state.operations = {
      ...state.operations,
      data: { result: [], count: 0 },
      loaded: false,
    }
  },
  [mutationTypes.clearOperationsFilterSuccess](state) {
    state.operations = { ...initialState }
  },
  [mutationTypes.setOperationsSuccess](state, { data, filters }) {
    state.operations = {
      ...state.operations,
      isLoading: false,
      loaded: true,
      data,
      filters,
    }
  },
}
