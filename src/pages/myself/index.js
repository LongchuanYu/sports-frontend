import styles from './index.css'
import React from 'react';
import {connect} from 'dva'
import { Button, Dialog, DialogTitle} from '@material-ui/core';
import LoginForm from './components/login'
import Alerts from '@/components/alert'

function Myself(props) {
  const test = () => {
    console.log(props)
  }
  console.log(Alerts)
  return (
    <div className={`container`}>
      <div className={`d-flex flex-column align-items-center`}>
        <LoginForm />
        <Button onClick={test} variant="contained" size="small" className={`mb-1`}>Register</Button>
        <Button variant="contained" size="small" className={`mb-1`}>Logout</Button>
      </div>
    </div>
  )
}

export default connect(
  ({login}) => ({...login})
)(Myself)
