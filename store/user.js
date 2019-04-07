import $http from '../request/http'

const defaultState = {
  role: '',
  isLogin: false,
  isAdmin: false,
  username: '路人',
  tel: ''
}

export const state = () => ({
  ...defaultState
})
export const getters = {
  isAdmin(state) {
    return state.user.role === 'superAdmin'
  }
}

export const actions = {
  getUserStatus({ commit }) {
    $http.getUserStatus().then(data => {
      if (data.success) {
        commit('UPDATE_USER', data.data)
      }
    })
  },
  login({ commit }, user) {
    return $http.login(user).then(data => {
      if (data.success) {
        commit('UPDATE_USER', data.data)
      }
      return new Promise((resolve, reject) => {
        resolve(data)
      })
    })
  },
  logout({ commit }) {
    return $http.logout().then(data => {
      if (data.success) {
        commit('UPDATE_USER', defaultState)
      }
      return new Promise((resolve, reject) => {
        resolve(data)
      })
    })
  },
  register({ commit }, user) {
    return $http.register(user).then(data => {
      if (data.success) {
        commit('UPDATE_USER', data.data)
      }
      return new Promise((resolve, reject) => {
        resolve(data)
      })
    })
  },
  password({ commit }, user) {
    return $http.password(user).then(data => {
      if (data.success) {
        commit('UPDATE_USER', defaultState)
      }
      return new Promise((resolve, reject) => {
        resolve(data)
      })
    })
  }
}
export const mutations = {
  UPDATE_USER(state, data) {
    this.state.user = {
      ...state,
      ...data
    }
  }
}
