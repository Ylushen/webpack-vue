<template>
  <div class="ls-layout-logo">
    <transition name="sidebarLogoFade">
      <router-link v-if="collapse" class="ls-display_center" to="/" tag="div">
        <img v-if="logo" :src="logo" alt="logo信息" class="layout-logo_img">
        <span v-else class="layout-logo_title el-message-box__title">我是标题</span>
      </router-link>
      <router-link v-else to="/" class="ls-display_center">
        <img v-if="logo" :src="logo" alt="logo信息" class="layout-logo_img">
        <span class="layout-logo_title el-message-box__title">我是标题</span>
      </router-link>
    </transition>
  </div>
</template>

<script>
import logo from '@/assets/images/logo.png'

export default {
  name: 'MenuLogo',
  props: {
    collapse: Boolean
  },
  data() {
    return {
      logo: logo
    }
  }
}
</script>

<style lang="less" scoped>
  @import "../../assets/styles/vars";

  .sidebarLogoFade-enter-active {
    transition: .5s;
  }

  .sidebarLogoFade-enter,
  .sidebarLogoFade-leave-to {
    opacity: 0;
    transform: translateX(28px);
  }

  .ls-layout-logo /deep/ .router-link-active {
    text-decoration: none;
  }

  .ls-layout-logo {
    width: 100%;
    height: @LogoHeight;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;

    .layout-logo_img {
      width: 50px;
      height: 50px;
    }
  }

</style>
