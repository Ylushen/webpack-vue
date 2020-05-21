import { colors } from '@/page/charts/charts/options/config'

export default {
  title: {
    text: '恶心兄弟水平'
  },
  tooltip: {},
  xAxis: {
    data: ['冠希', '杜维', '少帅', '哈利', '栋儿', '举帝', '儿子']
  },
  yAxis: {},
  series: [
    {
      name: '水平',
      type: 'bar',
      itemStyle: {
        color: function({ data }) {
          return colors[~~(data / 10)]
        }
      },
      data: [99, 100, 10, 50, 99, 10, 5]
    }
  ]
}
