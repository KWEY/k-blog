<template>
  <div class="kwe-index">
    <div class="kwe-left">
      <div class="kwe-info">
        kwe: github
      </div>
      <div class="kwe-article"></div>
      <div class="kwe-tool">
        <router-link to="/nav">收藏夹</router-link>
      </div>
    </div>
    <div class="kwe-right"></div>
  </div>
</template>

<script>
export default {
  name: 'index',
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.kwe-index {
  display: flex;
}
.kwe-left {
  width: 200px;
  text-align: center;
  line-height: 2;
}
</style>
