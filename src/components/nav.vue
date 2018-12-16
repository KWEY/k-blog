<template>
  <div class="kwe-nav" :class="{loading: loading}">
    <remote-script :src="jqsrc" @load='navLoad'></remote-script>
    <remote-script :src="navsrc" @load='navLoad'></remote-script>
    <div class="kwe-nav-wrap"></div>
  </div>
</template>

<script>
import RemoteScript from './plugin/remote-script';

export default {
  name: 'navWrap',
  components: {
    'remote-script': RemoteScript,
  },
  data() {
    return {
      jqsrc: 'http://www.webq.top/static/plugins/jquery-2.1.1.js',
      navsrc: 'http://www.webq.top/static/js/nav.js',
      times: 0,
      loading: true,
    };
  },
  methods: {
    navLoad() {
      this.times += 1;
      if (this.times === 2) {
        /* eslint-disable */
        new NAV.Nav({ className: 'kwe-nav-wrap' });
        /* eslint-enable */
        this.loading = false;
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
.kwe-nav.loading {
  min-height: 200px;
  background: url('../assets/loading.gif') no-repeat center;
}
</style>
