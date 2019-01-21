<template>
  <div class="kwe-index">
    <div class="kwe-menu" @click='toggle'>
        <menu-svg class="kwe-menu-svg"/>
    </div>
    <!-- <left-panel :showLeft='showLeft'></left-panel>
    <right-panel :type='type'></right-panel> -->
  </div>
</template>

<script>
// import leftPanel from './left';
// import rightPanel from './right';
import menusvg from '../assets/menu.svg';

export default {
  name: 'index',
  components: {
    // 'left-panel': leftPanel,
    // 'right-panel': rightPanel,
    'menu-svg': menusvg,
  },
  created() {
    // 组件创建完后获取数据，
    // 此时 data 已经被 observed 了
    // this.fetchData();
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.setType(to);
    });
  },
  watch: {
    // 如果路由有变化，会再次执行该方法
    $route: 'setType',
  },
  data() {
    return {
      showLeft: '',
      type: '',
    };
  },
  methods: {
    setType(route) {
      this.type = route.query.type || 'all';
    },
    toggle() {
      this.showLeft = this.showLeft ? '' : 'show-left';
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
.kwe-index {
  // background: rgba(0, 255, 255, .3);
  width: 100%;
  height: 100%;
  background: url('../assets/3.jpg') center;
  background-attachment: fixed;
  background-size: auto 100%;
}
.kwe-menu {
  display: none;
  position: fixed;
  bottom: 20px;
  left: 20px;
  padding: 4px;
  width: 20px;
  height: 20px;
  z-index: 2;
  background: #ccc;
  box-shadow: 0 0 2px 2px #ccc;
  cursor: pointer;
    &-svg {
      width: 100%;
      height: 100%;
    }
}
@media screen and (max-width: 800px){
  .kwe-menu {
    display: block;
  }
}
</style>
