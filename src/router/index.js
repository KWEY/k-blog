// router.js
import Vue from 'vue';
import Router from 'vue-router';

import index from '../pages/index.vue';
import nav from '../pages/nav.vue';
import tojson from '../pages/tojson.vue';
import mse from '../pages/mse.vue';
import article from '../pages/article.vue';
import to404 from '../pages/404.vue';

Vue.use(Router);

export default new Router({
  mode: 'history', // SSR必须使用history模式
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    // 主页
    { path: '/', component: index },
    { path: '/index', component: index },
    { path: '/nav', component: nav },
    { path: '/tojson', component: tojson },
    { path: '/mse', component: mse },
    { path: '/article/:id', component: article },
    { path: '*', component: to404 },
  ],
});
