// store.js
import Vue from 'vue'
import Vuex from 'vuex'
import $http from '../request/http'
import { typeToId } from './default-options.js'
import user from './modules/user'
import article from './modules/article'
import doc from './modules/doc'
Vue.use(Vuex)

const config = {
  // 数据
  state: {
    token: null, // 用户信息,
    typeList: null,
    currentType: null,
    articleList: null
  },
  // 事件
  actions: {
    // 获取类型列表
    getTypeList({ commit, state }, type) {
      if (state.typeList) {
        return
      }
      return new Promise(resolve => {
        $http.getTypeList().then(res => {
          if (res) {
            res.value = typeToId[type]
            res.tab = res.value.split('_')[0]
            commit('TYPELIST', res)
            resolve(res)
          }
        })
      })
    },
    // 获取文章列表
    getDirectoryList({ commit, state }, type) {
      if (state.currentType === type) {
        return
      }
      commit('CURRENTTYPE', type)
      commit('ARTICLE_LIST', null)
      return new Promise(resolve => {
        $http.getDirectoryList(typeToId[type]).then(res => {
          if (res) {
            commit('ARTICLE_LIST', res)
            resolve(res)
          }
        })
      })
    }
  },
  // 改变
  mutations: {
    CURRENTTYPE(state, type) {
      state.currentType = type
    },
    TYPELIST(state, typeList) {
      state.typeList = typeList
    },
    ARTICLE_LIST(state, articleList) {
      state.articleList = articleList
    }
  },
  // 获取
  getters: {},
  modules: {
    user,
    doc,
    article
  }
}

export default () => new Vuex.Store(config)
