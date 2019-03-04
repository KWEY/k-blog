<template>
  <div class="kwe-right">
    <div v-for="item in articleList" :key="item.id" class="kwe-directory">
      <router-link :to="'/article/' + item.id">
        <div class="kwe-title">{{ item.title }}</div>
        <div class="kwe-description">{{ item.description }}</div>
        <div class="kwe-time">{{ item.created_at }}</div>
      </router-link>
    </div>
    <pages v-if="total > 1" :total="total" @change="change" />
  </div>
</template>

<script>
import pages from '@/ui/pages.vue'
export default {
  name: 'RightPanel',
  components: {
    pages: pages
  },
  data() {
    return {
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
        this.type = val.query.type || 'all'
        this.page = val.query.page || 1
        this.getArticles()
      },
      // 深度观察监听
      deep: true
    }
  },
  methods: {
    change(current) {
      if (this.page !== current) {
        this.page = current
        this.getArticles()
      }
    },
    getArticles(type, page) {
      this.$store.dispatch('getArticles', {
        type: this.type,
        page: this.page
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
.kwe-right {
  width: 800px;
  box-sizing: border-box;
  padding: 10px 0;
  min-height: 100%;
  text-align: center;
  line-height: 2;
  transition: left 0.3s;

  .kwe-directory {
    width: 96%;
    margin: 8px auto;
    padding: 4px 8px;
    border-radius: 2px;
    transition: all 0.2s;
    background: #fff;
    box-sizing: border-box;
    box-shadow: 0 0 2px 0px #ccc;
    cursor: pointer;

    &:hover {
      box-shadow: 1px 1px 8px 0px #00a1d6;
    }
    .kwe-title {
      font-size: 16px;
      text-align: left;
    }
    .kwe-description {
      font-size: 12px;
      text-align: left;
    }
    .kwe-time {
      font-size: 14px;
      text-align: right;
    }
  }
}
@media screen and (max-width: 800px) {
  .kwe-right {
    width: 100%;
  }
}
</style>
