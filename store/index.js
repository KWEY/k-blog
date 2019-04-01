// store.js
import $http from '../request/http'
import { typeToId, typeList } from './default-options.js'

// 数据
export const state = () => ({
  loading: false,
  userToken: '',
  locals: {},
  author: {}, // 作者
  typeList: typeList,
  cache: {},
  articleList: {},
  total: 0,
  isMobile: true
})
// 事件
export const actions = {
  async nuxtServerInit({ commit }, { req, res }) {
    const cookies = req.cookies
    const ua = req.headers['user-agent']
    if (cookies.userToken) {
      commit('SET_LOCAL_TOKEN', cookies.userToken)
    }
    if (ua) {
      const isMobile = ua.match(
        /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
      )
      commit('ISMOBILE', isMobile)
    }
    commit('SET_APP', res.locals.blog)
    commit('CURRENTTYPE', {})
    const { data } = await $http.getAdmin()
    commit('SET_ADMIN_INFO', data)
  },
  // 获取文章列表
  async getArticles({ commit, state }, data) {
    const keyword = encodeURIComponent(data.keyword || '')
    let type
    if (keyword) {
      type = '001_001'
    } else {
      type = typeToId[data.type] || '001_001'
    }
    const page = data.page || 1
    const key = type + page + keyword
    if (
      state.typeList.value === type &&
      state.typeList.page === page &&
      state.typeList.keyword === keyword
    ) {
      return
    }
    if (state.cache[key]) {
      commit('ARTICLE_CACHE', { type, page, key })
      commit('CURRENTTYPE', { type, page })
      return
    }
    commit('LOADING', true)
    await $http
      .getArticles({ type, page, keyword }, state.userToken)
      .then(res => {
        if (res.success) {
          res.type = type
          res.page = page
          res.keyword = keyword
          commit('ARTICLE_LIST', res)
          commit('CURRENTTYPE', { type, page })
          commit('LOADING', false)
        }
      })
  },
  // 切换tab
  changeTab({ commit, state }, tab) {
    if (state.typeList.tab === tab) {
      return
    }
    commit('CHANGETAB', tab)
  },
  // loading
  loading({ commit }, load) {
    commit('LOADING', load)
  }
}
// 改变
export const mutations = {
  SET_LOCAL_TOKEN(state, token) {
    state.userToken = token
  },
  SET_APP(state, locals) {
    state.locals = locals
  },
  SET_ADMIN_INFO(state, data) {
    state.author = data
  },
  CHANGETAB(state, tab) {
    state.typeList.tab = tab
  },
  CURRENTTYPE(state, data) {
    state.typeList.value = data.type
    state.typeList.page = data.page
  },
  ARTICLE_LIST(state, res) {
    if (res) {
      state.articleList = res.data
      state.total = res.total
      // 缓存数据
      state.cache[res.type + res.page + res.keyword] = {
        data: res.data,
        total: res.total
      }
    }
  },
  ARTICLE_CACHE(state, data) {
    state.total = state.cache[data.key].total
    state.articleList = state.cache[data.key].data
  },
  ISMOBILE(state, isMobile) {
    state.isMobile = isMobile
  },
  LOADING(state, load) {
    state.loading = load
  }
}
// 获取
export const getters = {}
