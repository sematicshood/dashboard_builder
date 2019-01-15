import client from './client'
import qs from 'qs';

const state = {
    rows: {},
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
        { value: 'pie', text: 'pie' },
        { value: 'doughnut', text: 'doughnut' },
        { value: 'horizontal', text: 'horizontal' },
        { value: 'polar', text: 'polar' },
        { value: 'widget-card', text: 'widget card' },
        { value: 'widget-table', text: 'widget table' },
        { value: 'pivot-table', text: 'pivot table' },
    ],
    edited: false,
    alls: ''
}

const getters = {
    getAlls(state) {
        return state.alls
    },

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
    },

    getColumnDetail: (state) => (data) => {
        return state.rows[0][1]
    },

    getColumns(state) {
        let row     = (state.rowOp != '') ? state.rowOp : 0,
            column  = (state.colOp != '') ? state.colOp : 0
        
        return (state.rows[row] != undefined) ? state.rows[row][column]['columns'] : []
    },

    getTitles(state) {
        let row     = (state.rowOp != '') ? state.rowOp : 0,
            column  = (state.colOp != '') ? state.colOp : 0
        
        return (state.rows[row] != undefined) ? state.rows[row][column]['titles'] : []
    },

    getModel(state) {
        let row     = (state.rowOp != '') ? state.rowOp : 0,
            column  = (state.colOp != '') ? state.colOp : 1
        
        return (state.rows[row] != undefined) ? state.rows[row][column]['model'] : []
    },

    getColumnWidth(state) {
        let row     = (state.rowOp != '') ? state.rowOp : 0,
            column  = (state.colOp != '') ? state.colOp : 1
        
            return (state.rows[row] != undefined) ? state.rows[row][column]['width'] : []
    },

    getColumnFilters(state) {
        let row     = (state.rowOp != '') ? state.rowOp : 0,
            column  = (state.colOp != '') ? state.colOp : 0
        
        return (state.rows[row] != undefined) ? state.rows[row][column]['filters_data'] : []
    },

    getColumnFiltersList(state) {
        let row     = (state.rowOp != '') ? state.rowOp : 0,
            column  = (state.colOp != '') ? state.colOp : 0
        
        return (state.rows[row] != undefined) ? state.rows[row][column]['filters_list'] : []
    },

    // getColumnDetail(state) {
    //     console.log(state.rows[0][1])
    //     return state.rows[0][1]
    // },

    getHeightRow: (state) => (data) => {
        return state.rows[data][0]['height']
    },

    getEdited(state) {
        return state.edited
    },
}

const mutations = {
    SET_ALLS(state, alls) {
        state.alls = alls
    },

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
        if(state.rows[state.rowOp][state.colOp]['titles'].map(e => e.prop).indexOf(option.prop) < 0)
            state.rows[state.rowOp][state.colOp]['titles'].push(option)
    },

    SET_DATA_ROW(state, data) {
        state.rows[state.rowOp][state.colOp]['datas'] = data
    },

    SET_ROW_HEIGHT(state, height) {
        state.rows[state.rowOp][0]['height'] = height
    },

    SET_COLUMN_TITLE(state, title) {
        state.rows[state.rowOp][state.colOp]['title'] = title
    },

    SET_COLUMN_WIDTH(state, width) {
        let totalWidth       = 100,
            before           = state.rows[state.rowOp][state.colOp]['width']

        state.rows[state.rowOp].forEach((val, i) => {
            if(parseInt(val['width'])) {
                if(i != state.colOp)
                    totalWidth -= parseInt(val['width'])
            }
        });

        if(width > totalWidth)
            width = totalWidth

        state.rows[state.rowOp][state.colOp]['width'] = width

        state.rows[state.rowOp].forEach((val, i) => {
            let total = 0

            for(let a=1; a < i; a++) {
                if(state.rows[state.rowOp][i]['width'])
                    total += parseInt(state.rows[state.rowOp][a]['width'])
            }

            if(i != 0) {
                state.rows[state.rowOp][i]['left'] = total
            }
        });
    },

    REMOVE_TITLE(state, index) {
        state.rows[state.rowOp][state.colOp]['titles'].splice(index, 1)
    },

    RESET_TITLES(state) {
        state.rows[state.rowOp][state.colOp]['titles'] = []
        state.rows[state.rowOp][state.colOp]['table_options'] = {}
    },

    SET_EDITED(state, edited) {
        state.edited = edited
    },

    SET_DATA_DEFAULT_ROW(state, params) {
        state.rows[params.row][params.col]['datas'] = params.res
    },

    SET_FILTERS(state, filters) {
        state.rows[state.rowOp][state.colOp]['filters_data'] = filters
    },

    REMOVE_FILTERS(state, i) {
        state.rows[state.rowOp][state.colOp]['filters_list'].splice(i, 1)
    },

    ADD_FILTERS(state, filter) {
        state.rows[state.rowOp][state.colOp]['filters_data'] = filter
    },

    ADD_FILTERS_LIST(state, filter) {
        state.rows[state.rowOp][state.colOp]['filters_list'].push(filter)
    },

    SET_EDITED_DEFAULT(state, defaulted) {
        state.edited = defaulted
    },

    CEK_LEGEND(state, options) {
        let legends = [
            {
                name:'display',
                value: true
            },
            {
                name: 'position',
                value: 'top'
            }
        ]

        if(state.rows[options.row][options.col]['options_chart']['legend'] == undefined)
            state.rows[options.row][options.col]['options_chart']['legend'] =   {}

        legends.forEach(el => {
            if(state.rows[options.row][options.col]['options_chart']['legend'][el.name] == undefined)
                state.rows[options.row][options.col]['options_chart']['legend'][el.name] = el.value
        })
    },

    CEK_TOOLTIP(state, options) {
        let tooltips = [
            {
                name:'enabled',
                value: true
            },
            {
                name: 'uang',
                value: true
            }
        ]

        if(state.rows[options.row][options.col]['options_chart']['tooltip'] == undefined)
            state.rows[options.row][options.col]['options_chart']['tooltip'] =   {}

        tooltips.forEach(el => {
            if(state.rows[options.row][options.col]['options_chart']['tooltip'][el.name] == undefined)
                state.rows[options.row][options.col]['options_chart']['tooltip'][el.name] = el.value
        })
    },

    CEK_SCALES(state, options) {
        let scales = [
            {
                name:'xuang',
                value: true
            },
            {
                name: 'yuang',
                value: true
            }
        ]

        if(state.rows[options.row][options.col]['options_chart']['scales'] == undefined)
            state.rows[options.row][options.col]['options_chart']['scales'] =   {}

        scales.forEach(el => {
            if(state.rows[options.row][options.col]['options_chart']['scales'][el.name] == undefined)
                state.rows[options.row][options.col]['options_chart']['scales'][el.name] = el.value
        })
    },

    CEK_DATE_PROPERTY(state, options) {
        var d       =  new Date(),
            from    =  new Date(d.getUTCFullYear(), d.getUTCMonth(), 1),
            to      =  new Date(d.getUTCFullYear(), d.getUTCMonth() + 1, 1)

        if(state.rows[options.row][options.column]['filter_date'] == undefined)
            state.rows[options.row][options.column]['filter_date'] = { start: from, end: to }
    },

    RESET_DATE_PROPERTY(state) {
        var d       =  new Date(),
            from    =  new Date(d.getUTCFullYear(), d.getUTCMonth(), 1),
            to      =  new Date(d.getUTCFullYear(), d.getUTCMonth() + 1, 1)

        state.rows[state.rowOp][state.colOp]['filter_date'] = { start: from, end: to }
    },

    SET_DATE(state, option) {
        state.rows[state.rowOp][state.colOp]['filter_date'][option.type] = option.value
    },

    SET_LIMIT_TABLE(state, limit_table) {
        if(limit_table < 0) {
            limit_table = 0
        }
        
        state.rows[state.rowOp][state.colOp]['limit_table'] = limit_table
    },

    SET_DISPLAY(state, display) {
        state.rows[state.rowOp][state.colOp]['options_chart']['legend']['display'] = display
    },

    SET_POSITION(state, position) {
        state.rows[state.rowOp][state.colOp]['options_chart']['legend']['position'] = position
    },

    SET_ENABLED_TOOLTIP(state, enabled) {
        state.rows[state.rowOp][state.colOp]['options_chart']['tooltip']['enabled'] = enabled
    },

    SET_XUANG_SCALES(state, xuang) {
        state.rows[state.rowOp][state.colOp]['options_chart']['scales']['xuang'] = xuang
    },

    SET_YUANG_SCALES(state, yuang) {
        state.rows[state.rowOp][state.colOp]['options_chart']['scales']['yuang'] = yuang
    },

    SET_UANG_TOOLTIP(state, uang) {
        state.rows[state.rowOp][state.colOp]['options_chart']['tooltip']['uang'] = uang
    },

    CEK_GROUP_OPTION(state, options) {
        if(state.rows[options.row][options.column]['group_data'] == undefined)
            state.rows[options.row][options.column]['group_data'] = 'Bulan'
    },

    SET_GROUP_DATA(state, options) {
        state.rows[options.row][options.column]['group_data'] = options.group
    },

    SET_PIVOT_OPTIONS(state, options) {
        if(state.rows[options.row][options.col]['rowfieldes'] == undefined)
            state.rows[options.row][options.col]['rowfieldes'] = []

        if(state.rows[options.row][options.col]['colfieldes'] == undefined)
            state.rows[options.row][options.col]['colfieldes'] = []
    },

    SET_TABLE_OPTIONS(state, options) {
        if(state.rows[options.row][options.column]['table_options'] == undefined)
            state.rows[options.row][options.column]['table_options'] = {}

        if(state.rows[options.row][options.column]['limit_table'] == undefined)
            state.rows[options.row][options.column]['limit_table'] = 0

        if(state.rows[options.row][options.column]['hidden_label'] == undefined)
            state.rows[options.row][options.column]['hidden_label'] = []
            
        if(state.rows[options.row][options.column]['options_chart'] == undefined) {
            state.rows[options.row][options.column]['options_chart'] = {
                responsive: true,
                maintainAspectRatio: false,
                legend: {},
                layout: {},
                title: {},
                tooltip: {},
                scales: {
                    yAxes: [{}],
                    xAxes: [{}],
                }
            }
        }

        if(state.rows[options.row][options.column]['options_chart'] != undefined) {
            if(state.rows[options.row][options.column]['options_chart'].length == 0) {
                state.rows[options.row][options.column]['options_chart'] = {
                    responsive: true,
                    maintainAspectRatio: false,
                    legend: {},
                    layout: {},
                    title: {},
                    tooltip: {},
                    scales: {
                        yAxes: [{}],
                        xAxes: [{}],
                    }
                }
            }
        }
    },

    UPDATE_TABLE_OPTIONS(state, options) {
        state.rows[options.row][options.col]['table_options'] = options.data
    },

    SET_TITLES_COLUMN(state, titles) {
        state.rows[state.rowOp][state.colOp]['titles'] = titles
    },

    ADD_HIDDEN_LABEL(state, label) {
        state.rows[label.row][label.column]['hidden_label'].push(label.label)
    },

    REMOVE_HIDDEN_LABEL(state, label) {
        var index = state.rows[label.row][label.column]['hidden_label'].indexOf(label.label);
        if (index !== -1) state.rows[label.row][label.column]['hidden_label'].splice(index, 1);
    },

    CHANGE_TABLE_OPTIONS(state, option) {
        state.rows[option.row][option.column]['table_options'][option.keys]['operation'] = option.op
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

    updateRows({commit}, {row, column}) {
        commit('UPDATE_ROWS', {row, column})
    },

    save({rootGetters, state}) {
        let id = state.alls['id']

        const data      = {
            username: JSON.parse(localStorage.getItem('user'))['username'],
            password: JSON.parse(localStorage.getItem('user'))['password'],
            db_name: rootGetters['core/getDatabase']
        }

        let anu = JSON.parse(state.alls['template'])

        anu['rows'] = state.rows

        let payload = {
            template: JSON.stringify(anu)
        }
        console.log('save')

        if((payload['template'] == state.alls['template']) == false)
            client.post('/api_dashboard/dashboard/' + id, qs.stringify(payload), {params: data})
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
    },

    loadTemplate({ commit, dispatch, rootGetters }) {
        let name        = 'template-dashboard-' +  rootGetters['workspace/getName'],
            rows        = JSON.parse(localStorage.getItem(name))['rows'] || []

        commit('SET_ROWS', rows)

        dispatch('reset')
    },

    syncDatabase({ rootGetters, dispatch }, datad) {
        let name        = datad['name'],
            rows        = datad['template']

        const data      = {
            username: JSON.parse(localStorage.getItem('user'))['username'],
            password: JSON.parse(localStorage.getItem('user'))['password'],
            db_name: rootGetters['core/getDatabase']
        }

        let payload = {
            name: name,
            user_id: JSON.parse(localStorage.getItem('login'))['uid'],
            template: JSON.stringify(rows)
        }

        data['filters'] = `[('name', '=', '${ name }'), ('user_id', '=', ${ JSON.parse(localStorage.getItem('login'))['uid'] })]`

        return new Promise((resolve, rej) => {
            client.get('/api_dashboard/dashboard', { params: data })
              .then(res => {
                  delete data['filters']

                  payload['id'] = res.data.results[0].id

                  client.post('/api_dashboard/dashboard/' + payload['id'], qs.stringify(payload), {params: data})
                            .then(re => {
                                resolve(re)
                                if(datad['id']) {
                                    payload['parent_id'] =   payload['id']
                                    payload['user_id']   =   id
                                    delete payload['id']

                                    client.post('/api_dashboard/dashboard', qs.stringify(payload), {params: data})
                                    .then(re => {
                                        resolve(re)
                                    })
                                }

                                data['filters'] = `[('parent_id', '=', ${ res.data.results[0].id })]`
                                data['field']   = "['id', 'user_id']"

                                client.get('/api_dashboard/dashboard', { params: data })
                                      .then(res => {
                                          delete data['filters']
                                          delete data['fields']

                                          res.data['results'].forEach(el => {
                                            payload['user_id'] = el['user_id']

                                            client.post('/api_dashboard/dashboard/' + el['id'], qs.stringify(payload), {params: data})
                                          })
                                      })
                            })
              })
              .catch(err => {
                  delete data['filters']
                  
                  if(err.response.status) {
                      client.post('/api_dashboard/dashboard', qs.stringify(payload), {params: data})
                            .then(re => {
                                resolve(re)
                                if(datad['id']) {
                                    payload['parent_id'] =   re.data.id
                                    payload['user_id']   =   datad['id']

                                    client.post('/api_dashboard/dashboard', qs.stringify(payload), {params: data})
                                    .then(re => {
                                        resolve(re)
                                    })
                                }
                            })
                  }
              })
        })
    },

    setTitle({commit}, title) {
        commit('SET_TITLE', title)
    },

    setSelected({commit}, selected) {
        commit('SET_SELECTED', selected)
    },

    deleteColumn({commit, dispatch}) {
        commit('DELETE_COLUMN')
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

    addTitle({ state, commit, dispatch }, option) {
        if(dispatch('cekColRow'))
            commit('ADD_TITLE', option)

        dispatch('data/loadSingleData', {'data': state.rows[state.rowOp][state.colOp], 'row': state.rowOp, 'col': state.colOp}, { root: true })

        
    },

    removeTitle({ commit, dispatch }, index) {
        if (dispatch('cekColRow'))
            commit('REMOVE_TITLE', index)
    },

    setDataRow({ commit }, data) {
        commit('SET_DATA_ROW', data)
    },

    resetTitles({ commit }, data) {
        commit('RESET_TITLES', data)
    },

    setDataDefaultRow({ commit }, params) {
        commit('SET_DATA_DEFAULT_ROW', params)
    },

    setFilters({ commit }, filters) {
        commit('SET_FILTERS', filters)
    },

    removeFilters({ commit }, i) {
        commit('REMOVE_FILTERS', i)
    },

    addFilters({ commit }, filter) {
        commit('ADD_FILTERS', filter)  
    },

    addFiltersList({ commit }, filter) {
        commit('ADD_FILTERS_LIST', filter)

        
    },

    setColumnWidth({ commit }, width) {
        commit('SET_COLUMN_WIDTH', width)

           
    },

    setColumnTitle({ commit }, title) {
        commit('SET_COLUMN_TITLE', title)

           
    },

    setRowHeight({ commit }, height) {
        commit('SET_ROW_HEIGHT', height)

           
    },

    setEdited({ commit, rootGetters }) {
        let name        = 'template-dashboard-' + rootGetters['workspace/getName'],
            template    = JSON.parse(localStorage.getItem(name))['edited'] || false

        commit('SET_EDITED_DEFAULT', template)
        commit('SET_EDITED', template)
    },

    cekLegend({ commit }, options) {
        commit('CEK_LEGEND', options)

        
    },

    cekTooltip({ commit }, options) {
        commit('CEK_TOOLTIP', options)

        
    },

    cekScales({ commit }, options) {
        commit('CEK_SCALES', options)

        
    },

    cekDateProperty({ commit }, options) {
        commit('CEK_DATE_PROPERTY', options)

        
    },

    resetDateProperty({ commit }) {
        commit('RESET_DATE_PROPERTY')

        
    },

    cekGroupOption({ commit }, options) {
        commit('CEK_GROUP_OPTION', options)

        
    },

    setGroupData({ commit }, group) {
        commit('SET_GROUP_DATA', group)

        
    },

    cekTableOptions({ commit }, options) {
        commit('SET_TABLE_OPTIONS', options)

        
    },

    cekPivotOptions({ commit }, options) {
        commit('SET_PIVOT_OPTIONS', options)

        
    },

    updateTableOptions({ commit }, options) {
        commit('UPDATE_TABLE_OPTIONS', options)

        
    },

    getOption({state}, options) {
        return new Promise((res, rej) => {
            try {
                res(state.rows[options.row][options.col]['table_options'][options.key])
            } catch (error) {
                rej(error)
            }
        })
    },

    setLimitTable({ commit }, limit_table) {
        commit('SET_LIMIT_TABLE', limit_table)
    },

    getRowsFromServer({ commit, rootGetters, dispatch }, name) {
        const data      = {
            username: JSON.parse(localStorage.getItem('user'))['username'],
            password: JSON.parse(localStorage.getItem('user'))['password'],
            db_name: rootGetters['core/getDatabase']
        }

        data['filters'] = `[('name', '=', 'template-dashboard-${ name }'), ('user_id', '=', ${ JSON.parse(localStorage.getItem('login'))['uid'] })]`

        client.get('/api_dashboard/dashboard', {params: data})
              .then(res => {
                  let data = JSON.parse(res.data.results[0]['template'])
                  console.log(res.data.results)
                  
                  commit('data/SET_SELECTED', data['selected'], {root: true})
                  commit('SET_ROWS', data['rows'])
                  commit('SET_ALLS', res.data.results[0])

                  dispatch('data/loadData', data['rows'], {root: true})
              })
    },

    setTitlesColumn({ commit}, titles) {
        commit('SET_TITLES_COLUMN', titles)
    },

    addHiddenLabel({ commit}, label) {
        commit('ADD_HIDDEN_LABEL', label)
    },

    removeHiddenLabel({ commit}, label) {
        commit('REMOVE_HIDDEN_LABEL', label)
    },

    changeTableOptions({ commit}, options) {
        commit('CHANGE_TABLE_OPTIONS', options)
    }
}

export default {
    namespaced: true,
    state,
    actions,
    getters,
    mutations
}