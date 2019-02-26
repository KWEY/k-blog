<template>
  <div class="eui-select">
    <div class="eui-select-header">
        {{ typeList.value }}
    </div>
    <ul class="eui-select-list">
        <li class="eui-select-item"
        v-for="(item, index) in typeList.list"
        :key="index">{{item.name}}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Select',
  props: ['typeList'],
  data() {
    return {};
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
@gray: #808080;
@smoke: #f5f5f5;
@aqua: #AFDFE4;

.eui-select {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  line-height: 1.5;
  border: 1px solid @gray;
  padding: 0 8px 0 4px;
  background: #fff;
  cursor: pointer;
  &:hover &-list {
      opacity: 1;
  }

  &:hover {
      border-bottom-color: transparent;
  }
  &.active::after {
    border-top-color: transparent;
    border-bottom: 3px solid @gray;
    margin-top: -4px;
  }

  &::after {
    content: "";
      position: absolute;
      right: 2px;
      top: 50%;
      margin-top: -1px;
      width: 0;
      height: 0;
      border: 3px solid transparent;
      border-top: 3px solid @gray;
  }

  &-header {
      cursor: text;
      height: 20px;
      line-height: 20px;
      outline: none;
      &[contenteditable="true"] {
        text-overflow: unset;
      }

  }

  &-list {
      position: absolute;
      left: -1px;
      top: 100%;
      right: -1px;
      opacity: 0;
      box-sizing: border-box;
      border: 1px solid @gray;
      border-top: none;
      background: #fff;
      transition: .3s all;
  }

  &-item {
      padding: 0 8px 0 4px;
      &-active{
          background: @aqua;
      }
      &-disabled{
          background: @smoke;
          cursor: default;
      }
      &:hover {
          background: @aqua;
      }
  }
}
</style>
