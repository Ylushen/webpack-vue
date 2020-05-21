<template>
  <el-form ref="form" v-bind="$attrs" :model="form" v-on="$listeners">
    <template v-for="header in headers">
      <slot v-if="header.slotName" :name="header.slotName" />
      <ls-form-item v-else :key="header.prop" :header="header" :model="form" />
    </template>
    <slot />
    <div v-if="footerBtn && !$attrs.inline" class="ls-form_footer ls-display_center">
      <el-button @click="cancel">取 消</el-button>
      <el-divider direction="vertical" />
      <ls-button type="primary" @click="submitForm">确 定</ls-button>
    </div>
  </el-form>
</template>

<script>
import LsFormItem from './formItem'

export default {
  name: 'LsForm',
  components: { LsFormItem },
  props: {
    model: {
      type: Object,
      default() {
        return {}
      }
    },
    headers: {
      type: Array,
      default() {
        return []
      }
    },
    footerBtn: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      form: this.model
    }
  },
  watch: {
    model(newVal) {
      this.form = newVal
    }
  },
  methods: {
    submitForm() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.$emit('submit')
        } else {
          console.error('校验没有通过!')
          return false
        }
      })
    },
    cancel() {
      this.resetForm()
      this.$emit('cancel')
    },
    resetForm() {
      this.$refs.form.resetFields()
    },
    clearValidate() {
      this.$refs.form.clearValidate()
    },
    validate(callback) {
      this.$refs.form.validate(callback)
    }
  }
}
</script>

<style lang="less" scoped>
  .ls-form_footer {
    width: 100%;
  }
</style>
