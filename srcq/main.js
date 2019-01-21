// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import KWE from './kwe';
import router from './router';
import store from './store';
import './components/css/common.css';

Vue.config.productionTip = false;
/* eslint-disable no-new */
new Vue({
  el: '#kwe-index',
  router,
  store,
  components: { KWE },
  template: '<KWE/>',
});
