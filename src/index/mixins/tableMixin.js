export default {
  data() {
    return {
      Mixin_TableData: [],
      Mixin_QueryForm: {},
      Mixin_Pagination: true,
      Mixin_TableLoading: false,
      Mixin_PageConfig: {
        size: 10, // 分页大小
        current: 1, // 当前页
        total: 0 // 总条目
      }
    }
  },
  computed: {
    Mixin_PageApi() { return this.ApiObject.page }, // 分页api
    Mixin_DelApi() { return this.ApiObject.del } // 删除api
  },
  created() {
    this.Mixin_Init()
  },
  methods: {
    async Mixin_Init() {
      await this.Mixin_Page()
      this.Mixin_InitAfter()
    },
    async Mixin_Del(row) {
      await this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
      const res = await this.Mixin_DelApi.call(this.ApiObject, row.id)
      this.$message.success(res.message)
      this.Mixin_Init()
    },
    async Mixin_Page() {
      this.Mixin_TableLoading = true
      try {
        const res = await this.Mixin_PageApi.call(this.ApiObject, this.getSearchForm())
        this.Mixin_PageConfig.total = res?.data?.total
        this.Mixin_TableData = res?.data?.tableData
      } finally {
        this.Mixin_TableLoading = false
      }
    },
    // 分页长度改变
    Mixin_SizeChange(val) {
      this.Mixin_PageConfig.size = val
      this.Mixin_Search()
    },
    // 分页页码改变
    Mixin_CurrentChange(val) {
      this.Mixin_PageConfig.current = val
      this.Mixin_Init()
    },
    Mixin_Search() {
      this.Mixin_PageConfig.current = 1
      this.Mixin_Init()
    },
    // 获取搜索条件
    getSearchForm() {
      return Object.assign(this.Mixin_QueryForm,
        (this.Mixin_Pagination ? this.Mixin_PageConfig : {}))
    },
    // 初始化页面后调用的钩子
    Mixin_InitAfter() {}
  }
}
