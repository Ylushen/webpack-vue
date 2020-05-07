import layout from './page/layout.vue'
import Vue from 'vue'
import elementUI from 'element-ui'
import './index.less'
Vue.use(elementUI)

new Vue(layout).$mount('#app')
