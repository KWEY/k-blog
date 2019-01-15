import Vue from 'vue';
import Router from 'vue-router';
import index from '@/components/index';
import nav from '@/components/nav';
import tojson from '@/components/tojson';
import mse from '@/components/mse';
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
      path: '/mse',
      name: 'mse',
      component: mse,
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
  mode: 'history',
  scrollBehavior(to) {
    // 如果你的連結是帶 # 這種
    // to.hash 就會有值(值就是連結)
    // 例如 #3
    if (to.hash) {
      return {
        // 這個是透過 to.hash 的值來找到對應的元素
        // 照你的 html 來看是不用多加處理這樣就可以了
        // 例如你按下 #3 的連結，就會變成 querySelector('#3')，自然會找到 id = 3 的元素
        selector: to.hash,
      };
    }
    return null;
  },
});
