import styles from './index.css';
import React, { useEffect } from 'react';
import { Redirect, history } from 'umi'

import { makeStyles, createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import RestoreIcon from '@material-ui/icons/Restore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';

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

const routes = ['/', '/training', '/data', '/myself']

export default function BasicLayout(props) {

  const classes = useStyles();
  // 等于didMounted
  const pathname = props.location.pathname;
  const theme = createMuiTheme({
    palette: {
      type: "dark"
    }
  });

  if(pathname === '/login'){
    // login
    return (
      <React.Fragment>
        {props.children}
      </React.Fragment>
    )
  }

  return (
    <ThemeProvider theme={theme}>
      <BottomNavigation
        value={pathname}
        onChange={(event, newValue) => {
          history.push(newValue)
          // setLink(newValue);
        }}
        showLabels
        className={classes.root}
      >
        <BottomNavigationAction value={'/training'} label="训练" icon={<RestoreIcon />} />
        <BottomNavigationAction value={'/data'} label="数据" icon={<FavoriteIcon />} />
        <BottomNavigationAction value={'/myself'} label="我的" icon={<LocationOnIcon />} />
      </BottomNavigation>
      {props.children}
    </ThemeProvider>
  );
}
