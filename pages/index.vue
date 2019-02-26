<template>
  <div class="kwe-index">
    <div class="kwe-menu" @click="toggle">
      <menu-svg class="kwe-menu-svg" />
    </div>
    <left-panel :showleft="showleft" />
    <right-panel />
  </div>
</template>

<script>
import leftPanel from '@/components/left.vue'
import rightPanel from '@/components/right.vue'
import menusvg from '@/assets/menu.svg'

export default {
  name: 'Index',
  components: {
    'left-panel': leftPanel,
    'right-panel': rightPanel,
    'menu-svg': menusvg
  },
  data() {
    return {
      showleft: ''
    }
  },
  fetch({ store, route }) {
    const type = route.query.type || 'all'
    return Promise.all([
      store.dispatch('getTypeList', type),
      store.dispatch('getDirectoryList', type)
    ])
  },
  methods: {
    toggle() {
      this.showleft = this.showleft ? '' : 'show-left'
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
.kwe-index {
  // background: rgba(0, 255, 255, .3);
  width: 100%;
  height: 100%;
  // background: url('../assets/3.jpg') center;
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
  box-shadow: 0 0 2px 2p #ccc;
  cursor: pointer;
  &-svg {
    width: 100%;
    height: 100%;
  }
}
@media screen and (max-width: 800px) {
  .kwe-menu {
    display: block;
  }
}
</style>
