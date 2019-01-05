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
        
        return state.rows[row][column]['columns']
    },

    getTitles(state) {
        let row     = (state.rowOp != '') ? state.rowOp : 0,
            column  = (state.colOp != '') ? state.colOp : 0
        
        return state.rows[row][column]['titles']
    },

    getModel(state) {
        let row     = (state.rowOp != '') ? state.rowOp : 0,
            column  = (state.colOp != '') ? state.colOp : 1
        
        return state.rows[row][column]['model']
    },

    getColumnWidth(state) {
        let row     = (state.rowOp != '') ? state.rowOp : 0,
            column  = (state.colOp != '') ? state.colOp : 1
        
        return state.rows[row][column]['width']
    },

    getColumnFilters(state) {
        let row     = (state.rowOp != '') ? state.rowOp : 0,
            column  = (state.colOp != '') ? state.colOp : 1
        
        return state.rows[row][column]['filters_data']
    },

    getColumnFiltersList(state) {
        let row     = (state.rowOp != '') ? state.rowOp : 0,
            column  = (state.colOp != '') ? state.colOp : 1
        
        return state.rows[row][column]['filters_list']
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

    CEK_LEGEND(state) {
        let legends = [
            {
                name:'display',
                value: true
            }
        ]

        state.rows.forEach((el, o) => {
            el.forEach((e, i) => {
                if(i != 0) {
                    if(state.rows[o][i]['options_chart']['legend'] == undefined)
                        state.rows[o][i]['options_chart']['legend'] =   {}

                    legends.forEach(el => {
                        if(state.rows[o][i]['options_chart']['legend'][el.name] == undefined)
                            state.rows[o][i]['options_chart']['legend'][el.name] = el.value
                    })
                }
            })
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

    CEK_GROUP_OPTION(state, options) {
        if(state.rows[options.row][options.column]['group_data'] == undefined)
            state.rows[options.row][options.column]['group_data'] = 'Bulan'
    },

    SET_GROUP_DATA(state, options) {
        state.rows[options.row][options.column]['group_data'] = options.group
    },

    SET_TABLE_OPTIONS(state, options) {
        if(state.rows[options.row][options.column]['table_options'] == undefined)
            state.rows[options.row][options.column]['table_options'] = {}

        if(state.rows[options.row][options.column]['limit_table'] == undefined)
            state.rows[options.row][options.column]['limit_table'] = 0
    },

    UPDATE_TABLE_OPTIONS(state, options) {
        state.rows[options.row][options.col]['table_options'] = options.data

        // console.log(state.rows[options.row][options.col]['table_options'] = {})
    },

    SET_TITLES_COLUMN(state, titles) {
        state.rows[state.rowOp][state.colOp]['titles'] = titles
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

    updateSelected({commit, dispatch}, selected) {
        commit('UPDATE_SELECTED', selected)

        dispatch('save', false)
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

    save({getters, dispatch, commit, rootGetters, state}, datad) {
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

        if((payload['template'] == state.alls['template']) == false)
            client.post('/api_dashboard/dashboard/' + id, qs.stringify(payload), {params: data})
    },

    editedFalse({getters, dispatch,commit, rootGetters}, all = true) {
        // let name        = 'template-dashboard-' + rootGetters['workspace/getName'],
        //     template    = JSON.parse(localStorage.getItem(name))

        // template['rows'] = getters.getRows

        // for(let t in template['rows']) {
        //     for(let a in template['rows'][t]) {
        //         if(a != 0) {
        //             if(template['rows'][t][a].hasOwnProperty('data')) {
        //                 delete template['rows'][t][a]['data']
        //             }
        //         }
        //     }
        // }
        // commit('SET_EDITED', false)

        // template['edited'] = false
        
        // localStorage.setItem(name, JSON.stringify(template))

        // dispatch('reset', all)
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

        console.log(payload)

        // dispatch('editedFalse')

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
                                        console.log(re)
                                    })
                                    .catch(er => {
                                        console.log(er)
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
                                      .catch(err => {
                                          console.log(err)
                                      })
                            })
                            .catch(er => {
                                console.log(er)
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
                                    payload['user_id']   =   id

                                    client.post('/api_dashboard/dashboard', qs.stringify(payload), {params: data})
                                    .then(re => {
                                        resolve(re)
                                        console.log(re)
                                    })
                                    .catch(er => {
                                        console.log(er)
                                    })
                                }
                            })
                            .catch(er => {
                                console.log(er)
                            })
                  }
              })
        })
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

    setFilters({ commit, dispatch }, filters) {
        commit('SET_FILTERS', filters)

        dispatch('save', false)
    },

    removeFilters({ commit, dispatch }, i) {
        commit('REMOVE_FILTERS', i)

        dispatch('save', false)
    },

    addFilters({ commit, dispatch }, filter) {
        commit('ADD_FILTERS', filter)

        dispatch('save', false)
    },

    addFiltersList({ commit, dispatch }, filter) {
        commit('ADD_FILTERS_LIST', filter)

        dispatch('save', false)
    },

    setColumnWidth({ commit, dispatch }, width) {
        commit('SET_COLUMN_WIDTH', width)

        dispatch('save', false)   
    },

    setColumnTitle({ commit, dispatch }, title) {
        commit('SET_COLUMN_TITLE', title)

        dispatch('save', false)   
    },

    setRowHeight({ commit, dispatch }, height) {
        commit('SET_ROW_HEIGHT', height)

        dispatch('save', false)   
    },

    setEdited({ commit, rootGetters }) {
        let name        = 'template-dashboard-' + rootGetters['workspace/getName'],
            template    = JSON.parse(localStorage.getItem(name))['edited'] || false

        commit('SET_EDITED_DEFAULT', template)
        commit('SET_EDITED', template)
    },

    cekLegend({ commit, dispatch }) {
        commit('CEK_LEGEND')

        dispatch('save', false)
    },

    cekDateProperty({ commit, dispatch }, options) {
        commit('CEK_DATE_PROPERTY', options)

        dispatch('save', false)
    },

    resetDateProperty({ commit, dispatch }) {
        commit('RESET_DATE_PROPERTY')

        dispatch('save', false)
    },

    cekGroupOption({ commit, dispatch }, options) {
        commit('CEK_GROUP_OPTION', options)

        dispatch('save', false)
    },

    setGroupData({ commit, dispatch }, group) {
        commit('SET_GROUP_DATA', group)

        dispatch('save', false)
    },

    cekTableOptions({ commit, dispatch }, options) {
        commit('SET_TABLE_OPTIONS', options)

        dispatch('save', false)
    },

    updateTableOptions({ commit, dispatch }, options) {
        commit('UPDATE_TABLE_OPTIONS', options)

        dispatch('save', false)
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

    setLimitTable({ commit, dispatch }, limit_table) {
        commit('SET_LIMIT_TABLE', limit_table)

        dispatch('save', false)
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
                  
                  commit('data/SET_SELECTED', data['selected'], {root: true})
                  commit('SET_ROWS', data['rows'])
                  commit('SET_ALLS', res.data.results[0])

                  dispatch('data/loadData', data['rows'], {root: true})
              })
              .catch(err => {
                  console.log(err)
              })
    },

    setTitlesColumn({ commit, dispatch }, titles) {
        commit('SET_TITLES_COLUMN', titles)

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