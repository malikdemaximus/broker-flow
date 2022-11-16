<template>
  <div class="process-wrapper">
    <div class="process-content error-content">
      {{ errorText }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'ErrorsPage',
  data() {
    return {}
  },
  props: ['errorText'],
  methods: {
    onSubmit() {
      this.$emit('changeStep', 2)
    },
  },
}
</script>
<style lang="scss">
.error-content {
  box-shadow: none;
}
</style>
