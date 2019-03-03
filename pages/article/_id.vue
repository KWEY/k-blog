<template>
  <div v-if="article" class="kwe-article">
    <div class="kwe-title">
      <div class="kwe-name">{{ article.title }}</div>
      <div class="kwe-time">{{ article.time }}</div>
    </div>
    <div class="kwe-context" v-html="article.content" />
  </div>
</template>

<script>
export default {
  name: 'RightPanel',
  data() {
    return {}
  },
  computed: {
    article() {
      return this.$store.state.article.article
    }
  },
  fetch({ store, route }) {
    return store.dispatch('article/getArticle', route.params.id)
  },
  mounted() {
    document.title = this.article.title
  }
}
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
