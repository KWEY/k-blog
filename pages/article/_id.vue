<template>
  <div v-if="article" class="kwe-article">
    <div class="kwe-title">
      <div class="kwe-name">{{ article.title }}</div>
      <div class="kwe-bar-top">
        <div v-if="article.updated_at > (article.created_at + 10000)" class="time">更新：{{ new Date(article.updated_at).toLocaleString() }}</div>
        <div class="time">创建：{{ new Date(article.created_at).toLocaleString() }}</div>
        <div class="read-count">阅读数：{{ article.views }}</div>
        <div class="tag">
          <span class="label">标签：</span>
          <nuxt-link v-for="item of article.type" :key="item.name[1]" :to="'/?type=' + item.name[1]" class="kwe-link">{{ item.name[0] }}</nuxt-link>
        </div>
        <template v-if="userStatus.isAdmin">
          <div class="kwe-edit">
            <span class="label">操作：</span>
            <nuxt-link to="/edit" class="kwe-link">编辑</nuxt-link>
            <span class="kwe-link kwe-delete" @click="deleteArticle">删除</span>
          </div>
        </template>
      </div>
    </div>
    <div class="kwe-description" v-text="article.description" />
    <div class="kwe-context" v-html="article.content || '文章已删除'" />
    <toast :show="toast.show" :content="toast.content" :close="toast.showClose" :type="toast.type" @close="closeToast" />
  </div>
</template>

<script>
import Toast from '@/ui/toast'
import $http from '../../request/http'
export default {
  name: 'RightPanel',
  components: {
    toast: Toast
  },
  data() {
    return {
      toast: {}
    }
  },
  computed: {
    article() {
      return this.$store.state.article.article
    },
    userStatus() {
      return this.$store.state.user
    }
  },
  fetch({ store, route }) {
    return store.dispatch('article/getArticle', {
      id: route.params.id,
      edit: route.query.edit
    })
  },
  mounted() {
    document.title = this.article.title
  },
  methods: {
    deleteArticle() {
      $http.deleteArticle({ id: this.article.id }).then(res => {
        if (res.success) {
          this.deleteSuccess()
          this.showToast('删除成功', 'success')
        } else {
          const text = res.msg || '上删除失败'
          this.showToast(text, 'warn', true)
        }
      })
    },
    showToast(content, type, showClose = false) {
      this.toast = {
        type,
        content,
        showClose,
        show: true,
        duration: 1000
      }
      if (!showClose) {
        setTimeout(() => {
          this.toast.show = false
        }, this.toast.duration)
      }
    },
    closeToast() {
      this.toast.show = false
    },
    deleteSuccess() {
      // 防错删
      this.$router.push('/')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
.kwe-article {
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
  padding: 60px 8px;
  font-size: 16px;
  box-sizing: border-box;
  overflow: hidden;
  background: #fff;
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
  pre {
    background: #eee;
    padding: 4px 20px;
    color: #07a;
    border-radius: 4px;
    overflow-x: auto;
  }
  table {
    border-collapse: collapse;
  }
  table,
  td,
  th {
    border: 1px solid #ccc;
  }
  .kwe-name {
    font-size: 26px;
    text-align: center;
    line-height: 2;
  }
  .kwe-bar-top {
    display: flex;
    justify-content: flex-end;
    flex-wrap: wrap;
    margin-bottom: 10px;
    padding-bottom: 14px;
    text-align: right;
    font-size: 12px;
    line-height: 20px;
    color: #4d4d4d;
    border-bottom: 1px solid #e0e0e0;
    .time {
      margin: 0 2px;
    }
    .read-count {
      margin: 0 16px;
    }
    .kwe-link {
      display: inline-block;
      box-sizing: border-box;
      margin-right: 8px;
      padding: 0 8px;
      height: 20px;
      min-width: 24px;
      line-height: 20px;
      border: 1px solid #ccc;
      border-radius: 100px;
      font-size: 12px;
      text-align: center;
      color: #00a1d6;
      cursor: pointer;
      &:hover {
        border-color: #00a1d6;
        text-shadow: 1px 1px 1px #ccc;
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
