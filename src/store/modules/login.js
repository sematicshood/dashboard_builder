import qs from 'qs';

// const client = require('./client');
import client from './client'

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

                        alert('Login berhasil, selamat datang ')

                        window.location = '/'
                    })
                    .catch((err) => {
                        if(err.response['status'] == 401)
                            alert('Username atau password salah')
                    })
        })
    },

    reload({ dispatch, rootGetters }) {
        const db        =   rootGetters['core/getDatabase'],
              user      =   rootGetters['core/getUser'] || localStorage.getItem('user'),
              url       =   '/api_v2/auth/get_tokens',
              data      =   {
                  'db': db,
                  'username': user['username'],
                  'password': user['password']
              }

        return new Promise((resolve, reject) => {
            client.post(url, qs.stringify(data))
                    .then((res) => {
                        data['db'] = ':P'
                        localStorage.setItem('user', JSON.stringify(data))
                        localStorage.setItem('login', JSON.stringify(res.data))

                        dispatch('core/updateToken', res.data['access_token'], { root: true })
                        resolve(res.data['access_token'])
                    })
                    .catch((err) => {
                        if(err.response['status'] == 401)
                            alert('Username atau password salah')
                        reject('hello')
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