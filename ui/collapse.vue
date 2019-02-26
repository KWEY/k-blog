<template>
  <div class="eui-collapse">
    <div
      v-for="({title, tid, list}) in typeList.list"
      :key="tid"
      :class="{active: tid === typeList.tab}"
      class="eui-list"
    >
      <p class="eui-name" @click="toogle(tid)">
        {{ title }}
      </p>
      <ul class="eui-wrap">
        <li
          v-for="({src, pid, name}) in list"
          :key="pid"
          :class="{active: pid === typeList.value}"
          class="eui-item"
          @click="showType(pid)"
        >
          <nuxt-link :to="src">
            {{ name }}
          </nuxt-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Collapse',
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
      if (this.typeList.tab === tid) {
        this.typeList.tab = -1
      } else {
        this.typeList.tab = tid
      }
    },
    showType(pid) {
      if (this.typeList.value === pid) {
        this.typeList.value = -1
      } else {
        this.typeList.value = pid
      }
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
.eui-collapse {
  .eui-name {
    position: relative;
    font-size: 16px;
    cursor: pointer;
    &:hover {
      &:after {
        transform: scale(1);
      }
    }
    &:before {
      content: '';
      position: absolute;
      right: 0;
      top: 50%;
      display: inline-block;
      width: 0.5em;
      height: 0.5em;
      margin-top: -0.2em;
      transform: rotate(45deg);
      transition: transform 0.3s;
      border: 1px solid #ccc;
      border-bottom-width: 0;
      border-left-width: 0;
    }
    &:after {
      content: '';
      position: absolute;
      left: 0;
      bottom: 0;
      display: inline-block;
      width: 100%;
      height: 1px;
      background: #0ff;
      transition: transform 0.3s;
      transform: scale(0);
      transform-origin: center;
    }
  }
  .eui-wrap {
    // height: 0;
    margin-left: 6%;
    display: none;
    font-size: 12px;
    transition: all 0.3s;

    .eui-item {
      cursor: pointer;
      a {
        display: block;
        width: 100%;
        height: 100%;
      }
      &.active {
        background: #eaeaea;
      }
      &:hover {
        background: #eaeaea;
      }
    }
  }
  .eui-list {
    padding: 0 0.8em;
    color: #333;
    &.active {
      .eui-name {
        &:before {
          transform: rotate(135deg);
        }
      }
      .eui-wrap {
        display: block;
        height: auto;
      }
    }
  }
}
</style>
