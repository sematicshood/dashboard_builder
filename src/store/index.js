import Vue from 'vue'
import Vuex from 'vuex'

//Modules Load
import login from './modules/login'
import core from './modules/core'
import models from './modules/models'
import fields from './modules/fields'
import data from './modules/data'
import rows from './modules/rows'
import workspace from './modules/workspace'

Vue.use(Vuex)

const debug =   process.env.NODE_ENV !== 'production'

const store = new Vuex.Store({
    modules: {
        login,
        core,
        models,
        fields,
        data,
        rows,
        workspace
    },
    strict: debug
})

export default store