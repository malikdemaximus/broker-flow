<template>
  <div class="offers-wrapper">
    <div class="offers-content">
      <div class="offers-title">
        <img src="../../assets/images/offer.png" alt="Предложения" />
        <h3 class="title">{{ $t('common.offersTitle') }}</h3>
      </div>
      <offers-filter />
      <div class="offers-show">
        <offer />
        <offer />
      </div>
    </div>
  </div>
</template>

<script>
import OffersFilter from '../../components/OffersFilter/OffersFilter.vue'
import Offer from '../../components/Offer/Offer.vue'
export default {
  name: 'OffersPage',
  components: { OffersFilter, Offer },
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

.offers-show {
  margin-top: 8px;
}
</style>
