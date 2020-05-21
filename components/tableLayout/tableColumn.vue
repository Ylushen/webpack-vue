<template>
  <transition>
    <el-table-column v-if="$attrs.type === 'index'" v-bind="$attrs" />
    <el-table-column v-else-if="$attrs.type === 'selection'" v-bind="$attrs" />
    <el-table-column v-else-if="$attrs.type === 'expand'" v-bind="$attrs" />
    <el-table-column v-else v-bind="$attrs">
      <template v-slot="slotProps">
        <slot v-if="$attrs.slotName" v-bind="slotProps" />
        <template v-else>{{ getContent(slotProps.row, $attrs) }}</template>
      </template>
    </el-table-column>
  </transition>
</template>

<script>
export default {
  name: 'tableColumn',
  methods: {
    getContent(row, header) {
      if (header.format) {
        if (typeof header.format === 'object') return header.format[row[header.prop || header.slotName]]
        else if (typeof header.format === 'function') return header.format(row, header)
      }
      return row[header.prop || header.slotName]
    }
  }
}
</script>
