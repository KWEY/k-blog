<template>
  <div class="kwe-default-wrap">
    <top-list />
    <nuxt />
    <footer-panel v-if="showHome" />
    <load v-show="loading" />
  </div>
</template>
<script>
// import headerPanel from '@/components/header.vue'
import footerPanel from '@/components/footer.vue'
import toplist from '@/components/toplist/top-list.vue'
import load from '@/components/loading.vue'
export default {
  components: {
    load: load,
    'top-list': toplist,
    // 'header-panel': headerPanel,
    'footer-panel': footerPanel
  },
  data() {
    return {
      showHome: false
    }
  },
  computed: {
    loading() {
      return this.$store.state.loading
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
      if (route.path === '/') {
        this.showHome = true
      } else {
        this.showHome = false
      }
    }
  }
}
</script>
<style lang="less">
.kwe-default-wrap {
  color: #33495e;
  font-family: 'Source Sans Pro', 'Helvetica Neue', Arial, sans-serif;
}
</style>
