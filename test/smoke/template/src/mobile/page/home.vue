<template>
  <div>
    <el-tag>{{ aaa }}</el-tag>
    <el-button @click="conso">{{ aaa }}</el-button>
    <img :src="img" alt />
    <img :src="img2" alt />
  </div>
</template>

<script>
import img2 from './qieTV.png'
export default {
  name: 'home',
  data() {
    return {
      aaa: '1',
      img: require('./test_urlLoader.jpg'),
      img2: img2
    }
  },
  created() {
    console.log(img2)
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
