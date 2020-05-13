import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    collapse: false
  },
  mutations: {
    SET_MENU_COLLAPSE(state, data) {
      if (typeof data !== 'boolean') throw new Error('collapse格式错误')
      state.collapse = data
    }
  }
})
