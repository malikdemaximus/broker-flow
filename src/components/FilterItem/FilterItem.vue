<template>
  <div
    :class="{ 'filter-item': true, active: active, middle: size == 'm' }"
    @click="$emit('selected', true)"
  >
    <img v-if="image" :src="myImage" />
    <span>{{ text }}</span>
  </div>
</template>

<script>
export default {
  name: 'FilterItem',
  props: ['text', 'image', 'active', 'size'],
  data() {
    return {}
  },
  computed: {
    myImage() {
      return this.image.toString()
    },
  },
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
}

.active {
  background: #fff3c8;
}

.middle {
  font-size: 15px;
}
</style>
