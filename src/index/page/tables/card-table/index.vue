<template>
  <div class="page-app">
    <ls-table-layout
      type="card"
      :table-loading="Mixin_TableLoading"
      :data="Mixin_TableData"
      :page-config="Mixin_PageConfig"
      :pagination="Mixin_Pagination"
      @page-size-change="Mixin_SizeChange"
      @page-current-change="Mixin_CurrentChange"
    >
      <template #prepend>
        <div class="card-table-prepend el-icon-plus avatar-uploader-icon" @click="Mixin_Add"/>
      </template>
      <template #default="{row}">
        <el-card :body-style="{padding: 0}">
          <div slot="header" class="card-header">
            <span>{{ row.name }}</span>
            <el-avatar :size="40" src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"/>
          </div>
          <div class="card-content">
            <div>{{ `手机号：${row['phone']}` }}</div>
            <div>{{ `状态：${ENABLED_STATUS[row['status']]}` }}</div>
            <div>{{ `时间：${row['createTime']}` }}</div>
          </div>
          <el-button-group class="card-button-group">
            <el-button class="card-button" size="medium" type="text" @click="Mixin_Edit(row)">编辑</el-button>
            <el-button class="card-button" size="medium" type="text" @click="Mixin_Del(row)">删除</el-button>
          </el-button-group>
        </el-card>
      </template>
    </ls-table-layout>
    <ls-dialog
      :title="Mixin_DialogForm.id ? '编辑' : '新增'"
      :visible.sync="Mixin_DialogVisible"
    >
      <ls-form
        label-width="auto"
        :model="Mixin_DialogForm"
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
import { ENABLED_STATUS } from '@/constant'
import LsTableLayout from 'ylushen-ui/tableLayout/index'

export default {
  name: 'CardTable',
  components: { LsTableLayout },
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
      ENABLED_STATUS,
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
<style lang="less" scoped>
  @import "../../../assets/styles/vars";

  .page-app {
    background-color: @pageBGColor;

    .card-table-prepend {
      height: calc(100% - 20px);
      min-height: 100px;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      border: 1px dashed #aaa;
      box-shadow: none;
      transition: border-color .3s;
      font-size: 60px;
    }

    .card-table-prepend:hover {
      border-color: #1890ff;
      cursor: pointer;
    }

    .card-header {
      display: flex;
      justify-content: space-between;
      line-height: 40px;
      font-weight: bold;
      font-size: 20px;
    }

    .card-content {
      padding: 18px;
    }

    .card-button-group {
      width: 100%;
      display: flex;
      background-color: @divHoverBGColor;
    }

    .card-button {
      flex-grow: 1;
    }

    .card-button:hover {
      background-color: @divHoverBGColor;
    }
  }
</style>
