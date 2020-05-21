<template>
  <div class="page-app">
    <ls-table-layout
      :table-loading="Mixin_TableLoading"
      :data="Mixin_TableData"
      :page-config="Mixin_PageConfig"
      :pagination="Mixin_Pagination"
      :headers="Headers"
      @page-size-change="Mixin_SizeChange"
      @page-current-change="Mixin_CurrentChange"
    >
      <!-- 搜索头部表单插槽 -->
      <template #layout_header>
        <ls-form :headers="QueryFormHeaders" :model="Mixin_QueryForm" :inline="true" size="mini"/>
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
    <ls-dialog
      :title="Mixin_DialogForm.id ? '编辑' : '新增'"
      :visible.sync="Mixin_DialogVisible"
    >
      <ls-form
        label-width="auto"
        :model.sync="Mixin_DialogForm"
        :headers="DialogFormHeaders"
        @cancel="Mixin_DialogVisible = false"
        @submit="Mixin_Submit"
      >
        <el-form-item label="测试输入框：">
          <ls-input>
            <el-button slot="append" icon="el-icon-search"></el-button>
          </ls-input>
        </el-form-item>
      </ls-form>
    </ls-dialog>
  </div>
</template>
<script>
import Mixin from '@/mixins'
import ApiObject from '../../../Api/test'

export default {
  name: 'Table',
  mixins: [Mixin],
  data() {
    return {
      ApiObject,
      Mixin_DialogForm: {
        name3: []
      },
      Mixin_QueryForm: {
        name3: []
      },
      Headers: [
        { type: 'index', label: '序号', width: 50, className: 'home-table_index' },
        { label: '姓名', prop: 'name' },
        { label: '时间', slotName: 'createTime' },
        { label: '状态', prop: 'status', format: { '1': '启用', '0': '停用' }},
        { label: '方法', prop: 'createTime', format: (row, header) => (row.createTime + '：func') },
        { label: '操作', slotName: 'operate', width: 180 }
      ],
      QueryFormHeaders: [
        { label: '姓名', prop: 'name' }
      ],
      DialogFormHeaders: [
        { label: '姓名：', prop: 'name' },
        { label: '下拉框：', prop: 'phone', type: 'select', options: ApiObject.list(), labelName: 'name' },
        {
          label: '状态：',
          prop: 'status',
          type: 'radio',
          options: [{ label: '启用', value: '1' }, { label: '停用', value: '0' }]
        }
      ]
    }
  }
}
</script>
