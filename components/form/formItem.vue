<template>
  <transition>
    <el-form-item :label="header.label" :prop="header.prop">
      <el-radio-group v-if="header.type === 'radio'" v-model="form[header.prop]" v-bind="header">
        <el-radio
          v-for="(option, $index) in header.options"
          :key="$index"
          :label="option.value"
        >{{ option.label }}
        </el-radio>
      </el-radio-group>
      <ls-checkbox
        v-else-if="header.type === 'checkbox'"
        v-model="form[header.prop]"
        v-bind="header"
      />
      <ls-select v-else-if="header.type === 'select'" v-model="form[header.prop]" v-bind="header" />
      <ls-input v-else v-model="form[header.prop]" v-bind="header" />
    </el-form-item>
  </transition>
</template>

<script>
import LsCheckbox from '../checkbox'
import LsSelect from 'ylushen-ui/select/index'
export default {
  name: 'LsFormItem',
  components: { LsSelect, LsCheckbox },
  props: {
    header: {
      type: Object,
      default() {
        return {}
      }
    },
    model: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      form: this.model
    }
  }
}
</script>

