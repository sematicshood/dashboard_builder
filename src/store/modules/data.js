const client = require('./client');

const state = {
    datas: {}
}

const getters = {
    getDatas(state) {
        return state.datas
    }
}

const mutations = {
    setDatas(state, context) {
        return state.datas[`${ context['model'] }`] = context['data']
    }
}

const actions = {
    getDatas({ commit, dispatch, getters, rootGetters }, model) {
        return new Promise((resolve, reject) => {
            if(getters.getDatas[model] == undefined) {
                dispatch('login/reload', {}, {root: true})
                    .then((res) => {
                        const token     = res,
                            config    =   {
                                                headers: {
                                                    'access_token': token
                                                }
                                            },
                            data      = {
                                orders: "id desc"
                            }

                        client.get('/api_v2/' + model, {params: data}, config)
                                .then(res => {
                                    let data       =   {}

                                    data[`${model}`]  =   res.data['results']

                                    commit('setDatas', {data: res.data['results'], model: model})
                                    
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
                resolve(getters.getDatas[model])
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