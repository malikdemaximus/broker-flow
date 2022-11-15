<template>
  <div class="process-wrapper">
    <div class="process-content">
      <h3 class="title">{{ $t('common.loanProcessing') }}</h3>
      <div class="otp-info">
        <p>{{ $t('common.enterOtpCode') }} <b> +7 (777) 123-45-67</b></p>
      </div>
      <div style="text-align: center">
        <OTP
          :digit-count="4"
          :incorrectOtp="incorrectOtp"
          :correctOtp="correctOtp"
          @update:otp="otpValue = $event"
        />
      </div>
      <span v-if="incorrectOtp" class="error-otp"
        >Проверьте, правильно ли введен код</span
      >
      <p class="agreement">
        Вводя код, полученный мной в SMS-сообщении на мой абонентский номер
        мобильной связи, подтверждаю, что присоединяюсь к
        <a href=""
          >Публичной оферте ТОО «Airba Pay» для физических лиц, Соглашению ТОО
          «Airba FinTech»,</a
        >
        и подписываю
        <a href="">Согласие на сбор и обработку персональных данных</a>
      </p>
      <button
        :disabled="seconds !== 0"
        class="default-button"
        @click="resetSeconds()"
      >
        <span v-if="seconds !== 0"
          >{{ $t('common.resendAfter') }} {{ seconds }} {{ $t('common.sec') }}
          {{ $t('common.afterSec') }}</span
        >
        <span v-else>{{ $t('common.resend') }}</span>
      </button>
    </div>
  </div>
</template>

<script>
import OTP from '../../components/OTP/OTP.vue'
export default {
  name: 'OtpPage',
  components: { OTP },
  data() {
    return {
      otpValue: '',
      correctOtpValue: '1111',
      incorrectOtp: false,
      correctOtp: false,
      secondsTimer: 0,
      seconds: 60,
    }
  },
  watch: {
    otpValue(newOtpValue) {
      if (newOtpValue.length === 4) {
        if (this.correctOtpValue == newOtpValue) {
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
  mounted() {
    this.startSeconds()
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
