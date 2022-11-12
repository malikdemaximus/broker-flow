<template>
  <a-result status="404" title="404" :sub-title="$t('common.notFound')">
    <template #extra>
      <a-button @click="onButtonClick" type="primary">
        {{ $t('common.toMain') }}
      </a-button>
    </template>
  </a-result>
</template>

<script>
export default {
  name: 'NotFound',
  methods: {
    onButtonClick() {
      this.$router.push('/')
    },
  },
}
</script>
