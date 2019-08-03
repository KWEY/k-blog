import $http from '../request/http'

export const state = () => ({
  cvisit: 0,
  cview: 0
})

export const actions = {
  async getStatistical({ commit }) {
    await $http.statistical().then(data => {
      if (data && data.success) {
        commit('UPDATE_INFO', data.data)
      }
    })
  }
}
export const mutations = {
  UPDATE_INFO(state, data) {
    this.state.statistical = {
      ...state,
      ...data
    }
  }
}
