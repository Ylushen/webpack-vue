export default {
  path: '/charts',
  redirect: '/charts/table',
  component: () => import('@/page/layout'),
  name: '图标页',
  icon: 'el-icon-s-data',
  children: [
    {
      path: 'charts',
      component: () => import('@/page/charts/charts'),
      name: 'Ecahrts图表'
    },
    {
      path: 'three',
      component: () => import('@/page/charts/three'),
      name: 'Three模型'
    }
  ]
}
