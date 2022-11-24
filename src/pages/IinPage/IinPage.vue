<template>
  <div class="process-wrapper">
    <form class="process-content" @submit="onSubmit">
      <default-loader size="large" v-if="loading" />
      <div v-if="!loading" style="width: 100%;">
        <h3 class="title">{{ $t('common.loanProcessing') }}</h3>
        <div class="amount-info">
          <p>{{ $t('common.purchaseAmount') }}</p>
          <b> {{ numberWithSpaces(order?.amount) }} ₸</b>
        </div>
        <label for="inp" :class="[{ inp: true, incorrectiin: incorrectIin, filled: iin }]">
          <input type="text" id="inp" placeholder="&nbsp;" maxlength="12" v-model="iin" />
          <span class="label">{{ $t('common.paymentForm.iin.label') }}</span>
          <span class="focus-bg"></span>
          <img v-if="iin" class="remove" src="../../assets/images/close.svg" alt="очистить" @click="iin = ''" />
        </label>
        <div class="error-iin" v-if="incorrectIin">
          <img src="../../assets/images/warn.svg" alt="Ошибка" />
          <span>{{ $t('common.paymentForm.iin.error') }}</span>
        </div>
        <button :disabled="!allowContinue" class="default-button btn-iin" type="submit">
          <span>{{ $t('common.continue') }}</span>
        </button>
        <div class="partners-content">
          <b>{{ $t('common.ourPartners') }}</b>
          <p>{{ $t('common.offersForYou') }}</p>
          <div class="partners">
            <div class="logo-partner">
              <img src="../../assets/logos/airba.png" />
            </div>
            <div class="logo-partner">
              <img src="../../assets/logos/halyk.png" />
            </div>
            <div class="logo-partner">
              <img src="../../assets/logos/freedom.png" />
            </div>
            <div class="logo-partner">
              <img src="../../assets/logos/eurasian.png" />
            </div>
          </div>
        </div>
      </div>

    </form>
  </div>
</template>

<script>
import { checkInnShort } from '../../utils'
import { agreement } from '../../api/order'
import DefaultLoader from '../../components/DefaultLoader/DefaultLoader.vue'
export default {
  name: 'IinPage',
  props: ['order', 'specification'],
  components: { DefaultLoader },
  data() {
    return {
      iin: null,
      incorrectIin: false,
      loading: false,
    }
  },
  mounted() {
    this.emitter.on('loading', (loading) => {
      this.loading = loading
    })
  },
  watch: {
    iin(newIin) {
      this.incorrectIin = false
      if (newIin.length === 12) {
        if (!checkInnShort(newIin)) {
          this.incorrectIin = true
        } else {
          this.incorrectIin = false
        }
      }
    },
  },
  computed: {
    allowContinue() {
      return this.iin && this.iin.length === 12 && !this.incorrectIin
    },
  },
  methods: {
    onSubmit() {
      this.$emit('iin', this.iin)
      this.agreementSign()
    },
    async agreementSign() {
      const configData = {
        agreements: [this.specification?.code],
        specification_code: this.specification?.code,
        phone: this.order?.customer?.contact?.mobileNumber,
      }
      const res = await agreement(configData)
      if (res.success) {
        this.$emit('changeSignAgreementId', res.data?.sign_agreement_id)
        this.$emit('changeStep', 2)
      }
    },
    numberWithSpaces(x) {
      if (x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
      } else return x
    },
  },
}
</script>
<style lang="scss">
.amount-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #f3f4fb;
  border-radius: 8px;
  padding: 16px;
  margin-top: 24px;
  margin-bottom: 16px;
  font-size: 16px;
}

.partners-content {
  margin-top: 24px;

  b {
    font-weight: 700;
    font-size: 15px;
    line-height: 24px;
    margin-bottom: 8px;
  }

  p {
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
  }
}

.process-content {
  min-height: 494px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.partners {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  margin-top: 24px;
}

.logo-partner {
  width: 100%;
  min-width: 0;
  height: 40px;
  border: 1px solid #e6e9fa;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 88px;
  }
}

.btn-iin {
  margin-top: 20px;
}

.inp {
  position: relative;
  margin: auto;
  width: 100%;
  overflow: hidden;
  display: block;
  margin-bottom: 4px;
  line-height: 24px;
}

.inp .label {
  position: absolute;
  top: 12px;
  left: 16px;
  font-size: 16px;
  color: #787e9e;
  transform-origin: 0 0;
  transform: translate3d(0, 0, 0);
  transition: all 0.2s ease;
  pointer-events: none;
}

.inp .focus-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  transform: scaleX(0);
  transform-origin: left;
}

.inp input {
  -webkit-appearance: none;
  appearance: none;
  width: 100%;
  border: 0;
  font-family: inherit;
  padding: 20px 16px 4px 16px;
  outline: none;
  font-size: 16px;
  border: 1px solid #e6e9fa;
  border-radius: 8px;
  font-weight: 400;
  transition: all 0.15s ease;
}

.inp input:hover {
  border: 1px solid #b0b5d9;
}

.inp input:not(:placeholder-shown)+.label {
  color: rgba(0, 0, 0, 0.5);
  transform: translate3d(0, -9px, 0) scale(0.75);
}

.inp input:focus {
  border: 1px solid #319cf3;
}

.inp input:focus+.label {
  color: #319cf3;
  transform: translate3d(0, -9px, 0) scale(0.75);
}

.inp input:focus+.label+.focus-bg {
  transform: scaleX(1);
  transition: all 0.1s ease;
}

.filled input {
  border: 1px solid #b0b5d9;
}

.incorrectiin input {
  border: 1px solid #f15515;
  background: rgba(241, 85, 21, 0.06);
}

.incorrectiin input:hover {
  border: 1px solid #f15515;
}

.incorrectiin input:focus {
  border: 1px solid #f15515;
}

.incorrectiin input:focus+.label {
  color: #f15515;
}

.inp .remove {
  position: absolute;
  width: 16px;
  top: 16px;
  right: 16px;
  cursor: pointer;
}

.error-iin {
  display: flex;
  align-items: center;

  img {
    width: 16px;
  }

  span {
    font-size: 12px;
    line-height: 18px;
    color: #f15515;
    margin-left: 4px;
  }
}
</style>
