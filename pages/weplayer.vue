<template>
  <div class="kwe-players">
    <template v-if="isMobile">
      <p class="kwe-mobile">移动端暂时不支持此功能</p>
    </template>
    <template v-else>
      <div class="kwe-player-input">
        <input v-model.trim="url" placeholder="输入url" autocomplete="off" @keyup.enter="keyup">
        <button class="kwe-btn-player" @click.stop="setData">播放器</button>
      </div>
      <div ref="player" class="kwe-player-wrap" />
    </template>
  </div>
</template>

<script>
import base from '../request/api'
export default {
  name: 'Weplayer',
  head: {
    title: 'Weplayer',
    script: [{ src: base.player }]
  },
  data() {
    return {
      timer: 0,
      times: 0,
      url: base.demoFlv,
      loading: true,
      isMobile: false
    }
  },
  mounted() {
    this.isMobile = this.$store.state.isMobile
    if (this.isMobile) {
      this.loading = false
      return
    }
    if (window.WEPlayer) {
      this.initWEPlayer()
    } else {
      this.timer = setInterval(() => {
        this.initWEPlayer()
      }, 400)
    }
  },
  methods: {
    setData(from) {
      if (this.url) {
        const wrap = this.$refs.player
        if (wrap.querySelectorAll('video').length > 1) {
          wrap.removeChild(wrap.querySelector('video'))
        }
        this.initWEPlayer()
      }
    },
    initWEPlayer() {
      if (window.WEPlayer) {
        clearInterval(this.timer)
        /* eslint-disable */
        new window.WEPlayer.default({
          id: '.kwe-player-wrap',
          url: this.url,
          autoplay: true
        })
        /* eslint-enable */
        this.loading = false
      }
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
.kwe-players.loading {
  min-height: 200px;
  background: url('../assets/loading.gif') no-repeat center;
}
.kwe-players {
  padding-top: 80px;
  input {
    display: inline-block;
    width: 400px;
    line-height: 24px;
    padding: 6px 4px;
    box-sizing: border-box;
    border: 1px solid #ccc;
    outline: none;
  }

  button {
    width: 80px;
    margin: 0 10px;
    cursor: pointer;
  }
  .kwe-mobile {
    margin: 60px 0;
    text-align: center;
  }
  .kwe-player-input {
    display: flex;
    justify-content: center;
    width: 800px;
    height: 40px;
    margin: 0 auto;
  }
  .kwe-btn-login {
    max-width: 100px;
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
  .kwe-player-wrap {
    text-align: center;
    video {
      width: 600px;
      margin: 40px;
      box-shadow: 0 0 1px 1px #ccc;
    }
    .player-x {
      height: 100%;
      padding-top: 40px;
      &-list {
        height: 100%;
        margin: -30px auto 0;
        padding: 50px 10px;
        box-sizing: border-box;
      }
    }
  }
}
</style>
