<template>
  <a-config-provider :locale="locale">
    <ErrorBoundary>
      <a-layout id="app" class="app">
        <a-layout class="nav-layout">
          <Header v-if="(innerWidth > 769)" />
          <a-layout-content class="app__content">
            <router-view :innerWidth="innerWidth" />
          </a-layout-content>
        </a-layout>
      </a-layout>
    </ErrorBoundary>
  </a-config-provider>
</template>

<script>
import locale from 'ant-design-vue/es/locale/ru_RU'
import { defineComponent } from 'vue'
import { Header, ErrorBoundary } from '@/components'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  components: {
    Header,
    ErrorBoundary,
  },

  data() {
    return {
      innerWidth: window.innerWidth,
    }
  },

  mounted() {
    this.$nextTick(() => {
      window.addEventListener('resize', this.onResize);
    })
  },

  methods: {
    getOrder(order) {
      this.order = order
    },
    onResize() {
      this.innerWidth = window.innerWidth
    },
  },

  unmounted() {
    window.removeEventListener('resize', this.onResize)
  },

  setup() {
    const { t } = useI18n()

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
      locale,
      isMobile,
      t,
    }
  },
})
</script>

<style lang="scss">
@import './assets/styles/main';
</style>
