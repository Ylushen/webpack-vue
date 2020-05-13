<template>
  <el-menu
    v-bind="$attrs"
    router
    v-on="$listeners"
  >
    <ls-sub-menu v-for="item in routes" :key="item.path" :base-path="routes.path" :menu-data="item"></ls-sub-menu>
  </el-menu>
</template>

<script>
import LsSubMenu from './subMenu'
export default {
  name: 'LsMenu',
  components: { LsSubMenu },
  props: {
    routes: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>
<style lang="less">
  .el-menu--collapse>.ls-sub_menu>.el-submenu>.el-submenu__title span {
    height: 0;
    width: 0;
    overflow: hidden;
    visibility: hidden;
    display: inline-block;
  }
  .el-menu {
    height: 100%;
  }
</style>
