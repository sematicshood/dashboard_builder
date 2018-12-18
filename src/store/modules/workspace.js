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
            if (state['name'] == dashboards['name'])
                is = false
        })

        if(is)
            state.dashboards.push(dashboards)
    },

    SET_DASHBOARDS(state, dashboards) {
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

    setDashboards({commit}, dashboards) {
        commit('SET_DASHBOARDS', dashboards)
    }
}

export default {
    namespaced: true,
    state,
    actions,
    getters,
    mutations
}