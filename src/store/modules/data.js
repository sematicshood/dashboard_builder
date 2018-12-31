// const client = require('./client');
import { client } from './client'

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
            selected        = JSON.parse(localStorage.getItem(name))
        
        commit('SET_SELECTED', selected['selected'] || [])
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

        if(rootGetters['rows/getRows'] != undefined) {
            rootGetters['rows/getRows'].forEach((element, row) => {
                element.forEach((el, col) => {
                    if(el['model'] != undefined) {
                        dispatch('getDatas', {'model': el['model'], 'filters': el['filters_data'], 'date': el['filter_date']})
                            .then(res => {
                                dispatch('rows/setDataDefaultRow', {res, row, col}, { root: true })
                            })
                            .catch(err => {
                                let res = []
                                dispatch('rows/setDataDefaultRow', {res, row, col}, { root: true })
                            })
                    }
                })
            });
        }
    },

    getUserData(rootGetters) {
        return new Promise((resolve, reject) => {
            const data      = {
                username: JSON.parse(localStorage.getItem('user'))['username'],
                password: JSON.parse(localStorage.getItem('user'))['password'],
                db_name: rootGetters['core/getDatabase'],
            }

            client.get('/api_dashboard/res.users/' + JSON.parse(localStorage.getItem('login'))['uid'], {params: data})
                  .then(res => {
                      resolve(res.data)
                  })
        })
    },  

    getDatas({ commit, dispatch, getters, rootGetters }, datas) {
        var d       =  new Date(),
            from    = `${d.getFullYear()}-${d.getMonth()+1}-1`,
            to      = `${d.getFullYear()}-${d.getMonth()+2}-1`,
            filters = ''

        if(d.getMonth()+1 > 12) {
            from    = `${d.getFullYear() + 1}-1-1`
        }

        if(d.getMonth()+2 > 12) {
            to    = `${d.getFullYear() + 1}-1-1`
        }

        return new Promise((resolve, reject) => {
            const data      = {
                order: "write_date asc",
                username: JSON.parse(localStorage.getItem('user'))['username'],
                password: JSON.parse(localStorage.getItem('user'))['password'],
                db_name: rootGetters['core/getDatabase']
            }

            if(datas['filters'] != undefined) filters += `${datas['filters']}`
            
            if(datas['date'] != undefined) {
                if(typeof datas['date'] == 'object') {
                    let st = datas['date'].start.split('T')[0].split('-'),
                        en = datas['date'].end.split('T')[0].split('-')

                    console.log(st)

                    let from = `${ st[0] }-${ st[1] }-${ st[2] }`,
                        to   = `${ en[0] }-${ en[1] }-${ en[2] }`

                    if(from == to) {
                        filters += `('write_date','=','${ from }')`
                    } else {
                        filters += `('write_date','>=','${ from }'),('write_date','<','${ to }')`
                    }
                } else {
                    filters += datas['date']
                }
            } else {
                filters += `('write_date','>=','${ from }'),('write_date','<','${ to }')`
            }

            if(datas['model'] == undefined) {
                datas['model'] = rootGetters['rows/getModel']
            }

            data['filters'] = `[${filters}]`

            console.log(data['filters'])

            client.get('/api_dashboard/' + datas['model'], {params: data})
                    .then(res => {
                        let data          =   {}

                        data[`${datas['model']}`]  =   res.data['results']

                        commit('setDatas', {data: res.data['results'], model: datas['model']})
                        
                        resolve(res.data['results'])
                    })
                    .catch(err => {
                        reject(err.response)
                    })
        })
    },

    getUsers({ rootGetters }) {
        return new Promise((resolve, reject) => {
            const data      = {
                order: 'name asc',
                field: "['name', 'id']",
                username: JSON.parse(localStorage.getItem('user'))['username'],
                password: JSON.parse(localStorage.getItem('user'))['password'],
                db_name: rootGetters['core/getDatabase']
            }

            client.get('/api_dashboard/res.users', {params: data})
                    .then(res => {
                        resolve(res.data['results'])
                    })
                    .catch(err => {
                        reject(err.response)
                    })
        })
    },

    filterData({ commit, dispatch, getters, rootGetters }, filter) {
        return new Promise((resolve, reject) => {
            let model = rootGetters['rows/getModel']

            const data      = {
                order: "write_date asc",
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
                        reject(err)
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