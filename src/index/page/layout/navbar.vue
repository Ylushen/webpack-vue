<template>
  <div class="layout-navbar">
    <span class="layout-menu-icon" :class="collapse? 'menu-icon_open' : 'menu-icon_close'">
      <i class="iconfont icon-menufold" @click="iconClick"/>
    </span>
    <el-divider direction="vertical"/>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <transition-group name="breadcrumb">
        <el-breadcrumb-item
          v-for="item in routeBreadcrumb"
          :key="item.path"
          :to="{ path: item.path }"
        >
          <el-tag>{{ item.name }}</el-tag>
        </el-breadcrumb-item>
      </transition-group>
    </el-breadcrumb>
    <!--标题栏右侧展示-->
    <div class="navbar_right">
      <div @click="openConfigVisible">主题配置</div>
      <el-dropdown trigger="click">
        <div class="navbar-user">
          {{ userInfo.username }}
          <i class="el-icon-arrow-down el-icon--right"></i>
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item><span>用户信息</span></el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <div @click="unLogin">退出</div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Navbar',
  props: {
    collapse: Boolean
  },
  computed: {
    ...mapGetters(['userInfo']),
    routeBreadcrumb() {
      return this.$route.matched.filter(item => item.name && item.path)
    }
  },
  methods: {
    iconClick() {
      this.$store.commit('config/SET_MENU_COLLAPSE', !this.collapse)
    },
    unLogin() {
      this.$message.success('操作成功')
      this.$router.push('/login')
    },
    openConfigVisible() {
      this.$store.commit('theme/OPEN_CONFIG_VISIBLE')
    }
  }
}
</script>

<style lang="less" scoped>
  @import "../../assets/styles/vars";

  .layout-navbar {
    padding: 0 10px;
    width: 100%;
    height: @LogoHeight;
    position: relative;
    display: flex;
    align-items: center;
    box-shadow: 0 1px 4px rgba(0, 21, 41, .08);
    background-color: @pageItemBgColor;
    z-index: 99;

    .navbar_right {
      height: 100%;
      display: flex;
      align-items: center;
      position: absolute;
      right: 10px;
      color: #606266;
    }

    .navbar-user {
      float: right;
    }

    .navbar_right > div {
      cursor: pointer;
      line-height: 30px;
      padding: 10px;
      transition: .28s;
    }

    .navbar_right > div:hover {
      background-color: @divHoverBGColor;
    }

    /* breadcrumb transition */
    /* 从element-admin-vue框架迁移 */

    .breadcrumb-enter-active,
    .breadcrumb-leave-active {
      transition: all .5s;
    }

    .breadcrumb-enter,
    .breadcrumb-leave-active {
      opacity: 0;
      transform: translateX(20px);
    }

    .breadcrumb-move {
      transition: all .3s;
    }

    .breadcrumb-leave-active {
      position: absolute;
    }

    // 菜单闭合按钮动画
    .layout-menu-icon {
      transition: transform .28s;
    }

    .menu-icon_open {
      transform: rotateZ(180deg);
    }

    .layout-menu-icon .iconfont {
      font-size: 25px;
      cursor: pointer;
      transition: 0.2s;
    }

    .layout-menu-icon .iconfont:hover {
      color: #67cdcc;
    }
  }
</style>
