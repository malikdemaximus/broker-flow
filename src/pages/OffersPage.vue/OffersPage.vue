<template>
  <offers-loader v-if="loading" />
  <not-defained-offers-page v-if="notOffer" />
  <div class="offers-wrapper" v-if="!loading && !notOffer" ref="offersWrapper">
    <div class="offers-content">
      <div class="offers-title">
        <img src="../../assets/images/offer.svg" alt="Предложения" />
        <h3 class="title">{{ $t('common.offersTitle') }}</h3>
      </div>
      <offers-filter :isInstallment="isInstallment" :isLoan="isLoan" :banks="banks" @changeFilter="changeFilter" />
      <div class="offers-show">
        <offer v-for="(offer, index) in collectedOffers" :selected="selected.offerId" @changeSelected="changeSelected"
          :key="index" :offer="offer" :filterType="selectedFilterType" />
      </div>
    </div>
  </div>
  <div :class="{ 'fixed-block': true, 'normal-block': scrolled }">
    <a href="#bottom" class="load-button" v-if="!loaded && !selected.offerId">
      <loader size="small" />
      <span>{{ $t('common.loadOffers') }}</span>
      <img src="../../assets/icons/arrow-mini.png" class="arrow-mini" />
    </a>
    <button :class="{ 'default-button offers-button': true, 'load-default-button': loadingSaveNext }"
      :disabled="!selected.offerId || loadingSaveNext" v-if="selected.offerId || loaded" @click="saveAndNext()">
      <loader v-if="loadingSaveNext" size="small" fillColor="#fff" strokeColor="rgba(255, 255, 255, 0.5)" />
      <span v-else>{{ $t('common.continue') }}</span>
    </button>
  </div>
  <div id="bottom"></div>
</template>

<script>
import OffersFilter from '../../components/OffersFilter/OffersFilter.vue'
import Offer from '../../components/Offer/Offer.vue'
import Loader from '../../components/Loader/Loader.vue'
import OffersLoader from '../../components/OffersLoader/OffersLoader.vue'
import NotDefainedOffersPage from '../NotDefainedOffersPage.vue/NotDefainedOffersPage.vue'
import { startProcess, offers, saveChosenOffer, orderInfo } from '../../api/order'
export default {
  name: 'OffersPage',
  props: ['processed', 'loadingOrder'],
  components: { OffersFilter, Offer, Loader, OffersLoader, NotDefainedOffersPage },
  data() {
    return {
      scrolled: false,
      loading: false,
      loaded: false,
      loadingSaveNext: false,
      offers: null,
      filteredOffers: null,
      timer: null,
      bankcode: 'all',
      byCredit: 'all',
      isLoan: null,
      collectedOffers: null,
      isInstallment: null,
      selectedFilter: {
        credit: 'all',
        bank: 'all',
        type: 'bank',
      },
      selectedFilterType: 'bank',
      notOffer: null,
      banks: null,
      selected: {
        offerId: null,
        paymentPartnerCode: null,
      },
      selectedLogo: null,
    }
  },
  mounted() {
    this.loading = true
    this.getOffers()
    this.start()
    this.timer = setInterval(() => {
      this.getOffers()
    }, 3000)
  },
  watch: {
    // offers() {
    //   this.filterByCredit(this.byCredit)
    //   this.filterByBankcode(this.bankcode)
    // }
  },
  unmounted() {
    clearInterval(this.timer)
  },
  methods: {
    filterByCredit(offers, code) {
      if (code !== 'all') {
        return offers.filter((o) => o?.productType === code)
      } else {
        return offers
      }
    },
    filterByBankcode(offers, code) {
      if (code !== 'all') {
        return offers.filter((o) => o?.partner?.code === code)
      } else {
        return offers
      }
    },
    groupBy(collection, type) {
      let ourCollection = []
      ourCollection = collection
      if (type === 'term') {
        ourCollection = ourCollection.filter((c) => c?.loanLength)
        ourCollection.sort(({ loanLength: a }, { loanLength: b }) => b - a)
      }
      let i = 0, val, index,
        values = [], result = [];
      for (; i < ourCollection.length; i++) {
        if (type === 'bank') {
          val = collection[i]['partner']['code']
        } else if (type === 'term') {
          val = ourCollection[i]['loanLength']
        }

        index = values.indexOf(val);
        if (index > -1)
          result[index].push(ourCollection[i]);
        else {
          values.push(val);
          result.push([ourCollection[i]]);
        }
      }
      return result;
    },
    getFilters() {
      this.isLoan = this.offers.some((o) => o.productType === 'loan')
      this.isInstallment = this.offers.some((o) => o.productType === 'installment')
      this.banks = this.getBanks()
    },
    getBanks() {
      let banks = []
      if (this.offers) {
        let filteredOffers = this.offers.filter((value, index, self) =>
          index === self.findIndex((t) => (
            t.partner.code === value.partner.code
          ))
        )
        filteredOffers.forEach((v) => {
          banks.push(v.partner)
        })
      }
      return banks
    },
    changeFilter(filter) {
      if (filter.type === 'bank') {
        this.selectedFilter.bank = filter.code
      } else if (filter.type === 'credit') {
        this.selectedFilter.credit = filter.code
      }
      else if (filter.type === 'type') {
        this.selectedFilterType = filter.code
      }
      this.doFilter()
    },
    doFilter() {
      if (this.filteredOffers && this.filteredOffers.length) {
        this.filteredOffers = this.filterByBankcode(this.offers, this.selectedFilter.bank)
        this.filteredOffers = this.filterByCredit(this.filteredOffers, this.selectedFilter.credit)
        const loaded = this.offers.filter((o) => o?.state?.toLowerCase() !== 'init')
        if (this.offers.length === loaded.length) {
          clearInterval(this.timer)
          this.loaded = true
        }
        this.collectedOffers = this.groupBy(this.filteredOffers, this.selectedFilterType)
      } else {
        this.collectedOffers = null
      }
    },
    changeSelected(data) {
      this.selected.offerId = data.id
      this.selected.paymentPartnerCode = data.code
      this.selectedLogo = data.logo
    },
    getLoan() {
      return this.offers.filter((o) => o.productType === 'loan')
    },
    getInstallment() {
      return this.offers.filter((o) => o.productType === 'installment')
    },
    toBottom() {
      window.scrollTo(0, document.body.scrollHeight || document.documentElement.scrollHeight);
      this.scrolled = !this.scrolled
    },
    async start() {
      this.loading = true
      setTimeout(async () => {
        if (this.processed) {
          await this.getOffers()
        } else {
          const res = await startProcess()
          if (res.success) {
            this.getOffers()
          }
        }
      }, 500);
    },
    async getOffers() {
      const res = await offers()
      if (res.success) {
        this.offers = res.data
        this.filteredOffers = res.data
        this.doFilter()
        this.getFilters()
        this.checkIfNotOffer()
        if (this.offers?.length > 0) {
          this.loading = false
        }
      }
      if (!res.success) {
        this.$emit('changeStep', 0)
        this.errorText = res.data?.error?.message
      }
    },
    checkIfNotOffer() {
      if (this.offers) {
        const rejectedOffers = this.offers.filter((o) => o?.state?.toLowerCase() === 'rejected' || o?.state?.toLowerCase() === 'partner_cancelled')
        if (rejectedOffers?.length) {
          if (rejectedOffers.length === this.offers.length) {
            this.notOffer = true
          }
        }
        return false
      }
    },
    async saveAndNext() {
      this.loadingSaveNext = true
      const res = await saveChosenOffer(this.selected)

      if (res.success) {
        const { redirectUrl } = res.data
        const redInfo = {
          redirectUrl: redirectUrl,
          image: this.selectedLogo,
        }
        this.$emit('redirectInfo', redInfo)
        this.$emit('changeStep', 4)
      }
      this.loadingSaveNext = false
    },
  },
}
</script>
<style lang="scss">
.offers-title {
  display: flex;
  align-items: center;
  margin-bottom: 24px;

  .title {
    font-weight: 700;
    font-size: 18px;
    line-height: 28px;
  }

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
  color: #10142D;

  &:hover {
    color: inherit;
  }

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
