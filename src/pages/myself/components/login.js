import React, { useEffect } from 'react';
import { 
	Button, Dialog, DialogTitle, DialogContent, DialogContentText,
	TextField, DialogActions
} from '@material-ui/core';

export default function LoginForm(props) {
	const [open, setOpen] = React.useState(false)

	const handleClose = () => {
		setOpen(false)
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
							id="standard-username-input"
							label="Username"
							autoComplete="current-username"
						/>
						<TextField
							id="standard-password-input"
							label="Password"
							type="password"
							autoComplete="current-password"
						/>
					</DialogContent>
					<DialogActions>
						<Button onClick={handleClose} color="primary">
							Cancel
						</Button>
						<Button onClick={handleClose} color="primary">
							OK
						</Button>
					</DialogActions>
				</form>
			</Dialog>
		</div>
	)
}