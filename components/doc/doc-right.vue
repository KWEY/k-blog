<template>
  <div class="doc-right">
    <div class="doc-doc" v-html="article" />
  </div>
</template>

<script>
export default {
  name: 'RightPanel',
  data() {
    return {}
  },
  computed: {
    article() {
      return this.$store.state.doc.docArticle
    }
  },
  methods: {}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
.doc-right {
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 4px 0;
  }
  pre {
    background: #def;
  }
  table {
    border-collapse: collapse;
  }
  table,
  td,
  th {
    border: 1px solid #ccc;
  }
  img {
    max-width: 100%;
  }
  position: absolute;
  left: 310px;
  right: 0;
  box-sizing: border-box;
  padding: 16px;
  min-height: 100%;
  text-align: center;
  line-height: 2;
  transition: left 0.3s;
  text-align: left;
  background: #fff;
  .doc-title {
    font-size: 20px;
    color: #005a9c;
  }
  .doc-list-wrap {
    a {
      color: #005a9c;
      &:hover {
        text-decoration: underline;
      }
    }
    .code {
      background: #def;
      padding: 4px 8px;
    }
    .note {
      position: relative;
      padding: 2.5em 1.2em 0.5em;
      margin-top: 10px;
      background: #e9fbe9;
      border-left: 2px solid #52e052;
      &:after {
        color: #2b2;
        content: 'Note';
        position: absolute;
        left: 1.2em;
        font-size: 14px;
        top: 0;
        display: block;
        width: 100%;
        line-height: 40px;
      }
    }
    .scroll {
      max-width: 100%;
      overflow-x: auto;
    }
  }
}
@media screen and (max-width: 800px) {
  .doc-right {
    margin-left: 0;
    left: 0;
  }
}
</style>
