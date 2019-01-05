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

    addNewDashboard({commit,rootGetters}, datas) {
        const data      = {
            username: JSON.parse(localStorage.getItem('user'))['username'],
            password: JSON.parse(localStorage.getItem('user'))['password'],
            db_name: rootGetters['core/getDatabase']
        }

        data['filters'] = `[('user_id','=',${ JSON.parse(localStorage.getItem('login'))['uid'] }), ('name','=','${datas['named']}')]`

        return new Promise((res, rej) => {
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
                                rej(r)
                            })
                  }
              })
        }) 
    },

    duplicateDashboard({ commit, rootGetters, dispatch }, template) {
        const data      = {
            username: JSON.parse(localStorage.getItem('user'))['username'],
            password: JSON.parse(localStorage.getItem('user'))['password'],
            db_name: rootGetters['core/getDatabase']
        }

        data['filters'] = `[('user_id','=',${ JSON.parse(localStorage.getItem('login'))['uid'] }), ('name','=','template-dashboard-${template}')]`

        return new Promise((resolve, rej) => {
            client.get('/api_dashboard/dashboard', { params: data })
              .then(res => {
                commit('core/SET_LOADING', true, { root: true })   
                res.data.results[0]['name'] = `template-dashboard-duplicate-${template}`

                let templated = JSON.parse(res.data.results[0]['template'])

                templated['name'] = `Duplicate ${template}`
                JSON.stringify(templated)

                dispatch('rows/syncDatabase', { 'name': res.data.results[0]['name'], 'template': templated, 'id': false }, {root: true})
                    .then(reso => {
                        resolve(reso)
                    })
              })
              .catch(err => {
                  console.log(err)
              })
        })
    },

    deleteDashboard({ commit, rootGetters }, template) {
        const data      = {
            username: JSON.parse(localStorage.getItem('user'))['username'],
            password: JSON.parse(localStorage.getItem('user'))['password'],
            db_name: rootGetters['core/getDatabase']
        }

        data['filters'] = `[('name','=','template-dashboard-${ template }'), ('user_id','=',${ JSON.parse(localStorage.getItem('login'))['uid'] })]`

        return new Promise((resolve, reject) => {
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

    getDataDashboard({ commit, rootGetters }) {
        const data      = {
            username: JSON.parse(localStorage.getItem('user'))['username'],
            password: JSON.parse(localStorage.getItem('user'))['password'],
            db_name: rootGetters['core/getDatabase']
        }

        data['filters'] = `[('user_id','=',${ JSON.parse(localStorage.getItem('login'))['uid'] })]`

        client.get('/api_dashboard/dashboard', { params: data })
              .then(res => {
                  commit('core/SET_LOADING', true, { root: true })   
                  
                  let data = []

                  res.data.results.forEach(el => {
                      if(el['template'] != false)
                        data.push(JSON.parse(el['template']))
                  })

                  commit('ADD_DASHBOARDS', data)

                  commit('core/SET_LOADING', false, { root: true })
              })
              .catch(err => {
                  console.log(err)
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