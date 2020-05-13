<template>
  <transition>
    <el-checkbox v-if="!options" v-bind="$attrs" v-on="$listeners">{{ $attrs.label }}</el-checkbox>
    <el-checkbox-group v-else v-bind="$attrs" v-on="$listeners">
      <el-checkbox v-for="(option, $index) in options" :key="$index" :label="option.value">{{ option.label }}</el-checkbox>
    </el-checkbox-group>
  </transition>
</template>

<script>
export default {
  name: 'LsCheckbox',
  props: {
    options: {
      type: [String, Array],
      default: ''
    }
  }
}
</script>

<style scoped>

</style>
