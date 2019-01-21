// router.js
import Vue from 'vue';
import Router from 'vue-router';

import Home from '../pages/index.vue';

Vue.use(Router);

export default new Router({
  mode: 'history', // SSR必须使用history模式
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    // 主页
    { path: '/', component: Home },
  ],
});
