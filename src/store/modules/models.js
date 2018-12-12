const client = require('./client');
import qs from 'qs'

const state = {
    models: []
}

const getters = {
    getModels(state) {
        return state.models
    }
}

const mutations = {
    setModels(state, models) {
        return state.models = models
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
        
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}