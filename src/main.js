// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'lib-flexible'
import Vue from 'vue'
import App from './App'
import router from './router'
import resource from 'vue-resource'
import './css/reset.css'
import './css/common.css'
Vue.config.productionTip = false
/* eslint-disable no-new */
Vue.use(resource)
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  data: {
    eventHub: new Vue()
  }
})
