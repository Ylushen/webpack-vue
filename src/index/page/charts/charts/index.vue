<template>
  <div class="page-app">
    <ls-card-table :data="options">
      <template #default="{row}">
        <ls-echarts :option="row" height="400px" style="background-color: white; padding: 10px" />
      </template>
    </ls-card-table>
  </div>
</template>
<script>
import options from '@/page/charts/charts/options'
export default {
  name: 'CardTable',
  data() {
    return {
      options: options
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
