<template>
  <div :id="id" v-bind="$attrs" :style="{width, height}" v-on="$listeners" />
</template>
<script>
import echarts from 'echarts'
import { createHash } from '../../utils'

export default {
  name: 'LsEcharts',
  props: {
    height: {
      type: String,
      default: '100%'
    },
    width: {
      type: String,
      default: '100%'
    },
    option: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      id: createHash(6),
      echartsInstance: null
    }
  },
  created() {
    this.$nextTick(_ => {
      this.onResize()
    })
  },
  methods: {
    init() {
      if (this.echartsInstance) this.echartsInstance.dispose()
      this.echartsInstance = echarts.init(document.getElementById(this.id))
      this.echartsInstance.setOption(this.option)
    },
    // 监听div大小变化
    onResize() {
      let resizeKey = null
      const self = this
      const resizeObserver = new ResizeObserver(_ => {
        if (!self.echartsInstance) return self.init()
        if (resizeKey) clearTimeout(resizeKey)
        resizeKey = setTimeout(_ => {
          self.echartsInstance.resize()
          resizeKey = null
        }, 250)
      })

      resizeObserver.observe(this.$el)
    }
  }
}
</script>

<style scoped>

</style>
