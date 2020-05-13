## 介绍：基于element-ui的组件工具，依赖版本
    vue: @2.6.11
    element-ui: @2.13.1 
## `mixin`混入介绍
### tableMixin.js: 实现表格功能查询，分页，删除功能
<<< @/src/index/mixins/tableMixin.js

### dialogMixin.js: 实现表格功能编辑，新增功能
<<< @/src/index/mixins/dialogMixin.js

## `<ls-table-layout>`组件
```vue
<template>    
    <ls-table-layout
        :data="Mixin_TableData"
        :page-config="Mixin_PageConfig"
        :pagination="Mixin_Pagination"
        :headers="Headers"
        @page-size-change="Mixin_SizeChange"
        @page-current-change="Mixin_CurrentChange"
    >
        <!-- 搜索头部表单插槽 -->
        <template #layout_header>
        <ls-form :headers="QueryFormHeaders" :model="Mixin_QueryForm" :inline="true" size="mini" />
        <ls-button @click="Mixin_Init">查询</ls-button>
        </template>
        <!-- 表格头部插槽 -->
        <template #table-header_right>
        <ls-button @click="Mixin_Add">新增</ls-button>
        </template>
        <!-- 自定义表格列内容插槽 -->
        <template #createTime="{ row }">
        {{ row.createTime }}
        </template>
        <!-- 自定义表格列操作插槽 -->
        <template #operate="{ row }">
        <ls-button @click="Mixin_Edit(row)">编辑</ls-button>
        <ls-button type="danger" @click="Mixin_Del(row)">删除</ls-button>
        </template>
    </ls-table-layout>
</template>    
<script>
import Mixin from '@/mixins'
import ApiObject from '../Api/test'

export default {
  name: 'Home',
  mixins: [Mixin],
  data() {
    return {
      ApiObject,
      Headers: [
        { type: 'index', label: '序号', width: 50, className: 'home-table_index' },
        { label: '姓名', prop: 'name' },
        { label: '时间', slotName: 'createTime' },
        { label: '状态', prop: 'status', format: { '1': '启用', '0': '停用' }},
        { label: '方法', prop: 'createTime', format: (row, header) => (row.createTime + '：func') },
        { label: '操作', slotName: 'operate' }
      ],
      QueryFormHeaders: [
        { label: '姓名', prop: 'name' }
      ]
    }
  }
}
</script>
```
::: tip
headers配置
| key      |       类型        |          默认值           | 说明                                        |
| -------- | :---------------: | :-----------------------: | ------------------------------------------- |
| prop     |      String       |            --             | 字段名                                      |
| label    |      String       |            --             | 表格头字段                                  |
| format   | Object & Function |     参数(row, header)     | 如果是对象，字段作为key。如果是方法，则执行 |
| slotName |      String       |            --             | 指定列具名插槽                              |
| others   |        any        | 跟`<el-table-column>`一致 | element-ui属性                              |
:::
### table Attributes
| key         |  类型   |              默认值              | 说明             |
| ----------- | :-----: | :------------------------------: | ---------------- |
| headers     |  Array  |                []                | 表格列配置       |
| data        |  Array  |                []                | 表格展示数据对象 |
| page-config | Object  | {size: 10, current: 1, total: 0} | 分页配置         |
| pagination  | Boolean |               true               | 是否分页         |

### table Event
| key                 |  参数   | 说明     |
| ------------------- | :-----: | -------- |
| page-size-change    |  size   | 分页大小 |
| page-current-change | current | 当前分页 |
### table Slots
| 名称               |          参数           | 说明           |
| ------------------ | :---------------------: | -------------- |
| layout_header      |    无，预留80px高度     | 页面头部       |
| table-header_left  |           --            | 表格头部左边   |
| table-header_right |           --            | 表格头部右边   |
| layout_footer      |           --            | 表格底部       |
| headers.slot       | { row, column, $index } | 自定义列的内容 |

## `<ls-form>`组件
```vue
<ls-form
    label-width="auto"
    :model="Mixin_DialogForm"
    :headers="DialogFormHeaders"
    @cancel="Mixin_DialogVisible = false"
    @submit="Mixin_Submit"
/>
```
::: tip
headers配置
| key      |  类型  |          默认值          | 说明                           |
| -------- | :----: | :----------------------: | ------------------------------ |
| prop     | String |            --            | 表单绑定字段名                 |
| label    | String |            --            | 表单项字段                     |
| type     | String | `element-ui`基础表单组件 | 不同的`type`渲染不同的表单组件 |
| slotName | String |            --            | 指定表单项具名插槽             |
| others   |  any   |    跟指定表单组件一致    | `element-ui`属性               |
:::
### form Attributes
| key     | 类型  | 默认值 | 说明                  |
| ------- | :---: | :----: | --------------------- |
| headers | Array |   []   | 表格列配置            |
| others  |  any  |   --   | 跟`<el-form>`表现一致 |

### form Event
| key    | 参数  | 说明                                                |
| ------ | :---: | --------------------------------------------------- |
| cancel |       | 内置取消按钮触发，默认调用`el-form resetFields`方法 |
| submit |       | 内置取消按钮触发，默认调用`el-form validate`方法    |
### form Slots
| 名称         | 参数  | 说明                              |
| ------------ | :---: | --------------------------------- |
| --           |  --   | 额外form-item,在headers渲染项之下 |
| headers.slot |  --   | 自定义表单的内容                  |
## `<ls-select>`组件
```vue
<ls-select
    :options="{aa: '11', bb: '22'}" 
    :options="[{id: '11', label: 'aa'}]" 
    :options="Promise.resolve([{id: '11', label: 'aa'}] || {aa: '11', bb: '22'})" 
/>
```
::: tip
options配置
|  类型   | 说明                                                      |
| :-----: | --------------------------------------------------------- |
| Object  | 转换成`[{name: key}, {id: value}]`                        |
|  Array  | 返回源对象，默认`label`取`Name`, `value`取`id`            |
| Promise | 如果返回的是一个`promise`对象，则会等待结果，一般用于接口 |
:::
### select Attributes
| key       |           类型           | 默认值 | 说明               |
| --------- | :----------------------: | :----: | ------------------ |
| options   | Array & Object & Promise |   []   | select的选项       |
| labelName |          String          |  name  | 选项的展示字段名称 |
| valueName |          String          |   id   | 选项值名称         |
