// store.js
import Vue from 'vue';
import Vuex from 'vuex';
import $http from '../request/http';
import user from './modules/user';
import article from './modules/article';
import mse from './modules/mse';

Vue.use(Vuex);

export default new Vuex.Store({
  // 数据
  state: {
    token: null, // 用户信息,
    typeList: null,
    articleList: null,
  },
  // 事件
  actions: {
    // 获取类型列表
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
            commit('ARTICLE_LIST', res);
          }
        });
    },
  },
  // 改变
  mutations: {
    changeNetwork(data) {
      console.log(data);
    },
    TYPELIST(state, data) {
      state.typeList = data;
    },
    ARTICLE_LIST(state, data) {
      state.articleList = data;
    },
  },
  // 获取
  getters: {
  },
  modules: {
    user,
    mse,
    article,
  }
});
