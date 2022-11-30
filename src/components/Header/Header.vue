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
    <button class="back-content" @click="changeStep()">
      <img src="../../assets/images/left-arrow.svg" alt="назад" />
      <span>{{ $t('common.goBack') }}</span>
    </button>
    <div class="logo">
      <img src="../../assets/images/logo.svg" alt="Лого" />
    </div>
    <div class="partner-logo" :class="loading ? 'loading-line' : ''">
      <img v-if="order?.merchantInfo?.logo" :src="order?.merchantInfo?.logo" alt="Лого партнера" />
    </div>
  </header>
  <go-back-modal v-if="showModal" @close="showModal = false" />
</template>

<script>
import { i18n } from '@/i18n'
import GoBackModal from '../GoBackModal'

export default {
  name: 'Header',
  components: { GoBackModal },
  data() {
    return {
      i18n,
      order: null,
      step: null,
      tokenInfo: null,
      loading: false,
      showModal: false,
    }
  },
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
    this.emitter.on('loading', (loading) => {
      this.loading = loading
    })
  },
  methods: {
    changeStep() {
      if (this.step === 0) {
        this.showModal = true
      }
      if (this.step === 2) {
        this.emitter.emit('step', 1)
      }
      if (this.tokenInfo?.agreement && this.step === 3) {
        this.emitter.emit('step', 2)
      } else {
        this.showModal = true
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
