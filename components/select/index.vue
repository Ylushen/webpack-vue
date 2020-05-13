<template>
  <el-select
    v-bind="$attrs"
    v-on="$listeners"
  >
    <template v-if="options">
      <el-option
        v-for="item in options"
        :key="item[$attrs.valueName || 'id']"
        :label="item[$attrs.labelName || 'name']"
        :value="item[$attrs.valueName || 'id']">
      </el-option>
    </template>
  </el-select>
</template>

<script>
import { toOptions } from '../../utils'

export default {
  name: 'LsSelect',
  data() {
    return {
      options: []
    }
  },
  created() {
    this.getOptions()
  },
  methods: {
    async getOptions() {
      console.log(this.$attrs.options instanceof Promise, this.$attrs.options)
      if (this.$attrs.options instanceof Promise) {
        const res = await this.$attrs.options
        this.options = toOptions(res.data)
      } else this.options = toOptions(this.$attrs.options)
    }
  }
}
</script>

