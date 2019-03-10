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
import { idToName } from '@/store/default-options.js'

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
  computed: {
    title() {
      return idToName[this.$store.state.typeList.value][0]
    }
  },
  watch: {
    title(newName) {
      this.setTitle(newName)
    }
  },
  async fetch({ store, route }) {
    const type = route.query.type || 'all'
    const page = route.query.page || 1
    await store.dispatch('getArticles', { type, page })
  },
  mounted() {
    this.setTitle(idToName[this.$store.state.typeList.value][0])
  },
  methods: {
    toggle() {
      this.showleft = this.showleft ? '' : 'show-left'
    },
    setTitle(newName) {
      document.title = `雪人的${newName}日志`
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
.kwe-index {
  display: flex;
  justify-content: center;
  width: 100%;
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
