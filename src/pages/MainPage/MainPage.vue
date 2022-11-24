<template>
  <iin-page v-if="step === 1" :order="orderInfo" :specification="specificationInfo" @iin="(iinCode) => iin = iinCode"
    @changeSignAgreementId="changeSignAgreementId" @changeStep="changeStep" />
  <otp-page v-if="step === 2" :order="orderInfo" :iin="iin" :specification="specificationInfo" @changeStep="changeStep"
    :signAgreementId="signAgreementId" />
  <offers-page v-if="step === 3" @changeStep="changeStep" :processed="processed" />
  <errors-page v-if="step === 0" :errorText="errorText" @changeStep="changeStep" />
</template>

<script>
import IinPage from '../IinPage/IinPage.vue'
import ErrorsPage from '../ErrorsPage/ErrorsPage.vue'
import OffersPage from '../OffersPage.vue/OffersPage.vue'
import OtpPage from '../OtpPage'
import { orderInfo, specification } from '../../api/order'

export default {
  name: 'MainPage',
  components: { IinPage, OtpPage, OffersPage, ErrorsPage },
  props: ['hello'],
  data() {
    return {
      orderInfo: null,
      step: 1,
      tokenInfo: null,
      accessToken: null,
      errorText: null,
      agreementInfo: null,
      specificationInfo: null,
      signAgreementId: null,
      loading: false,
      iin: null,
      processed: false,
    }
  },
  created() {
    if (this.$route.params.token) {
      localStorage.setItem('accessToken', this.$route.params.token)
      this.$router.replace('/')
    }
    this.accessToken = localStorage.getItem('accessToken')
    this.tokenInfo = this.parseJwt(this.accessToken)
    if (this.tokenInfo?.agreement) {
      this.step = 1
    } else {
      this.step = 3
    }
  },
  async mounted() {
    this.emitter.on('step', (step) => {
      this.step = step
    })

    this.getOrderInfo()
    this.getSpecificationInfo()
  },
  watch: {
    step(newStep) {
      this.emitter.emit('step', newStep)
    },
  },
  methods: {
    async getOrderInfo() {
      this.loading = true
      this.emitter.emit('loading', this.loading)
      const res = await orderInfo()
      if (!res.success) {
        this.step = 0
        this.errorText = res.data?.error?.message
      } else {
        this.orderInfo = res.data
        this.emitter.emit('order', this.orderInfo)
        this.emitter.emit('tokenInfo', this.tokenInfo)
        if (this.orderInfo.stateCode === 'processed') {
          this.processed = true
          this.step = 3
        }
        if (this.orderInfo.stateCode === 'cancelled') {
          this.errorText = 'Заявка была отменена'
          this.step = 0
        }
      }
      this.loading = false
      this.emitter.emit('loading', this.loading)
    },
    async getSpecificationInfo() {
      const res = await specification()
      if (!res.success) {
        this.step = 0
        this.errorText = res.data?.error?.message
      } else {
        this.specificationInfo = res.data
      }
    },
    changeStep(st) {
      this.step = st
    },
    changeSignAgreementId(sn) {
      this.signAgreementId = sn
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
<style>

</style>