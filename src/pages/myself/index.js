import styles from './index.css'
import React from 'react';
import { Button, Dialog, DialogTitle} from '@material-ui/core';
import LoginForm from './components/login'

export default function Myself() {
  const  value = "123";
  return (
    <div className={`container`}>
      <div className={`d-flex flex-column align-items-center`}>
        <LoginForm></LoginForm>
        <Button variant="contained" size="small" className={`mb-1`}>Register</Button>
        <Button variant="contained" size="small" className={`mb-1`}>Logout</Button>
      </div>
    </div>
  )
}
