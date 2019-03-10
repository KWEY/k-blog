<template>
  <div class="kwe-login">
    <p class="kwe-message">{{ message }}</p>
    <input 
      v-model="user.username"
      type="text" 
      placeholder="用户名" 
      autocomplete="off"
    >
    <input 
      v-model="user.password" 
      type="password" 
      placeholder="密码" 
      autocomplete="off" 
      @keyup.enter="login"
    >
    <button @click="login">登 录</button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      user: {},
      message: ''
    }
  },
  head() {
    return {
      title: '登录 - ' + this.$store.state.user.username
    }
  },
  methods: {
    login() {
      if (!this.user.username || !this.user.password) {
        console.warn(this.user)
        return false
      }
      this.$store.dispatch('user/login', this.user).then(data => {
        if (data.success) {
          this.message = '登录成功'
          console.log({ text: '登录成功' })
        } else {
          this.message = '用户名或密码不正确'
          console.log({ text: '用户名或密码不正确' })
        }
      })
    }
  }
}
</script>
<style lang="less">
.kwe-login {
  position: fixed;
  top: 50%;
  left: 50%;
  width: 300px;
  height: 300px;
  margin: -250px 0 0 -150px;
  .kwe-message {
    text-align: center;
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
