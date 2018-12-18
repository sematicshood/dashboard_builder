const client = require('./client');

const state = {
    datas: {},
    data: {},
    models: [],
    selected: []
}

const getters = {
    getDatas(state) {
        return state.datas
    },

    getData(state) {
        return state.data || {}
    },

    getModels(state) {
        return state.models
    },

    getSelected(state) {
        return state.selected
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

    ADD_DATA(state, option) {
        state.data[`${option['model']}`] = option['res']
    },

    DEFAULT_DATA(state, data) {
        state.data = data
    },

    ADD_SELECTED(state, value) {
        state.selected.push(value)
    },

    SET_SELECTED(state, selected) {
        state.selected = selected
    },

    REMOVE_SELECTED(state, i) {
        state.selected.splice(i, 1)
    }
}

const actions = {
    selectData({ commit, dispatch }, {model, res}) {
        commit('ADD_DATA', {model, res})

        dispatch('saveData')
    },

    removeSelected({ commit, dispatch }, i) {
        commit('REMOVE_SELECTED', i)

        dispatch('saveModels')
    },

    addSelected({ commit, dispatch }, value) {
        commit('ADD_SELECTED', value)

        dispatch('saveModels')
    },

    setSelected({ commit, rootGetters }) {
        let name            = 'template-dashboard-' +  rootGetters['workspace/getName'],
            selected        = JSON.parse(localStorage.getItem(name))['selected'] || []
            
        commit('SET_SELECTED', selected)
    },

    saveData({ getters }) {
        localStorage.setItem('data', JSON.stringify(getters.getData))
    },

    saveModels({ getters, rootGetters }) {
        let name        = 'template-dashboard-' +  rootGetters['workspace/getName'],
            template    = JSON.parse(localStorage.getItem(name))

        template['selected'] = getters.getSelected

        localStorage.setItem(name, JSON.stringify(template))
    },

    inArray({ getters }, options) {
        var length = options['models'].length;
        for(var i = 0; i < length; i++) {
            if(options['models'][i] == options['model']) return true;
        }
        return false;
    },
    
    loadData({ getters, commit, dispatch, rootGetters }) {
        let models = getters.getModels

        commit('DEFAULT_DATA', JSON.parse(localStorage.getItem('data')))

        if(rootGetters['rows/getRows'] != undefined) {
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
        }

        if(models != undefined) {
            models.forEach(model => {
                dispatch('data/getDatas', model)
                    .then(res => {
                        commit('SET_DATA', {model, res})
                    })
            });
        }
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