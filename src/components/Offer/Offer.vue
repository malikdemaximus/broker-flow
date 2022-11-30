<template>
  <div class="offer-wrapper">
    <div class="offer-content">
      <div class="offer-header" :class="{ 'offer-header': true, 'zero-margin': !opened }">
        <div class="offer-header-left" @click="toggleAccordion()">
          <img v-if="filterType === 'bank'" class="bank-logo" :src="getLogo()" alt="" />
          <h4 class="offer-header-title" v-if="filterType === 'term'">{{ offer[0].loanLength }} {{
              $t('common.monthes')
          }}</h4>
          <img :class="{ 'arrow-icon': true, rotated: !opened }" src="../../assets/icons/arrow-icon.svg" alt="" />
        </div>
        <div class="offer-header-right" v-if="showOffer">
          <img src="../../assets/icons/checked-icon.svg" class="checked-icon" alt="" />
          <span class="offer-count">{{ offer?.length }} {{ $t('common.offers') }}</span>
        </div>
        <div class="offer-header-right" v-if="notOffer">
          <img src="../../assets/icons/x-icon.svg" class="x-icon" alt="" />
          <span class="offer-count">{{ $t('common.noOffers') }}</span>
        </div>
        <div class="offer-header-right" v-if="init">
          <loader size="middle" />
          <span class="offer-count">{{ $t('common.loadOffers') }}</span>
        </div>
      </div>
      <div :class="{ 'offer-items': true, closed: !opened }">
        <div @click="$emit('changeSelected', { id: o.id, code: o.partner.code, logo: getLogo() })"
          :class="{ 'offer-item': true, active: selected === o.id }" v-for="(o, index) in hasOffer" :key="index"
          v-if="showOffer">
          <img v-if="filterType === 'term'" class="bank-logo-term" :src="getLogo()" alt="" />
          <span :class="{ 'loan-type': true, 'loan-type-term': filterType === 'term' }">{{ o.productType === 'loan' ?
              'Кредит' : 'Рассрочка'
          }}</span>
          <span class="loan-month" v-if="filterType === 'bank'">{{ o.loanLength }} {{ $t('common.month') }}</span>
          <span class="loan-term"><b>{{ numberWithSpaces(o.monthlyPayment) }} ₸</b> / {{ $t('common.month') }}</span>
        </div>
      </div>
      <div :class="{ 'offer-load': true, closed: !opened }" v-if="!showOffer && !notOffer">
        <div class="offer-load-item" v-for="count in 3" :key="count">
        </div>
      </div>

      <div :class="{ 'not-offer': true, closed: !opened }" v-if="notOffer">
        <div class="not-offer-content">
          <img src="../../assets/images/not-offer.png" class="not-offer-img" alt="">
          <h3>{{ $t('common.noOffers') }}</h3>
          <p>{{ $t('common.noOffersText') }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { i18n } from '@/i18n'
import Loader from '../Loader/Loader.vue'
export default {
  name: 'Offer',
  components: { Loader },
  props: ['offer', 'selected', 'filterType'],
  data() {
    return {
      opened: true,
    }
  },
  computed: {
    init() {
      return this.offer.some((o) => o?.state?.toLowerCase() === 'init')
    },
    notOffer() {
      const rejectedOffers = this.offer.filter((o) => o?.state?.toLowerCase() === 'rejected' || o?.state?.toLowerCase() === 'partner_cancelled')
      return rejectedOffers.length === this.offer.length
    },
    hasOffer() {
      return this.offer.filter((o) => o?.state?.toLowerCase() === 'approved' || o?.state?.toLowerCase() === 'customer_approved')
    },
    showOffer() {
      return this.offer.some((o) => o?.state?.toLowerCase() == 'approved' || o?.state?.toLowerCase() === 'customer_approved')
    }
  },
  methods: {
    toggleAccordion() {
      this.opened = !this.opened
    },
    getLogo() {
      let code = this.offer[0].partner.code
      if (code === 'mfo_airba') {
        return require(`@/assets/logos/airba-b.svg`)
      } else if (code === 'halykbank') {
        return require(`@/assets/logos/halyk-b.svg`)
      } else {
        return this.offer[0].partner.logo
      }
    },
    numberWithSpaces(x) {
      if (x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
      } else return x
    }
  },
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

  .offer-header-left {
    cursor: pointer;
  }

  .offer-header {
    margin-bottom: 24px;
    justify-content: space-between;
  }

  .zero-margin {
    margin: 0;
  }

  .bank-logo {
    max-width: 128px;
    margin-right: 16px;
    max-height: 40px;
  }

  .arrow-icon {
    width: 32px;
    transition: .2s ease all;
  }

  .checked-icon,
  .x-icon {
    width: 32px;
  }

  .offer-count {
    font-size: 16px;
    line-height: 24px;
    margin-left: 16px;
  }
}

.offer-items,
.offer-load {
  transition: max-height 0.2s ease-out;

  :last-child {
    margin-bottom: 0;
  }
}

.offer-header-title {
  font-weight: 700;
  font-size: 24px;
  line-height: 36px;
  margin-right: 16px;
}

.closed {
  max-height: 0;
  overflow: hidden;
  display: none;
}

.rotated {
  rotate: 180deg;
}

.offer-item {
  background: #ffffff;
  box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.08);
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px;
  border: 2px solid #fff;
  margin-bottom: 16px;
  cursor: pointer;
  transition: .2s ease all;

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
    line-height: 28px;
  }

  &.active {
    border: 2px solid #319CF3;
    box-shadow: 0px 4px 8px rgba(49, 156, 243, 0.15);
  }

  &:hover {
    box-shadow: 0px 8px 14px rgba(16, 20, 45, 0.05), 0px 3.87387px 9.86002px rgba(16, 20, 45, 0.08);
  }
}

.not-offer {}

.not-offer-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h3 {
    font-weight: 700;
    font-size: 18px;
    line-height: 28px;
    margin-bottom: 16px;
    text-align: center;
  }

  p {
    font-size: 15px;
    line-height: 24px;
    max-width: 500px;
    text-align: center;
  }
}

.not-offer-img {
  width: 112px;
  margin-bottom: 24px;
}

.offer-load-item {
  background: linear-gradient(90deg, rgba(243, 244, 251, 0.5) 0%, #F8F8FE 100%), #FFFFFF;
  border-radius: 8px;
  height: 64px;
  width: 100%;
  margin-bottom: 16px;
}

.loan-type-term {
  font-weight: 600;
}

.bank-logo-term {
  max-width: 128px;
  max-height: 40px;
}
</style>
