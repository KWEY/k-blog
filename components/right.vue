<template>
  <div class="kwe-right-wrap" :class="showleft">
    <!-- <div class="kwe-right">放点什么好呢╮(╯_╰)╭</div> -->
    <div class="kwe-data">
      <h3>统计：</h3>
      <ul class="kwe-statistical">
        <li>笔记：（ {{ total || 0 }} ）篇</li>
        <li>工具页：（ 2 ） 页</li>
        <li>文档：（ 2 ）篇</li>
      </ul>
      <h3>今日数据：</h3>
      <ul class="kwe-statistical">
        <li>访问量：{{ statistical.cvisit || 0 }}</li>
        <li>查看量：{{ statistical.cview || 0 }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LeftPanel',
  components: {},
  props: {
    showleft: {
      type: String,
      default: ''
    }
  },
  data() {
    return {}
  },
  computed: {
    statistical() {
      return this.$store.state.statistical
    },
    total() {
      return this.$store.state.total
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
@top_bg: rgba(74, 74, 74, 1);
.kwe-right-wrap {
  flex: none;
  position: relative;
  width: 300px;
  height: 100%;
  margin-top: 30px;
  padding: 20px;
  box-shadow: 0 0 1px 1px #ccc;
  .kwe-right {
    position: absolute;
    width: 300px;
    height: 400px;
    text-align: center;
    line-height: 400px;
    background: #fff;
  }
}
@media screen and (max-width: 800px) {
  .kwe-right-wrap {
    display: none;
    width: 0;
    overflow: hidden;
  }
  .kwe-right-wrap.show-right {
    overflow: auto;
    .kwe-right {
      transform: scaleX(1);
    }
  }
  .kwe-right {
    position: fixed;
    top: 0;
    right: 0;
    height: 100%;
    width: 300px;
    transform: scaleX(0);
  }
}
</style>
