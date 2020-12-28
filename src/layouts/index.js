import styles from './index.css';
import React, { useEffect } from 'react';
import { router } from 'umi';

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

const routes = ['/training', '/data', '/myself']

export default function BasicLayout(props) {  

  const classes = useStyles();
  const [value, setValue] = React.useState(-1);
  const theme = createMuiTheme({
    palette: {
      type: "dark"
    }
  });
  useEffect(()=>{
    router.push(routes[value])
  },[value])

  
  return (

    <ThemeProvider theme={theme}>
      <BottomNavigation
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        showLabels
        className={classes.root}
      >
        <BottomNavigationAction label="训练" icon={<RestoreIcon />} />
        <BottomNavigationAction label="数据" icon={<FavoriteIcon />} />
        <BottomNavigationAction label="我的" icon={<LocationOnIcon />} />
      </BottomNavigation>
      {props.children}
    </ThemeProvider>
  );
}