require('font-awesome/css/font-awesome.min.css')

import Vue from 'vue'
import App from './App.vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import VeeValidate from 'vee-validate'

import router from './router'
import store from './store'

Vue.use(Vuex)
Vue.use(VueRouter)
Vue.use(VeeValidate)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
