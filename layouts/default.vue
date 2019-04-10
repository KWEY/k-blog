<template>
  <div class="kwe-default-wrap">
    <top-list />
    <nuxt />
    <footer-panel v-if="showHome" />
    <load v-show="loading" />
  </div>
</template>
<script>
// import headerPanel from '@/components/header.vue'
import footerPanel from '@/components/footer.vue'
import toplist from '@/components/toplist/top-list.vue'
import load from '@/components/loading.vue'
export default {
  components: {
    load: load,
    'top-list': toplist,
    // 'header-panel': headerPanel,
    'footer-panel': footerPanel
  },
  data() {
    return {
      showHome: false
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
    // this.getUserIP(object => {
    //   console.log(object, '-----------')
    // })
  },

  methods: {
    toogle(route) {
      if (route.path === '/') {
        this.showHome = true
      } else {
        this.showHome = false
      }
    },
    // 获取用户ip
    getUserIP(onNewIP) {
      //  onNewIp - your listener function for new IPs
      const MyPeerConnection =
        window.RTCPeerConnection ||
        window.mozRTCPeerConnection ||
        window.webkitRTCPeerConnection
      const pc = new MyPeerConnection({
        iceServers: []
      })
      const noop = function() {}
      const localIPs = {}
      const ipRegex = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/g

      function iterateIP(ip) {
        if (!localIPs[ip]) onNewIP(ip)
        localIPs[ip] = true
      }
      pc.createDataChannel('')
      // create offer and set local description
      try {
        pc.createOffer(
          function(sdp) {
            sdp.sdp.split('\n').forEach(function(line) {
              if (line.indexOf('candidate') < 0) return
              line.match(ipRegex).forEach(iterateIP)
            })

            pc.setLocalDescription(sdp, noop, noop)
          },
          function(sdp) {
            // console.log('fail')
          }
        )
      } catch (err) {
        // console.log(err)
      }
      pc.onicecandidate = function(ice) {
        if (
          !ice ||
          !ice.candidate ||
          !ice.candidate.candidate ||
          !ice.candidate.candidate.match(ipRegex)
        )
          return
        ice.candidate.candidate.match(ipRegex).forEach(iterateIP)
      }
    }
  }
}
</script>
<style lang="less">
.kwe-default-wrap {
  color: #33495e;
  font-family: 'Source Sans Pro', 'Helvetica Neue', Arial, sans-serif;
}
</style>
