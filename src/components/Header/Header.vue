<template>
  <!-- <a-layout-header theme="light" class="header">
    <div class="locale-changer">
      <select @change="changeLocale" v-model="i18n.global.locale">
        <option value="ru">ru</option>
        <option value="kz">kz</option>
      </select>
    </div>
  </a-layout-header> -->
  <header class="header">
    <a class="back-content">
      <img src="../../assets/images/left-arrow.png" alt="назад" />
      <span>{{ $t('common.goBack') }}</span>
    </a>
    <div class="logo">
      <img src="../../assets/images/logo.png" alt="Лого" />
    </div>
    <div class="partner-logo">
      <img src="../../assets/images/partner-logo.png" alt="Лого партнера" />
    </div>
  </header>
</template>

<script>
import { i18n } from '@/i18n'

export default {
  name: 'Header',
  props: ['order', 'step'],
  data() {
    return {
      i18n,
    }
  },
  components: {},
  props: {
    isCollapsed: Boolean,
    onTriggerClick: Function,
  },
  methods: {
    async onLogout() {
      await this.$router.push('/login')
    },
    changeLocale() {
      localStorage.setItem('locale', i18n.global.locale)
      this.$router.go(0)
    },
  },
}
</script>

<style lang="scss">
@import './header.scss';
</style>
