## 基于element-ui的组件工具
    vue: @2.6.11
    element-ui: @2.13.1
#### 1、ls-table-layout
```javascript
export default {
  data: {
    // table列配置 
    // slotName: 是否需要用到插槽
    // format: 对象或者func row.prop或者row.slotName作为key， func(row, header)
    // el-table-column 配置
    Headers: [
      { type: 'index', label: '序号', width: 80 },
      { prop: 'name', label: '姓名' },
      { label: '时间', slotName: 'date' },
      { label: '对象', prop: 'date', format: { '1': '我是1' }},
      { label: '方法', prop: 'date', format: (row, header) => (row.date) },
      { label: '操作', slotName: 'operate' }
    ]
  }
}
```
