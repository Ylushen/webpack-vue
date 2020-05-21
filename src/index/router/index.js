import VueRouter from 'vue-router'
import Vue from 'vue'
import routes from './modules'

Vue.use(VueRouter)

export const privateRoutes = routes
// 公共页面
const publicRoutes = [
  {
    path: '/',
    component: () => import('../page/layout'),
    redirect: '/home',
    name: '首页',
    icon: 'el-icon-s-home',
    children: [
      {
        path: '/home',
        component: () => import('../page/home'),
        name: '首页'
      }
    ]
  },
  {
    path: '/login',
    component: () => import('../page/login'),
    hidden: true
  }
]

export default new VueRouter({
  routes: [...publicRoutes, ...privateRoutes]
})


