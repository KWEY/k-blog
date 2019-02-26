<template>
  <div class="kwe-nav" :class="{loading: loading}">
    <div class="kwe-nav-wrap" />
  </div>
</template>

<script>
export default {
  name: 'Follow',
  head: {
    script: [
      { src: 'http://www.webq.top/static/plugins/jquery-2.1.1.js' },
      { src: 'http://www.webq.top/static/plugins/nav.js' }
    ]
  },
  data() {
    return {
      times: 0,
      loading: true
    }
  },
  mounted() {
    /* eslint-disable */
    if (NAV) {
      new NAV.Nav({
        className: 'kwe-nav-wrap',
        url: '/db/nav-x.json'
      })
      /* eslint-enable */
      this.loading = false
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
html,
body {
  background: #fff;
}
.kwe-nav.loading {
  min-height: 200px;
  background: url('../assets/loading.gif') no-repeat center;
}
</style>
