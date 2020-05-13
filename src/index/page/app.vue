<template>
  <div id="ls-app-wrapper">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="less" scoped>
  #ls-app-wrapper {
    width: 100vw;
    height: 100vh;
    position: relative;
    overflow: auto;
    display: flex;
  }

  #ls-app-wrapper::after {
    content: "";
    height: 0;
    display: none;
    opacity: 0;
    clear: both;
  }
</style>
