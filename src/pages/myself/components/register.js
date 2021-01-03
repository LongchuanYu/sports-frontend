import React, { useEffect } from 'react';
import {connect} from 'dva'
import axios from '@/axios/index.js'
import Alerts from '@/components/Alerts';
import {
	Button, Dialog, DialogTitle, DialogContent,
	TextField, DialogActions, Snackbar
} from '@material-ui/core';


const initErrorInfo = {
  usernameErr: false,
  passwordErr: false
}
const initregisterValue = {
  username: "",
  password: ""
}

function RegisterForm() {
  const [open, setOpen] = React.useState(false)
  const [registerValue, setRegisterValue] = React.useState(initregisterValue)
  const [errorInfo, setErrorInfo] = React.useState(initErrorInfo)

	const handleInputChanged = (event, type) => {
    const newVal = {...registerValue}
    newVal[type] = event.target.value;
    setRegisterValue(newVal)
  }

  const handleRegister = () => {
    if (!registerValue.username || !registerValue.password){
      Alerts.show("Please input username or password");
      return;
    }
    axios.post('/users', registerValue).then(resp=>{
	  Alerts.show("Register success.")
	  setOpen(false)
    }).catch(e=>{
      const msg = e.response.data.message;
      if (msg){
        Alerts.show(msg);
      }else{
        Alerts.show('Error');
      }
      
    })
  }

  return(
		<div>
			<Button
				variant="contained"
				size="small"
				className={`mb-1`}
				onClick={()=>{
          setRegisterValue(initregisterValue)
          setOpen(true)
        }}
			>
				Register
			</Button>
			<Dialog onClose={()=>setOpen(false)} aria-labelledby="simple-dialog-title" open={open}>
				<form>
					<DialogTitle id="form-dialog-title">Register</DialogTitle>
					<DialogContent>
						<TextField
              error={errorInfo.usernameErr}
							id="standard-username-input"
							label="Username"
              value={registerValue.username}
              onChange={(event)=>handleInputChanged(event, 'username')}
							autoComplete="current-username"
						/>
						<TextField
              error={errorInfo.passwordErr}
							id="standard-password-input"
							label="Password"
							type="password"
              value={registerValue.password}
              onChange={(event)=>handleInputChanged(event, 'password')}
							autoComplete="current-password"
						/>
					</DialogContent>
					<DialogActions>
						<Button onClick={()=>{setOpen(false)}} color="primary">
							Cancel
						</Button>
						<Button onClick={handleRegister} color="primary">
							OK
						</Button>
					</DialogActions>
				</form>
			</Dialog>
		</div>
	)
}

export default RegisterForm;