<template>
  <div class="doc-left" :class="showLeft">
    <h1>目录</h1>
    <div class="doc-directory" style="text-align: center">
      <a :href="types.orginal" target="_blank">原文</a>
    </div>
    <div v-for="item in types.typeList" :key="item.id" class="doc-directory">
      <a :href="item.id">
        <span class="doc-title">{{ item.title }}</span>
        <span class="doc-name">{{ item.name }}</span>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LeftPanel',
  props: {
    showLeft: {
      type: String,
      default: ''
    }
  },
  data() {
    return {}
  },
  computed: {
    types() {
      return this.$store.state.doc.docMenu
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
@top_bg: rgba(74, 74, 74, 1);
.textOverflow(@width : 100%) {
  width: @width;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
.doc-left {
  position: fixed;
  top: 0;
  left: 0;
  width: 300px;
  height: 100%;
  text-align: center;
  line-height: 2;
  background: #fff;
  transform: translateX(0);
  transition: transform 0.3s;
  box-shadow: 0 0 2px 2px #ccc;
  z-index: 1;
  overflow-y: scroll;
}
.doc-directory {
  position: relative;
  text-align: left;
  .textOverflow();
  &:last-child {
    margin-bottom: 40px;
  }
  &:hover {
    &:after {
      transform: scale(1);
    }
  }
  &:after {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    display: inline-block;
    width: 100%;
    height: 1px;
    background: #0ff;
    transition: transform 0.3s;
    transform: scale(0);
    transform-origin: center;
  }
  .doc-title {
    display: inline-block;
    width: 50px;
    margin-left: 30px;
  }
  // .doc-name {
  //   .textOverflow();
  // }
}
@media screen and (max-width: 800px) {
  .doc-left.show-left {
    transform: translateX(0);
  }
  .doc-left {
    transform: translateX(-100%);
  }
}
</style>
