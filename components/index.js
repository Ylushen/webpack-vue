import tableLayout from './tableLayout/index'
import button from './button'
import input from './input'
import form from './form'
import dialog from './dialog'
import select from './select'
import menu from './menu'
import cardTable from './cardTable'
import echarts from './echarts'

const components = [
  tableLayout,
  button,
  input,
  form,
  dialog,
  select,
  menu,
  cardTable,
  echarts
]

const install = function(Vue) {
  components.forEach(component => {
    Vue.component(component.name, component)
  })
}
export default {
  version: '0.0.1',
  install,
  components
}
