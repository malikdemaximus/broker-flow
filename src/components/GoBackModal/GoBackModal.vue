<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">

          <div class="modal-image">
            <img src="../../assets/icons/warn-modal.svg" alt="">
          </div>

          <div class="modal-body">
            <h3>{{ $t('common.sureGoToStore') }}</h3>
            <p>{{ $t('common.afterWillRemove') }}</p>
          </div>

          <div class="modal-footer">
            <button class="default-button help-button" @click="goBack()">
              {{ $t('common.yes') }}
            </button>
            <button class="default-button" @click="$emit('close')">
              {{ $t('common.no') }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'GoBackModal',
  props: ['redirectUrl'],
  methods: {
    goBack() {
      if (this.redirectUrl) {
        window.location.href = this.redirectUrl
      } else {
        history.back()
      }
      this.$emit('close')
    }
  }
}
</script>

<style lang="scss">
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 100%;
  max-width: 540px;
  background: #FFFFFF;
  padding: 32px 16px 24px;
  box-shadow: 0px 31px 41px rgba(16, 20, 45, 0.11), 0px 14.604px 12.4842px rgba(16, 20, 45, 0.0625218), 0px 2.72809px 0.0569254px rgba(16, 20, 45, 0.0394782);
  border-radius: 16px;
  transition: all 0.3s ease;
  text-align: center;
  margin: auto;
}

.modal-image {
  margin-bottom: 16px;

  img {
    width: 56px;
    margin: 0 auto;
  }
}

.modal-body h3 {
  font-weight: 700;
  font-size: 18px;
  line-height: 28px;
  margin-bottom: 8px;
  text-align: center;
}

.modal-body p {
  text-align: center;
}

.modal-enter {
  opacity: 0;
}

.modal-footer {
  margin-top: 48px;
  display: flex;
  justify-content: center;
  align-items: center;

  .help-button {
    margin-right: 16px;
    background: #E6E9FA;
    color: #319CF3;

    &:not([disabled]):hover {
      background: #E6E9FA;
      width: 160px;
      color: #319CF3;
      border: none;
    }
  }

  .default-button {
    width: 160px;
  }
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

@media screen and (max-width: 769px) {
  .modal-container {
    margin-left: 24px;
    margin-right: 24px;
    width: calc(100vw - 48px);
    margin: auto;
  }

  .modal-body {
    h3 {
      font-size: 16px;
    }

    p {
      font-size: 15px;
    }
  }

  .modal-footer {
    margin-top: 24px;
  }
}
</style>
