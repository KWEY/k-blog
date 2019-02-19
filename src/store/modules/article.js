import $http from '../../request/http';

export default {
  state: {
    article: {},
  },
  mutations: {
    ARTICLE_CONTENT(state, data) {
      state.article = data;
    },
  },
  getters: {
  },
  actions: {
    // 获取文章内容
    getArticle({ commit }, id) {
      const arr = id.split('_');
      return $http.getArticle(
        {
          id,
          tid: arr[0],
        }
      ).then((res) => {
        if (res) {
          commit('ARTICLE_CONTENT', res);
        }
      });
    },
  },
};