<template>
  <header class="kwe-header">
    <!-- <img class="kwe-header-bg" src="@/assets/3.jpg" alt> -->
    <div class="kwe-header-wrap">
      <div class="kwe-header-author">
        <div class="kwe-header-info">
          <div class="kwe-wrap" />
          <div class="kwe-title">{{ author.username }}</div>
          <div class="kwe-motto">{{ author.motto }}</div>
        </div>
        <div class="kwe-header-tool">
          <div class="kwe-header-link" @click.stop="github">
            <a href="https://github.com/KWEY" target="_blank">
              <github-svg class="kwe-github" />
            </a>
          </div>
          <search />
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import search from './search'
import githubsvg from '@/assets/github.svg'
import $http from '../request/http'

export default {
  name: 'LeftPanel',
  components: {
    search,
    'github-svg': githubsvg
  },
  props: {
    showleft: {
      type: String,
      default: ''
    }
  },
  data() {
    return {}
  },
  computed: {
    author() {
      return this.$store.state.author
    }
  },
  methods: {
    github() {
      $http.track({flag: 'Github'})
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
.kwe-header {
  position: relative;
  width: 100%;
  &-bg {
    display: block;
    width: 100%;
  }
  .kwe-header-wrap {
    width: 100%;
    padding-top: 40%;
    // background: url('../assets/3.jpg') center no-repeat;
    background-size: 100%;
  }
  &-author {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    /* 个人信息 */
    .kwe-header-info {
      text-align: center;
      width: 400px;
      .kwe-wrap {
        display: inline-block;
        width: 120px;
        height: 120px;
        border-radius: 50%;
        overflow: hidden;
        background: url('../assets/face.jpg') center no-repeat;
        background-size: 110%;
      }
      .kwe-title {
        text-align: center;
        font-size: 30px;
        line-height: 2;
      }
      .kwe-motto {
        font-size: 14px;
      }
    }
    .kwe-header-tool {
      text-align: center;
      width: 400px;
      /* 外链 */
      .kwe-header-link {
        .kwe-github {
          display: inline-block;
          width: 50px;
          height: 50px;
          &:hover {
            fill: #00a1d6;
          }
        }
      }
    }
  }
}
@media screen and (max-width: 800px) {
  .kwe-header {
    &-author {
      flex-direction: initial;
      .kwe-header-info {
        width: 220px;
        .kwe-wrap {
          width: 80px;
          height: 80px;
        }
        .kwe-title {
          font-size: 20px;
        }
        .kwe-motto {
          font-size: 12px;
        }
      }
      .kwe-header-tool {
        width: 200px;
      }
    }
  }
}
</style>
