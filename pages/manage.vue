<template>
  <div class="kwe-manage" @click="closeToast">
    <h2>管理页面</h2>
    <div class="kwe-manage-search">
      <div class="kwe-manage-wrap">
        <span class="kwe-input-title">页数：</span>
        <select v-model="logid" class="kwe-title-input">
          <option value ="001">op</option>
          <option value ="002">event</option>
        </select>
      </div>
      <div class="kwe-manage-wrap">
        <span class="kwe-input-title">表名：</span>
        <input v-model.trim="page" class="kwe-title-input" type="number"/>
      </div>
      <div class="kwe-manage-wrap">
        <span class="kwe-input-title">日期：</span>
        <input v-model.trim="date" class="kwe-title-input" type="text"/>
      </div>
       <div class="kwe-manage-search-btn" @click.stop="search">search</div>
       <div class="kwe-manage-search-btn" @click.stop="prev">上一页</div>
       <div class="kwe-manage-search-btn" @click.stop="next">下一页</div>
    </div>
    <div class="kwe-manage-list">
      <div class="kwe-type">
        <div class="kwe-log kwe-country">Ip</div>
        <div class="kwe-log kwe-country">Hour</div>
        <div class="kwe-log">Flag</div>
        <div class="kwe-log">ctime</div>
        <div class="kwe-log">params</div>
        <div class="kwe-log">LL</div>
        <div class="kwe-log">操作</div>
      </div>
      <div class="kwe-type" v-for="item in ipList" :key="item.id">
        <div class="kwe-log kwe-country">{{ item.ip }}</div>
        <div class="kwe-log kwe-country">{{ item.hour }}</div>
        <div class="kwe-log">{{ item.flag }}</div>
        <div class="kwe-log">{{ item.ctime }}</div>
        <div class="kwe-log">{{ item.params }}</div>
        <div class="kwe-log">{{ item.ll }}</div>
        <div class="kwe-log">
          <span class="kwe-delete" @click.stop="deleteLog(item.id)">删除</span>
        </div>
      </div>
      <div v-if="ipList.length === 0" class="kwe-noinfo">搜到0条数据</div>
    </div>
    <toast
      :show="toast.show"
      :content="toast.content"
      :close="toast.showClose"
      :type="toast.type"
      @close="closeToast"
    />
  </div>
</template>

<script>
import Toast from '@/ui/toast'
import $http from '../request/http'
require('../global/date')

export default {
  name: 'Manage',
  head() {
    return {
      title: 'IP管理',
    }
  },
  components: {
    toast: Toast
  },
  data() {
    return {
      ipList: [],
      page: 1,
      date: '',
      logid: '001',
      toast: {}
    }
  },
  mounted() {
    this.date = new Date().Format('yyyyMMdd')
  },
  computed: {
    userStatus() {
      return this.$store.state.user
    }
  },
  watch: {
    userStatus() {
      if (!this.userStatus.isAdmin) {
        this.noSendTip()
      } else {
        this.closeToast()
      }
    }
  },
  methods: {
    search() {
      if (!this.userStatus.isAdmin) {
        this.noSendTip()
        return
      }
      $http.getLogList({
        logid: this.logid,
        page: this.page,
        date: this.date,
      }).then(res => {
        this.ipList = res.data
        console.log(res)
      })
    },
    prev() {
      const pre = this.page - 1
      this.page = Math.max(1, pre)
      this.search()
    },
    next() {
      this.page++
      this.search()
    },
    deleteLog(id) {
      if (!this.userStatus.isAdmin) {
        this.noSendTip()
        return
      }
      $http.deleteLog({
        id,
        logid: this.logid,
      }).then(res => {
        if (res.success) {
          this.showToast('删除成功', 'success')
          for (let i = 0; i < this.ipList.length; i++) {
            if (this.ipList[i].id === id) {
              this.ipList.splice(i, 1)
              break
            }
          }
        }
      })
    },
    showToast(content, type, showClose = false) {
      this.toast = {
        type,
        content,
        showClose,
        show: true,
        duration: 1000
      }
      if (!showClose) {
        setTimeout(() => {
          this.toast.show = false
        }, this.toast.duration)
      }
    },
    closeToast() {
      this.toast.show = false
    },
    noSendTip() {
      this.showToast('当前角色无法操作', 'warn', true)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
.kwe-manage {
  position: relative;
  z-index: 1;
  width: 1000px;
  margin: 0 auto;
  padding: 40px 0;
  font-size: 14px;
  line-height: 1.5;
  &-search {
    display: flex;

    .kwe-title-input {
      padding: 2px 4px;
      box-sizing: border-box;
      height: 40px;
      border: 1px solid #00a1d6;
      background: transparent;
      font-size: 16px;
      border-radius: 4px;
      outline: none;
    }
    &-btn {
      padding: 0 18px;
      margin-left: 10px;
      line-height: 36px;
      border: 1px solid #00a1d6;
      border-radius: 20px;
      cursor: pointer;
      &:hover {
        background: #00a1d6;
            color: #fff;
      }
    }
  }
  &-list {
    margin: 20px 0;
    line-height: 30px;
    border: 1px solid #00a1d6;
    border-bottom: none;

    .kwe-type {
      display: flex;
      width: 100%;
      justify-content: flex-start;
      border-bottom: 1px solid #00a1d6;
      .kwe-log {
        width: 50px;
        padding: 0 4px;
        flex: 1 1 auto;
        border-right: 1px solid #00a1d6;
        overflow: hidden;
        &:last-child {
          border: none;
        }
        &.kwe-country {
          flex: none;
        }

        .kwe-delete {
          display: inline-block;
          padding: 0 16px;
          margin: 4px;
          line-height: 22px;
          border: 1px solid #00a1d6;
          cursor: pointer;
          &:hover {
            background: #00a1d6;
            color: #fff;
          }
        }
      }
    }
    .kwe-noinfo {
      text-align: center;
      border-bottom: 1px solid #00a1d6;
    }
  }
}
</style>
