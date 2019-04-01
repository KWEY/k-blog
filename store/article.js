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
    data.type = Array.isArray(type)
      ? type.map(id => {
          return { id, name: idToName[id] }
        })
      : []
    state.article = data
  },
  CURRENTID(state, id) {
    state.currentId = id
  }
}
export const actions = {
  // 获取文章内容
  getArticle({ commit, state }, data) {
    if (state.currentId === data.id && !data.edit) {
      return
    }
    commit('CURRENTID', data.id)
    commit('ARTICLE_CONTENT', {})
    commit('LOADING', true, { root: true })
    return $http.getArticle(data.id).then(res => {
      if (res.success) {
        commit('ARTICLE_CONTENT', res.data)
        commit('LOADING', false, { root: true })
      }
    })
  }
}
