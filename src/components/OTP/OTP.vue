<template>
  <div ref="otpCont" :class="{
    'otp-content': true,
    'otp-content-incorrect': incorrectOtp,
  }">
    <input type="text" class="digit-box" v-for="(el, ind) in digits" :key="el + ind" v-model="digits[ind]"
      :autofocus="ind === 0" :placeholder="placeholders[ind]" maxlength="1" @focus="handleFocus(ind)"
      @blur="handleBlur()" @keydown="handleKeyDown($event, ind)" :class="{
        bounce: digits[ind] !== null,
        success: correctOtp,
        'incorrect-otp': incorrectOtp,
      }" />
  </div>
</template>

<script setup>
import { i18n } from '@/i18n'
import { ref, reactive, defineProps, defineEmits, watch } from 'vue'
const props = defineProps({
  default: String,

  digitCount: {
    type: Number,
    required: true,
  },
  incorrectOtp: {
    type: Boolean,
  },
  correctOtp: {
    type: Boolean,
  },
})

const digits = reactive([])
let placeholders = reactive(['•', '•', '•', '•'])

if (props.default && props.default.length === props.digitCount) {
  for (let i = 0; i < props.digitCount; i++) {
    digits[i] = props.default.charAt(i)
  }
} else {
  for (let i = 0; i < props.digitCount; i++) {
    digits[i] = null
  }
}

const otpCont = ref(null)
const emit = defineEmits(['update:otp'])

const isDigitsFull = function () {
  for (const elem of digits) {
    if (elem == null || elem == undefined) {
      return false
    }
  }

  return true
}
const handleKeyDown = function (event, index) {
  if (
    event.key !== 'Tab' &&
    event.key !== 'ArrowRight' &&
    event.key !== 'ArrowLeft'
  ) {
    event.preventDefault()
  }

  if (event.key === 'Backspace') {
    digits[index] = null

    if (index != 0) {
      otpCont.value.children[index - 1].focus()
    }
    emit('update:otp', digits.join(''))
    return
  }

  if (new RegExp('^([0-9])$').test(event.key)) {
    digits[index] = event.key

    if (index < props.digitCount - 1) {
      otpCont.value.children[index + 1].focus()
    }
    // else if (index == props.digitCount - 1) {
    //   otpCont.value.children[index].focus()
    // }

    emit('update:otp', digits.join(''))
  }
}

watch(() => props.incorrectOtp, (val) => {
  if (val) {
    setTimeout(() => {
      for (let i = 0; i < props.digitCount; i++) {
        digits[i] = ''
      }
      emit('update:otp', digits.join(''))
    }, 2000);
  }
})

watch(digits, (val) => {
  if (!val.join('')) {
    setTimeout(() => {
      otpCont.value.children[0].focus()
    }, 100);
  }
})

const handleFocus = function (index) {
  for (let i = 0; i < placeholders.length; i++) {
    if (index === i) {
      placeholders[i] = ''
    } else {
      placeholders[i] = '•'
    }
  }
}

const handleBlur = function () {
  for (let i = 0; i < placeholders.length; i++) {
    placeholders[i] = '•'
  }
}
</script>

<style lang="scss">
.digit-box {
  width: 64px;
  height: 64px;
  display: inline-block;
  font-weight: 700;
  font-size: 40px;
  line-height: 56px;
  margin: 4px;
  border: 1px solid #cccccc;
  border-radius: 4px;
  text-align: center;
  outline: none;
  padding-top: 5px;
  padding-bottom: 5px;

  :nth-child {
    display: flex;
    align-items: center;
  }
}

.otp-content {
  .digit-box:focus {
    border: 1px solid #319cf3;
    box-shadow: 0px 8px 24px rgba(0, 0, 0, 0.1);
  }

  .success {
    border: 1px solid #1ace37;
    box-shadow: 0px 4px 12px rgba(26, 206, 55, 0.5);
  }

  .incorrect-otp {
    border: 1px solid #f15515;
    box-shadow: 0px 4px 12px rgba(241, 85, 21, 0.2);
  }

  .bounce {
    animation: pulse 0.2s ease-in-out alternate;
  }

  ::placeholder {
    color: #787e9e;
    opacity: 1;
    /* Firefox */
    font-size: 3rem;
  }

  :-ms-input-placeholder {
    color: #787e9eed;
  }

  ::-ms-input-placeholder {
    color: #787e9e;
  }
}

.otp-content-incorrect {
  animation: horizontal-shaking 0.5s;
  animation-iteration-count: 1;
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }

  100% {
    transform: scale(1.05);
  }
}

@keyframes horizontal-shaking {
  0% {
    transform: translate(1px, 1px) rotate(0deg);
  }

  10% {
    transform: translate(-1px, -2px) rotate(-1deg);
  }

  20% {
    transform: translate(-3px, 0px) rotate(1deg);
  }

  30% {
    transform: translate(3px, 2px) rotate(0deg);
  }

  40% {
    transform: translate(1px, -1px) rotate(1deg);
  }

  50% {
    transform: translate(-1px, 2px) rotate(-1deg);
  }

  60% {
    transform: translate(-3px, 1px) rotate(0deg);
  }

  70% {
    transform: translate(3px, 1px) rotate(-1deg);
  }

  80% {
    transform: translate(-1px, -1px) rotate(1deg);
  }

  90% {
    transform: translate(1px, 2px) rotate(0deg);
  }

  100% {
    transform: translate(1px, -2px) rotate(-1deg);
  }
}
</style>