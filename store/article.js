import $http from '../request/http'
import { idToName } from './default-options.js'

export const state = () => ({
  currentId: null,
  article: {}
})
export const getters = {
  isAdmin(state) {
    return state.role === 'ADMIN'
  }
}

export const mutations = {
  ARTICLE_CONTENT(state, data) {
    const type = data.type
    data.type = Array.isArray(type) ? type.map(id => idToName[id]) : []
    state.article = data
  },
  CURRENTID(state, id) {
    state.currentId = id
  }
}
export const actions = {
  // 获取文章内容
  getArticle({ commit, state }, id) {
    if (state.currentId === id) {
      return
    }
    commit('CURRENTID', id)
    commit('ARTICLE_CONTENT', {})
    return $http.getArticle(id).then(res => {
      if (res.success) {
        commit('ARTICLE_CONTENT', res.data)
      }
    })
  }
}
