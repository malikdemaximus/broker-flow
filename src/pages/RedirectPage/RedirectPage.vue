<template>
  <div class="redirect-header" v-if="(innerWidth < 769)">
    <h3 class="title">{{ $t('common.loanProcessing') }}</h3>
  </div>
  <div class="offers-wrapper redirect-wrapper">
    <div class="redirect-content">
      <default-loader size="large" v-if="loading" />
      <div v-if="!loading">
        <h3 class="title" v-if="(innerWidth > 768)">{{ $t('common.loanProcessing') }}</h3>
        <div class="redirect-count">
          <span>{{ seconds }}</span>
        </div>
        <p>{{ $t('common.redirectTo') }}</p>
        <img class="red-img" :src="redirectInfo?.image" alt="" />
        <a :href="redirectInfo?.redirectUrl" class="default-button redirect-button">{{ $t('common.goTo') }}</a>
      </div>
    </div>
  </div>
</template>

<script>
import DefaultLoader from '../../components/DefaultLoader/DefaultLoader.vue'
export default {
  name: 'RedirectPage',
  props: ['redirectInfo', 'innerWidth'],
  components: { DefaultLoader },
  data() {
    return {
      seconds: 5,
      loading: false,
    }
  },
  mounted() {
    this.startSeconds()
  },
  methods: {
    startSeconds() {
      const timeout = 1000

      this.secondsTimer = setInterval(() => {
        if (this.seconds != 0) {
          this.seconds = this.seconds - 1
        } else if (this.seconds == 0) {
          window.location.href = this.redirectInfo.redirectUrl
        }
      }, timeout)
    },
  },
  unmounted() {
    clearInterval(this.secondsTimer)
  },
}
</script>
<style lang="scss">
.redirect-content {
  background: #F3F4FB;
  border-radius: 16px;
  max-width: 792px;
  width: 100%;
  padding: 16px 24px 24px 24px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  align-items: center;

  .red-img {
    width: 120px;
    text-align: center;
    display: block;
    margin: 0 auto 26px auto;
  }

  .title {
    font-weight: 700;
    font-size: 18px;
    line-height: 28px;
    margin-bottom: 24px;
  }

  span {
    display: block;
    color: #787E9E;
    font-weight: 800;
    font-size: 56px;
    line-height: 72px;
    margin-bottom: 8px;
  }

  p {
    margin-bottom: 26px;
  }

  .redirect-button {
    width: 240px;
    text-align: center;
    margin: 0 auto;

    &:hover {
      color: #fff;
    }
  }
}

.redirect-header {
  width: 100%;
  padding: 16px;
  background-color: #fff;

  h3 {
    font-weight: 700;
    font-size: 16px;
    line-height: 24px;
  }
}

@media screen and (max-width: 769px) {
  .redirect-content {
    height: calc(100vh - 56px);
    border-radius: 0;

    .redirect-button {
      position: absolute;
      bottom: 24px;
      left: 16px;
      right: 16px;
      width: auto;
      max-width: 540px;
    }
  }

  .redirect-wrapper {
    min-height: calc(100vh - 56px);
  }
}
</style>
