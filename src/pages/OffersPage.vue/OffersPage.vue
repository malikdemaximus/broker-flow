<template>
  <offers-loader v-if="loading" />
  <!-- <not-defained-offers-page /> -->
  <div class="offers-wrapper" v-if="!loading">
    <div class="offers-content">
      <div class="offers-title">
        <img src="../../assets/images/offer.svg" alt="Предложения" />
        <h3 class="title">{{ $t('common.offersTitle') }}</h3>
      </div>
      <offers-filter />
      <div class="offers-show">
        <offer v-for="(offer, index) in collectedOffers" :key="index" :offer="offer" />
      </div>
    </div>
  </div>
  <div :class="{ 'fixed-block': true, 'normal-block': scrolled }" v-if="!loading">
    <button class="load-button">
      <loader size="small" />
      <span>{{ $t('common.loadOffers') }}</span>
      <img src="../../assets/icons/arrow-mini.png" class="arrow-mini" />
    </button>
    <!-- <button class="default-button offers-button" @click="toNext()">
      <span>{{ $t('common.continue') }}</span>
    </button> -->
  </div>
</template>

<script>
import OffersFilter from '../../components/OffersFilter/OffersFilter.vue'
import Offer from '../../components/Offer/Offer.vue'
import Loader from '../../components/Loader/Loader.vue'
import OffersLoader from '../../components/OffersLoader/OffersLoader.vue'
import NotDefainedOffersPage from '../NotDefainedOffersPage.vue/NotDefainedOffersPage.vue'
import { startProcess, offers } from '../../api/order'
export default {
  name: 'OffersPage',
  props: ['processed'],
  components: { OffersFilter, Offer, Loader, OffersLoader, NotDefainedOffersPage },
  data() {
    return {
      scrolled: false,
      loading: false,
      offers: null,
      filteredOffers: null,
    }
  },
  mounted() {
    this.start()
    //this.scroll()
  },
  computed: {
    // installment() {
    //   return this.offers.some((o) => o.productType === 'installment')
    // },
    // loan() {
    //   return this.offers.some((o) => o.productType === 'loan')
    // },
    // getLoan() {
    //   return this.offers.filter((o) => o.productType === 'loan')
    // },
    // getInstallment() {
    //   return this.offers.filter((o) => o.productType === 'installment')
    // },
    collectedOffers() {
      if (this.offers) {
        return this.groupBy(this.offers, 'partner', 'code')
      } else {
        return null
      }
    },
  },
  methods: {
    filterOffers(f) {
      this.filteredOffers = f
    },
    groupBy(collection, property, proprop) {
      let i = 0, val, index,
        values = [], result = [];
      for (; i < collection.length; i++) {
        val = collection[i][property][proprop];
        index = values.indexOf(val);
        if (index > -1)
          result[index].push(collection[i]);
        else {
          values.push(val);
          result.push([collection[i]]);
        }
      }
      return result;
    },
    toBottom() {
      window.scrollTo(0, document.body.scrollHeight || document.documentElement.scrollHeight);
      this.scrolled = !this.scrolled
    },
    async start() {
      this.loading = true
      if (this.processed) {
        this.getOffers()
      } else {
        const res = await startProcess()
        if (res.success) {
          this.getOffers()
        }
      }
    },
    async getOffers() {
      this.loading = true
      const res = await offers()
      if (res.success) {
        this.offers = res.data
        this.filteredOffers = res.data
      }
      this.loading = false
    },
    scroll() {
      window.onscroll = () => {
        let bottomOfWindow = Math.max(window.pageYOffset, document.documentElement.scrollTop, document.body.scrollTop) + window.innerHeight === document.documentElement.offsetHeight

        if (bottomOfWindow) {
          this.scrolled = true
        }
      }
    }
  },
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

.fixed-block {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8px 16px 24px;
  background: rgba(252, 252, 255, 0.6);
  backdrop-filter: blur(8px);
  height: 80px;
}

.load-button {
  display: flex;
  align-items: center;
  padding: 12px;
  outline: none;
  border: 0;
  background: #FCFCFF;
  box-shadow: 0px 8px 14px rgba(16, 20, 45, 0.05), 0px 3.87387px 9.86002px rgba(16, 20, 45, 0.08);
  border-radius: 8px;
  height: 48px;
  cursor: pointer;

  .arrow-mini {
    width: 24px;
  }

  span {
    display: block;
    margin: 0 16px;
    font-weight: 600;
    font-size: 16px;
    line-height: 24px;
  }
}

.offers-button {
  width: 240px;
}

.normal-block {
  position: relative;
}

.to-bottom {
  position: relative;
}
</style>
