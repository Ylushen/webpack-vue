export default {
  data() {
    return {
      Mixin_DialogForm: {},
      // 基础的弹出框
      Mixin_DialogVisible: false
    }
  },
  computed: {
    Mixin_AddApi() { return this.ApiObject.add }, // 新增api
    Mixin_UpdateApi() { return this.ApiObject.update } //更新api
  },
  methods: {
    // 编辑调用方法
    async Mixin_Edit(row) {
      console.log(row)
      this.Mixin_DialogForm = { ...row }
      console.log(this.Mixin_DialogForm)
      this.Mixin_DialogVisible = true
    },
    // 新增调用方法
    async Mixin_Add(row) {
      this.Mixin_DialogVisible = true
    },
    // 提交调用，通过id判断是否是新增数据
    async Mixin_Submit() {
      const Api = this.Mixin_DialogForm.id
        ? this.Mixin_UpdateApi
        : this.Mixin_AddApi
      const res = await Api.call(this.ApiObject, { ...this.Mixin_DialogForm })
      this.$message.success(res.message)
      this.Mixin_DialogVisible = false
      this.Mixin_Init()
    }
  }
}
