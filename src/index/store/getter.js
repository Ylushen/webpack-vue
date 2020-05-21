export default {
  collapse: state => {
    return state.config.collapse
  },
  configVisible: state => {
    return state.theme.configVisible
  },
  userInfo: state => {
    return state.user.userInfo
  }
}
