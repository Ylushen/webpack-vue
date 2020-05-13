<template>
  <div id="ls-layout" :class="menuTransClass">
    <div class="ls-layout-menu">
      <menu-logo :collapse="collapse" />
      <ls-menu
        :routes="routes"
        :default-active="routesCurrent"
        :collapse="collapse"
        :collapse-transition="false"
      />
    </div>
    <div class="ls-layout-page">
      <navbar :collapse="collapse" />
      <router-view />
    </div>
  </div>
</template>
<script>
import menuLogo from '@/page/layout/menuLogo'
import navbar from './navbar'
export default {
  name: 'Layout',
  components: { menuLogo, navbar },
  computed: {
    routes() {
      return this.$router.options.routes
    },
    routesCurrent() {
      return this.$route.path
    },
    collapse() {
      return this.$store.state.collapse
    },
    menuTransClass() {
      return {
        'layout-menu_hide': this.collapse,
        'layout-menu_show': !this.collapse
      }
    }
  }
}
</script>
<style lang="less" scoped>
  @import "../../assets/styles/vars";
  #ls-layout {
    width: 100vw;
    height: 100vh;
    position: relative;
    overflow: auto;

    @transition: .3s;
    .ls-layout-menu {
      height: calc(100% - @LogoHeight);
      border-right: 1px solid #ebeef5;
      position: fixed;
      transition: width @transition;
      /deep/ .el-menu {
        border: none;
      }
    }
    .ls-layout-page {
      position: relative;
      transition: margin-left @transition;
    }
  }
  @menuHideWidth: 65px;
  @menuShowWidth: 220px;
  .layout-menu_hide .ls-layout-menu {
    width: @menuHideWidth;
  }
  .layout-menu_hide .ls-layout-page {
    margin-left: @menuHideWidth;
  }
  .layout-menu_show .ls-layout-menu {
    width: @menuShowWidth;
  }
  .layout-menu_show .ls-layout-page {
    margin-left: @menuShowWidth;
  }
  #ls-app-wrapper::after {
    content: "";
    height: 0;
    display: none;
    opacity: 0;
    clear: both;
  }
</style>
