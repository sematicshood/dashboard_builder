const state = {
    sidebar: false,
    database: true,
    style: false
}

const getters = {
    getSidebar(state) {
        return state.sidebar
    },

    getDatabase(state) {
        return state.database
    },

    getStyle(state) {
        return state.style
    }
}

const mutations = {
    CHANGE_SIDEBAR(state) {
        state.sidebar = !state.sidebar
    },

    SET_SIDEBAR(state, sidebar) {
        state.sidebar = sidebar
    },

    CHANGE_DATABASE(state) {
        state.database = true
        state.style    = false
    },

    CHANGE_STYLE(state) {
        state.database = false
        state.style    = true
    }
}

const actions = {
    changeSidebar({ commit }) {
        commit('CHANGE_SIDEBAR')
    },

    setSidebar({ commit }, sidebar) {
        if(sidebar == 'edit')
            sidebar = true
        else
            sidebar = false

        commit('SET_SIDEBAR', sidebar)
    },

    changeDatabase({ commit }) {
        commit('CHANGE_DATABASE')
    },

    changeStyle({ commit }) {
        commit('CHANGE_STYLE')
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}