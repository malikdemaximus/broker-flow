<template>
  <div class="mobile-header-logos">
    <img class="mobile-header-logo-airba" src="../../assets/images/logo.svg" alt="">
    <img class="mobile-header-logo-partner" v-if="order?.merchantInfo?.logo" :src="order?.merchantInfo?.logo" alt="">
  </div>
</template>

<script>
export default {
  name: 'MobileHeaderLogos',
  props: ['order'],
}
</script>

<style lang="scss">

</style>
