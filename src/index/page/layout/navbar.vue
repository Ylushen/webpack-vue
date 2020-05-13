<template>
  <div class="layout-navbar">
    <span class="layout-menu-icon">
      <i v-show="!collapse" class="iconfont icon-menuoff" @click="iconClick(true)" />
      <i v-show="collapse" class="iconfont icon-menuon" @click="iconClick(false)" />
    </span>
    <el-divider direction="vertical" />
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item v-for="item in routeBreadcrumb" :key="item.path" :to="{ path: item.path }">
        <el-tag>{{ item.name }}</el-tag>
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  name: 'Navbar',
  props: {
    collapse: Boolean
  },
  computed: {
    routeBreadcrumb() {
      console.log(this.$route.matched.filter(item => item.name))
      return this.$route.matched.filter(item => item.name)
    }
  },
  methods: {
    iconClick(collapse) {
      this.$store.commit('SET_MENU_COLLAPSE', collapse)
    }
  }
}
</script>

<style lang="less" scoped>
  .layout-navbar {
    padding: 0 10px;
    width: 100%;
    height: 50px;
    position: relative;
    display: flex;
    align-items: center;

    .layout-menu-icon .iconfont {
      font-size: 30px;
      cursor: pointer;
      transition: .2s;
    }
    .layout-menu-icon .iconfont:hover {
      color: #67cdcc;
    }
  }
</style>
