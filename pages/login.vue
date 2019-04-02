<template>
  <div class="kwe-login" @click="hideResult">
    <p class="kwe-title"><span class="kwe-name">登录</span></p>
    <div v-show="result" class="kwe-result">{{ result }}</div>
    <div class="kwe-login-wrap">
      <div class="kwe-register-group">
        <input
          v-model.trim="user.tel"
          placeholder="手机号"
          autocomplete="off"
          @blur="checkTel"
        >
        <span class="kwe-error">{{ message.tel }}</span>
      </div>
      <div class="kwe-register-group">
        <input 
          v-model.trim="user.password"
          type="password"
          placeholder="密码"
          autocomplete="off"
          @blur="checkPassword"
          @keyup.enter="keyup"
        >
        <span class="kwe-error">{{ message.password }}</span>
      </div>
    </div>
    <div class="kwe-btn-login" :class="{'kwe-disabled': userStatus.isLogin}" @click.stop="login">登 录</div>
    <div class="kwe-to-register">
      <nuxt-link to="/register">没有账号，去注册></nuxt-link>
    </div>
  </div>
</template>
<script>
import $http from '@/request/http'
export default {
  name: 'Login',
  data() {
    return {
      routeFrom: null,
      result: '',
      message: {
        tel: '',
        password: ''
      },
      user: {
        tel: '',
        password: ''
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
      title: '登录'
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => vm.setData(from))
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
      return
    }
    this.userChange()
  },
  methods: {
    setData(from) {
      this.routeFrom = from
    },
    login() {
      if (this.userStatus.isLogin) {
        this.result = '已登录，若要切换账号，请先退出登录！'
        return
      }
      if (this.checkTel(0) && this.checkPassword()) {
        this.$store.dispatch('user/login', this.user).then(data => {
          this.result = data.msg
          if (data.success) {
            this.user = {
              password: '',
              tel: ''
            }
            setTimeout(() => {
              this.result = ''
            }, 2000)
          }
        })
      } else {
        this.result = '输入信息有误'
      }
    },
    checkTel(isclick) {
      if (/^1\d{10}$/.test(this.user.tel)) {
        if (isclick === 0) {
          if (this.message.tel) {
            return false
          }
          return true
        }
        $http.check(this.user.tel).then(data => {
          if (data.success) {
            this.message.tel = '此电话用户不存在(；′⌒`)'
          } else {
            this.message.tel = ''
          }
        })
      } else {
        this.message.tel = '电话号码格式不对'
        return false
      }
    },
    checkPassword() {
      if (this.user.password.length > 16 || this.user.password.length < 6) {
        this.message.password = '密码由6-16个字符组成'
        return false
      } else {
        this.message.password = ''
        return true
      }
    },
    hideResult() {
      this.result = ''
    },
    keyup(ev) {
      ev.keyCode === 13 && this.login()
    },
    userChange() {
      if (this.userStatus.isLogin) {
        let url = (this.routeFrom && this.routeFrom.fullPath) || '/'
        if (url === '/register') {
          url = '/'
        }
        this.$router.push(url)
      }
    }
  }
}
</script>
<style lang="less">
.kwe-login {
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
      background: #fff;
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
  .kwe-btn-login,
  .kwe-to-register {
    max-width: 300px;
    margin: 0 auto;
    line-height: 2.5;
  }
  .kwe-btn-login {
    text-align: center;
    border: 1px solid #ccc;
    cursor: pointer;
    &:hover {
      color: #00a1d6;
      border-color: #00a1d6;
    }
    &.kwe-disabled {
      color: #ccc;
      cursor: not-allowed;
      border-color: #ccc;
    }
  }
  .kwe-to-register {
    text-align: right;
    font-size: 12px;
    a {
      color: #00a1d6;
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
  }

  button {
    width: 300px;
    height: 35px;
    display: block;
    margin: 0 auto;
  }
}
</style>
