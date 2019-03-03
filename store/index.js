// store.js
import $http from '../request/http'
import { typeToId, typeList } from './default-options.js'

// 数据
export const state = () => ({
  localToken: '',
  adminToken: '',
  author: null, // 作者
  typeList: typeList,
  articleList: null,
  total: 0
})
// 事件
export const actions = {
  async nuxtServerInit({ commit, state }, { req, res }) {
    const cookies = req.cookies
    if (cookies.localToken) {
      commit('SET_LOCAL_TOKEN', cookies.localToken)
    }
    if (cookies.adminToken) {
      commit('SET_ADMIN_TOKEN', cookies.adminToken)
    }
    commit('SET_APP', res.locals.app)
    const { data } = await $http.getAdmin()
    commit('SET_ADMIN_INFO', data)
  },
  // 获取文章列表
  async getArticles({ commit, state }, data) {
    const typeId = typeToId[data.type]
    const page = data.page
    if (state.typeList.value === typeId && state.typeList.page === page) {
      return
    }
    commit('ARTICLE_LIST', null)
    await $http.getArticles(typeId, page).then(res => {
      if (res.success) {
        commit('CURRENTTYPE', { typeId, page })
        commit('ARTICLE_LIST', res)
      }
    })
  },
  // 切换tab
  changeTab({ commit, state }, tab) {
    if (state.typeList.tab === tab) {
      return
    }
    commit('CHANGETAB', tab)
  }
}
// 改变
export const mutations = {
  SET_LOCAL_TOKEN(state, token) {
    state.localToken = token
  },
  SET_ADMIN_TOKEN(state, token) {
    state.adminToken = token
  },
  SET_APP(state) {
    state.adminToken = ''
  },
  SET_ADMIN_INFO(state, data) {
    state.author = data
  },
  CHANGETAB(state, tab) {
    state.typeList.tab = tab
  },
  CURRENTTYPE(state, data) {
    state.typeList.value = data.typeId
    state.typeList.page = data.page
  },
  ARTICLE_LIST(state, res) {
    state.articleList = res && res.data
    state.total = res && res.total
  }
}
// 获取
export const getters = {}
