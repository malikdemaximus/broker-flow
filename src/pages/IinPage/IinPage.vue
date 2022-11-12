<template>
  <div class="process-wrapper">
    <form class="process-content" @submit="onSubmit">
      <h3 class="title">{{ $t('common.loanProcessing') }}</h3>
      <div class="amount-info">
        <p>{{ $t('common.purchaseAmount') }}</p>
        <b> 140 400 ₸</b>
      </div>
      <label
        for="inp"
        :class="[{ inp: true, incorrectiin: incorrectIin, filled: iin }]"
      >
        <input
          type="text"
          id="inp"
          placeholder="&nbsp;"
          maxlength="12"
          v-model="iin"
        />
        <span class="label">{{ $t('common.paymentForm.iin.label') }}</span>
        <span class="focus-bg"></span>
        <img
          v-if="iin"
          class="remove"
          src="../../assets/images/close.png"
          alt="очистить"
          @click="iin = ''"
        />
      </label>
      <div class="error-iin" v-if="incorrectIin">
        <img src="../../assets/images/warn.png" alt="Ошибка" />
        <span>{{ $t('common.paymentForm.iin.error') }}</span>
      </div>
      <button
        :disabled="!allowContinue"
        class="default-button btn-iin"
        type="submit"
      >
        <span>{{ $t('common.continue') }}</span>
      </button>
      <div class="partners-content">
        <b>Наши партнеры</b>
        <p>Выгодные предложения для вас</p>
        <div class="partners"></div>
      </div>
    </form>
  </div>
</template>

<script>
import { checkInnShort } from '../../utils'
export default {
  name: 'IinPage',
  data() {
    return {
      iin: null,
      incorrectIin: false,
    }
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
      this.$emit('changeStep', 2)
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
  padding: 12px 16px;
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

.inp input:not(:placeholder-shown) + .label {
  color: rgba(0, 0, 0, 0.5);
  transform: translate3d(0, -12px, 0) scale(0.75);
}

.inp input:focus {
  border: 1px solid #319cf3;
}

.inp input:focus + .label {
  color: #319cf3;
  transform: translate3d(0, -12px, 0) scale(0.75);
}

.inp input:focus + .label + .focus-bg {
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

.incorrectiin input:focus + .label {
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