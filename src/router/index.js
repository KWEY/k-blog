import Vue from 'vue';
import Router from 'vue-router';
import index from '@/components/index';
import nav from '@/components/nav';
import tojson from '@/components/tojson';
import article from '@/components/article';
import to404 from '@/components/404';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index,
    },
    {
      path: '/index',
      name: 'index',
      component: index,
    },
    {
      path: '/nav',
      name: 'nav',
      component: nav,
    },
    {
      path: '/tojson',
      name: 'tojson',
      component: tojson,
    },
    {
      path: '/article/:id',
      name: 'article',
      component: article,
    },
    {
      path: '*',
      name: '404',
      component: to404,
    },
  ],
});
