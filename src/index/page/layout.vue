<template>
  <div id="app-wrapper"></div>
</template>
<script>
export default {
  name: 'Layout',
  data() {
    return {

    }
  },
  methods: {
    bbb() {
      import('../../../utils/index').then(res => res.default())
    }
  }
}
</script>
<style lang="less" scoped>
#app-wrapper {
  width: 100vw;
  height: 100vh;
  position: relative;
  background-color: antiquewhite;
}
#app-wrapper::after {
  content: "";
  height: 0;
  display: none;
  opacity: 0;
  clear: both;
}
</style>
