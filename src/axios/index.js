import axios from 'axios'

// axios.defaults.baseURL = 'http://192.168.1.143:8000/'
axios.defaults.baseURL = 'http://192.168.1.143:8000/'

axios.defaults.timeout = 5000

axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    return config
  }, function (error) {
    //   console.log('request error...')
    // Do something with request error
    return Promise.reject(error)
  })

export default axios
