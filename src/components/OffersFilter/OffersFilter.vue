<template>
  <div v-if="((innerWidth > 769) || showMobileFilter)" class="offer-filters-wrapper">
    <div class="offers-filter-header" v-if="(innerWidth < 769)">
      <button class="ff" @click="resetFilter()">{{ $t('common.reset') }}</button>
      <h3>{{ $t('common.filter') }}</h3>
      <button @click="closeFilter" class="close-filter-btn">
        <img src="../../assets/images/close-round.svg" alt="" />
      </button>

    </div>
    <div class="offer-filters">
      <div class="filters-wrapper">
        <span class="filters-title">{{ $t('common.displayFilter') }}</span>
        <div class="filters-content filters-content-type">
          <filter-item :text="$t('common.byBank')" type="type" :selected="selectedType" code="bank"
            @changeFilter="changeFilter" />
          <filter-item :text="$t('common.byTerm')" type="type" :selected="selectedType" code="term"
            @changeFilter="changeFilter" />
        </div>
      </div>
      <div class="filters-wrapper">
        <span class="filters-title">{{ $t('common.typeCredit') }}</span>
        <div class="filters-content">
          <filter-item type="credit" :selected="selectedCredit" code="all" :text="$t('common.allOffers')"
            @changeFilter="changeFilter" />
          <filter-item type="credit" :selected="selectedCredit" code="installment" :text="$t('common.installment')"
            :disabled="!isInstallment" @changeFilter="changeFilter" />
          <filter-item type="credit" :selected="selectedCredit" code="loan" :text="$t('common.loan')"
            :disabled="!isLoan" @changeFilter="changeFilter" />
        </div>
      </div>
    </div>
    <div class="offer-filters">
      <div class="filters-wrapper">
        <span class="filters-title">{{ $t('common.ourPartners') }}</span>
        <div class="filters-content">
          <filter-item type="bank" :selected="selectedBank" code="all" :text="$t('common.all')" size="m"
            @changeFilter="changeFilter" />
          <filter-item :selected="selectedBank" v-for="bank in banks" type="bank" :code="bank.code" :text="bank.name"
            :image="getLogos(bank)" @changeFilter="changeFilter" size="m" />
        </div>
      </div>
    </div>
    <button v-if="(innerWidth < 769)" class="default-button fixed-filter-button" @click="selectFilter()">{{
        $t('common.select')
    }}</button>
  </div>
</template>

<script>
import FilterItem from '../FilterItem/FilterItem.vue'
export default {
  name: 'OffersFilter',
  props: ['isInstallment', 'banks', 'isLoan', 'selected', 'showMobileFilter', 'innerWidth'],
  data() {
    return {
      active: false,
      filter: {
        type: null,
        code: null,
      },
      selectedBank: 'all',
      selectedCredit: 'all',
      selectedType: 'bank',
    }
  },
  components: {
    FilterItem,
  },
  methods: {
    getLogos(bank) {
      let code = bank.code
      if (code === 'mfo_airba') {
        return require(`@/assets/logos/airba-mini.svg`)
      } else if (code === 'halykbank') {
        return require(`@/assets/logos/halyk-mini.svg`)
      } else if (code === 'eurasian_bank') {
        return require(`@/assets/logos/eura-mini.svg`)
      } else if (code === 'freedom_finance') {
        return require(`@/assets/logos/freedom-mini.svg`)
      } else {
        return bank.logo
      }
    },
    changeFilter(filter, isMobile = false) {
      this.filter = filter
      if (filter.type === 'bank') {
        this.selectedBank = filter.code
      }
      else if (filter.type === 'credit') {
        this.selectedCredit = filter.code
      }
      else if (filter.type === 'type') {
        this.selectedType = filter.code
      }
      if (this.innerWidth > 769) {
        this.$emit('changeFilter', this.filter)
      }
      if (isMobile) {
        this.$emit('changeFilter', this.filter)
      }
    },
    resetFilter() {
      this.changeFilter({
        type: 'bank',
        code: 'all',
      }, true)
      this.changeFilter({
        type: 'credit',
        code: 'all',
      }, true)
      this.changeFilter({
        type: 'type',
        code: 'bank',
      }, true)
    },
    closeFilter() {
      this.$emit('changeMobileFilter', true)
    },
    selectFilter() {
      this.changeFilter({
        type: 'bank',
        code: this.selectedBank,
      }, true)
      this.changeFilter({
        type: 'credit',
        code: this.selectedCredit,
      }, true)
      this.changeFilter({
        type: 'type',
        code: this.selectedType,
      }, true)
      this.$emit('changeFilter', this.filter)
      this.$emit('changeMobileFilter', true)
    }
  }
}
</script>

<style lang="scss">
.offer-filters {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.filters-wrapper {
  margin-bottom: 24px;

  .filters-title {
    font-weight: 600;
    font-size: 12px;
    line-height: 18px;
    color: #787e9e;
    margin-bottom: 8px;
  }
}

.filters-content {
  display: flex;

  :last-child {
    margin-right: 0;
  }
}

@media screen and (max-width: 769px) {
  .offer-filters {
    flex-direction: column;
  }

  .filters-content {
    flex-direction: column;
  }

  .filters-content-type {
    flex-direction: row;

    .filter-item {
      min-width: 150px;
    }
  }

  .filters-wrapper {
    padding: 16px 16px 0 16px;
    margin-bottom: 0;
    width: 100%;
    max-width: 540px;
    margin: 0 auto;
  }

  .offer-filters-wrapper {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    background: #fff;
    z-index: 2;
  }

  .offers-filter-header {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #E6E6E6;
    padding: 16px 16px 9px 16px;


    h3 {
      font-weight: 700;
      font-size: 18px;
      line-height: 24px;
    }
  }

  .fixed-filter-button {
    position: fixed;
    bottom: 24px;
    left: 16px;
    right: 16px;
    margin: 0 auto;
    width: auto;
  }

  .close-filter-btn {
    outline: none;
    border: 0;
    background-color: #fff;
  }
}
</style>
