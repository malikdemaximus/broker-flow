import { ref } from 'vue'

export const useInProgress = (initialState = {}) => {
  const inProgress = ref(initialState)

  const setInProgress = (id, value) => {
    inProgress.value = {
      ...inProgress.value,
      [id]: value,
    }
  }

  return {
    setInProgress,
    inProgress,
  }
}
