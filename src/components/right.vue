<template>
  <div class="kwe-right">
    <div class="kwe-directory" v-for="item in directory" :key="item.id">
      <router-link :to="'/article/' + item.id">
        <div class="kwe-title">{{item.title}}</div>
        <div class="kwe-description">{{item.description}}</div>
        <div class="kwe-time">{{item.time}}</div>
      </router-link>
    </div>
  </div>
</template>

<script>
import $http from '@/request/http';

export default {
  name: 'rightPanel',
  data() {
    return {
      directory: [],
      msg: 'Welcome to Your Vue.js App',
    };
  },
  mounted() {
    // 获取目录列表
    const directory = this.$store.state.directory;
    if (directory) {
      this.directory = directory;
    } else {
      $http.getDirectoryList().then((data) => {
        this.directory = data;
        this.$store.dispatch('setDirectory', data);
      });
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
.kwe-right {
  position: absolute;
  right: 0;
  left: 310px;
  box-sizing: border-box;
  padding: 10px 0;
  min-height: 100%;
  text-align: center;
  line-height: 2;
  background: #eaeaea;

  .kwe-directory {
    width: 96%;
    margin: 8px auto;
    padding: 4px 8px;
    border-radius: 2px;
    transition: all .2s;
    background: #fff;
    box-sizing: border-box;
    box-shadow: 0 0 2px 2px #ccc;
    cursor: pointer;

    &:hover {
      box-shadow: 0 0 10px 1px #cc82ff;
    }
    .kwe-title {
      font-size: 16px;
      text-align: left;
    }
    .kwe-description {
      font-size: 12px;
      text-align: left;
    }
    .kwe-time {
      font-size: 14px;
      text-align: right;
    }
  }
}
@media screen and (max-width: 800px){
  .kwe-right {
    margin-left: 0;
    left: 0;
  }
}

</style>
