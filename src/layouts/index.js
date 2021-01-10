import styles from './index.css';
import React, { useEffect } from 'react';
import { Redirect, history } from 'umi'
import {connect} from 'dva'

import { makeStyles, createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import RestoreIcon from '@material-ui/icons/Restore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import PollIcon from '@material-ui/icons/Poll';
import PersonIcon from '@material-ui/icons/Person';
import {blue, teal, purple, indigo, grey} from '@material-ui/core/colors';
import myTheme from '@/utils/theme.json'

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
const sty_routes = ['/mysty/sty-dva']

function BasicLayout(props) {
  const {dispatch} = props;
  const classes = useStyles();
  // 等于didMounted
  const pathname = props.location.pathname;
  const theme = createMuiTheme({
    palette: {
      type: 'dark'
    }
  });

  dispatch({type:"login/checkIsLogin"})

  if(sty_routes.indexOf(pathname) >= 0){
    // test
    return(
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
        <BottomNavigationAction value={'/data'} label="数据" icon={<PollIcon />} />
        <BottomNavigationAction value={'/myself'} label="我的" icon={<PersonIcon />} />
      </BottomNavigation>
      {props.children}
    </ThemeProvider>
  );
}

export default connect()(BasicLayout)