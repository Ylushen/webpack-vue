<script>
export default {
  name: 'LsInput',
  props: {
    size: {
      type: String,
      default: 'small'
    }
  },
  render(createElement) {
    return createElement('el-input', {
      attrs: {
        ...this.$attrs,
        size: this.size
      },
      on: {
        ...this.$listeners
      }
      // 处理插槽作用域
    }, Object.keys(this.$slots).map(key => createElement('template', { slot: key }, this.$slots[key])))
  }
}
</script>
