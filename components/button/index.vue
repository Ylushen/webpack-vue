<script>
export default {
  name: 'LsButton',
  data() {
    return {
      loading: false
    }
  },
  methods: {
    // 点击间隔
    handleClick() {
      this.loading = true
      setTimeout(_ => { this.loading = false }, 1000)
      this.$emit('click')
    }
  },
  render(createElement, context) {
    return createElement('el-button', {
      attrs: {
        ...this.$attrs,
        type: this.$attrs.type || 'primary',
        loading: this.loading
      },
      on: {
        ...this.$listeners,
        click: this.handleClick
      }
    }, this.$slots.default)
  }
}
</script>
