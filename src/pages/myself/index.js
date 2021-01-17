import styles from './index.css'
import React, { useEffect } from 'react';
import {connect} from 'dva'
import { Button, Dialog, DialogTitle} from '@material-ui/core';
import LoginForm from './components/login'
import RegisterForm from './components/register'
import Alerts from '@/components/Alerts';
import {L2Dwidget} from 'live2d-widget'
function Myself(props) {
  const { isLogin, username, dispatch } = props;

  useEffect(() => {
		console.log('hello')
		setTimeout(() => {
			L2Dwidget.init({
				model:{
					jsonPath: 'https://unpkg.com/live2d-widget-model-wanko@1.0.5/assets/wanko.model.json',
				},
				mobile: {
					"show": true,
				},
			})
		}, 0);
		return () => {
			let live = document.getElementById('live2d-widget');
			if(live){
				live.remove()
			}
			
		}
  }, [])
  
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
