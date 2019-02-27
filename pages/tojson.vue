<template>
  <div class="kwe-json">
    <div class="kwe-json-title">
      <div class="kwe-type">type: </div>
      <select v-model="selected" class="kwe-type-input">
        <option v-for="item in typeList" :key="item.pid" :value="item.pid">{{ item.name }}</option>
      </select>
      <div class="kwe-title">title: </div>
      <input v-model="title" class="kwe-title-input" type="text">
    </div>
    <div class="kwe-json-description">
      <div class="kwe-description">description: </div>
      <input v-model="description" type="text" class="kwe-description-input">
    </div>
    <div class="kwe-json-context">
      <p class="kwe-context">context: </p>
      <div ref="editor" class="kwe-context-input" />
    </div>
    <div class="kwe-download" @click="download">下载</div>
  </div>
</template>

<script>
import $http from '@/request/http'
import Utils from '@/plugins/utils'
// import select from '@/ui/select'

export default {
  name: 'Tojson',
  head: {
    script: [{ src: '//www.webq.top/static/plugins/wangEditor.min.js' }]
  },
  // components: {
  //   'k-select': select
  // },
  data() {
    return {
      typeList: [],
      title: '',
      description: '',
      context: '',
      selected: '001_001'
    }
  },
  mounted() {
    // 获取type列表
    const list = this.$store.state.typeList
    if (!list) {
      $http.getTypeList('all').then(typeList => {
        this.format(typeList)
      })
    } else {
      this.format(list)
    }
    // 引入编译器
    /* eslint-disable */
    const editor = new wangEditor(this.$refs.editor)
    editor.customConfig.uploadImgShowBase64 = true
    editor.customConfig.onchange = (html) => {
      this.context = html
    }
    editor.create()
    /* eslint-enable */
  },
  methods: {
    // 格式化type，去除不需要的分组
    format(data) {
      const list = data.list
      const arr = []
      list.forEach(ele => {
        if (ele.tid !== '123') {
          Array.prototype.push.apply(arr, ele.list)
        }
      })
      this.typeList = arr
    },
    // 下载json文件
    download() {
      const guid = `${this.selected}_${Utils.guid(1)}_${Utils.guid(1)}`
      const text = {
        title: this.title,
        id: guid,
        time: new Date().toLocaleString(),
        context: this.context
      }
      const index = {
        description: this.description,
        title: this.title,
        id: guid,
        time: new Date().toLocaleString()
      }
      try {
        Utils.download({
          text: JSON.stringify(index, null, '\t'),
          type: 'text/json;charset=utf-8',
          fileName: `000_${guid}.json`
        })
        Utils.download({
          text: JSON.stringify(text, null, '\t'),
          type: 'text/json;charset=utf-8',
          fileName: `${guid}.json`
        })
      } catch (error) {
        /* eslint-disable */
        console.warn(error);
        /* eslint-enable */
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
.kwe-json {
  width: 800px;
  margin: 0 auto;
  font-size: 14px;
  line-height: 1.5;
  .kwe-type,
  .kwe-title,
  .kwe-context,
  .kwe-description {
    width: 60px;
    text-align: left;
    font-size: 16px;
    line-height: 40px;
  }
  .kwe-type-input {
    display: inline-block;
    width: 80px;
    outline: none;
  }
  .kwe-context-input {
    .w-e-text-container {
      height: 600px !important;
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
    border: 1px solid #ccc;
    border-radius: 4px;
    outline: none;
  }
  .kwe-download {
    position: fixed;
    right: 4px;
    top: 50%;
    width: 60px;
    font-size: 16px;
    line-height: 2;
    color: #fff;
    text-align: center;
    background: #00a1d6;
    border-radius: 2px;
    cursor: pointer;
    z-index: 10001;
    &:hover {
      background: #0cc0ff;
    }
  }
}
</style>
