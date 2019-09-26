<template>
  <div class="kwe-comment">
  </div>
</template>

<script>
import $http from '../request/http'

export default {
  name: 'Comment',
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
    userStatus() {
      return this.$store.state.user
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
    },
    articleId(id) {
      $http.track({flag: 'article', params: id})
    },
    articleType(id) {
      $http.track({flag: 'articleType', params: id})
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
.kwe-comment {
  flex-grow: 1;
  box-sizing: border-box;
  padding: 20px 0;
  overflow-y: auto;
  min-height: 100%;
  text-align: center;
  line-height: 2;
  transition: comment 0.5s;

}
</style>
