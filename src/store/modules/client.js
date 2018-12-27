var axios = require('axios');

var axiosInstance = axios.create({
  baseURL: 'http://localhost:7073',
});

export default axiosInstance
