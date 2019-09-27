<template>
  <div class="kwe-nav" :class="{loading: loading}">
    <template v-if="isMobile">
      <p class="kwe-mobile">
        移动端暂时不支持此功能
      </p>
    </template>
    <template v-else>
      <div class="kwe-nav-wrap" />
    </template>
  </div>
</template>

<script>
import base from '../request/api'
import $http from '../request/http'
export default {
  name: 'Follow',
  head: {
    title: 'Follow',
    script: [{ src: base.nav }]
  },
  data() {
    return {
      timer: 0,
      times: 0,
      loading: true,
      isMobile: false
    }
  },
  mounted() {
    this.isMobile = this.$store.state.isMobile
    if (this.isMobile) {
      this.loading = false
      return
    }
    if (window.NAV) {
      this.initNav()
    } else {
      this.timer = setInterval(() => {
        this.initNav()
      }, 400)
    }
  },
  methods: {
    initNav() {
      if (window.Nav) {
        clearInterval(this.timer)
        /* eslint-disable */
        new window.Nav({
          className: 'kwe-nav-wrap',
          url: '/db/nav-x.json',
          callback: (data) => {
            data && $http.track({
              flag: 'nav-' + data.flag,
              params: data.params || ''
            })
          }
        })
        /* eslint-enable */
        this.loading = false
      }
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
.kwe-nav.loading {
  min-height: 200px;
  background: url('../assets/loading.gif') no-repeat center;
}
.kwe-mobile {
  margin: 60px 0;
  text-align: center;
}
.kwe-nav-wrap {
  .nav-x {
    height: 100%;
    padding-top: 60px;
    &-list {
      height: 100%;
      margin: -30px auto 0;
      padding: 50px 10px;
      box-sizing: border-box;
    }
  }
}
</style>
