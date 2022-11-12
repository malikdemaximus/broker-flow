import { createStore } from 'vuex'
import VuexPersistence from 'vuex-persist'
import { core } from './core'

const vuexPersistence = new VuexPersistence({
  storage: window.localStorage,
  modules: ['user'],
})

const store = createStore({
  modules: {
    core,
  },
  plugins: [vuexPersistence.plugin],
})

export default store
