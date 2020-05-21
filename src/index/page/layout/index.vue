<template>
  <div id="ls-layout" :class="menuTransClass">
    <div class="ls-layout-menu" :style="{backgroundColor: menuBGColor}">
      <menu-logo :text-color="textColor" :collapse="collapse" />
      <el-scrollbar class="menu-scrollbar">
        <ls-menu
          :routes="routes"
          :default-active="routesCurrent"
          :background-color="menuBGColor"
          :text-color="textColor"
          :active-text-color="activeTextColor"
          :collapse="collapse"
          :collapse-transition="false"
        />
      </el-scrollbar>
    </div>
    <div class="ls-layout-page clear-fix">
      <navbar :collapse="collapse" />
      <div class="ls-page_main">
        <el-scrollbar style="height: 100%;">
          <router-view />
        </el-scrollbar>
      </div>
    </div>
    <el-drawer
      :visible="configVisible"
      :before-close="closeConfigVisible"
      size="300px"
      :show-close="false"
      :modal="false"
      class="el-layout-config"
    >
      <template #title>
        <h3 style="color: #333">主题配置</h3>
      </template>
      <el-form>
        <el-form-item label="背景颜色">
          <el-color-picker v-model="menuBGColor"></el-color-picker>
        </el-form-item>
        <el-form-item label="文字颜色">
          <el-color-picker v-model="textColor"></el-color-picker>
        </el-form-item>
        <el-form-item label="选中文字颜色">
          <el-color-picker v-model="activeTextColor"></el-color-picker>
        </el-form-item>
      </el-form>
    </el-drawer>
  </div>
</template>
<script>
import menuLogo from '@/page/layout/menuLogo'
import navbar from './navbar'
import { mapGetters } from 'vuex'
export default {
  name: 'Layout',
  components: { menuLogo, navbar },
  data() {
    return {
      menuBGColor: '#212121',
      textColor: '#ffffff',
      activeTextColor: '#FF3633'
    }
  },
  computed: {
    ...mapGetters(['collapse', 'configVisible']),
    routes() {
      return this.$router.options.routes
    },
    routesCurrent() {
      return this.$route.path
    },
    menuTransClass() {
      return {
        'layout-menu_hide': this.collapse,
        'layout-menu_show': !this.collapse
      }
    }
  },
  // 根据页面大小动态调整菜单
  beforeMount() {
    window.addEventListener('resize', this.$_resizeHandler)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.$_resizeHandler)
  },
  methods: {
    $_resizeHandler() {
      const rect = document.body.getBoundingClientRect()
      this.$store.commit('config/SET_MENU_COLLAPSE', rect.width - 1 < 992)
    },
    closeConfigVisible() {
      this.$store.commit('theme/CLOSE_CONFIG_VISIBLE')
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
    .el-layout-config /deep/ .el-drawer {
      padding: 20px;
    }
    .el-layout-config /deep/ .el-drawer__header {
      padding: 0 !important;
    }

    @transition: .3s;
    .ls-layout-menu {
      height: 100%;
      border-right: none;
      box-shadow: 2px 0 6px rgba(0, 21, 41,.20);
      position: fixed;
      transition: width @transition, box-shadow @transition, border @transition;
      /deep/ .el-menu {
        border: none;
      }

      .menu-scrollbar {
        height: calc(100% - @LogoHeight);
        overflow: hidden !important;
      }
      .menu-scrollbar /deep/ .el-scrollbar__wrap {
        overflow-x: hidden;
      }
    }
    .ls-layout-menu /deep/ .el-menu-item i, .ls-layout-menu /deep/ .el-submenu__title i {
      color: inherit;
    }
    .ls-layout-page {
      height: 100vh;
      background-color: @pageBGColor;
      position: relative;
      transition: margin-left @transition;
      .ls-page_main {
        height: calc(100% - @LogoHeight);
        overflow: hidden;
        position: relative;
      }
      .ls-page_main /deep/ .el-scrollbar__wrap {
        overflow-x: hidden;
        padding: 10px;
      }
    }
  }

  .layout-menu_hide .ls-layout-menu {
    border-right: 1px solid rgba(215, 218, 225, .5) !important;
    box-shadow: none !important;
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
