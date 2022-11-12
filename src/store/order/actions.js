import { actionTypes, mutationTypes } from './constants'

export const actions = {
  [actionTypes.clearOperations](context) {
    context.commit(mutationTypes.clearOperationsSuccess)
  },
  [actionTypes.clearOperationsFilter](context) {
    context.commit(mutationTypes.clearOperationsFilterSuccess)
  },
  [actionTypes.setOperations](context, { data, filters }) {
    context.commit(mutationTypes.setOperationsSuccess, {
      data,
      filters,
    })
  },
}
