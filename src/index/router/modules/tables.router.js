export default {
  path: '/tables',
  redirect: '/tables/table',
  component: () => import('@/page/layout'),
  name: '表格页',
  icon: 'el-icon-s-grid',
  children: [
    {
      path: 'table',
      component: () => import('@/page/tables/table'),
      name: '标准表格'
    },
    {
      path: 'card-table',
      component: () => import('@/page/tables/card-table'),
      name: '卡片表格'
    }
  ]
}
