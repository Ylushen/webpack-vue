<template>
  <div class="ls-table_layout">
    <div class="ls-layout_header ls-display_l_c">
      <slot name="layout_header"></slot>
    </div>
    <el-divider></el-divider>
    <div class="ls-table">
      <div class="ls-table_header">
        <div>
          <slot name="table-header_left"></slot>
        </div>
        <div>
          <slot name="table-header_right"></slot>
        </div>
      </div>
      <el-table v-bind="$attrs" :border="border" :size="size" v-on="$listeners">
        <template v-for="(header, index) in headers">
          <tableColumn :key="index" v-bind="header">
            <template v-if="header.slotName" v-slot="slotProps">
              <slot :name="header.slotName" v-bind="slotProps" />
            </template>
          </tableColumn>
        </template>
      </el-table>
    </div>
    <el-divider></el-divider>
    <div class="ls-display_center">
      <el-pagination
        v-if="pagination"
        :page-size="pageConfig.size"
        :current-page.sync="pageConfig.current"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pageConfig.total"
        @current-change="currentChange"
        @size-change="sizeChange"
      ></el-pagination>
      <slot name="layout_footer"></slot>
    </div>
  </div>
</template>

<script>
import tableColumn from './tableColumn'
export default {
  name: 'LsTableLayout',
  components: { tableColumn },
  props: {
    headers: {
      type: Array,
      default() {
        return []
      }
    },
    border: {
      type: Boolean,
      default: true
    },
    size: {
      type: String,
      default: 'small'
    },
    pagination: {
      type: Boolean,
      default: true
    },
    pageConfig: {
      type: Object,
      default() {
        return {
          size: 10,
          current: 1,
          total: 0
        }
      }
    }
  },
  methods: {
    currentChange(current) {
      console.log('变化')
      this.$emit('page-current-change', current)
    },
    sizeChange(size) {
      this.$emit('page-size-change', size)
    }
  }
}
</script>

<style lang="less" scoped>
.ls-table_layout {
  height: 100%;
  width: 100%;
  padding: 10px;
  overflow: auto;
  position: relative;

  .ls-layout_header {
    min-height: 80px;
    width: 100%;
    padding: 10px;
    background-color: #eee;
  }
  .ls-layout_header /deep/.el-form-item {
    margin-bottom: 0;
  }

  .ls-table {
    .ls-table_header {
      width: 100%;
      display: flex;
      justify-content: space-between;
      margin-bottom: 10px;
    }
  }
}
</style>
