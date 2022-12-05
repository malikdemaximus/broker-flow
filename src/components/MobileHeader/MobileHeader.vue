<template>
  <div class="mobile-header">
    <button class="mobile-back" @click="showModal = true"><img src="../../assets/icons/back.svg" alt="" /></button>
    <h3 class="title">{{ $t(text) }}</h3>
  </div>
  <go-back-modal :redirectUrl="redirectUrl" v-if="showModal" @close="showModal = false" />
</template>

<script>
import GoBackModal from '../GoBackModal';
export default {
  name: 'MobileHeader',
  props: ['text', 'redirectUrl'],
  data() {
    return {
      showModal: false,
    }
  },
  components: { GoBackModal }
}
</script>

<style lang="scss">

</style>
