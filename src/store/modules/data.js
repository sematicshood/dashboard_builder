const client = require('./client');

const state = {
    datas: {},
    data: {},
    models: []
}

const getters = {
    getDatas(state) {
        return state.datas
    },

    getData(state) {
        return state.data
    },

    getModels(state) {
        return state.models
    }
}

const mutations = {
    setDatas(state, context) {
        return state.datas[`${ context['model'] }`] = context['data']
    },

    ADD_MODELS(state, model) {
        state.models.push(model)
    },

    SET_DATA(state, {model, res}) {
        state.data[model] = res
    },

    ADD_DATA(state, {model, res}) {
        state.data[model] = res
    }
}

const actions = {
    selectData({ commit, dispatch }, {model, res}) {
        commit('ADD_DATA', {model, res})

        dispatch('saveData')
    },

    saveData({ getters }) {
        localStorage.setItem('data', JSON.stringify(getters.getData))
    },

    inArray({}, {needle, haystack}) {
        var length = haystack.length;
        for(var i = 0; i < length; i++) {
            if(haystack[i] == needle) return true;
        }
        return false;
    },
    
    loadData({ getters, commit, dispatch, rootGetters }) {
        let models = getters.getModels
        
        rootGetters['rows/getRows'].forEach(element => {
            for (let index = 0; index < element.length; index++) {
                if(index != 0) {
                    let model = element[index]['model']

                    if(model != undefined) {
                        if(dispatch('inArray', {model, models}) == false) {
                            commit('ADD_MODELS', model)
                        }
                    }
                }
            }
        });

        models.forEach(model => {
            dispatch('data/getDatas', model)
                .then(res => {
                    commit('SET_DATA', {model, res})
                })
        });
    },

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