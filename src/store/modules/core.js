const state = {
    // db_name: 'tes',
    db_name: 'local_eng',
    user: JSON.parse(localStorage.getItem('user')),
    token: null,
    loading: false
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
    },

    getLoading(state) {
        return state.loading
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
    },

    SET_LOADING(state, loading) {
        state.loading = loading
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
