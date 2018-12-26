var axios = require('axios');

var axiosInstance = axios.create({
  baseURL: 'http://localhost:7073',
  // headers: {
  //   'username': localStorage.getItem('user')['username'],
  //   'password': localStorage.getItem('user')['password'],
  //   'db_name': 'tes',
  //   'content-type': 'application/x-www-form-urlencoded'
  // },
});

module.exports = axiosInstance;