import Vue from 'vue';
import Router from 'vue-router';
import index from '@/components/index';
import nav from '@/components/nav';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index,
    },
    {
      path: '/nav',
      name: 'nav',
      component: nav,
    },
  ],
});
