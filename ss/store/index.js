// store.js
import Vue from 'vue';
import Vuex from 'vuex';
import $http from '../request/http';

Vue.use(Vuex);

// 数据
const state = {
  token: '',
  lists: [], // 文章列表
};

// 事件
const actions = {
  // 获取文章列表
  fetchLists({ commit }, data) {
    return $http.getList(data)
      .then((res) => {
        if (res) {
          commit('setLists', res);
        }
      });
  },
};

// 改变
const mutations = {
  setLists(states, data) {
    state.lists = data;
  },
};

// 获取
const getters = {
  getDirectory: states => states.lists,
};

export default new Vuex.Store({
  state,
  actions,
  mutations,
  getters,
});
