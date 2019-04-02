<template>
  <div class="kwe-register" @click="hideResult">
    <p class="kwe-title"><span class="kwe-name">注册</span></p>
    <div v-show="result" class="kwe-result">{{ result }}</div>
    <div class="kwe-register-module">
      <div class="kwe-register-group">
        <input
          v-model.trim="user.username"
          type="text"
          autocomplete="off"
          placeholder="昵称"
          @blur="checkName"
        >
        <span class="kwe-error">{{ message.username }}</span>
      </div>
      <div class="kwe-register-group">
        <input
          v-model.trim="user.password"
          type="password"
          autocomplete="off"
          placeholder="密码（6-16个字符组成，区分大小写"
          @blur="checkPassword"
        >
        <span class="kwe-error">{{ message.password }}</span>
      </div>
      <div class="kwe-register-group">
        <input
          v-model.trim="user.tel"
          type="text"
          autocomplete="off"
          placeholder="手机号,用于登录"
          @blur="checkTel"
          @keyup.enter="keyup"
        >
        <span class="kwe-error">{{ message.tel }}</span>
      </div>
    </div>
    <div class="kwe-btn-register" @click.stop="register">注 册</div>
    <div class="kwe-to-login">
      <nuxt-link to="/login">已有账号，直接登录></nuxt-link>
    </div>
  </div>
</template>
<script>
import $http from '@/request/http'
export default {
  name: 'Register',
  data() {
    return {
      result: '',
      message: {
        username: '',
        password: '',
        tel: ''
      },
      user: {
        username: '',
        password: '',
        tel: ''
      }
    }
  },
  head() {
    return {
      title: '注册'
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => vm.setData(from))
  },
  computed: {
    userStatus() {
      return this.$store.state.user
    }
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
    register() {
      if (this.userStatus.isLogin) {
        this.result = '已登录，若要注册新账号，请先退出登录！'
        return
      }
      if (this.checkName(0) && this.checkPassword() && this.checkTel(0)) {
        this.$store.dispatch('user/register', this.user).then(data => {
          this.result = data.msg
          if (data.success) {
            this.user = {
              username: '',
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
    checkName(isclick) {
      if (this.user.username) {
        if (this.user.username.length > 10) {
          this.message.username = '昵称太长'
          return false
        } else {
          if (isclick === 0) {
            if (this.message.username) {
              return false
            }
            return true
          }
          $http.check(null, this.user.username).then(data => {
            if (data.success) {
              this.message.username = ''
            } else {
              this.message.username = data.msg
            }
          })
        }
      } else {
        this.message.username = '昵称不能为空'
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
            this.message.tel = ''
          } else {
            this.message.tel = '此电话用户已存在(；′⌒`)'
          }
        })
        this.message.tel = ''
        return true
      } else {
        this.message.tel = '电话号码格式不对'
        return false
      }
    },
    hideResult() {
      this.result = ''
    },
    keyup(ev) {
      ev.keyCode === 13 && this.register()
    },
    userChange() {
      if (this.userStatus.isLogin) {
        let url = (this.routeFrom && this.routeFrom.fullPath) || '/'
        if (url === '/login') {
          url = '/'
        }
        this.$router.push(url)
      }
    }
  }
}
</script>
<style lang="less">
.kwe-register {
  width: 100%;
  padding-top: 60px;
  font-size: 14px;
  color: #606266;
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
  &-module {
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
  .kwe-btn-register,
  .kwe-to-login {
    width: 100%;
    max-width: 300px;
    margin: 0 auto;
    line-height: 2.5;
  }
  .kwe-btn-register {
    text-align: center;
    border: 1px solid #ccc;
    cursor: pointer;
    &:hover {
      color: #00a1d6;
      border-color: #00a1d6;
    }
  }
  .kwe-to-login {
    text-align: right;
    font-size: 12px;
    a {
      color: #00a1d6;
    }
  }
  input {
    display: block;
    width: 100%;
    line-height: 36px;
    padding: 0 4px;
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
