import $http from '../../request/http'

export default {
  state: {
    currentDoc: null,
    docMenu: null,
    docArticle: null
  },
  mutations: {
    CURRENT_DOC(state, doc) {
      state.currentDoc = doc
    },
    DOC_MENU(state, data) {
      state.docMenu = data.typeList
    },
    DOC_ARTICLE(state, data) {
      state.docArticle = data
    }
  },
  getters: {},
  actions: {
    // 获取doc内容
    async getDoc({ commit, state }, doc) {
      if (state.currentDoc === doc) {
        return
      }
      commit('CURRENT_DOC', doc)
      commit('DOC_MENU', null)
      commit('DOC_ARTICLE', null)
      $http.getDocList(doc).then(res => {
        if (res) {
          commit('DOC_MENU', res)
        }
      })
      await $http.getDoc(doc).then(res => {
        if (res) {
          commit('DOC_ARTICLE', res)
        }
      })
    }
  }
}
