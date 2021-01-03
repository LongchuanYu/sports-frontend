import axios from 'axios'

axios.defaults.baseURL = 'http://192.168.1.143:5000/'
// axios.defaults.baseURL = 'http://localhost:5000/'

axios.defaults.timeout = 5000

axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    const token = window.localStorage.getItem('token')
    if(token){
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
  }, function (error) {
    // Do something with request error
    return Promise.reject(error)
  })

// axios.interceptors.response.use(function(response){
//   console.log('response ok...')
//   return response
// },function(error){
//   console.log('error..............')
//   return Promise.reject(error)
// })
  
export default axios

