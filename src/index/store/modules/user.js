export default {
  namespaced: true,
  state: {
    userInfo: {
      username: 'ylushen'
    }
  },
  mutations: {
    SET_USER_INFO(state, data) {
      state.userInfo = data
    }
  }
}
