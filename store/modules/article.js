import $http from '../../request/http'

export default {
  state: {
    currentId: null,
    article: null
  },
  mutations: {
    ARTICLE_CONTENT(state, data) {
      state.article = data
    },
    CURRENTID(state, id) {
      state.currentId = id
    }
  },
  getters: {},
  actions: {
    // 获取文章内容
    getArticle({ commit, state }, id) {
      if (state.currentId === id) {
        return
      }
      commit('CURRENTID', id)
      commit('ARTICLE_CONTENT', null)
      const arr = id.split('_')
      return $http
        .getArticle({
          id,
          tid: arr[0]
        })
        .then(res => {
          if (res) {
            commit('ARTICLE_CONTENT', res)
          }
        })
    }
  }
}
