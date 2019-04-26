// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import router from './router'
// import resource from './resource'
import axios from 'axios'

Vue.config.productionTip = false;
axios.defaults.withCredentials=true;
Vue.prototype.$axios = axios;

Vue.use(axios);
Vue.use(ElementUI);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  // resource,
  axios,
  components: { App },
  template: '<App/>'
})
