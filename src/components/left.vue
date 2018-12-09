<template>
  <div class="kwe-left">
    <div class="kwe-info">
      <div class="kwe-wrap">
        <title-svg class="kwe-img"/>
      </div>
      <div class="kwe-title">{{title}}</div>
    </div>
    <div class="kwe-article"></div>
    <div class="kwe-tool">
      <router-link to="/nav">收藏夹</router-link>
    </div>
    <div class="kwe-link">
      <a href="https://github.com/KWEY" target="_blank"><github-svg class="kwe-github"/></a>
    </div>
  </div>
</template>

<script>
import githubsvg from '../assets/github.svg';
import titlesvg from '../assets/title.svg';

export default {
  name: 'leftPanel',
  components: {
    'github-svg': githubsvg,
    'title-svg': titlesvg,
  },
  data() {
    return {
      title: '雪人',
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.kwe-left {
  position: fixed;
  top: 0;
  left: 0;
  width: 300px;
  height: 100%;
  text-align: center;
  line-height: 2;
  background: #fff;
}
  /* 个人信息 */
.kwe-info {
  height: 300px;
  background: linear-gradient( #4a4a4a, #4a4a4a 100px, #fff 100px, #fff 100%);
}
.kwe-wrap::before {
  position: absolute;
  top: -10px;
  left: -10px;
  content: '';
  display: inline-block;
  width: 100px;
  height: 100px;
  background: #fff;
  border-radius: 50%;
}
.kwe-wrap {
  position: relative;
  display: inline-block;
  width: 80px;
  height: 80px;
  margin-top: 60px;
  border-radius: 50%;
}
.kwe-img {
  position: relative;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}
/* 外链 */
.kwe-link .kwe-github{
  display: inline-block;
  width: 30px;
  height: 30px;
}
@media screen and (max-width: 800px){
  .kwe-left {
    display: none;
  }

}
</style>
