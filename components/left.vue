<template>
  <dir class="kwe-left-wrap" :class="showleft">
    <div class="kwe-left" @touchmove.stop @touchstart.stop>
      <div class="kwe-left-info">
        <div class="kwe-wrap">
          <img class="kwe-img" :src="author.avatar" alt="kwe">
        </div>
        <div class="kwe-title">{{ author.username }}</div>
      </div>
      <div class="kwe-left-artList">
        <collapse :type-list="typeList" @tab-change="tabChange" />
      </div>
      <div class="kwe-left-link">
        <a href="https://github.com/KWEY" target="_blank"><github-svg class="kwe-github" /></a>
      </div>
    </div>
  </dir>
</template>

<script>
import collapse from '@/ui/collapse.vue'
import githubsvg from '@/assets/github.svg'

export default {
  name: 'LeftPanel',
  components: {
    'github-svg': githubsvg,
    collapse
  },
  props: {
    showleft: {
      type: String,
      default: ''
    }
  },
  data() {
    return {}
  },
  computed: {
    author() {
      return this.$store.state.author
    },
    typeList() {
      return this.$store.state.typeList
    }
  },
  methods: {
    tabChange(tab) {
      this.$store.dispatch('changeTab', tab)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
@top_bg: rgba(74, 74, 74, 1);
.kwe-left-wrap {
  flex: none;
  position: relative;
  width: 300px;
  height: 100%;
  margin: 0;
  padding: 0;
}
.kwe-left {
  position: fixed;
  width: 300px;
  height: 100%;
  overflow-y: auto;
  text-align: center;
  line-height: 2;
  background: #fff;
  transform: scaleX(1);
  transition: transform 0.3s;
  box-shadow: 0 0 2px 2px #ccc;
  z-index: 1;
  /* 个人信息 */
  &-info {
    height: 200px;
    background: linear-gradient(
      @top_bg,
      @top_bg 100px,
      transparent 100px,
      transparent 100%
    );

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
        display: inline-block;
        width: 100%;
        height: 100%;
      }
    }
  }
  /* 外链 */
  &-artList {
    margin-bottom: 20px;
  }
  /* 外链 */
  &-link {
    position: absolute;
    width: 100%;
    left: 0;
    bottom: 0;
    margin: 10px 0;
    .kwe-github {
      display: inline-block;
      width: 30px;
      height: 30px;
    }
  }
}
@media screen and (max-width: 800px) {
  .kwe-left-wrap {
    width: 0;
    overflow: hidden;
  }
  .kwe-left-wrap.show-left {
    overflow: auto;
    .kwe-left {
      transform: scaleX(1);
    }
  }
  .kwe-left {
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 300px;
    transform: scaleX(0);
  }
}
</style>
