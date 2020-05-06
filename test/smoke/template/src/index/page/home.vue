<template>
  <div>
    {{ aaa }}
    <button @click="bbb">123123</button>
  </div>
</template>
<script>
export default {
  name: 'Home',
  data() {
    return {
      aaa: '我是index'
    }
  },
  methods: {
    bbb() {
      import('../../../utils/index').then(res => res.default())
    }
  }
}
</script>
