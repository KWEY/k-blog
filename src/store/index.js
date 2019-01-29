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
  mseMenu: null,
  mseArticle: null,
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
  // 获取mse目录
  getMseDocList({ commit }) {
    return $http.getMseDocList()
      .then((res) => {
        if (res) {
          commit('MSE_MENU', res);
        }
      });
  },
  // 获取mse内容
  getMseDoc({ commit }) {
    return $http.getMseDoc()
      .then((res) => {
        if (res) {
          commit('MSE_ARTICLE', res);
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
  MSE_MENU(states, data) {
    state.mseMenu = data.typeList;
  },
  MSE_ARTICLE(states, data) {
    state.mseArticle = data;
  },
};

// 获取
const getters = {
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
