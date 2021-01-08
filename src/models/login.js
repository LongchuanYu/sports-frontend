const Login = {
  namespace: 'login',
  state: {
    isLogin: false,
    username: undefined
  },
  effects: {
    *login({payload}, {call, put}){
      let [header, token_payload, signature] = payload.split('.');
      let {username} = JSON.parse(atob(token_payload))
      localStorage.setItem("isLogin", true)
      localStorage.setItem("username", username)
      localStorage.setItem("token", payload)
      yield put({
        type: 'setLogin',
        payload: {
          isLogin: true,
          username: username
        }
      })
    },
    *logout({}, {call, put}){
      console.log('logout!!!!')
      localStorage.removeItem("isLogin")
      localStorage.removeItem("username")
      localStorage.removeItem("token")
      yield put({type: 'setLogout'})
    },
    *checkIsLogin({}, {call, put}){
      let isLoginFlag = localStorage.getItem("isLogin")
      let username = localStorage.getItem("username")
      if (isLoginFlag) {
        yield put({
          type: 'setLogin',
          payload: {
            isLogin: true,
            username: username
          }
        })
      }else {
        yield put({type: 'setLogout'})
      }
    },
    *test(){
      console.log('test....')
    }
  },
  reducers: {
    setLogin(state, {payload}){
      const {isLogin, username} = payload;
      return {...state, isLogin:isLogin, username:username}
    },
    setLogout(state){
      return {...state, isLogin: false, username: undefined}
    },

  }
}
export default Login;
