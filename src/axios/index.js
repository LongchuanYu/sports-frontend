import axios from 'axios'
import Alerts from '@/components/Alerts'
import {getDvaApp} from 'umi'
// axios.defaults.baseURL = 'http://192.168.1.143:5000/'
axios.defaults.baseURL = 'http://0.0.0.0:5000/'
// axios.defaults.baseURL = 'http://sports.remly.xyz:5000/'

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

axios.interceptors.response.use(function(response){
  return response
},function(error){
  console.log(error)
  const status = error?.response?.status;
  switch(status){
    case 401:
      getDvaApp()._store.dispatch({
        type: 'login/logout'
      })

  }
  return Promise.reject(error)
})

export default axios

