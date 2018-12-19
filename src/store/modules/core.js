const state = {
    db_name: 'local_eng',
    user: JSON.parse(localStorage.getItem('user')),
    token: null
}

const getters = {
    getDatabase(state) {
        return state.db_name
    },

    getUser(state) {
        return state.user
    },

    getToken(state) {
        return state.token
    }
}

const actions = {
    updateToken({commit}, token) {
        commit('setToken', token)
    }
}

const mutations = {
    setToken(state, token) {
        state.token = token
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}