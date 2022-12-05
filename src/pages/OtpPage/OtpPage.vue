<template>
  <div class="process-wrapper">
    <div class="process-content">
      <mobile-header :text="'common.loanProcessing'" :redirectUrl="order?.redirectUrl" v-if="(innerWidth < 769)" />
      <div class="process-info">
        <h3 class="title" v-if="(innerWidth > 769)">{{ $t('common.loanProcessing') }}</h3>
        <mobile-header-logos :order="order" v-if="(innerWidth < 769)" />
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
        <button :disabled="seconds !== 0" :class="{ 'default-button': true, 'mobile-btn': innerWidth < 769 }"
          @click="resetSeconds()">
          <span v-if="seconds !== 0">{{ $t('common.resendAfter') }} {{ seconds }} {{ $t('common.sec') }}
            {{ $t('common.afterSec') }}</span>
          <span v-else>{{ $t('common.resend') }}</span>
        </button>
      </div>

    </div>
  </div>
</template>

<script>
import OTP from '../../components/OTP/OTP.vue'
import { verifyAgreementId, verifyAgreement } from '../../api/order'
import DefaultLoader from '../../components/DefaultLoader/DefaultLoader.vue'
import MobileHeaderLogos from '../../components/MobileHeaderLogos/MobileHeaderLogos.vue'
import MobileHeader from '../../components/MobileHeader/MobileHeader.vue'
export default {
  name: 'OtpPage',
  components: { OTP, DefaultLoader, MobileHeaderLogos, MobileHeader },
  props: ['order', 'specification', 'iin', 'signAgreementId', 'innerWidth'],
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
      if (x) {
        return '(' + x[1] + ') ' + x[2] + '-' + x[3] + '-' + x[4]
      } else {
        return null
      }
    },
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

@media screen and (max-width: 769px) {
  .otp-info {
    padding: 0 8px;
    margin-bottom: 40px;

    p {
      font-weight: 400;
      font-size: 16px;
      line-height: 24px;
      text-align: center;
    }

    b {
      display: block;
    }
  }

  .agreement {
    margin-top: 64px;
  }
}
</style>
