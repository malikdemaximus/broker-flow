<template>
  <iin-page v-if="step === 1" @changeStep="changeStep" />
  <otp-page v-if="step === 2" @changeStep="changeStep" />
  <offers-page v-if="step === 3" @changeStep="changeStep" />
</template>

<script>
import IinPage from '../IinPage/IinPage.vue'
import OffersPage from '../OffersPage.vue/OffersPage.vue'
import OtpPage from '../OtpPage'
import { orderInfo } from '../../api/order'

export default {
  name: 'MainPage',
  components: { IinPage, OtpPage, OffersPage },
  data() {
    return {
      orderInfo: null,
      step: 1,
    }
  },
  mounted() {
    const res = orderInfo()
    this.orderInfo = res
  },
  methods: {
    changeStep(st) {
      this.step = st
    },
  },
}
</script>
