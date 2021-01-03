import React from 'react';
import ReactDOM from 'react-dom';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles, createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import {blue, teal, purple, orange} from '@material-ui/core/colors';


const useStyles = makeStyles({
  root: {
    '& .MuiPaper-root': {
      backgroundColor: '#ff9800'
    }
  }
})

function SnackBar(props) {
  const {msg, duration} = props;
  const [open, setOpen] = React.useState(true)
  const classes = useStyles();
  const theme = createMuiTheme({
    palette: {
      type: 'dark',
    }
  });

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false)
    let div = document.getElementById('custom_snackbar')
    ReactDOM.unmountComponentAtNode(div)
    div.parentNode.removeChild(div);
    
  };

  return (
    <ThemeProvider theme={theme}>
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        open={open}
        autoHideDuration={duration}
        onClose={handleClose}
        message={msg}
        className={classes.root}
        action={
          <React.Fragment>
            <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
    </ThemeProvider>
  );
}

let Alerts = new Object();

Alerts.show = function(msg, duration=2500) {
  let custom_snackbar = document.getElementById('custom_snackbar')
  if (!custom_snackbar){
    custom_snackbar = document.createElement('div');
    custom_snackbar.setAttribute("id", "custom_snackbar")
    document.body.appendChild(custom_snackbar); 
  }
  ReactDOM.render(<SnackBar msg={msg} duration={duration}/>, custom_snackbar);
}

export default Alerts;