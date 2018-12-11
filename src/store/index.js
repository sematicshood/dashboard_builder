import Vue from 'vue'
import Vuex from 'vuex'

//Modules Load
import login from './modules/login'

Vue.use(Vuex)

const debug =   process.env.NODE_ENV !== 'production'

const store = new Vuex.Store({
    modules: {
        login
    },
    strict: debug
})

export default store