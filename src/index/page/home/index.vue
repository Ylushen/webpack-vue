<template>
  <div class="welcome-text animated slow fadeIn">
    欢迎使用！
  </div>
</template>

<script>
export default {
  name: 'home'
}
</script>

<style lang="less" scoped>
  .welcome-text{
    height: calc(100vh - 142px);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 60px;
    font-weight: bolder;
    color: #999999;
  }
</style>

