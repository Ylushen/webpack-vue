import dialogMixin from '@/mixins/dialogMixin'
import tableMixin from '@/mixins/tableMixin'
import Vue from 'vue'
// 利用vue原生的mergeOptions方法，合并mixin
export default Vue.util.mergeOptions(dialogMixin, tableMixin)
