export default {
  path: '/tables',
  redirect: '/tables/table',
  component: () => import('@/page/layout'),
  name: '表格页',
  icon: 'el-icon-delete',
  children: [
    {
      path: 'table',
      icon: 'el-icon-delete',
      component: () => import('@/page/tables/table'),
      name: '标准表格'
    },
    {
      path: 'card-table',
      icon: 'el-icon-delete',
      component: () => import('@/page/tables/card-table'),
      name: '卡片表格'
    }
  ]
}
