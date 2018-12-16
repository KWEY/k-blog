import Vue from 'vue';
import Vuex from 'vuex';
import user from './modules/user';

Vue.use(Vuex);


export default new Vuex.Store({
  state: {
    token: null, // 用户信息,
    typeList: null,
    directory: null,
    article: null,
  },
  mutations: {
    TOKEN(state, val) {
      state.token = val;
    },
    TYPELIST(state, val) {
      state.typeList = val;
    },
    DIRECTORY(state, val) {
      state.directory = val;
    },
    ARTICLE(state, val) {
      state.article = val;
    },
  },
  actions: {
    setToken({ commit }, val) {
      commit('TOKEN', val);
    },
    setTypeList({ commit }, val) {
      commit('TYPELIST', val);
    },
    setDirectory({ commit }, val) {
      commit('DIRECTORY', val);
    },
    setArticle({ commit }, val) {
      commit('ARTICLE', val);
    },
  },
  modules: {
    user,
  },
});
