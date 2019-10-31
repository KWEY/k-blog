<template>
  <div v-if="article" class="kwe-article">
    <div class="kwe-title">
      <div class="kwe-name">{{ article.title }}</div>
      <div class="kwe-bar-top">
        <div v-if="article.updated_at > article.created_at + 5000" class="update">
          {{ new Date(article.updated_at).toLocaleString() }}
        </div>
        <div class="time">{{ new Date(article.created_at).toLocaleString() }}</div>
        <div class="read-count">{{ article.views }}</div>
        <div class="tag" 
          v-for="item of article.type"
          :key="item.name[1]"
          @click.stop="articleType(item.name[1])"
        >
          <nuxt-link
            :to="'/?type=' + item.name[1]"
            class="kwe-link"
            >{{ item.name[0] }}</nuxt-link
          >
        </div>
        <template v-if="userStatus.isAdmin">
          <div class="kwe-edit">
            <span class="label" :data-id="authorId">操作：</span>
            <nuxt-link to="/edit" class="kwe-link">编辑</nuxt-link>
            <span class="kwe-link kwe-delete" @click="deleteArticle">删除</span>
          </div>
        </template>
      </div>
    </div>
    <div class="kwe-description" v-text="article.description" />
    <div class="kwe-context" v-html="article.content || '文章已删除'" />
    <toast
      :show="toast.show"
      :content="toast.content"
      :close="toast.showClose"
      :type="toast.type"
      @close="closeToast"
    />
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
    },
    authorId() {
      return this.article.author ? this.article.author.id : ''
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
    },
    articleType(id) {
      $http.track({flag: 'articleType', params: id})
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
.kwe-article {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 60px 20px;
  font-size: 16px;
  box-sizing: border-box;
  overflow: hidden;
  background: rgba(255,255,255,0.6);
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
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-end;
    flex-wrap: wrap;
    margin: 10px 0;
    padding: 14px;
    text-align: right;
    font-size: 12px;
    line-height: 2;
    color: #4d4d4d;
    border-bottom: 1px solid #e0e0e0;
    .update {
      padding-left: 26px;
      background: url('../../assets/update.png') 2px center no-repeat;
      background-size: 20px;
    }
    .time {
      padding-left: 26px;
      background: url('../../assets/time.png') 2px center no-repeat;
      background-size: 18px;
    }
    .read-count {
      padding-left: 26px;
      background: url('../../assets/view.png') 2px center no-repeat;
      background-size: 20px;
    }
    .kwe-link {
      position: relative;
      display: inline-block;
      box-sizing: border-box;
      margin-left: 16px;
      padding-right: 8px;
      min-width: 24px;
      line-height: 20px;
      height: 22px;
      border: 1px solid #c8e5fe;
      border-left-color: transparent;
      font-size: 12px;
      text-align: center;
      color: #00a1d6;
      cursor: pointer;
      &:hover {
        text-shadow: 1px 1px 1px #c8e5fe;
      }
      &:before {
        content: '';
        display: block;
        position: absolute;
        top: 2px;
        left: -9px;
        width: 15px;
        height: 15px;
        transform: rotate(45deg);
        border-left: 1px solid #c8e5fe;
        border-bottom: 1px solid #c8e5fe;
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
@media screen and (max-width: 800px) {
  .kwe-article {
    padding: 60px 10px;
  }
}
</style>
