// store.js
import Vue from 'vue';
import Vuex from 'vuex';
import $http from '../request/http';
import user from './modules/user';

Vue.use(Vuex);

// 数据
const state = {
  token: null, // 用户信息,
  typeList: null,
  article: null,

};

// 事件
const actions = {
  // 获取文章列表
  getTypeList({ commit }) {
    return $http.getTypeList()
      .then((res) => {
        if (res) {
          commit('TYPELIST', res);
        }
      });
  },

  // 获取文章列表
  getDirectoryList({ commit }, data) {
    return $http.getDirectoryList(data)
      .then((res) => {
        if (res) {
          commit('ARTICLE', res);
        }
      });
  },
};

// 改变
const mutations = {
  TYPELIST(states, data) {
    state.typeList = data;
  },
  ARTICLE(states, data) {
    state.article = data;
  },
};

// 获取
const getters = {
  getTypeList: states => states.typeList,
  getDirectory: states => states.article,
};

export default new Vuex.Store({
  state,
  actions,
  mutations,
  getters,
  modules: {
    user,
  }
});
