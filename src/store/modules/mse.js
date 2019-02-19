import $http from '../../request/http';

export default {
  state: {
    mseMenu: null,
    mseArticle: null,
  },
  mutations: {
    MSE_MENU(state, data) {
      state.mseMenu = data.typeList;
    },
    MSE_ARTICLE(state, data) {
      state.mseArticle = data;
    },
  },
  getters: {
  },
  actions: {
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
  },
};