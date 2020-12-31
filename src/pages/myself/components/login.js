import React, { useEffect } from 'react';
import {connect} from 'dva'
import axios from '@/axios/index.js'
import {
	Button, Dialog, DialogTitle, DialogContent,
	TextField, DialogActions, Snackbar
} from '@material-ui/core';

const initErrorInfo = {
  usernameErr: false,
  passwordErr: false
}

function LoginForm(props) {
	const [open, setOpen] = React.useState(false)
  const [loginValue, setLoginValue] = React.useState({
    username: "",
    password: ""
  })
  const [errorInfo, setErrorInfo] = React.useState(initErrorInfo)
	const handleClose = () => {
		setOpen(false)
	}
	const handleInputChanged = (event, type) => {
    const newVal = {...loginValue}
    newVal[type] = event.target.value;
    setLoginValue(newVal)
  }
  const handleLogin = () => {
    const dispatch = props.dispatch;
    const err = {};
    setErrorInfo(initErrorInfo);
    if(!loginValue.username){
      err.usernameErr = true;
    }
    if(!loginValue.password){
      err.passwordErr = true;
    }
    if(err.usernameErr || err.passwordErr){
      setErrorInfo(err);
      return;
    }
    axios.post('/api/users', loginValue).then(resp => {
      dispatch({type: 'login/login', payload: resp.data.username})
    })
  }
	const openLoginForm = () => {
		setOpen(true)
	}

	return(
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
              onChange={(event)=>handleInputChanged(event, 'username')}
							autoComplete="current-username"
						/>
						<TextField
              error={errorInfo.passwordErr}
							id="standard-password-input"
							label="Password"
							type="password"
              value={loginValue.password}
              onChange={(event)=>handleInputChanged(event, 'password')}
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
