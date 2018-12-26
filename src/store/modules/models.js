const client = require('./client');
import qs from 'qs'

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
        console.log(state.models)
    },

    SET_CATEGORY(state, category) {
        state.category = category
    }
}

const actions = {
    getModels({ commit, dispatch, getters, rootGetters }) {
        return new Promise((resolve, reject) => {
            if(getters.getModels.length == 0) {
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
                                    console.log(res.data)
                                    commit('setModels', res.data['results'])
                                        
                                    resolve(res.data['results'])
                                })
                                .catch(err => {
                                    console.log(err)
                                })
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            } else {
                resolve(getters.getModels)
            }
        })
        
    },

    setCategory({ commit, rootGetters, dispatch }, category) {
        commit('SET_CATEGORY', category)
        console.log(category)

        if(category == 'all') {
            dispatch('getModels')
        } else {
            const data      = {
                username: JSON.parse(localStorage.getItem('user'))['username'],
                password: JSON.parse(localStorage.getItem('user'))['password'],
                db_name: rootGetters['core/getDatabase']
            }
    
            client.get('/api_dashboard/filter-modul/' + category, {params: data})
                        .then(res => {
                            console.log(res)
                            let data          =   {}
                            console.log(res.data)
    
                            commit('setModels', res.data)
                            
                            resolve(res.data['results'])
                        })
                        .catch(err => {
                            console.log(err.response)
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