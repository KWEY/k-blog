<template>
  <div class="kwe-search">
    <input v-model.trim="keyword" type="text" class="kwe-text" @keyup.enter="keyup" placeholder="站内搜索">
    <search-svg class="kwe-search-svg" @click="searchKeyword" />
  </div>
</template>

<script>
import searchsvg from '@/assets/search.svg'
import $http from '../request/http'

export default {
  name: 'Search',
  components: {
    'search-svg': searchsvg
  },
  data() {
    return {
      keyword: '',
      limit: 15,
      type: 'all',
      page: 1
    }
  },
  computed: {
    total() {
      return this.$store.state.total
    },
    articleList() {
      return this.$store.state.articleList
    }
  },
  watch: {
    $route: {
      handler(val, oldVal) {
        this.type = val.query.type
        this.page = +val.query.page
        this.keyword = val.query.keyword
        this.getArticles()
      },
      // 深度观察监听
      deep: true
    }
  },
  methods: {
    keyup(ev) {
      ev.keyCode === 13 && this.searchKeyword()
    },
    searchKeyword() {
      if (this.keyword) {
        this.$router.push({
          path: '/',
          query: {
            keyword: this.keyword
          }
        })
      }
      $http.track({flag: 'Search', params: this.keyword})
    },
    getArticles() {
      this.$store.dispatch('getArticles', {
        keyword: this.keyword,
        type: this.type,
        page: this.page,
        limit: this.limit
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
.kwe-search {
  display: flex;
  height: 36px;
  margin: 1px 0;
  background: #fff;
  border-radius: 18px;
  border: 1px solid #dfe1e5;
  &:hover {
    box-shadow: 1px 1px 1px #ccc;
  }
  .kwe-text {
    background-color: transparent;
    border: none;
    margin: 0;
    width: 100%;
    padding-left: 16px;
    color: rgba(0, 0, 0, 0.87);
    outline: none;
    flex: 100%;
    -webkit-tap-highlight-color: transparent;
  }
  .kwe-search-svg {
    height: 100%;
    width: 30px;
    padding: 0 10px;
    color: #00a1d6;
    fill: #00a1d6;
    cursor: pointer;
  }
}
@media screen and (max-width: 800px) {
  .kwe-search {
    height: 30px;
  }
}
</style>
