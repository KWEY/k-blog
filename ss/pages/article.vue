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
import $http from '../request/http.js';

export default {
  name: 'rightPanel',
  data() {
    return {
      article: {},
    };
  },
  mounted() {
    // 获取目录列表
    const id = this.$route.params.id;
    const arr = id.split('_');
    const article = this.$store.state.article;
    if (article && article.id === id) {
      this.article = article;
    } else {
      $http.getArticle({
        id,
        tid: arr[0],
      }).then((data) => {
        this.article = data;
        this.$store.dispatch('setArticle', data);
      });
    }
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
