<template>
  <div id="app-wrapper">
    <router-view />
  </div>
</template>
<script>
export default {
  name: 'Layout'
}
</script>
<style lang="less" scoped>
#app-wrapper {
  width: 100vw;
  height: 100vh;
  position: relative;
  overflow: auto;
}
#app-wrapper::after {
  content: "";
  height: 0;
  display: none;
  opacity: 0;
  clear: both;
}
</style>
