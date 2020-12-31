const Common = {
  namespace: 'common',
  state: {
    snackbarPopup: false
  },
  reducers: {
    openSnackbar(state){
      return {...state, snackbarPopup: true}
    },
    closeSnackbar(state){
      return {...state, snackbarPopup: false}
    }
  }
}

export default Common;
