<template>
  <button :class="{ 'filter-item': true, active: selected === code, middle: size == 'm', disabled: disabled }"
    :disabled="disabled" @click="handleClick()">
    <img v-if="image" :src="myImage" />
    <span>{{ text }}</span>
  </button>
</template>

<script>
export default {
  name: 'FilterItem',
  props: ['text', 'type', 'code', 'selected', 'image', 'size', 'disabled'],
  data() {
    return {
      active: null,
    }
  },
  computed: {
    myImage() {
      return this.image.toString()
    },
  },
  methods: {
    handleClick() {
      if (!this.disabled) {
        this.$emit('changeFilter', { type: this.type, code: this.code })
      }
    }
  }
}
</script>

<style lang="scss">
.filter-item {
  background: #f3f4fb;
  border-radius: 8px;
  padding: 8px 12px;
  cursor: pointer;
  margin-right: 8px;
  display: flex;
  align-items: center;
  outline: none;
  border: none;

  span {
    font-weight: 600;
    font-size: 16px;
    line-height: 24px;
    display: block;
  }

  img {
    margin-right: 9px;
    width: 24px;
  }

  &.disabled {
    background: #f3f4fb;
    color: rgb(16 20 45/1);
    opacity: .5;
    cursor: default;
  }

  &.active {
    background: #fff3c8;
  }

  &:hover {
    background: #fff3c8;
  }

  &.middle {
    font-size: 15px;
  }
}

@media screen and (max-width: 769px) {
  .filter-item {
    margin-bottom: 8px;
    width: 100%;
    min-width: 300px;
    text-align: center;
    justify-content: center;
  }
}
</style>
