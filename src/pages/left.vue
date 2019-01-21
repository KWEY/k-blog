<template>
  <div class="kwe-left" :class='showLeft'>
    <div class="kwe-left-info">
      <div class="kwe-wrap">
        <title-svg class="kwe-img"/>
      </div>
      <div class="kwe-title">{{title}}</div>
    </div>
    <div class="kwe-left-artList">
      <collapse :typeList="typeList"></collapse>
    </div>
    <div class="kwe-left-link">
      <a href="https://github.com/KWEY" target="_blank"><github-svg class="kwe-github"/></a>
    </div>
  </div>
</template>

<script>
import collapse from '@/ui/collapse';
import $http from '@/request/http';
import githubsvg from '../assets/github.svg';
import titlesvg from '../assets/title.svg';

export default {
  name: 'leftPanel',
  components: {
    'github-svg': githubsvg,
    'title-svg': titlesvg,
    collapse,
  },
  props: ['showLeft'],
  data() {
    return {
      typeList: {},
    };
  },
  computed: {
    title() {
      return this.$store.state.user.name;
    },
  },
  mounted() {
    // 获取type列表
    const list = this.$store.state.typeList;
    if (list) {
      this.typeList = list;
    } else {
      $http.getTypeList().then((data) => {
        this.typeList = data;
        this.$store.dispatch('setTypeList', data);
      });
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
@top_bg: rgba(74,74,74, 1);

.kwe-left {
  position: fixed;
  top: 0;
  left: 0;
  width: 300px;
  height: 100%;
  text-align: center;
  line-height: 2;
  background: #fff;
  transform: translateX(0);
  transition: transform .3s;
  box-shadow: 0 0 2px 2px #ccc;
  z-index: 1;
    /* 个人信息 */
  &-info {
    height: 200px;
    background: linear-gradient( @top_bg, @top_bg 100px, transparent 100px, transparent 100%);

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

      .kwe-img {
        position: relative;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
      }
    }
  }
  /* 外链 */
  &-link {
    position: absolute;
    width: 100%;
    left: 0;
    bottom: 0;
    margin: 10px;
    .kwe-github {
      display: inline-block;
      width: 30px;
      height: 30px;
    }
  }
}
@media screen and (max-width: 800px){
  .kwe-left.show-left {
    transform: translateX(0);
  }
  .kwe-left {
    transform: translateX(-100%);
  }
}
</style>
