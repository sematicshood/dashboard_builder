// var axios = require('axios');
import axios from 'axios'
import store from '../../store'

const client = axios.create({
  // baseURL: 'http://localhost:7073',
  baseURL: 'https://apps.feremall.com',
});

// before a request is made start the nprogress
client.interceptors.request.use(config => {
  store.commit('core/SET_LOADING', true)

  return config
})

// before a response is returned stop nprogress
client.interceptors.response.use(response => {
  store.commit('core/SET_LOADING', false)

  return response
})

// module.exports = axiosInstance;
export default client
