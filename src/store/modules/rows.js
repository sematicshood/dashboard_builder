const state = {
    rows: [],
    height: '',
    width: '',
    maxWidth: '',
    totalLeft: '',
    rowSelect     : '',
    selected      : '',
    rowOp         : '',
    rowOptionShow : false,
    colOp         : '',
    colOptionShow : false,
    title         : '',
    options: [
        { value: 'table', text: 'table' },
        { value: 'line', text: 'line' },
        { value: 'bar', text: 'bar' },
    ],
}

const getters = {
    getRows(state) {
        return state.rows
    },

    getRowOptionShow(state) {
        return state.rowOptionShow
    },

    getRowOp(state) {
        return state.rowOp
    },

    getColOp(state) {
        return state.colOp
    },

    getColOptionShow(state) {
        return state.colOptionShow
    },

    getHeight(state) {
        return state.height
    },

    getWidth(state) {
        return state.width
    },

    getMaxWidth(state) {
        return state.maxWidth
    },

    getTotalLeft(state) {
        return state.totalLeft
    },

    getRowSelect(state) {
        return state.rowSelect
    },

    getTitle(state) {
        return state.title
    },

    getSelected(state) {
        return state.selected
    },

    getOptions(state) {
        return state.options
    }
}

const mutations = {
    SET_ROWS(state, rows) {
        state.rows = rows
    },

    SET_ROW_SELECT(state, row) {
        state.rowSelect = row
    },

    SET_MAX_WIDTH(state, maxWidth) {
        state.maxWidth = maxWidth
    },

    SET_TOTAL_LEFT(state, totalLeft) {
        state.totalLeft = totalLeft
    },

    ADD_ROWS(state, rows) {
        state.rows.push(rows)
    },

    UPDATE_ROWS(state, {row, column}) {
        state.rows[row].push(column)
    },

    SET_WIDTH(state, width) {
        state.width = width
    },

    SET_HEIGHT(state, height) {
        state.height = height
    },

    SET_SELECTED(state, selected) {
        state.selected = selected
    },

    SET_ROW_OP(state, rowOp) {
        state.rowOp = rowOp
    },

    SET_ROW_OPTION_SHOW(state, rowOptionShow) {
        state.rowOptionShow = rowOptionShow
    },

    SET_COL_OP(state, colOp) {
        state.colOp = colOp
    },

    SET_COL_OPTION_SHOW(state, colOptionShow) {
        state.colOptionShow = colOptionShow
    },

    DELETE_ROW(state, index) {
        state.rows.splice(index, 1)
    },

    SET_TITLE(state, title) {
        state.title = title
    },

    SET_SELECTED(state, selected) {
        state.selected = selected
    },

    DELETE_COLUMN(state) {
        let width   =   state.rows[state.rowOp][state.colOp]['width']

        state.rows[state.rowOp].forEach((element, index) => {
            let ori = element['left']
            if(index != 0 && index != state.colOp) {
                if(element['left'] - width >= 0) {
                    element['left'] -= width
                } else {
                    element['left'] = ori
                }
            }
        });

        state.rows[state.rowOp].splice(state.colOp, 1)
    },

    ADD_COLUMNS(state, columns) {
        state.rows[state.rowOp][state.colOp]['columns'] = columns
    },

    ADD_MODEL(state, model) {
        state.rows[state.rowOp][state.colOp]['model'] = model
    },

    UPDATE_SELECTED(state, selected) {
        state.rows[state.rowOp][state.colOp]['type'] = selected
    },

    ADD_TITLE(state, option) {
        state.rows[state.rowOp][state.colOp]['titles'].push(option)
    },

    REMOVE_TITLE(state, index) {
        state.rows[state.rowOp][state.colOp]['titles'].splice(index, 1)
    }
}

const actions = {
    setRows({commit}, rows) {
        commit('SET_ROWS', rows)
    },

    setRowOp({commit}, index) {
        commit('SET_ROW_OP', index)
    },

    setRowOptionShow({commit}, show) {
        commit('SET_ROW_OPTION_SHOW', show)
    },

    setRowSelect({commit}, row) {
        commit('SET_ROW_SELECT', row)
    },

    setMaxWidth({commit}, maxWidth) {
        commit('SET_MAX_WIDTH', maxWidth)
    },

    setWidth({commit}, width) {
        commit('SET_WIDTH', width)
    },

    setTotalLeft({commit}, totalLeft) {
        commit('SET_TOTAL_LEFT', totalLeft)
    },

    addRows({commit}, rows) {
        commit('ADD_ROWS', rows)
    },

    updateSelected({commit}, selected) {
        commit('UPDATE_SELECTED', selected)
    },

    setColOp({commit}, index) {
        commit('SET_COL_OP', index)
    },

    setColOptionShow({commit}, index) {
        commit('SET_COL_OPTION_SHOW', index)
    },

    updateRows({commit, dispatch}, {row, column}) {
        commit('UPDATE_ROWS', {row, column})

        dispatch('save')
    },

    save({getters, dispatch, rootGetters}, all = true) {
        let name        = 'template-dashboard-' + rootGetters['workspace/getName'],
            template    = JSON.parse(localStorage.getItem(name))

        template['rows'] = getters.getRows
        
        localStorage.setItem(name, JSON.stringify(template))

        dispatch('reset', all)
    },

    reset({commit}, all = true) {
        commit('SET_ROW_SELECT', '')
        commit('SET_WIDTH', '')
        commit('SET_HEIGHT', '')

        if(all) {
            commit('SET_SELECTED', '')
            commit('SET_ROW_OP', '')
            commit('SET_ROW_OPTION_SHOW', false)
            commit('SET_COL_OP', '')
            commit('SET_COL_OPTION_SHOW', false)
        }
    },

    deleteRow({commit, dispatch}, index) {
        commit('DELETE_ROW', index)

        dispatch('save')
    },

    loadTemplate({ commit, dispatch, rootGetters }) {
        let name        = 'template-dashboard-' +  rootGetters['workspace/getName'],
            template    = JSON.parse(localStorage.getItem(name)) || [],
            rows        = JSON.parse(localStorage.getItem(name))['rows'] || []

        commit('SET_ROWS', rows)

        dispatch('reset')
    },

    setTitle({commit}, title) {
        commit('SET_TITLE', title)
    },

    setSelected({commit, dispatch}, selected) {
        commit('SET_SELECTED', selected)
    },

    deleteColumn({commit, dispatch}) {
        commit('DELETE_COLUMN')

        dispatch('save')
    },

    selectColumns({ dispatch, commit }, columns) {
        if (dispatch('cekColRow'))
            commit('ADD_COLUMNS', columns)
    },

    cekColRow({ getters }) {
        return getters.getRowOp.length == undefined && getters.getColOp.length == undefined
    },

    selectModel({ dispatch, commit }, model) {
        if (dispatch('cekColRow'))
            commit('ADD_MODEL', model)
    },

    addTitle({ commit, dispatch }, option) {
        if(dispatch('cekColRow'))
            commit('ADD_TITLE', option)

        dispatch('save', false)
    },

    removeTitle({ commit, dispatch }, index) {
        if (dispatch('cekColRow'))
            commit('REMOVE_TITLE', index)

        dispatch('save', false)
    }
}

export default {
    namespaced: true,
    state,
    actions,
    getters,
    mutations
}