import styles from './index.css'
import React from 'react';
import { Button } from '@material-ui/core';

export default function Myself() {
  return (
    <div className={`container`}>
      <div className={`d-flex flex-column align-items-center`}>
        <Button variant="contained" size="small" className={`mb-1`}>Login</Button>
        <Button variant="contained" size="small" className={`mb-1`}>Register</Button>
        <Button variant="contained" size="small" className={`mb-1`}>Logout</Button>
      </div>
    </div>
  )
}
