<template>
  <div>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" fill="none"
      :class="{ 'animate-spin-slow': true, 'svg-spin-default-small': size === 'small', 'svg-spin-default-middle': size === 'middle', 'svg-spin-default-large': size === 'large' }">
      >
      <circle cx="60" cy="60" r="58" stroke="#E6E6E6" stroke-width="4"></circle>
      <path
        d="M60 1.99854C60 0.894775 60.8951 -0.0034764 61.9983 0.0332755C72.7023 0.389886 83.1294 3.60623 92.1882 9.36484C101.81 15.4813 109.49 24.2125 114.328 34.536C119.167 44.8596 120.964 56.348 119.51 67.6561C118.055 78.9641 113.408 89.6236 106.114 98.3862C98.8198 107.149 89.18 113.652 78.3234 117.134C67.4669 120.615 55.843 120.932 44.813 118.046C33.7831 115.16 23.8036 109.192 16.0434 100.839C8.73714 92.9749 3.68279 83.3042 1.3905 72.8424C1.15426 71.7642 1.87525 70.721 2.9607 70.5208C4.04615 70.3206 5.08477 71.0392 5.32358 72.1168C7.47644 81.8318 12.1824 90.8107 18.9717 98.1183C26.215 105.915 35.5296 111.486 45.8247 114.179C56.1199 116.873 66.9695 116.577 77.1028 113.328C87.2361 110.078 96.2337 104.008 103.042 95.829C109.85 87.6501 114.187 77.7008 115.545 67.146C116.903 56.5913 115.226 45.8682 110.709 36.2324C106.193 26.5966 99.0246 18.447 90.0439 12.738C81.6261 7.38692 71.9425 4.38767 61.9981 4.03272C60.8951 3.99335 60 3.1023 60 1.99854Z"
        fill="#319CF3"></path>
    </svg>
  </div>
</template>

<script>
export default {
  name: 'DefaultLoader',
  props: ['size']
}
</script>

<style lang="scss">
.svg-spin-default-small {
  margin: auto;
  width: 60px;
  height: 100%;
}

.svg-spin-default-middle {
  margin: auto;
  width: 120px;
}

.svg-spin-default-large {
  margin: auto;
  width: 180px;
}
</style>
