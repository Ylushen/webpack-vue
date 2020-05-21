export default {
  namespaced: true,
  state: {
    collapse: false
  },
  mutations: {
    SET_MENU_COLLAPSE(state, data) {
      if (typeof data !== 'boolean') throw new Error('collapse格式错误')
      state.collapse = data
    }
  }
}
