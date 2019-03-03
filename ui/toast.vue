
<template>
  <transition name="eui-fade">
    <div v-if="show" class="eui-toast" :class="currentStyle">
      <div class="eui-toast-message" :class="textStyle" :style="toastStyle">
        <img v-if="path" :src="path" alt="" :style="imgStyle">
        <div>
          {{ content }}
          <span v-show="close" class="eui-toast-close" @click="closed">x</span>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
import mixins from './mixins'
export default {
  mixins: [mixins],
  props: {
    show: {
      type: Boolean,
      default: false
    },
    content: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: ''
    },
    close: {
      type: Boolean,
      default: false
    },
    location: {
      type: String,
      default: 'center'
    }
  },
  data() {
    return {
      toastStyle: {},
      imgStyle: {},
      path: ''
    }
  },
  computed: {
    currentStyle() {
      let style = 'eui-toast--center'
      switch (this.location) {
        case 'bottom':
          style = 'eui-toast--default'
          break
        case 'top':
          style = 'eui-toast--top'
          break
        default:
          break
      }
      return style
    },
    textStyle() {
      return `eui-toast-${this.type}`
    }
  },
  methods: {
    closed() {
      this.$emit('close')
    }
  }
}
</script>
<style lang="less">
.eui-toast {
  position: fixed;
  z-index: 999999;
  line-height: 17px;
}
.eui-toast--default {
  left: 50%;
  transform: translate(-50%, 0);
  bottom: 80px;
}
.eui-toast--center {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.eui-toast--top {
  top: 80px;
  left: 50%;
  transform: translate(-50%, -50%);
}
.eui-toast-message {
  min-width: 200px;
  max-width: 600px;
  padding: 12px 50px 12px 20px;
  font-size: 14px;
  text-align: center;
  color: #fff;
  border-radius: 6px;
  opacity: 0.9;
  img {
    margin-bottom: 8px;
  }
  &.eui-toast-success {
    background: #f0f9eb;
    border: 1px solid #e1f3d8;
    color: #67c23a;
  }
  &.eui-toast-warn {
    background: #fdf6ec;
    color: #e6a23c;
  }
  &.eui-toast-tip {
    background: #edf2fc;
    color: #909399;
  }
  &.eui-toast-error {
    background: #fef0f0;
    color: #f56c6c;
  }
  .eui-toast-close {
    display: inline-block;
    position: absolute;
    right: 4px;
    bottom: 6px;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background: rgba(0, 0, 0, 0.1);
    font-size: 20px;
    line-height: 26px;
    text-align: center;
    cursor: pointer;
    &:hover {
      color: #000;
    }
  }
}
.eui-fade-enter {
  opacity: 0;
}
.eui-fade-enter-active,
.eui-fade-leave-active {
  transition: opacity 0.4s;
}
.eui-fade-leave-active {
  opacity: 0;
}
</style>
