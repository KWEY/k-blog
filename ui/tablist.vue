<template>
  <div class="eui-tablist">
    <div v-for="({title, tid, list}) in typeList.list" :key="tid" class="eui-list">
      <p class="eui-name" @click.stop="toogle(tid)">{{ title }}</p>
      <ul class="eui-wrap">
        <li
          v-for="({src, pid, name}) in list"
          :key="pid"
        >
          <nuxt-link :to="src" class="eui-item" :class="{active: pid === typeList.value}">{{ name }}</nuxt-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Tablist',
  props: {
    typeList: {
      type: Object,
      default: () => []
    }
  },
  data() {
    return {}
  },
  methods: {
    toogle(tid) {
      let tab = ''
      if (this.typeList.tab === tid) {
        tab = -1
      } else {
        tab = tid
      }
      this.$emit('tab-change', tab)
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
@bg: rgba(8, 40, 70, 0.85);
.eui-tablist {
  display: flex;
  white-space: nowrap;
  .eui-list {
    position: relative;
    .eui-name {
      min-width: 100px;
      box-sizing: border-box;
      padding: 0 16px 0 36px;
      line-height: 40px;
      &:hover {
        background: rgba(255, 255, 255, 0.3);
      }
    }
    .eui-wrap {
      display: none;
      position: absolute;
      top: 40px;
      left: 0;
      min-width: 100px;
      font-size: 12px;
      line-height: 3;
      background: @bg;
      box-shadow: rgba(0, 0, 0, 0.1) 0 1px 2px;
      cursor: pointer;
      .eui-item {
        display: block;
        position: relative;
        padding: 0 20px;
        transition: padding 0.4s;
        &.active {
          background: rgba(8, 40, 70, 0.95);
        }
        &::before {
          content: '>';
          position: absolute;
          top: 0;
          left: 8px;
          line-height: 2.9;
          transform: scale(0.7, 1);
          transition: left 0.4s;
        }
        &:hover {
          padding-left: 26px;
          background: rgba(8, 40, 70, 0.95);
          &::before {
            left: 14px;
          }
        }
      }
    }
    &:hover .eui-wrap {
      display: block;
    }
    &:nth-child(1) {
      background: url('../assets/note.png') 14px center no-repeat;
      background-size: 18px;
    }
    &:nth-child(2) {
      background: url('../assets/tool.png') 14px center no-repeat;
      background-size: 20px;
    }
    &:nth-child(3) {
      background: url('../assets/doc.png') 14px center no-repeat;
      background-size: 16px;
    }
  }
}
</style>
