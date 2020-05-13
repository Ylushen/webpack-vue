<template>
  <el-dialog
    v-bind="$attrs"
    :width="$attrs.width || '50%'"
    :center="center"
    v-on="$listeners"
  >
    <slot />
    <template v-if="footerBtn" #footer>
      <el-button @click="dialogCancel">取 消</el-button>
      <el-button type="primary" @click="dialogSuccess">确 定</el-button>
    </template>
  </el-dialog>
</template>

<script>
export default {
  name: 'LsDialog',
  props: {
    center: {
      type: Boolean,
      default: true
    },
    footerBtn: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    dialogCancel() {
      this.$emit('cancel')
    },
    dialogSuccess() {
      this.$emit('success')
    }
  }
}
</script>

<style scoped>

</style>
