<template>
  <footer class="kwe-foot">
    <div> ヽ(́◕◞౪◟◕‵)ﾉ我是来撑场面的ヽ(́◕◞౪◟◕‵)ﾉ</div>
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
    return {}
  },
  computed: {
    author() {
      return this.$store.state.author
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
  line-height: 200px;
  box-shadow: 0 -1px 2px 2px #ccc;
  .kwe-sw {
    position: absolute;
    top: 0;
    width: 100%;
    line-height: 150px;
  }
}
</style>
