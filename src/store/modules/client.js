var axios = require('axios');

var axiosInstance = axios.create({
  baseURL: 'http://localhost:7073',
});

module.exports = axiosInstance;