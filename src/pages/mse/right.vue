<template>
  <div class="mse-right">
    <div class="mse-doc" v-html="article"></div>
  </div>
</template>

<script>

export default {
  name: 'rightPanel',
  data() {
    return {
    };
  },
  computed: {
    article() {
      return this.$store.state.mse.mseArticle;
    },
  },
  methods: {
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
h1,h2,h3,h4,h5,h6{
  margin: 4px 0;
}
pre {
  background: #DEF;
}
.mse-right {
  position: absolute;
  left: 310px;
  right: 0;
  max-width: 800px;
  min-width: 500px;
  box-sizing: border-box;
  padding: 10px;
  min-height: 100%;
  text-align: center;
  line-height: 2;
  transition: left .3s;
  text-align: left;
  background: #fff;
  .mse-title {
    font-size: 20px;
    color: #005A9C;
  }
  .mse-list-wrap {
    a {
      color: #005A9C;
      &:hover {
        text-decoration: underline;
      }
    }
    .code {
      background: #DEF;
      padding: 4px 8px;
    }
    .note {
      position: relative;
      padding: 2.5em 1.2em 0.5em;
      margin-top: 10px;
      background: #E9FBE9;
      border-left: 2px solid #52E052;
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
  }
}
@media screen and (max-width: 800px){
  .mse-right {
    margin-left: 0;
    left: 0;
  }
}

</style>
