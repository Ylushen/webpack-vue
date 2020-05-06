<template>
  <div>
    <div>{{ aaa }}</div>
    <div @click="conso">{{ aaa }}</div>
  </div>
</template>

<script>
export default {
  name: 'home',
  data() {
    return {
      aaa: '1'
    }
  },
  methods: {
    conso() {
      this.aaa = 123123
    }
  }
}
</script>

<style scoped>
</style>
