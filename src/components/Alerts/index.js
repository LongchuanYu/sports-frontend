import React from 'react';
import ReactDOM from 'react-dom';
import Snackbar from '@material-ui/core/Snackbar';
import { makeStyles, createMuiTheme, ThemeProvider } from '@material-ui/core/styles';


const useStyles = makeStyles({
  root: {
    position: 'unset',
    '& .MuiPaper-root': {
      color: '#eeeeee',
      backgroundColor: '#242424c4',
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
        open={open}
        autoHideDuration={duration}
        onClose={handleClose}
        message={msg}
        className={classes.root}
      />
    </ThemeProvider>
  );
}

let Alerts = {};

Alerts.show = function(msg, duration=1500) {
  let custom_snackbar = document.getElementById('custom_snackbar')
  if (!custom_snackbar){
    custom_snackbar = document.createElement('div');
    custom_snackbar.setAttribute("id", "custom_snackbar")
    custom_snackbar.style.display = 'flex'
    custom_snackbar.style.position = 'fixed'
    custom_snackbar.style.left = '0'
    custom_snackbar.style.right = '0'
    custom_snackbar.style.top = '0'
    custom_snackbar.style.bottom = '0'
    custom_snackbar.style.justifyContent = 'center'
    custom_snackbar.style.alignItems = 'center'
    custom_snackbar.style.pointerEvents = 'none'
    document.body.appendChild(custom_snackbar);
  }
  ReactDOM.render(<SnackBar msg={msg} duration={duration}/>, custom_snackbar);
}

export default Alerts;
