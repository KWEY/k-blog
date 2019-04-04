<template>
  <div class="kwe-left">
    <template v-if="articleList.length > 0">
      <div v-for="item in articleList" :key="item.id" class="kwe-directory">
        <nuxt-link :to="'/article/' + item.id">
          <h3 class="kwe-title">{{ item.title }}</h3>
          <div class="kwe-description">{{ item.description }}</div>
          <div class="kwe-time">{{ new Date(item.created_at).toLocaleString() }}</div>
        </nuxt-link>
      </div>
      <pages v-if="total > limit" :total="Math.ceil(total / limit)" :current="page" @change="change" />
    </template>
    <template v-else>
      <div class="kwe-null">当前分类还未发布文章</div>
    </template>
  </div>
</template>

<script>
import pages from '@/ui/pages.vue'
import { idToName } from '@/store/default-options.js'
export default {
  name: 'LeftPanel',
  components: {
    pages: pages
  },
  data() {
    return {
      limit: 15,
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
        this.page = +val.query.page || 1
      },
      // 深度观察监听
      deep: true
    }
  },
  mounted() {
    this.page = +this.$route.query.page || 1
  },
  methods: {
    change(current) {
      if (this.page !== current) {
        this.page = current
        this.$router.push({
          path: '/',
          query: {
            type: idToName[this.$store.state.typeList.value][1],
            page: this.page,
            keyword: this.$route.query.keyword
          }
        })
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
.kwe-left {
  width: 900px;
  box-sizing: border-box;
  padding: 20px 0;
  overflow-y: auto;
  min-height: 100%;
  text-align: center;
  line-height: 2;
  transition: left 0.5s;

  .kwe-directory {
    width: 96%;
    margin: 8px auto;
    padding: 4px 8px;
    border-radius: 2px;
    transition: all 0.2s;
    background: #fff;
    box-sizing: border-box;
    box-shadow: 0 0 2px 0px #ccc;
    transition: box-shadow 0.5s;
    cursor: pointer;

    &:hover {
      box-shadow: 1px 1px 8px 0px #00a1d6;
    }
    .kwe-title {
      margin: 0;
      font-size: 16px;
      text-align: left;
    }
    .kwe-description {
      font-size: 12px;
      text-align: left;
    }
    .kwe-time {
      font-size: 14px;
      text-align: left;
    }
  }
}
@media screen and (max-width: 800px) {
  .kwe-left {
    width: 100%;
  }
}
</style>
