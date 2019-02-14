import Vue from 'vue'
import store from './store/index'
import ElementUI from 'element-ui'
import 'normalize.css/normalize.css' // A modern alternative to CSS resets
import './assets/css/element-variables.scss'
import './assets/css/font-awesome.min.css'
import './assets/css/common.css'
import router from './router/'
import Config from './config/'
import Api from './api/'
import Function from './utils/'
import VueSlimScroll from 'vue-slimscroll'
Vue.use(VueSlimScroll)


import App from './App.vue'
Vue.prototype.$Api = Api
Vue.prototype.$Config = Config
Vue.prototype.$Func = Function

Vue.use(ElementUI)

router.beforeEach((to, from, next) => {
  window.document.title = to.meta.title?to.meta.title+'-'+Config.siteName:Config.siteName;
  if (!sessionStorage.getItem(Config.tokenKey) && to.path != '/login') {
    next({path: '/login'});
  } else {
    next();
  }
});
router.afterEach(transition => {

});


new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
