import $http from '../request/http'

export const state = () => ({
  role: 'user',
  username: '路人'
})
export const getters = {
  isAdmin(state) {
    return state.user.role === 'superAdmin'
  }
}

export const actions = {
  getUser({ commit }) {
    $http.getUser().then(({ success, data }) => {
      if (success && data) {
        commit('SET_USER', data)
      }
    })
  }
}
export const mutations = {
  SET_USER(state, data) {
    state = data
  }
}
