<template>
  <div>
    <div class="error-boundary" v-if="isError">
      <a-result
        title="Программа выполнила невыполнимое, допустила недопустимое!"
        status="500"
        class="error-boundary__wrapper"
      >
        <template #extra>
          <a-button type="primary" @click="refreshPage">
            Обновить страницу
          </a-button>
        </template>
        <div class="error-boundary__message-wrapper">
          <p class="error-boundary__message-title">
            <strong>Контент содержит следующую ошибку:</strong>
          </p>
          <div class="error-boundary__message-stack">{{ error.stack }}</div>
          <p class="error-boundary__message-title">
            <strong
              ><span>В компоненте: </span
              ><span class="error-boundary__component">{{
                component.$options.name
              }}</span>
            </strong>
          </p>
        </div>
      </a-result>
    </div>
    <slot v-else></slot>
  </div>
</template>

<script>
import './error-boundary.scss'

export default {
  name: 'ErrorBoundary',
  data: function () {
    return {
      isError: false,
      error: '',
      vm: '',
      info: '',
    }
  },
  errorCaptured(err, vm) {
    this.isError = true
    this.error = err
    this.component = vm
  },
  methods: {
    refreshPage() {
      this.$router.go(0)
    },
  },
}
</script>
