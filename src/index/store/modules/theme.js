export default {
  namespaced: true,
  state: {
    configVisible: false
  },
  mutations: {
    OPEN_CONFIG_VISIBLE(state) {
      // 调用了
      state.configVisible = true
    },
    CLOSE_CONFIG_VISIBLE(state) {
      state.configVisible = false
    }
  }
}
