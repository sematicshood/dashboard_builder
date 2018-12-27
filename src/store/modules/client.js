// var axios = require('axios');
import axios from 'axios'

export const client = axios.create({
  baseURL: 'http://localhost:7073',
});

// module.exports = axiosInstance;
// export default axiosInstance