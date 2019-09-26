<template>
  <div class="kwe-right-wrap" :class="showleft">
    <!-- <div class="kwe-right">放点什么好呢╮(╯_╰)╭</div> -->
    <div class="kwe-data">
      <h3>统计：</h3>
      <ul class="kwe-statistical">
        <li>笔记：（ {{ total || 0 }} ）篇</li>
        <li>工具页：（ {{ typeList.list[1].list.length }} ） 页</li>
        <li>文档：（ {{ typeList.list[2].list.length }} ）篇</li>
      </ul>
      <h3 v-if="userStatus.isAdmin">今日数据：</h3>
      <ul v-if="userStatus.isAdmin" class="kwe-statistical">
        <li>访问量：{{ Math.ceil(statistical.cvisit) || 0 }}</li>
        <li>查看量：{{ Math.ceil(statistical.cview) || 0 }}</li>
      </ul>
      <h3 v-if="recommend.length > 0">今日推荐：</h3>
      <ul v-if="recommend.length > 0" class="kwe-recommend">
        <li v-for="ele of recommend" :key="ele.aid" class="kwe-recommend-list" @click.stop="recommendV(ele.aid)">
          <div class="card-box">
            <div class="pic-box">
              <div class="pic">
                <a :href="'https://www.bilibili.com/video/av' + ele.aid" target="_blank">
                  <img :src="'/recommend/' + ele.aid + '.jpg'" :alt="ele.title" class="img" />
                </a>
                <span class="duration">{{ parseTime(ele.duration) }}</span>
              </div>
            </div>
            <div class="info">
              <a
                :href="'https://www.bilibili.com/video/av' + ele.aid"
                class="title"
                target="_blank"
              >{{ ele.title }}</a>
              <div class="count up">
                <a
                  :href="'//space.bilibili.com/' + ele.owner.mid"
                  target="_blank"
                >{{ ele.owner.name }}</a>
              </div>
              <div class="count">{{ parseNum(ele.stat.view) }}播放 {{ parseNum(ele.stat.danmaku) }}弹幕</div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import $http from '../request/http'
export default {
  name: 'RightPanel',
  components: {},
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
    userStatus() {
      return this.$store.state.user
    },
    statistical() {
      return this.$store.state.statistical
    },
    total() {
      return this.$store.state.total
    },
    recommend() {
      return this.$store.state.recommendList
    },
    typeList() {
      return this.$store.state.typeList
    }
  },
  methods: {
    parseNum(num) {
      if (num > 10000) {
        return (num / 10000).toFixed(1) + 'w'
      }
      return num
    },
    parseTime(dur) {
      const sec = String('00' + dur % 60).slice(-2)
      const min = String('00' + Math.floor((dur - sec) / 60)).slice(-2)
      if (dur < 60) {
        return `00 : ${sec}`
      } else if (dur < 3600) {
        return `${min} : ${sec}`
      } else {
        const hour = String('00' + Math.floor((dur - min * 60 - sec) / 3600)).slice(-2)
        return `${hour} : ${min} : ${sec}`
      }
      return dur
    },
    recommendV(aid) {
      $http.track({flag: 'recVideo', params: aid})
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
@top_bg: rgba(74, 74, 74, 1);
.kwe-right-wrap {
  position: relative;
  width: 340px;
  flex: none;
  margin: 30px 0 30px;
  .kwe-data {
    box-sizing: border-box;
    padding: 20px 0 0 20px;
    height: 100%;
    width: 100%;
  }
  .kwe-recommend {
    font-size: 12px;
    max-height: 1500px;
    overflow-y: auto;
    &-list {
      padding: 6px 0;
    }
    .card-box {
      display: flex;
      .pic-box {
        position: relative;
        width: 141px;
        height: 85px;
        border-radius: 2px;
        background: #f4f5f7;
        .pic {
          height: 100%;
        }
        .img {
          display: block;
          width: 100%;
          height: 100%;
        }
        .duration {
          position: absolute;
          bottom: 0;
          left: 0;
          background: rgba(0, 0, 0, 0.6);
          color: #fff;
          padding: 2px 6px;
          z-index: 5;
        }
      }
      .info {
        margin-left: 10px;
        flex: 1;
        font-size: 0;
        .title {
          height: 36px;
          line-height: 18px;
          font-size: 14px;
          font-weight: 500;
          margin-bottom: 6px;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          &:hover {
            color: #00a1d6;
          }
        }
        .count.up {
          width: 160px;
          margin-bottom: 4px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .count {
          display: inline-block;
          height: 16px;
          width: 100%;
          color: #999;
          font-size: 12px;
        }
      }
    }
  }
}
@media screen and (max-width: 800px) {
  .kwe-right-wrap {
    display: none;
    width: 0;
    overflow: hidden;
  }
  .kwe-right-wrap.show-right {
    overflow: auto;
  }
  .kwe-data {
    transform: scaleX(0);
  }
}
</style>
