import $http from '../request/http'

export const state = () => ({
  role: 'user',
  islogin: false,
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
  },
  login({ commit }, user) {
    return $http.login(user)
  },
  register({ commit }, user) {
    return $http.register(user)
  }
}
export const mutations = {
  SET_USER(state, data) {
    state = data
  },
  LOGIN(state, data) {
    state.role = data.role
    state.username = data.username
    state.islogin = data.islogin
  }
}
