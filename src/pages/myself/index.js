import styles from './index.css'
import React from 'react';
import {connect} from 'dva'
import { Button, Dialog, DialogTitle} from '@material-ui/core';
import LoginForm from './components/login'
import RegisterForm from './components/register'
import Alerts from '@/components/Alerts';
import moment from 'moment'
function Myself(props) {
  const { isLogin, username, dispatch } = props;
  const test = () => {
    Alerts.show("hello")
  }
  return (
    <div className={`container`}>
      <div className={`d-flex flex-column align-items-center`}>
        {
          isLogin ?
          <IsLoginComponents dispatch={dispatch} username={username}/> :
          <IsLogoutComponents />
        }
        <Button variant="contained" onClick={()=>{
          let ret = moment().format("YYYY-MM-DD");
          console.log(ret)
        }}>Test</Button>
      </div>
    </div>
  )
}

function IsLoginComponents(props) {
  const {dispatch, username} = props;
  return (
    <React.Fragment>
      <div>Welcome: {username}</div>
      <Button onClick={()=>dispatch({type:'login/logout'})}  variant="contained" size="small" className={`mb-1`}>Logout</Button>
    </React.Fragment>
  )
}

function IsLogoutComponents() {
  return (
    <React.Fragment>
      <LoginForm />
      <RegisterForm />
    </React.Fragment>
  )
}

export default connect(
  ({login}) => ({...login})
)(Myself)
