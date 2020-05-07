import Vue from 'vue'
import elementUI from 'element-ui'
import '../index.less'
import home from './page/home.vue'

Vue.use(elementUI)

new Vue(home).$mount('#app')
