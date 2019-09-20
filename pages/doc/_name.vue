<template>
  <div class="doc-index">
    <div class="doc-menu" @click="toggle">
      <menu-svg class="doc-menu-svg" />
    </div>
    <left-panel :show-left="showLeft" />
    <right-panel />
    <div class="doc-to-top">
      <a href="#a0">
        <rocketsvg-svg class="doc-to-top-svg" />
      </a>
    </div>
  </div>
</template>

<script>
import leftPanel from '@/components/doc/doc-left.vue'
import rightPanel from '@/components/doc/doc-right.vue'
import menusvg from '@/assets/menu.svg'
import rocketsvg from '@/assets/rocket.svg'
import $http from '../../request/http'
export default {
  name: 'Doc',
  components: {
    'left-panel': leftPanel,
    'right-panel': rightPanel,
    'menu-svg': menusvg,
    'rocketsvg-svg': rocketsvg
  },
  data() {
    return {
      showLeft: ''
    }
  },
  fetch({ store, route }) {
    return store.dispatch('doc/getDoc', route.params.name)
  },
  mounted() {
    document.title = this.$route.params.name
    $http.track({flag: 'Doc-'})
  },
  methods: {
    toggle() {
      this.showLeft = this.showLeft ? '' : 'show-left'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
.doc-index {
  width: 100%;
  height: 100%;
  background: #fff;
  h1 {
    margin: 50px 0 0;
  }
  .doc-to-top {
    position: fixed;
    bottom: 10%;
    right: 40px;
    width: 40px;
    height: 40px;
    transform: rotate(-45deg);
    cursor: pointer;
    .doc-to-top-svg {
      width: 100%;
      height: 100%;
      fill: #cdcdcd;
      &:hover {
        fill: #0fc;
      }
    }
  }
  img {
    max-width: 100%;
  }
  a {
    font-size: 14px;
    color: #00a1d6;
    cursor: pointer;
    &:hover {
      text-shadow: 1px 1px #ccc;
    }
  }
  pre {
    background: #eee;
    padding: 4px 20px;
    color: #07a;
    border-radius: 4px;
    overflow-x: auto;
  }
  table {
    border-collapse: collapse;
  }
  table,
  td,
  th {
    border: 1px solid #ccc;
    min-width: 100px;
  }
}
.doc-menu {
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
@media screen and (max-width: 800px) {
  .doc-menu {
    display: block;
  }
}
</style>
