<template>
  <div>
    <div class="offer-filters">
      <div class="filters-wrapper">
        <span class="filters-title">{{ $t('common.displayFilter') }}</span>
        <div class="filters-content">
          <filter-item :text="$t('common.byBank')" :active="true" />
          <filter-item :text="$t('common.byTerm')" />
        </div>
      </div>
      <div class="filters-wrapper">
        <span class="filters-title">{{ $t('common.typeCredit') }}</span>
        <div class="filters-content">
          <filter-item :text="$t('common.allOffers')" :active="true" />
          <filter-item :text="$t('common.installment')" />
          <filter-item :text="$t('common.loan')" />
        </div>
      </div>
    </div>
    <div class="offer-filters">
      <div class="filters-wrapper">
        <span class="filters-title">{{ $t('common.ourPartners') }}</span>
        <div class="filters-content">
          <filter-item :text="$t('common.all')" :active="true" size="m" />
          <filter-item text="Halyk Bank" :image="require(`@/assets/logos/halyk-mini.svg`)" size="m" />
          <filter-item text="Airba Pay" :image="require(`@/assets/logos/airba-mini.svg`)" size="m" />
          <filter-item text="Freedom Finance" :image="require(`@/assets/logos/freedom-mini.svg`)" size="m" />
          <filter-item text="Eurasian Bank" :image="require(`@/assets/logos/eura-mini.svg`)" size="m" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FilterItem from '../FilterItem/FilterItem.vue'
export default {
  name: 'OffersFilter',
  props: ['text', 'image', 'selected'],
  data() {
    return {
      active: false,
    }
  },
  components: {
    FilterItem,
  },
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
