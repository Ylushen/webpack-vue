<template>
  <div v-loading="tableLoading" class="page-table">
    <div v-if="$slots.prepend" class="table-card ls-display_center">
      <slot name="prepend" />
    </div>
    <div v-for="(row, $index) in data" :key="$index" class="table-card">
      <slot :row="row" :$index="$index" />
    </div>
    <div v-if="$slots.append" class="table-card">
      <slot name="append" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'LsCardTable',
  props: {
    data: {
      type: Array,
      default() {
        return []
      }
    },
    tableLoading: Boolean
  }
}
</script>

<style lang="less" scoped>
  .page-table {
    height: 100%;
    width: 100%;
    position: relative;
    display: flex;
    flex-wrap: wrap;
    .table-card {
      padding: 10px 10px 10px 10px;
    }
    @media screen and (min-width: 1401px) {
      .table-card {
        width: 33.3333%;
      }
    }
    @media screen and (max-width: 1400px) {
      .table-card {
        width: 50%;
      }
    }
    @media screen and (max-width: 800px) {
      .table-card {
        width: 100%;
      }
    }
  }
</style>
