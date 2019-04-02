<template>
  <div class="kwe-top">
    <div class="kwe-top-wrap">
      <div>
        <nuxt-link to="/" class="kwe-home">
          <homesvg class="kwe-home-svg" />
          <span>HOME</span>
        </nuxt-link>
      </div>
      <tablist :type-list="typeList" @tab-change="tabChange" />
      <user />
    </div>
  </div>
</template>

<script>
import homesvg from '@/assets/home.svg'
import tablist from '@/ui/tablist.vue'

import user from './user'

export default {
  name: 'Toplist',
  components: {
    tablist,
    user,
    homesvg
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
@bg: rgba(8, 40, 70, 0.85);
.kwe-top {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  box-shadow: rgba(0, 0, 0, 0.1) 0 1px 2px;
  z-index: 2;
  color: #9acfea;
  background: @bg;
  user-select: none;
  &-wrap {
    display: flex;
    // flex-wrap: nowrap;
    justify-content: space-between;
    width: 100%;
    max-width: 1200px;
    height: 40px;
    margin: 0 auto;
    box-shadow: rgba(0, 0, 0, 0.1) 0 1px 2px;
    .kwe-home {
      display: block;
      margin: 6px 0 6px 10px;
      padding: 0px 12px;
      fill: #00a1d6;
      line-height: 28px;
      font-size: 14px;
      font-weight: 200;
      z-index: 2;
      &:hover {
        color: #00a1d6;
      }
      .kwe-home-svg {
        vertical-align: sub;
        fill: #00a1d6;
        width: 20px;
      }
    }
  }
}
</style>
