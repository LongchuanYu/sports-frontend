import React, { useEffect } from 'react';
import { connect } from 'dva'
import axios from '@/axios/index.js'
import Toast from '@/components/Toast';
import {
  Button, Dialog, DialogTitle, DialogContent,
  TextField, DialogActions, Snackbar
} from '@material-ui/core';

const initErrorInfo = {
  usernameErr: false,
  passwordErr: false
}
const initLoginValue = {
  username: "",
  password: ""
}

function LoginForm(props) {
  const dispatch = props.dispatch;
  const [open, setOpen] = React.useState(false)
  const [loginValue, setLoginValue] = React.useState(initLoginValue)
  const [errorInfo, setErrorInfo] = React.useState(initErrorInfo)

  const handleClose = () => {
    setOpen(false)
  }
  const handleInputChanged = (event, type) => {
    const newVal = { ...loginValue }
    newVal[type] = event.target.value;
    setLoginValue(newVal)
  }
  const handleLogin = () => {
    const err = {};
    setErrorInfo(initErrorInfo);
    if (!loginValue.username) {
      err.usernameErr = true;
    }
    if (!loginValue.password) {
      err.passwordErr = true;
    }
    if (err.usernameErr || err.passwordErr) {
      setErrorInfo(err);
      return;
    }
    axios.post('/tokens', {}, {
      auth: {
        username: loginValue.username,
        password: loginValue.password
      }
    }).then(resp => {
      let {token} = resp.data;
      setOpen(false)
      Toast.info("Login success")
      dispatch({ type: 'login/login', payload: token })
    }).catch(e => {
      const msg = e.response?.data?.error;
      handleClose()
      if (msg) {
        Toast.info(msg)
      } else {
        Toast.info("Login error.")
      }

    })
  }
  const openLoginForm = () => {
    setLoginValue(initLoginValue)
    setOpen(true)
  }

  return (
    <div>
      <Button
        variant="contained"
        size="small"
        className={`mb-1`}
        onClick={openLoginForm}
      >
        Login
			</Button>
      <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
        <form>
          <DialogTitle id="form-dialog-title">Login</DialogTitle>
          <DialogContent>
            <TextField
              error={errorInfo.usernameErr}
              id="standard-username-input"
              label="Username"
              value={loginValue.username}
              onChange={(event) => handleInputChanged(event, 'username')}
              autoComplete="current-username"
            />
            <TextField
              error={errorInfo.passwordErr}
              id="standard-password-input"
              label="Password"
              type="password"
              value={loginValue.password}
              onChange={(event) => handleInputChanged(event, 'password')}
              autoComplete="current-password"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
						</Button>
            <Button onClick={handleLogin} color="primary">
              OK
						</Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  )
}

export default connect()(LoginForm)
