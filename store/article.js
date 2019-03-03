import $http from '../request/http'

export const state = () => ({
  currentId: null,
  article: null
})
export const getters = {
  isAdmin(state) {
    return state.role === 'ADMIN'
  }
}

export const mutations = {
  ARTICLE_CONTENT(state, data) {
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
    commit('ARTICLE_CONTENT', null)
    return $http.getArticle(id).then(res => {
      if (res.success) {
        commit('ARTICLE_CONTENT', res.data)
      }
    })
  }
}
