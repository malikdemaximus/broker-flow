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
          <filter-item
            text="Halyk Bank"
            :image="'../../assets/logos/halyk-mini.png'"
            size="m"
          />
          <filter-item
            text="Airba Pay"
            image="../../assets/logos/airba-mini.png"
            size="m"
          />
          <filter-item
            text="Freedom Finance"
            image="../../assets/logos/freedom-mini.png"
            size="m"
          />
          <filter-item
            text="Eurasian Bank"
            image="../../assets/logos/eura-mini.png"
            size="m"
          />
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
