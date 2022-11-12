<template>
  <div class="requester">
    <div v-if="shouldShowSpinner" class="requester__spin-wrapper">
      <a-spin size="large" spinning />
    </div>
    <slot v-else />
  </div>
</template>

<script>
import cookie from 'js-cookie'
import { toRefs, ref, watchEffect, computed } from 'vue'
import { showErrorMsg } from '@/utils'
import { useStore } from 'vuex'

export default {
  name: 'Requester',
  setup(props) {
    const { isInnerPage } = toRefs(props)
    const isFetching = ref(true)
    const store = useStore()
    const shouldShowSpinner = computed(
      () => isInnerPage.value && isFetching.value,
    )
    const initialize = async () => {
      try {
        // TODO: rearrange to store
        const isLoggedIn = cookie.get('accessToken')
        if (isLoggedIn) {
          // TODO: constants
          await store.dispatch('user/updatePermissions')
          await store.dispatch('merchant/updateInfo')
        }
      } catch (error) {
        showErrorMsg(error?.message || error)
      } finally {
        isFetching.value = false
      }
    }

    watchEffect(
      () => {
        if (isInnerPage.value) {
          initialize()
        }
      },
      {
        flush: 'post',
      },
    )

    return {
      isFetching,
      shouldShowSpinner,
    }
  },
  props: {
    isInnerPage: Boolean,
  },
}
</script>

<style scoped lang="scss">
@import './requester.scss';
</style>
