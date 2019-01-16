import client from './client'
import qs from 'qs'

const state = {
    type: '',
    name: '',
    dashboards: [],
}

const getters = {
    getType(state) {
        return state.type
    },

    getName(state) {
        return state.name
    },
    
    getDashboards(state) {
        return state.dashboards
    },
}

const mutations = {
    SET_TYPE(state, type) {
        state.type = type
    },

    SET_NAME(state, name) {
        state.name = name
    },

    ADD_DASHBOARDS(state, dashboards) {
        state.dashboards = dashboards
    }
}

const actions = {
    setType({commit}, type) {
       commit('SET_TYPE', type)
    },

    setName({commit}, name) {
        commit('SET_NAME', name)
    },

    addDashboards({commit}, dashboards) {
        commit('ADD_DASHBOARDS', dashboards)
    },

    addNewDashboard({rootGetters}, datas) {
        const data      = {
            username: JSON.parse(localStorage.getItem('user'))['username'],
            password: JSON.parse(localStorage.getItem('user'))['password'],
            db_name: rootGetters['core/getDatabase']
        }

        data['filters'] = `[('user_id','=',${ JSON.parse(localStorage.getItem('login'))['uid'] }), ('name','=','${datas['named']}')]`

        return new Promise((res, reject) => {
            client.get('/api_dashboard/dashboard', { params: data })
              .then(re => {
                  res(re)
              })
              .catch(err => {
                  if(err.response.status == 404) {
                        let payload = {
                            name: datas['named'],
                            user_id: JSON.parse(localStorage.getItem('login'))['uid'],
                            template: `{"name":"${datas["name"]}", "rows": [], "selected": []}`
                        }

                      client.post('/api_dashboard/dashboard', qs.stringify(payload), {params: data})
                            .then(r => {
                                reject(r)
                            })
                  }
              })
        }) 
    },

    duplicateDashboard({ rootGetters, dispatch }, template) {
        let ids     =   JSON.parse(localStorage.getItem('login'))['uid'],
            data    =   {
                            username: JSON.parse(localStorage.getItem('user'))['username'],
                            password: JSON.parse(localStorage.getItem('user'))['password'],
                            db_name: rootGetters['core/getDatabase']
                        }
            name    =   'Duplicate ' + template.split('-').splice(2).join(' ')

        data['filters'] = `[('user_id','=',${ ids }), ('name', '=', '${ template }')]`
        data['field']   = "['template']"

        client.get('/api_dashboard/dashboard', { params: data })
            .then(res => {
                let temp    =   JSON.parse(res.data.results[0].template)
                temp.name   =   name

                let payload =   {
                    name: 'template-dashboard-duplicate-' + template.split('-').splice(2).join('-'),
                    user_id: ids,
                    template: JSON.stringify(temp),
                }
                
                delete data['filters']
                delete data['field']

                client.post('/api_dashboard/dashboard', qs.stringify(payload), {params: data})
                       .then(() => dispatch('getDataDashboard'))
            })
    },

    deleteDashboard({ rootGetters }, template) {
        const data      = {
            username: JSON.parse(localStorage.getItem('user'))['username'],
            password: JSON.parse(localStorage.getItem('user'))['password'],
            db_name: rootGetters['core/getDatabase']
        }

        data['filters'] = `[('name','=','${ template }'), ('user_id','=',${ JSON.parse(localStorage.getItem('login'))['uid'] })]`

        return new Promise((resolve) => {
            client.get('/api_dashboard/dashboard', { params: data })
                .then(res => {
                    delete data['filters']

                    client.get('/api_dashboard/delete/dashboard/' + res.data.results[0].id, { params: data })
                          .then(re => {
                              resolve(re)
                          })
                })
        })
    },

    shareDashboard({ rootState, rootGetters }, id) {
        let detail  =   rootState.rows.alls,
            ids     =   JSON.parse(localStorage.getItem('login'))['uid'],
            payload =   {
                            name: detail.name,
                            user_id: id,
                            template: detail.template,
                        },
            data    =   {
                            username: JSON.parse(localStorage.getItem('user'))['username'],
                            password: JSON.parse(localStorage.getItem('user'))['password'],
                            db_name: rootGetters['core/getDatabase']
                        }

        data['filters'] = `[('user_id','=',${ ids }), ('name', '=', '${ detail.name }')]`
        data['field']   = "['template']"

        client.get('/api_dashboard/dashboard', { params: data })
            .then(res => {
                payload.template          = res.data.results[0].template

                data['filters'] = `[('user_id','=',${ id }), ('name', '=', '${ detail.name }')]`
                data['field']   = "['id']"

                client.get('/api_dashboard/dashboard', { params: data })
                    .then(res => {
                        client.post('/api_dashboard/dashboard/' + res.data.results[0].id, qs.stringify(payload), {params: data})
                    })
                    .catch(err => {
                        if(err.response.status == 404)
                            client.post('/api_dashboard/dashboard', qs.stringify(payload), {params: data})
                    })
            })
    },

    getDataDashboard({ commit, rootGetters }) {
        const data      = {
            username: JSON.parse(localStorage.getItem('user'))['username'],
            password: JSON.parse(localStorage.getItem('user'))['password'],
            db_name: rootGetters['core/getDatabase']
        }

        data['filters'] = `[('user_id','=',${ JSON.parse(localStorage.getItem('login'))['uid'] })]`
        data['field']   = "['name']"

        client.get('/api_dashboard/dashboard', { params: data })
              .then(res => {
                  commit('core/SET_LOADING', true, { root: true })   
                  
                  let data = []

                  res.data.results.forEach(el => {
                      if(el['name'] != false && data.indexOf(el['name']) < 0)
                        data.push(el['name'])
                  })

                  commit('ADD_DASHBOARDS', data)

                  commit('core/SET_LOADING', false, { root: true })
              })
    }
}

export default {
    namespaced: true,
    state,
    actions,
    getters,
    mutations
}