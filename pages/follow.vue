<template>
  <div class="kwe-nav" :class="{loading: loading}">
    <div class="kwe-nav-wrap" />
  </div>
</template>

<script>
import base from '../request/api'
export default {
  name: 'Follow',
  head: {
    title: 'Follow',
    script: [{ src: base.jq }, { src: base.nav }]
  },
  data() {
    return {
      timer: 0,
      times: 0,
      loading: true
    }
  },
  mounted() {
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
      if (window.NAV) {
        clearInterval(this.timer)
        /* eslint-disable */
        new window.NAV.Nav({
          className: 'kwe-nav-wrap',
          url: '/db/nav-x.json'
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
</style>
