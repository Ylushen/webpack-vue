import VueRouter from 'vue-router'
import Vue from 'vue'

Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    {
      path: '/',
      component: () => import('../page/layout/index'),
      redirect: '/home',
      name: '测试模块',
      icon: 'el-icon-delete',
      children: [
        {
          path: 'home',
          icon: 'el-icon-delete',
          component: () => import('../page/home'),
          name: '测试页'
        },
        {
          path: 'home1',
          icon: 'el-icon-delete',
          component: () => import('../page/home'),
          name: '测试页1'
        },
        {
          path: 'home2',
          component: () => import('../page/home'),
          name: '测试页2'
        }
      ]
    },
    {
      path: '/module',
      component: () => import('../page/layout/index'),
      name: '测试模块2',
      icon: 'el-icon-delete',
      children: [
        {
          path: 'home',
          component: () => import('../page/home'),
          name: '测试页'
        },
        {
          path: 'home1',
          component: () => import('../page/home'),
          name: '测试页1'
        },
        {
          path: 'home2',
          component: () => import('../page/home'),
          name: '测试页2'
        }
      ]
    }
  ]
})


