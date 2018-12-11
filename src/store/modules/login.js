import qs from 'qs';
import router from '../../router'

const client = require('./client');

const state = {

}

const getters = {

}

const actions = {
    login({dispatch, rootGetters}, data) {
        const db        =   rootGetters['core/getDatabase'],
              url       =   '/api_v2/auth/get_tokens'

        data['db']  =   db

        new Promise((resolve, reject) => {
            client.post(url, qs.stringify(data))
                    .then((res) => {
                        data['db'] = ':P'
                        localStorage.setItem('user', JSON.stringify(data))
                        localStorage.setItem('login', JSON.stringify(res.data))

                        dispatch('core/changeLogged', true, { root: true })

                        alert('Login berhasil, selamat datang ')

                        router.push('/')
                    })
                    .catch((err) => {
                        if(err.response['status'] == 401)
                            alert('Username atau password salah')
                    })
        })
    }
}

const mutations = {

}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}