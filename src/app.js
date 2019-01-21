// app.js
import Vue from 'vue';
import { sync } from 'vuex-router-sync'; // 把当VueRouter状态同步到Vuex中
import App from './App.vue';
import router from './router/index';
import store from './store/index';

// 将路由状态添加到vuex中
sync(store, router);

const app = new Vue({
// 注入 router store 到根 Vue 实例
  router,
  store,
  render: h => h(App),
});
// .$mount('#app')

export default app;
