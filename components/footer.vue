<template>
  <footer class="kwe-foot">ヽ(́◕◞౪◟◕‵)ﾉ我是来撑场面的ヽ(́◕◞౪◟◕‵)ﾉ</footer>
</template>

<script>
export default {
  name: 'LeftPanel',
  components: {},
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
  text-align: center;
  height: 200px;
  line-height: 200px;
  box-shadow: 0 -1px 2px 2px #ccc;
}
</style>
