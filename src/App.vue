<template>
  <a-config-provider :locale="locale">
    <ErrorBoundary>
      <Requester>
        <a-layout id="app" class="app">
          <a-layout class="nav-layout">
            <Header />
            <a-layout-content class="app__content">
              <router-view />
            </a-layout-content>
          </a-layout>
        </a-layout>
      </Requester>
    </ErrorBoundary>
  </a-config-provider>
</template>

<script>
import locale from 'ant-design-vue/es/locale/ru_RU'
import { defineComponent, computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { Header, ErrorBoundary, Requester } from '@/components'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  components: {
    Header,
    ErrorBoundary,
    Requester,
  },
  setup() {
    const isCollapsed = ref(false)
    const isOpened = ref(false)
    const route = useRoute()
    const { t } = useI18n()

    const isInnerPage = computed(
      () =>
        route.name !== 'Login' &&
        route.name !== 'ChangePassword' &&
        //route.name !== 'DisabledMerchant' &&
        Boolean(route.name),
    )

    const isDisabledMerchantPage = computed(
      () => route.name !== 'DisabledMerchant' && Boolean(route.name),
    )

    const onTriggerClick = () => {
      isCollapsed.value = !isCollapsed.value
    }

    const toggleNavbar = () => {
      isOpened.value = !isOpened.value
    }

    const isMobile = () => {
      if (
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent,
        )
      ) {
        return true
      } else {
        return false
      }
    }

    return {
      isInnerPage,
      onTriggerClick,
      isCollapsed,
      isOpened,
      locale,
      toggleNavbar,
      isMobile,
      isDisabledMerchantPage,
      t,
    }
  },
})
</script>

<style lang="scss">
@import './assets/styles/main';
</style>
