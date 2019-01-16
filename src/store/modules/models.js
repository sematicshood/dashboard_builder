// const client = require('./client');
import client from './client'

const state = {
    models: [],
    category: ''
}

const getters = {
    getModels(state) {
        return state.models
    },

    getCategory(state) {
        return state.category
    }
}

const mutations = {
    setModels(state, models) {
        state.models = models
    },

    SET_CATEGORY(state, category) {
        state.category = category
    }
}

const actions = {
    getModels({ commit, dispatch }) {
        // commit('core/SET_LOADING', true, {root: true})

        return new Promise((resolve) => {
            dispatch('login/reload', {}, {root: true})
                .then((res) => {
                    const token     = res,
                            config    =   {
                                            headers: {
                                                'access_token': token
                                            }
                                        },
                            data      = {
                                field: "['name', 'model']"
                            }

                    client.get('/api_v2/ir.model', {params: data}, config)
                            .then(res => {
                                commit('setModels', res.data['results'])
                                    
                                resolve(res.data['results'])
                                commit('core/SET_LOADING', false, {root: true})
                            })
                            .catch(() => {
                                commit('core/SET_LOADING', false, {root: true})
                            })
                })
                .catch(() => {
                    commit('core/SET_LOADING', false, {root: true})
                })
        })
        
    },

    setCategory({ commit, rootGetters, dispatch }, category) {
        commit('SET_CATEGORY', category)
        // commit('core/SET_LOADING', true, {root: true})

        if(category == 'all') {
            dispatch('getModels').then(res => commit('setModels', res))
        } else {
            const data      = {
                username: JSON.parse(localStorage.getItem('user'))['username'],
                password: JSON.parse(localStorage.getItem('user'))['password'],
                db_name: rootGetters['core/getDatabase']
            }
    
            client.get('/api_dashboard/filter-modul/' + category, {params: data})
                        .then(res => {
                            commit('setModels', res.data)

                            commit('core/SET_LOADING', false, {root: true})
                        })
                        .catch(() => {
                            commit('core/SET_LOADING', false, {root: true})
                        })
        }
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}