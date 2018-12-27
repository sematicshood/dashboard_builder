require('font-awesome/css/font-awesome.min.css')

import Vue from 'vue'
import App from './App.vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import VeeValidate from 'vee-validate'
import { sync } from 'vuex-router-sync'

import router from './router'
import store from './store'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VueDataTables from 'vue-data-tables'
import lang from 'element-ui/lib/locale/lang/en'
import locale from 'element-ui/lib/locale'
import BootstrapVue from 'bootstrap-vue'
import Datatable from 'vue2-datatable-component'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faEdit, faEye, faSave, faUndo, faSync, faDatabase, faStream, faPlus, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

require('vue2-animate/dist/vue2-animate.min.css')

library.add(faEdit, faEye, faSave, faUndo, faSync, faDatabase, faStream, faPlus, faSignOutAlt)

Vue.component('font-awesome-icon', FontAwesomeIcon)
locale.use(lang)

Vue.use(Vuex)
Vue.use(VueRouter)
Vue.use(VeeValidate)
Vue.use(ElementUI)
Vue.use(VueDataTables)
Vue.use(Datatable)
Vue.use(BootstrapVue)

sync(store, router)

Vue.config.productionTip = false

var vm = new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')