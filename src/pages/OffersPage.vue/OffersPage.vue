<template>
  <div class="offers-wrapper">
    <div class="offers-content">
      <div class="offers-title">
        <img src="../../assets/images/offer.png" alt="Предложения" />
        <h3 class="title">{{ $t('common.offersTitle') }}</h3>
      </div>
      <offers-filter />
    </div>
  </div>
</template>

<script>
import OffersFilter from '../../components/OffersFilter/OffersFilter.vue'
export default {
  name: 'OffersPage',
  components: { OffersFilter },
  data() {
    return {}
  },
  computed: {
    allowContinue() {
      return this.iin && this.iin.length === 12 && !this.incorrectIin
    },
  },
  methods: {},
}
</script>
<style lang="scss">
.offers-title {
  display: flex;
  align-items: center;
  margin-bottom: 24px;
  img {
    width: 32px;
    margin-right: 8px;
  }
}
</style>
