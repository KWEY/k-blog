<template>
  <div class="kwe-static" >
    <h1 class="kwe-title">静态页面地址</h1>
    <a to="../pages/py00.html" target="_blank">
      <h5 class="kwe-li">认识 Python</h5>
    </a>
    <a to="../pages/py01.html" target="_blank">
      <h5 class="kwe-li">Python 语法</h5>
    </a>
  </div>
</template>
<script>
import { baseUrl } from '../request/api'
export default {
  name: 'Static',
  data() {
    return {
      baseUrl: baseUrl
    }
  },
}
</script>
<style lang="less">
.kwe-static {
  max-width: 800px;
  margin: 60px auto;
  .kwe-title, .kwe-li {
    border-bottom: 1px solid #00a1d6;
  }
  .kwe-li {
    &:hover {
      color: #00a1d6
    }
  }
}
</style>
