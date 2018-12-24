var axios = require('axios');

var axiosInstance = axios.create({
  baseURL: 'https://apps.feremall.com',
});

module.exports = axiosInstance;