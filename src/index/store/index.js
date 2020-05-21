import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import getters from '@/store/getter'

// 动态获取当前目录下所有的router文件。
const moduleData = require.context('./modules', false, /\.js$/)
const modules = {}
moduleData.keys().forEach(key => {
  const moduleName = key.replace(/\.\/(.*)\.js$/, '$1')
  modules[moduleName] = moduleData(key).default
})

Vue.use(Vuex)

export default new Vuex.Store({
  // 数据持久化
  plugins: [createPersistedState({ storage: window.sessionStorage })],
  modules,
  getters
})
