<template>
  <div v-if="article" class="kwe-article">
    <div class="kwe-title">
      <div class="kwe-name">{{ article.title }}</div>
      <div class="kwe-bar-top">
        <span class="time">{{ article.created_at }}</span>
        <span class="read-count">阅读数：{{ article.views }}</span>
        <span class="label">标签：</span>
        <router-link v-for="item of article.type" :key="item[1]" :to="'/?type=' + item[1]" class="kwe-link">{{ item[0] }}</router-link>
      </div>
    </div>
    <div class="kwe-description" v-text="article.description" />
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
  width: 100%;
  max-width: 800px;
  margin: 0 auto 100px;
  padding: 20px 8px;
  font-size: 14px;
  box-sizing: border-box;
  overflow: hidden;
  img {
    max-width: 100%;
  }
  a {
    font-size: 16px;
    color: #00a1d6;
    cursor: pointer;
    &:hover {
      text-shadow: 1px 1px #ccc;
    }
  }

  .kwe-name {
    font-size: 26px;
    text-align: center;
    line-height: 2;
  }
  .kwe-bar-top {
    margin-bottom: 10px;
    padding-bottom: 14px;
    text-align: right;
    color: #4d4d4d;
    border-bottom: 1px solid #e0e0e0;
    .kwe-link {
      display: inline-block;
      margin-right: 8px;
      padding: 0 8px;
      height: 20px;
      min-width: 24px;
      line-height: 20px;
      border: 1px solid #ccc;
      border-radius: 100px;
      font-size: 14px;
      text-align: center;
      &:hover {
        border-color: #00a1d6;
      }
    }
  }
  .kwe-description {
    margin-bottom: 6px;
  }
  .kwe-context {
    // color: #33495e;
    line-height: 1.5;
  }
}
</style>
