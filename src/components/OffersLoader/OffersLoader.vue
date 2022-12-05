<template>
  <div class="offers-loader">
    <div class="offers-loader-content">
      <default-loader size="middle" />
      <h3>{{ $t('common.loadOffers') }}</h3>
      <p>{{ $t('common.weSelectOffers') }}</p>
    </div>
  </div>
</template>

<script>
import DefaultLoader from '../DefaultLoader/DefaultLoader.vue';
export default {
  name: 'OffersLoader',
  components: { DefaultLoader }
}
</script>

<style lang="scss">
.offers-loader-content {
  background: #F3F4FB;
  border-radius: 8px;
  max-width: 792px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding-top: 78px;
  padding-bottom: 64px;
  flex-direction: column;

  h3 {
    font-weight: 700;
    font-size: 24px;
    line-height: 36px;
    margin-top: 70px;
  }

  p {
    font-size: 18px;
    line-height: 28px;
    margin-top: 16px;
  }
}

@media screen and (max-width: 769px) {
  .offers-loader-content {
    margin: auto;
    background-color: #fff;
    padding-left: 16px;
    padding-right: 16px;

    h3 {
      font-size: 20px;
      line-height: 30px;
      margin-top: 50px;
    }

    p {
      font-size: 16px;
      line-height: 24px;
    }
  }
}
</style>
