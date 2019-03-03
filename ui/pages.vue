<template>
  <div class="eui-page">
    <span class="btn-pager" :disabled="current == 1" @click="prePage">上一页</span>
    <span
      v-if="total !== 1"
      class="page-index"
      :class="{active: 1 === current}"
      @click="goPage(1)"
    >1</span>
    <span v-if="preClipped" class="page-index">...</span>
    <span
      v-for="index in pages"
      :key="index"
      class="page-index"
      :class="{active: index === current}"
      @click="goPage(index)"
    >{{ index }}</span>
    <span v-if="backClipped" class="page-index">...</span>
    <span
      class="page-index"
      :class="{active: total === current}"
      @click="goPage(total)"
    >{{ total }}</span>
    <span class="btn-pager" :disabled="current == total" @click="nextPage">下一页</span>
  </div>
</template>
<script>
export default {
  name: 'Pages',
  props: {
    total: {
      type: Number,
      default: 1
    },
    current: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      pages: [],
      backClipped: true,
      preClipped: false
    }
  },
  mounted() {
    this.setPages(this.current)
  },
  methods: {
    prePage() {
      // 上一页
      if (this.current <= 1) {
        return
      }
      this.setPages(this.current - 1)
    },
    nextPage() {
      // 下一页
      if (this.current >= this.total) {
        return
      }
      this.setPages(this.current + 1)
    },
    goPage(index) {
      // 跳转到相应页面
      if (index !== this.current) {
        this.setPages(index)
      }
    },
    setPages(current) {
      const ret = []
      if (current > 3) {
        // 当前页码大于三时，显示当前页码的前2个
        ret.push(current - 2)
        ret.push(current - 1)
        if (current > 4) {
          // 当前页与第一页差距4以上时显示省略号
          this.preClipped = true
        }
      } else {
        this.preClipped = false
        for (let i = 2; i < current; i++) {
          ret.push(i)
        }
      }
      if (current !== this.total && current !== 1) {
        ret.push(current)
      }
      if (current < this.total - 2) {
        // 显示当前页码的后2个
        ret.push(current + 1)
        ret.push(current + 2)
        if (current <= this.total - 3) {
          // 当前页与最后一页差距3以上时显示省略号
          this.backClipped = true
        }
      } else {
        this.backClipped = false
        for (let i = current + 1; i < this.total; i++) {
          ret.push(i)
        }
      }
      // 返回整个页码组
      this.pages = ret
      this.$emit('change', current)
    }
  }
}
</script>
<style lang="less">
.eui-page {
  text-align: center;
  .page-index,
  .btn-pager {
    display: inline-block;
    margin-left: 10px;
    width: 35px;
    height: 30px;
    line-height: 30px;
    border-radius: 2px;
    border: 1px solid #e3e3e3;
    cursor: pointer;
    color: #000;
    &:hover {
      border-color: #00a1d6;
    }
  }
  .btn-pager {
    padding: 0px;
    width: 60px;
    cursor: pointer;
  }
  .active {
    border-color: #00a1d6;
  }
}
</style>
