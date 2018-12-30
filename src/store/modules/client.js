// var axios = require('axios');
import axios from 'axios'

export const client = axios.create({
  baseURL: 'http://localhost:7073',
  // baseURL: 'https://apps.feremall.com',
});

// module.exports = axiosInstance;
// export default axiosInstance
