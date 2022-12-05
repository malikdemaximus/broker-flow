<template>
  <div class="no-offers-wrapper">
    <div class="no-offers-content">
      <mobile-header :text="'common.loanProcessing'" :redirectUrl="order?.redirectUrl" v-if="(innerWidth < 769)" />
      <mobile-header-logos :order="order" v-if="innerWidth <= 768" />
      <div class="process-info">
        <img class="lock-not" src="../../assets/images/lock.svg" alt="">
        <h3 class="not-title">{{ $t('common.notForYou') }}</h3>
        <p>{{ $t('common.payWithCard') }}</p>
        <button class="default-button offers-button mobile-btn" @click="toBackShop()">
          {{ $t('common.backToShop') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import MobileHeaderLogos from '../../components/MobileHeaderLogos/MobileHeaderLogos.vue';
import MobileHeader from '../../components/MobileHeader/MobileHeader.vue';
export default {
  name: 'NotDefainedOffersPage',
  props: ['innerWidth', 'order'],
  components: {
    MobileHeaderLogos,
    MobileHeader,
  },
  methods: {
    toBackShop() {
      if (this.order?.redirectUrl) {
        window.location.href = this.order?.redirectUrl
      } else {
        history.back()
      }
    }
  }
}
</script>
<style lang="scss">
.no-offers-content {
  background: #F3F4FB;
  border-radius: 8px;
  max-width: 792px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 32px;
  flex-direction: column;

  .lock-not {
    width: 112px;
    height: 112px;
  }

  .not-title {
    font-weight: 700;
    font-size: 18px;
    line-height: 28px;
    margin-top: 32px;
    text-align: center;
  }

  p {
    line-height: 24px;
    margin-top: 16px;
    margin-bottom: 56px;
    max-width: 557px;
    text-align: center;
  }
}

@media screen and (max-width: 769px) {
  .no-offers-wrapper {
    display: block;
  }

  .no-offers-content {
    display: block;
    padding: 0;
    background: #F3F4FB;
    box-shadow: none;
    border-radius: 0;
    width: 100%;
    height: 100vh;
    text-align: center;

    .lock-not {
      margin: auto;
    }
  }
}
</style>
