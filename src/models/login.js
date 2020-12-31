const Login = {
  namespace: 'login',
  state: {
    isLogin: false,
    username: undefined
  },
  effects: {
    login({payload}){
      localStorage.setItem("username", payload)
    },
    logout(){
      localStorage.removeItem("username")
    }
  },
  reducers: {
    actionLogin(state, { payload }){
      console.log(payload)
      return {...state, isLogin: true, username: payload}
    }
  }
}
export default Login;
