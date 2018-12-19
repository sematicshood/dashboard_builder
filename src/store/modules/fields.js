const client = require('./client');

const state = {
    fields: {}
}

const getters = {
    getFields(state) {
        return state.fields
    }
}

const mutations = {
    setFields(state, context) {
        return state.fields[`${ context['id'] }`] = context['data']
    }
}

const actions = {
    getFields({ commit, dispatch, getters, rootGetters }, id) {
        return new Promise((resolve, reject) => {
            if(getters.getFields[id] == undefined) {
                dispatch('login/reload', {}, {root: true})
                    .then((res) => {
                        const token     = res,
                            config    =   {
                                                headers: {
                                                    'access_token': token
                                                }
                                            },
                            data      = {
                                field: "['name', 'field_description']",
                                filters: `[('model_id', '=', ${ id })]`
                            }

                        client.get('/api_v2/ir.model.fields', {params: data}, config)
                                .then(res => {
                                    let field       =   {}

                                    field[`${id}`]  =   res.data['results']

                                    commit('setFields', {data: res.data['results'], id: id})
                                    
                                    resolve(res.data['results'])
                                })
                                .catch(err => {
                                    console.log(err)
                                })
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            } else {
                resolve(getters.getFields[id])
            }
        })
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}