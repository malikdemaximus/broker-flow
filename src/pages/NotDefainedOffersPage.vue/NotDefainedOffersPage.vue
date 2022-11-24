<template>
  <div class="no-offers-wrapper">
    <div class="no-offers-content">
      <img src="../../assets/images/lock.svg" alt="">
      <h3>{{ $t('common.notForYou') }}</h3>
      <p>{{ $t('common.payWithCard') }}</p>
      <button class="default-button offers-button" @click="toNext()">
        {{ $t('common.backToShop') }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NotDefainedOffersPage',
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

  img {
    width: 112px;
    height: 112px;
  }

  h3 {
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
</style>
