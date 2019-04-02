<template>
  <div v-if="!isMobile" class="kwe-user" :class="{login: !userStatus.isLogin}" @click="tologin">
    <div class="kwe-name">
      <span>{{ name }}</span>
      <div v-if="userStatus.isLogin" class="kwe-user-panel">
        <span class="kwe-logout" @click="logout">退出登录</span>
      </div>
    </div>
    <div v-show="userStatus.isAdmin" class="kwe-action">
      <nuxt-link to="/upload" class="kwe-upload">
        <span>UPLOAD</span>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'User',
  data() {
    return {
      isMobile: false
    }
  },
  computed: {
    userStatus() {
      return this.$store.state.user
    },
    name() {
      if (this.userStatus.isLogin) {
        return this.userStatus.username
      } else {
        return '登录'
      }
    }
  },
  mounted() {
    this.isMobile = this.$store.state.isMobile
    if (!this.isMobile) {
      this.$store.dispatch('user/getUserStatus')
    }
  },
  methods: {
    tologin() {
      if (!this.userStatus.isLogin) {
        this.$router.push('/login')
      }
    },
    logout() {
      if (this.userStatus.isLogin) {
        this.$store.dispatch('user/logout')
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
@bg: rgba(8, 40, 70, 0.85);
.kwe-user {
  display: flex;
  flex: none;
  position: relative;
  color: #00a1d6;
  min-width: 100px;
  line-height: 40px;
  text-align: center;
  &.login {
    cursor: pointer;
    &:hover {
      text-shadow: 1px 1px 1px #ccc;
    }
  }
  .kwe-name {
    position: relative;
    width: 100px;
    &:hover .kwe-user-panel {
      display: block;
    }
  }
  .kwe-action {
    border-left: 1px solid #00a1d6;
    .kwe-upload {
      display: inline-block;
      width: 100px;
      &:hover {
        text-shadow: 1px 1px 1px #00a1d6;
      }
    }
  }
  &-panel {
    position: absolute;
    display: none;
    width: 100%;
    background: @bg;
    box-shadow: 1px 1px 1px #222;
    .kwe-logout {
      cursor: pointer;
      &:hover {
        text-shadow: 1px 1px 1px #00a1d6;
      }
    }
  }
}
</style>
