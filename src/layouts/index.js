import styles from './index.css';
import React from 'react';
import { makeStyles, createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import RestoreIcon from '@material-ui/icons/Restore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import { orange, purple } from '@material-ui/core/colors';

const useStyles = makeStyles({
  root: {
    position: "fixed",
    height: "50px",
    bottom: "0px",
    left: "0px",
    right: "0px",
    marginBottom: "0px"
  },
});

export default function BasicLayout() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const theme = createMuiTheme({
    primary: {
      // Purple and green play nicely together.
      main: purple[500],
    },
    secondary: {
      // This is green.A700 as hex.
      main: '#11cb5f',
    },
  });
  return (

    <ThemeProvider theme={theme}>
      <div>{value}</div>
      <div>{value}</div>
      <div>{value}</div>
      <div>{value}</div>
      <div>{value}</div>
      <div>{value}</div>
      <div>{value}</div>
      <div>{value}</div>
      <div>{value}</div>
      <div>{value}</div>
      <div>{value}</div>
      <div>{value}</div>
      <div>{value}</div>
      <div>{value}</div>
      <div>{value}</div>
      <div>{value}</div>
      <div>{value}</div>
      <div>{value}</div>
      <div>{value}</div>
      <div>{value}</div>
      <div>{value}</div>
      <div>{value}</div>
      <div>{value}</div>
      <div>{value}</div>
      <div>{value}</div>
      <div>{value}</div>
      <div>{value}</div>
      <div>{value}</div>
      <div>{value}</div>
      <div>{value}</div>
      <div>{value}</div>
      <div>{value}</div>
      <div>{value}</div>
      <div>{value}</div>
      <div>{value}</div>
      <div>{value}</div>
      <div>{value}</div>
      <div>{value}</div>
      <div>{value}</div>
      <div>{value}</div>
      <div>{value}</div>
      <div>{value}</div>
      <div>{value}</div>
      <div>{value}</div>
      <div>{value}</div>
      <div>{value}</div>
      <div>{value}</div>
      <div>{value}</div>
      <div>{value}</div>
      <div>1</div>
      <BottomNavigation
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        showLabels
        className={classes.root}
      >
        <BottomNavigationAction label="Recents" icon={<RestoreIcon />} />
        <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} />
        <BottomNavigationAction label="Nearby" icon={<LocationOnIcon />} />
      </BottomNavigation>
      
    </ThemeProvider>

  );
}