import Vue from 'vue'
import elementUI from 'element-ui'
import ylushenUI from 'ylushen-ui'
import './assets/styles/index.less'
import app from './page/app'

Vue.use(elementUI, { size: 'small' })
Vue.use(ylushenUI)
Vue.config.devtools = process.env.NODE_ENV === 'development'

import router from './router'
import store from './store'

import './Authority'

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(app)
})
