<template>
  <div class="kwe-json" @click="closeToast">
    <div class="kwe-json-title">
      <div class="kwe-type">type: </div>
      <select v-model="selected" class="kwe-type-input">
        <option v-for="item in typeList" :key="item.pid" :value="item.pid">{{ item.name }}</option>
      </select>
      <div class="kwe-title">title: </div>
      <input v-model.trim="title" class="kwe-title-input" type="text">
    </div>
    <div class="kwe-json-description">
      <div class="kwe-description">description: </div>
      <input v-model.trim="description" type="text" class="kwe-description-input">
    </div>
    <div class="kwe-json-content">
      <p class="kwe-content">content: <span class="kwe-upload" @click.stop="upload">上传</span></p>
      <div ref="editor" class="kwe-content-input" />
    </div>
    <toast :show="toast.show" :content="toast.content" :close="toast.showClose" :type="toast.type" @close="closeToast" />
  </div>
</template>

<script>
import Toast from '@/ui/toast'
import base from '../request/api'
import $http from '../request/http'

export default {
  name: 'Upload',
  head() {
    return {
      title: '发布',
      script: [{ src: base.editor }]
    }
  },
  components: {
    toast: Toast
  },
  data() {
    return {
      typeList: [],
      editor: null,
      timer: 0,
      title: '',
      description: '',
      content: '',
      selected: '001_002',
      toast: {}
    }
  },
  computed: {
    userStatus() {
      return this.$store.state.user
    }
  },
  watch: {
    userStatus() {
      if (!this.userStatus.isAdmin) {
        this.noSendTip()
      } else {
        this.closeToast()
      }
    }
  },
  mounted() {
    if (!this.userStatus.isAdmin) {
      this.noSendTip()
    }
    // 获取type列表
    const list = this.$store.state.typeList
    list && this.format(list)
    // 引入编译器
    if (window.wangEditor) {
      this.initEditor()
    } else {
      this.timer = setInterval(() => {
        this.initEditor()
      }, 400)
    }
  },
  methods: {
    initEditor() {
      if (window.wangEditor) {
        clearInterval(this.timer)
        /* eslint-disable */
        this.editor = new window.wangEditor(this.$refs.editor)
        this.editor.customConfig.uploadImgShowBase64 = true
        this.editor.customConfig.onchange = (html) => {
          this.content = html
        }
        this.editor.create()
        /* eslint-enable */
      }
    },
    // 格式化type，去除不需要的分组
    format(data) {
      const list = data.list
      const arr = []
      list.forEach(ele => {
        if (ele.tid === '001') {
          Array.prototype.push.apply(arr, ele.list.slice(1))
        }
      })
      this.typeList = arr
    },
    // 下载json文件
    upload() {
      if (!this.userStatus.isAdmin) {
        this.noSendTip()
        return
      }
      const id = this.$store.state.author && this.$store.state.author._id
      if (!this.title || !this.description || !this.content || !id) {
        this.showToast('输入“title、description、content、id”', 'warn', true)
        return
      }
      const data = {
        title: this.title,
        author: id,
        description: this.description,
        type: this.selected,
        content: this.content,
        created_at: +new Date()
      }
      $http.postArticle(data).then(res => {
        if (res.success) {
          this.title = ''
          this.description = ''
          this.editor.txt.clear()
          this.showToast('上传成功', 'success')
        } else {
          const text = res.msg || '上传失败'
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
    noSendTip() {
      this.showToast('当前角色无法上传文章', 'warn', true)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
.kwe-json {
  width: 800px;
  margin: 0 auto;
  padding-top: 20px;
  font-size: 14px;
  line-height: 1.5;
  .kwe-type,
  .kwe-title {
    width: 60px;
    text-align: left;
    font-size: 16px;
    line-height: 40px;
  }
  .kwe-content,
  .kwe-description {
    text-align: left;
    font-size: 16px;
    line-height: 40px;
  }
  .kwe-type-input {
    display: inline-block;
    width: 80px;
    background: transparent;
    border-color: #00a1d6;
    outline: none;
  }
  .kwe-content-input {
    .w-e-toolbar {
      background: transparent !important;
      border-color: #00a1d6 !important;
    }
    .w-e-text-container {
      height: 600px !important;
      border-color: #00a1d6 !important;
    }
    .w-e-text {
      overflow-y: auto !important;
    }
  }
  &-title {
    display: flex;
    padding-top: 20px;
    line-height: 40px;
  }
  .kwe-title-input,
  .kwe-description-input {
    display: block;
    width: 100%;
    padding: 2px;
    box-sizing: border-box;
    height: 40px;
    border: 1px solid #00a1d6;
    background: transparent;
    font-size: 16px;
    border-radius: 4px;
    outline: none;
  }
  .kwe-description-input {
    font-size: 14px;
  }
  .kwe-upload {
    float: right;
    display: block;
    width: 100px;
    font-size: 18px;
    line-height: 40px;
    text-align: center;
    border-radius: 4px;
    cursor: pointer;
    z-index: 2;
    &:hover {
      color: #000;
    }
  }
}
</style>
