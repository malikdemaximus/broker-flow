<template>
  <div>
    <div class="offer-filters">
      <div class="filters-wrapper">
        <span class="filters-title">{{ $t('common.displayFilter') }}</span>
        <div class="filters-content">
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
  </div>
</template>

<script>
import FilterItem from '../FilterItem/FilterItem.vue'
export default {
  name: 'OffersFilter',
  props: ['isInstallment', 'banks', 'isLoan', 'selected'],
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
    changeFilter(filter) {
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
      this.$emit('changeFilter', this.filter)
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
</style>
