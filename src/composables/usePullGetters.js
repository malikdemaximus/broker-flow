import { computed } from 'vue'
import { useStore } from 'vuex'

export const usePullGetters = (getters = {}) => {
  const store = useStore()
  const computedGetters = Object.entries(getters).map(([name, key]) => [
    name,
    computed(() => store.getters[key]),
  ])

  return Object.fromEntries(computedGetters)
}
