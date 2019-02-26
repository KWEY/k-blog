export default {
  state: {
    name: '雪人',
    id: '001',
    role: 'ADMIN'
  },
  mutations: {
    RESET_USER(state, user) {
      state.name = user.name
      state.id = user.id
      state.role = user.role
    }
  },
  getters: {
    isAdmin(state) {
      return state.role === 'ADMIN'
    }
  },
  actions: {}
}
