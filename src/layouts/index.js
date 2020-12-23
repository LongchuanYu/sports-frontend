import styles from './index.css';
import React from 'react';
import { history } from 'umi';

import { makeStyles, createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import Button from '@material-ui/core/Button'
import RestoreIcon from '@material-ui/icons/Restore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import { orange, purple, light } from '@material-ui/core/colors';
import { dark } from '@material-ui/core/styles/createPalette';

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

export default function BasicLayout(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const theme = createMuiTheme({
    palette: {
      type: "dark",
    }
  });
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
      {renderContene(value)}
    </ThemeProvider>
  );
}

const renderContene = function(value){
  switch(value){
    case 0:
      history.push('/training')
    case 1:
      return (
        <div>1</div>
      )
    case 2:
      return(
        <div>2</div>
      )
  }

}