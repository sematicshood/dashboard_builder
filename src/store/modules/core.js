const state = {
    db_name: 'db_feremall',
    isLogged: false
}

const getters = {
    getDatabase(state) {
        return state.db_name
    },
}

const actions = {
    changeLogged({commit}, status) {
        commit('logged', status)
    }
}

const mutations = {
    logged(state, status) {
        state.isLogged = status
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}