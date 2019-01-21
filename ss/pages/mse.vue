<template>
  <div class="mse-index">
    <div class="mse-menu" @click="toggle">
        <menu-svg class="mse-menu-svg"/>
    </div>
    <left-panel :showLeft="showLeft"></left-panel>
    <right-panel></right-panel>
    <div class="mse-to-top"><a href="#a0"><to-top-svg class="mse-to-top-svg"/></a></div>
  </div>
</template>

<script>
import leftPanel from './mse/left.vue';
import rightPanel from './mse/right.vue';
import menusvg from '../assets/menu.svg';
import totopsvg from '../assets/to-top.svg';

export default {
  name: 'mse',
  components: {
    'left-panel': leftPanel,
    'right-panel': rightPanel,
    'menu-svg': menusvg,
    'to-top-svg': totopsvg,
  },
  data() {
    return {
      showLeft: '',
    };
  },
  methods: {
    toggle() {
      this.showLeft = this.showLeft ? '' : 'show-left';
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
.mse-index {
  width: 100%;
  height: 100%;
  background: #fff;

   .mse-to-top {
    position: fixed;
    bottom: 10px;
    right: 40px;
    width: 60px;
    height: 60px;
    border: 1px solid #ccc;
    border-radius: 2px;
    cursor: pointer;
    .mse-to-top-svg{
      width: 100%;
      height: 100%;
      fill: #cdcdcd;
      &:hover {
        fill: #0fc;
      }
    }
  }
}
.mse-menu {
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
  .mse-menu {
    display: block;
  }
}
</style>
