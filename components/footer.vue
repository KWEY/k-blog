<template>
  <footer class="kwe-foot">
    <div>ヽ(́◕◞౪◟◕‵)ﾉ距2019年5月18日20：35(́◕◞౪◟◕‵)ﾉ</div>
    <div class="kwe-duration">{{ duration }}</div>
    <div class="kwe-sw">{{ sw }}</div>
  </footer>
</template>

<script>
export default {
  name: 'LeftPanel',
  components: {},
  props: {
    sw: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      duration: 0
    }
  },
  computed: {
    author() {
      return this.$store.state.author
    }
  },
  mounted() {
    const base = new Date(2019, 4, 18, 20, 35)
    setInterval(() => {
      this.parse(Date.now() - base.getTime())
    }, 1000)
  },
  methods: {
    parse(duration) {
      const dayDiff = Math.floor(duration / (24 * 3600 * 1000))
      const leave1 = duration % (24 * 3600 * 1000)
      const hours = Math.floor(leave1 / (3600 * 1000))

      const leave2 = leave1 % (3600 * 1000)
      const minutes = Math.floor(leave2 / (60 * 1000))

      const leave3 = leave2 % (60 * 1000)
      const seconds = Math.round(leave3 / 1000)
      this.duration = `${dayDiff}天${hours}时${minutes}分${seconds}秒`
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
.kwe-foot {
  position: relative;
  text-align: center;
  height: 200px;
  box-shadow: 0 -1px 2px 2px #ccc;
  box-sizing: border-box;
  padding-top: 75px;
  .kwe-sw {
    position: absolute;
    top: 0;
    width: 100%;
    line-height: 150px;
  }
}
</style>
