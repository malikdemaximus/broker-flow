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
    <a class="back-content" @click="changeStep()">
      <img src="../../assets/images/left-arrow.png" alt="назад" />
      <span>{{ $t('common.goBack') }}</span>
    </a>
    <div class="logo">
      <img src="../../assets/images/logo.png" alt="Лого" />
    </div>
    <div class="partner-logo">
      <img :src="order?.merchantInfo?.logo" alt="Лого партнера" />
    </div>
  </header>
</template>

<script>
import { i18n } from '@/i18n'

export default {
  name: 'Header',
  data() {
    return {
      i18n,
      order: null,
      step: null,
      tokenInfo: null,
    }
  },
  components: {},
  mounted() {
    this.emitter.on('step', (step) => {
      this.step = step
    })
    this.emitter.on('order', (order) => {
      this.order = order
    })
    this.emitter.on('tokenInfo', (tokenInfo) => {
      this.tokenInfo = tokenInfo
    })
  },
  methods: {
    changeStep() {
      if (this.step === 2) {
        this.emitter.emit('step', 1)
      }
      if (this.tokenInfo?.agreement && this.step === 3) {
        this.emitter.emit('step', 2)
      } else {
        window.location.href = this.order.redirectUrl
      }
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
