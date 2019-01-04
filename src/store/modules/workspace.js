import { client } from './client'

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
        let is = true

        state.dashboards.forEach(dashboard => {
            if (dashboard['name'] == dashboards['name'])
                is = false
        })

        if(is)
            state.dashboards.push(dashboards)
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

    getDataDashboard({ commit, rootGetters }) {
        const data      = {
            username: JSON.parse(localStorage.getItem('user'))['username'],
            password: JSON.parse(localStorage.getItem('user'))['password'],
            db_name: rootGetters['core/getDatabase']
        }

        data['filters'] = `[('user_id','=',${ JSON.parse(localStorage.getItem('login'))['uid'] })]`

        client.get('/api_dashboard/dashboard', { params: data })
              .then(res => {
                  res.data.results.forEach(el => {
                      localStorage.setItem(el['name'], el['template'])

                      commit('ADD_DASHBOARDS', JSON.parse(el['template']))
                  })
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