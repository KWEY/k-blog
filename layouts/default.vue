<template>
  <div class="kwe-index">
    <div v-show="showHome" class="kwe-home">
      <router-link to="/">
        <home-svg class="kwe-home-svg" />HOME
      </router-link>
    </div>
    <nuxt />
  </div>
</template>
<script>
import homesvg from '@/assets/home.svg'
export default {
  components: {
    'home-svg': homesvg
  },
  data() {
    return {
      showHome: false
    }
  },
  watch: {
    $route: {
      handler(val, oldVal) {
        this.toogle(val)
      },
      // 深度观察监听
      deep: true
    }
  },
  mounted() {
    this.toogle(this.$route)
  },
  methods: {
    toogle(route) {
      if (route.path !== '/') {
        this.showHome = true
      } else {
        this.showHome = false
      }
    }
  }
}
</script>
<style lang="less">
.kwe-index {
  position: absolute;
  width: 100%;
}
.kwe-home {
  position: fixed;
  top: 10px;
  left: 10px;
  z-index: 2;
  &:hover {
    color: #0fc;
  }
  .kwe-home-svg {
    width: 20px;
    margin: 0 8px;
  }
}
</style>
