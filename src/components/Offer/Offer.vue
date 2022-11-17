<template>
  <div class="offer-wrapper">
    <div class="offer-content">
      <div class="offer-header">
        <div class="offer-header-left">
          <img
            class="bank-logo"
            src="../../assets/logos/halyk-offer.png"
            alt=""
          />
          <img
            class="arrow-icon"
            src="../../assets/icons/arrow-icon.png"
            alt=""
          />
        </div>
        <div class="offer-header-right">
          <img
            src="../../assets/icons/checked-icon.png"
            class="checked-icon"
            alt=""
          />
          <span class="offer-count">3 предложения</span>
        </div>
      </div>
      <div class="offer-items">
        <div class="offer-item">
          <span class="loan-type">Рассрочка</span>
          <span class="loan-month">24 мес</span>
          <span class="loan-term"><b>4 840 ₸</b> / мес</span>
        </div>
        <div class="offer-item">
          <span class="loan-type">Рассрочка</span>
          <span class="loan-month">12 мес</span>
          <span class="loan-term"><b>5 232 ₸</b> / мес</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { i18n } from '@/i18n'
export default {
  name: 'Offer',
}
</script>

<style lang="scss">
.offer-wrapper {
  background: #f3f4fb;
  border-radius: 8px;
  padding: 24px;
  margin-bottom: 24px;
  width: 100%;

  .offer-header,
  .offer-header-left,
  .offer-header-right {
    display: flex;
    align-items: center;
  }

  .offer-header {
    margin-bottom: 24px;
    justify-content: space-between;
  }

  .bank-logo {
    width: 128px;
    margin-right: 16px;
  }

  .arrow-icon {
    width: 32px;
  }
  .checked-icon {
    width: 32px;
  }

  .offer-count {
    font-size: 16px;
    line-height: 24px;
    margin-left: 16px;
  }
}

.offer-items {
  :last-child {
    margin-bottom: 0;
  }
}

.offer-item {
  background: #ffffff;
  box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.08);
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  margin-bottom: 16px;

  .loan-type {
    font-weight: 700;
    font-size: 18px;
    line-height: 28px;
  }

  .loan-month {
    font-weight: 600;
    font-size: 18px;
    line-height: 28px;
  }

  .loan-term {
    background: #ffee57;
    border-radius: 4px;
    padding: 2px 8px;
  }
}
</style>
