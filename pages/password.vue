<template>
  <div class="kwe-password" @click="hideResult">
    <p class="kwe-title">
      <span class="kwe-name">修改密码</span>
    </p>
    <div v-show="result" class="kwe-result">{{ result }}</div>
    <div class="kwe-password-wrap">
      <div class="kwe-register-group">
        <input
          v-model.trim="user.old"
          type="password"
          placeholder="旧密码"
          autocomplete="off"
          @blur="checkPassword('old')"
        />
        <span class="kwe-error">{{ message.old }}</span>
      </div>
      <div class="kwe-register-group">
        <input
          v-model.trim="user.new"
          type="password"
          placeholder="新密码"
          autocomplete="off"
          @blur="checkPassword('new')"
          @keyup.enter="keyup"
        />
        <span class="kwe-error">{{ message.new }}</span>
      </div>
    </div>
    <div class="kwe-btn-password" @click.stop="password">修 改</div>
  </div>
</template>
<script>
import md5 from 'md5'
// import $http from '@/request/http'
export default {
  name: 'Password',
  data() {
    return {
      routeFrom: null,
      result: '',
      message: {
        old: '',
        new: ''
      },
      user: {
        old: '',
        new: ''
      }
    }
  },
  computed: {
    userStatus() {
      return this.$store.state.user
    }
  },
  head() {
    return {
      title: '修改密码'
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => vm.setData(to, from))
  },
  watch: {
    userStatus() {
      setTimeout(() => {
        this.userChange()
      }, 1000)
    }
  },
  mounted() {
    const isMobile = this.$store.state.isMobile
    if (isMobile) {
      this.$router.push('/')
    }
  },
  methods: {
    setData(to, from) {
      this.routeFrom = from
    },
    checkPassword(pass) {
      if (this.user[pass].length > 16 || this.user[pass].length < 6) {
        this.message[pass] = '密码由6-16个字符组成'
        return false
      } else {
        this.message[pass] = ''
        return true
      }
    },
    hideResult() {
      this.result = ''
    },
    keyup(ev) {
      ev.keyCode === 13 && this.password()
    },
    userChange() {
      if (!this.userStatus.isLogin) {
        this.$router.push('/login')
      }
    },
    password() {
      if (!this.userStatus.isLogin) {
        this.result = '未登录，请先退出登录！'
        return
      }
      if (this.user.old === this.user.new) {
        this.result = '密码不能相同'
        return
      }
      if (this.checkPassword('old') && this.checkPassword('new')) {
        this.$store
          .dispatch('user/password', {
            old: md5(this.user.old),
            new: md5(this.user.new)
          })
          .then(data => {
            this.result = data.msg
            if (data.success) {
              this.user = {
                old: '',
                new: ''
              }
              setTimeout(() => {
                this.result = ''
              }, 2000)
            }
          })
      } else {
        this.result = '输入信息有误'
      }
    }
  }
}
</script>
<style lang="less">
.kwe-password {
  width: 100%;
  padding-top: 60px;
  font-size: 14px;
  color: #606266;
  .kwe-title {
    width: 100%;
    max-width: 980px;
    height: 28px;
    margin: 28px auto;
    border-bottom: 1px solid #ddd;
    text-align: center;
    .kwe-name {
      height: 56px;
      line-height: 56px;
      margin: 0 auto;
      padding: 0 20px;
      font-size: 36px;
      background: #efefef;
      text-align: center;
    }
  }
  .kwe-result {
    position: absolute;
    top: 90px;
    left: 50%;
    width: 95%;
    max-width: 400px;
    text-align: center;
    line-height: 50px;
    color: #f45d90;
    font-size: 30px;
    transform: translateX(-50%);
    background: rgba(0, 0, 0, 0.4);
    box-shadow: 0 0 2px 1px #f45d90;
    z-index: 2;
    cursor: pointer;
  }
  &-wrap {
    width: 100%;
    max-width: 300px;
    margin: 80px auto 0;
    .kwe-register-group {
      position: relative;
      overflow: hidden;
      .kwe-error {
        position: absolute;
        left: 0;
        bottom: 0;
        color: #f45d90;
        line-height: 26px;
        font-size: 12px;
        text-align: left;
      }
    }
  }
  .kwe-btn-password {
    max-width: 300px;
    margin: 0 auto;
    line-height: 2.5;
    text-align: center;
    border: 1px solid #ccc;
    cursor: pointer;
    &:hover {
      color: #00a1d6;
      border-color: #00a1d6;
    }
  }
  input {
    display: block;
    width: 100%;
    line-height: 24px;
    padding: 6px 4px;
    box-sizing: border-box;
    border: 1px solid #ccc;
    outline: none;
    margin: 0 auto 30px auto;
    background: transparent;
  }
}
</style>
