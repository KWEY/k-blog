<template>
  <div class="kwe-article">
    <div class="kwe-title">
      <div class="kwe-name">{{article.title}}</div>
      <div class="kwe-time">{{article.time}}</div>
    </div>
    <div class="kwe-context" v-html="article.context"></div>
  </div>
</template>

<script>

export default {
  asyncData(store, router) {
    return store.dispatch('getArticle', router.params.id);
  },
  name: 'rightPanel',
  data() {
    return {
    };
  },
  computed: {
    article() {
      return this.$store.state.article.article;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
.kwe-article {
  width: 800px;
  margin: 0 auto;
  padding: 20px 8px;
  font-size: 14px;

  .kwe-name {
    font-size: 20px;
    text-align: center;
    line-height: 2;
  }
  .kwe-time {
    text-align: right;
  }
  .kwe-context {
    // color: #33495e;
    line-height: 1.5;
  }
}

</style>
