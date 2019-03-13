<template>
  <div class="kwe-wrap">
    <div class="kwe-top">
      <div>
        <nuxt-link v-show="showHome" to="/" class="kwe-home">
          <home-svg class="kwe-home-svg" />
          <span>HOME</span>
        </nuxt-link>
      </div>
      <div class="kwe-user" :class="{login: !userStatus.isLogin}" @click="tologin">
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
    </div>
    <nuxt />
  </div>
</template>
<script>
import homesvg from '@/assets/home.svg'
export default {
  components: {
    'home-svg': homesvg
  },
  data() {
    return {
      showHome: false
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
  watch: {
    $route: {
      handler(val, oldVal) {
        this.toogle(val)
      },
      // 深度观察监听
      deep: true
    }
  },
  mounted() {
    this.getUserStatus()
    this.toogle(this.$route)
  },
  methods: {
    getUserStatus() {
      this.$store.dispatch('user/getUserStatus')
    },
    toogle(route) {
      if (route.path !== '/') {
        this.showHome = true
      } else {
        this.showHome = false
      }
    },
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
<style lang="less">
.kwe-top {
  position: fixed;
  display: flex;
  justify-content: space-between;
  top: 0;
  left: 0;
  width: 100%;
  height: 40px;
  box-shadow: rgba(0, 0, 0, 0.1) 0 1px 2px;
  background: rgba(255, 255, 255, 0.7);
  z-index: 2;
  opacity: 0;
  transition: opacity 0.3s;
  &:hover {
    opacity: 1;
  }
  .kwe-user {
    display: flex;
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
          text-shadow: 1px 1px 1px #ccc;
        }
      }
    }
    &-panel {
      position: absolute;
      display: none;
      width: 100%;
      background: #fff;
      box-shadow: 1px 1px 1px #ccc;
      .kwe-logout {
        cursor: pointer;
        &:hover {
          text-shadow: 1px 1px 1px #ccc;
        }
      }
    }
  }
  .kwe-home {
    display: block;
    margin: 6px 0 6px 10px;
    padding: 0px 12px;
    border-radius: 14px;
    color: #fff;
    line-height: 28px;
    font-size: 14px;
    font-weight: 200;
    background: rgba(0, 0, 0, 0.6);
    z-index: 2;
    &:hover {
      background: rgba(0, 0, 0, 0.7);
    }
    .kwe-home-svg {
      vertical-align: sub;
      fill: #fff;
      width: 20px;
    }
  }
}
</style>
