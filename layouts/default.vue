<template>
  <div class="kwe-default-wrap">
    <top-list />
    <nuxt />
    <footer-panel v-if="showHome" :sw="sw" />
    <load v-show="loading" />
  </div>
</template>
<script>
// import headerPanel from '@/components/header.vue'
import footerPanel from '@/components/footer.vue'
import toplist from '@/components/toplist/top-list.vue'
import load from '@/components/loading.vue'
import $http from '../request/http'
export default {
  components: {
    load: load,
    'top-list': toplist,
    // 'header-panel': headerPanel,
    'footer-panel': footerPanel
  },
  data() {
    return {
      showHome: false,
      sw: ''
    }
  },
  computed: {
    loading() {
      return this.$store.state.loading
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
    this.toogle(this.$route)
  },

  methods: {
    toogle(route) {
      if (route.path === '/') {
        this.showHome = true
      } else {
        this.showHome = false
      }
      $http.track({
        flag: 'enter',
        params: window.location.href
      })
    },
    set() {
      if ('PushManager' in window && 'serviceWorker' in navigator) {
        navigator.serviceWorker
          .register('/sw.js', { scope: '/' })
          .then(() => {
            this.sendMessage({
              command: 'get'
            })
            return navigator.serviceWorker.ready
          })
          .catch(function(err) {
            console.log('ServiceWorker registration failed: ', err)
          })
        navigator.serviceWorker.addEventListener('controllerchange', event => {
          console.log('change')
        })
        navigator.serviceWorker.addEventListener('message', event => {
          // const port = event.ports[0]
          // port.postMessage('this is from worker1--------------')
          // console.log(event.data)
          this.sw = event.data
        })
        if (!navigator.onLine) {
          console.warn('网络已断开')
          window.addEventListener('online', () => {
            console.warn('网络已lianjie')
          })
        }
      } else {
        this.sw = 'ServiceWorker not supported :-('
      }
    },
    sendMessage(message) {
      return new Promise(function(resolve, reject) {
        const messageChannel = new MessageChannel()
        messageChannel.port1.onmessage = function(event) {
          if (event.data.error) {
            reject(event.data.error)
          } else {
            resolve(event.data)
          }
        }
        navigator.serviceWorker.controller &&
          navigator.serviceWorker.controller.postMessage(message, [
            messageChannel.port2
          ])
      })
    }
  }
}
</script>
<style lang="less">
body {
  background: url('../assets/bg.jpg') top center no-repeat;
  background-attachment: fixed;
  background-size: cover;
}
.kwe-default-wrap {
  color: #33495e;
  font-family: 'Source Sans Pro', 'Helvetica Neue', Arial, sans-serif;
}
</style>
