<template>
  <iin-page v-if="step === 1" :order="orderInfo" @changeStep="changeStep" />
  <otp-page v-if="step === 2" @changeStep="changeStep" />
  <offers-page v-if="step === 3" @changeStep="changeStep" />
  <errors-page
    v-if="step === 0"
    :errorText="errorText"
    @changeStep="changeStep"
  />
</template>

<script>
import IinPage from '../IinPage/IinPage.vue'
import ErrorsPage from '../ErrorsPage/ErrorsPage.vue'
import OffersPage from '../OffersPage.vue/OffersPage.vue'
import OtpPage from '../OtpPage'
import { orderInfo } from '../../api/order'

export default {
  name: 'MainPage',
  components: { IinPage, OtpPage, OffersPage, ErrorsPage },
  data() {
    return {
      orderInfo: null,
      step: 3,
      tokenInfo: null,
      accessToken: null,
      errorText: null,
    }
  },
  created() {
    if (this.$route.params.token) {
      localStorage.setItem('accessToken', this.$route.params.token)
      this.$router.replace('/')
    }
    this.accessToken = localStorage.getItem('accessToken')
    this.tokenInfo = this.parseJwt(this.accessToken)
  },
  // async mounted() {
  //   const res = await orderInfo()
  //   if (!res.success) {
  //     this.step = 0
  //     this.errorText = res.data?.error?.message
  //   } else {
  //     this.orderInfo = res.data
  //     this.$emit('order', this.orderInfo)
  //     this.$emit('step', this.step)
  //     if (this.tokenInfo?.agreement) {
  //       this.step = 1
  //     }
  //   }
  // },
  methods: {
    changeStep(st) {
      this.step = st
    },
    parseJwt(token) {
      if (token && token[0] != '[' && token != 'undefined') {
        const base64Url = token.split('.')[1]
        const base64 = base64Url.replace('-', '+').replace('_', '/')
        return JSON.parse(window.atob(base64))
      }
      return
    },
  },
}
</script>
