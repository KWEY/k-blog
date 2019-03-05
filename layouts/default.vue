<template>
  <div class="kwe-index">
    <div v-show="showHome" class="kwe-home">
      <router-link to="/">
        <home-svg class="kwe-home-svg" />
        <span>HOME</span>
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
  padding: 0px 12px;
  border-radius: 12px;
  color: #fff;
  font-size: 14px;
  line-height: 22px;
  font-weight: 200;
  background: rgba(0, 0, 0, 0.6);
  z-index: 2;
  &:hover {
    background: rgba(0, 0, 0, 0.7);
  }
  .kwe-home-svg {
    vertical-align: sub;
    fill: #fff;
    width: 20px;
  }
}
</style>
