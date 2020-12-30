const StyModel = {
  namespace: 'sty_model',
  state: 0,
  reducers: {
    // action1
    add(count) {
      return count+1
    },
    // action2
    minus(count) {
      return count-1
    }
  }
}
export default StyModel;
