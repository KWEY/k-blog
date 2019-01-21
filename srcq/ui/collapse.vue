<template>
  <div class="eui-collapse">
    <div class="eui-list"
    :class="{active: index === typeList.value}"
    v-for="(item, index) in typeList.list"
    :key="index">
      <p class="eui-name" @click="toogle(index)">{{item.name}}</p>
      <ul class="eui-wrap">
        <li class="eui-item" v-for="(data, index) in item.list" :key="index">
          <router-link :to="data.src">{{data.name}}</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'collapse',
  props: {
    typeList: {
      type: Object,
      default() {
        return {
          value: 1,
          list: [
            {
              name: '工具集',
              list: [
                {
                  src: '',
                  name: 'demo',
                },
              ],
            },
          ],
        };
      },
    },
  },
  methods: {
    toogle(index) {
      if (this.typeList.value === index) {
        this.typeList.value = -1;
      } else {
        this.typeList.value = index;
      }
    },
  },
};
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
      width: .5em;
      height: .5em;
      margin-top: -.2em;
      transform: rotate(45deg);
      transition: transform .3s;
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
      transition: transform .3s;
      transform: scale(0);
      transform-origin: center;
    }
  }
  .eui-wrap {
    // height: 0;
    margin-left: 6%;
    display: none;
    font-size: 12px;
    transition: all .3s;

    .eui-item {
      cursor: pointer;
      a {
        display: block;
        width: 100%;
        height: 100%;
      }
      &:hover {
        background: #eaeaea;
      }
    }
  }
  .eui-list {
    padding: 0 .8em;
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
