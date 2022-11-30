<template>
  <div class="process-wrapper">
    <div class="process-content">
      <h3 class="title">{{ $t('common.loanProcessing') }}</h3>
      <div class="otp-info">
        <p>{{ $t('common.enterOtpCode') }} <b> +7 {{ phoneNumber }}</b></p>
      </div>
      <div class="otp-numbers">
        <OTP v-show="!loading" :digit-count="4" :incorrectOtp="incorrectOtp" :correctOtp="correctOtp"
          @update:otp="otpValue = $event" />
        <default-loader v-show="loading" size="middle" />
      </div>
      <span v-if="incorrectOtp" class="error-otp">Проверьте, правильно ли введен код</span>
      <p class="agreement">
        {{ agreementText.slice(0, agreementText.indexOf('Публичной оферте')) }}
        <a href="https://static-data.object.pscloud.io/docs/broker_agreement.pdf" target="_blank">{{
            agreementText.slice(agreementText.indexOf('Публичной оферте'), agreementText.indexOf('и подписываю'))
        }}</a> и подписываю
        <a href="">Согласие на сбор и обработку персональных данных</a>
      </p>
      <button :disabled="seconds !== 0" class="default-button" @click="resetSeconds()">
        <span v-if="seconds !== 0">{{ $t('common.resendAfter') }} {{ seconds }} {{ $t('common.sec') }}
          {{ $t('common.afterSec') }}</span>
        <span v-else>{{ $t('common.resend') }}</span>
      </button>
    </div>
  </div>
</template>

<script>
import OTP from '../../components/OTP/OTP.vue'
import { verifyAgreementId, verifyAgreement } from '../../api/order'
import DefaultLoader from '../../components/DefaultLoader/DefaultLoader.vue'
export default {
  name: 'OtpPage',
  components: { OTP, DefaultLoader },
  props: ['order', 'specification', 'iin', 'signAgreementId'],
  data() {
    return {
      otpValue: '',
      verificationId: null,
      incorrectOtp: false,
      correctOtp: false,
      secondsTimer: 0,
      seconds: 60,
      loading: false,
    }
  },
  watch: {
    async otpValue(newOtpValue) {
      if (newOtpValue.length === 4) {
        const isSmsCodeTrue = await this.verifySmsCode()
        if (isSmsCodeTrue) {
          this.incorrectOtp = false
          this.correctOtp = true
        } else {
          this.incorrectOtp = true
          this.correctOtp = false
        }
      } else {
        this.incorrectOtp = false
        this.correctOtp = false
      }
    },
    correctOtp(newCorrectOtp) {
      if (newCorrectOtp) {
        setTimeout(() => {
          this.$emit('changeStep', 3)
        }, 500)
      }
    },
  },
  computed: {
    agreementText() {
      return this.specification?.languages?.ru?.description
    },
    phoneNumber() {
      let x = this.order?.customer?.contact?.mobileNumber.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/);
      return '(' + x[1] + ') ' + x[2] + '-' + x[3] + '-' + x[4];
    }
  },
  mounted() {
    this.startSeconds()
    this.verify()
  },
  methods: {
    startSeconds() {
      const timeout = 1000

      this.secondsTimer = setInterval(() => {
        if (this.seconds != 0) {
          this.seconds = this.seconds - 1
        }
      }, timeout)
    },
    async verify() {
      const configData = {
        sign_agreement_id: this.signAgreementId,
      }
      const res = await verifyAgreementId(configData)
      if (res.success) {
        this.verificationId = res.data?.verification_id
      }
    },
    async verifySmsCode() {
      this.loading = true
      const configData = {
        verificationId: this.verificationId,
        smsCode: this.otpValue,
        iin: this.iin,
      }
      const res = await verifyAgreement(configData)
      this.loading = false
      if (res.success) {
        return true
      } else {
        console.log(res)
        return false
      }
    },
    resetSeconds() {
      clearInterval(this.secondsTimer)
      this.seconds = 60
      this.startSeconds()
    },
  },
  unmounted() {
    clearInterval(this.secondsTimer)
  },
}
</script>
<style lang="scss">
.otp-info {
  margin-top: 26px;
  margin-bottom: 24px;
  font-size: 15px;
  line-height: 24px;
}

.otp-numbers {
  text-align: center;
  display: flex;
  justify-content: center;
}

.agreement {
  font-weight: 600;
  font-size: 12px;
  line-height: 18px;
  margin-bottom: 24px;
  margin-top: 24px;
}

.error-otp {
  color: #f15515;
  font-weight: 600;
  font-size: 12px;
  line-height: 16px;
  text-align: center;
  margin-top: 16px;
  display: block;
}
</style>
