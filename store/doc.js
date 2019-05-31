import $http from '../request/http'

export const state = () => ({
  currentDoc: null,
  docMenu: {},
  docArticle: {}
})
export const actions = {
  // 获取doc内容
  async getDoc({ commit, state }, doc) {
    if (state.currentDoc === doc && state.docMenu && state.docArticle) {
      return
    }
    commit('CURRENT_DOC', doc)
    commit('DOC_MENU', {})
    commit('DOC_ARTICLE', {})
    const type = $http.getDocList(doc)
    const doces = $http.getDoc(doc)
    await type.then(res => {
      if (res) {
        commit('DOC_MENU', res)
      }
    })
    await doces.then(res => {
      if (res) {
        commit('DOC_ARTICLE', res)
      }
    })
  }
}

export const mutations = {
  CURRENT_DOC(state, doc) {
    state.currentDoc = doc
  },
  DOC_MENU(state, data) {
    state.docMenu = data
  },
  DOC_ARTICLE(state, data) {
    state.docArticle = data
  }
}
