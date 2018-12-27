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

    getSpecData(state, param) {
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
        let data = {}

        data[`${option['model']}`] = option['res']
        
        if(state.data != null) {
            state.data[`${option['model']}`] = option['res']
        } else {
            state.data = data
        }
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

        // dispatch('saveData')
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
        return new Promise((res, rej) => {
            var length = options['models'].length;
            for(var i = 0; i < length; i++) {
                if(options['models'][i] == options['model']) rej('true');
            }
            res('false');
        })
    },
    
    loadData({ getters, state, commit, dispatch, rootGetters }) {
        let models = getters.getModels

        // commit('DEFAULT_DATA', JSON.parse(localStorage.getItem('data')))

        if(rootGetters['rows/getRows'] != undefined) {
            rootGetters['rows/getRows'].forEach(element => {
                for (let index = 0; index < element.length; index++) {
                    if(index != 0) {
                        let model = element[index]['model']

                        if(model != undefined) {
                            dispatch('inArray', {model, models}).then(res => {
                                commit('ADD_MODELS', model)

                                dispatch('getDatas', model)
                                    .then(res => {
                                        commit('SET_DATA', {model, res})

                                        // dispatch('saveData')
                                    })
                            }).catch(err => console.log(err))
                        }
                    }
                }
            });
        }
    },

    getDatas({ commit, dispatch, getters, rootGetters }, model) {
        var d       =  new Date(),
            from    = `${d.getFullYear()}-${d.getMonth()}-1`,
            to      = `${d.getFullYear()}-${d.getMonth()+1}-1`
        
        return new Promise((resolve, reject) => {
            if(getters.getDatas[model] == undefined) {
                const data      = {
                    order: "id desc",
                    // filters: `[('create_date','>=','${ from }'), ('create_date','<','${ to }')]`,
                    username: JSON.parse(localStorage.getItem('user'))['username'],
                    password: JSON.parse(localStorage.getItem('user'))['password'],
                    db_name: rootGetters['core/getDatabase']
                },
                    config    =   {
                        headers: {
                            'username': localStorage.getItem('user')['username'],
                            'password': localStorage.getItem('user')['password'],
                            'db_name': rootGetters['core/getDatabase'],
                        }
                    }

                client.get('/api_dashboard/' + model, {params: data})
                        .then(res => {
                            let data          =   {}

                            data[`${model}`]  =   res.data['results']

                            commit('setDatas', {data: res.data['results'], model: model})
                            
                            resolve(res.data['results'])
                        })
                        .catch(err => {
                            console.log(err.response)
                        })
            } else {
                resolve(getters.getDatas[model])
            }
        })
    },

    filterData({ commit, dispatch, getters, rootGetters }, filter) {
        return new Promise((resolve, reject) => {
            let model = rootGetters['rows/getModel']
            console.log(filter)

            const data      = {
                order: "id desc",
                filters: filter,
                'username': JSON.parse(localStorage.getItem('user'))['username'],
                'password': JSON.parse(localStorage.getItem('user'))['password'],
                'db_name': rootGetters['core/getDatabase'],
            }

            client.get('/api_dashboard/' + model, {params: data})
                    .then(res => {
                        let data          =   {}

                        data[`model`]  =   res.data['results']

                        commit('SET_DATA', {res: res.data['results'], model: model})
                        
                        resolve(res.data['results'])
                    })
                    .catch(err => {
                        // commit('SET_DATA', {res: [], model: model})
                    })
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