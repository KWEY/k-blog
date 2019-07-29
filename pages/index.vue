<template>
  <section class="kwe-section" @click="toggleClick">
    <header-panel />
    <div class="kwe-index" @click="toggleClick">
      <div class="kwe-menu" @click.stop="toggle">
        <menu-svg class="kwe-menu-svg" />
      </div>
      <left-panel />
      <right-panel :showleft="showleft" />
    </div>
  </section>
</template>

<script>
import headerPanel from '@/components/header.vue'
import leftPanel from '@/components/left.vue'
import rightPanel from '@/components/right.vue'
import menusvg from '@/assets/menu.svg'
import { idToName } from '@/store/default-options.js'

export default {
  name: 'Index',
  components: {
    'header-panel': headerPanel,
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
      const name = idToName[this.$store.state.typeList.value]
      return (name && name[0]) || ''
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
    const keyword = route.query.keyword || ''
    await store.dispatch('getArticles', { type, page, keyword })
    await store.dispatch('statistical/getStatistical')
  },
  mounted() {
    const name = idToName[this.$store.state.typeList.value]
    this.setTitle((name && name[0]) || '')
  },
  methods: {
    toggle() {
      this.showleft = this.showleft ? '' : 'show-left'
    },
    setTitle(newName) {
      document.title = `雪人的${newName}日志`
    },
    toggleClick(tab) {
      if (this.showleft) {
        this.showleft = ''
      }
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
.kwe-index {
  display: flex;
  justify-content: center;
  width: 80%;
  min-width: 1000px;
  height: 100%;
  margin: 0 auto 40px;
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
@media screen and (max-width: 800px) {
  // .kwe-menu {
  //   display: block;
  // }
}
</style>
