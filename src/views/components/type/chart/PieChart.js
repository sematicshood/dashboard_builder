import { Pie, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins

export default {
  extends: Pie,
  mixins: [reactiveProp],
  props: {
    options: {
      type: Object,
      default: null
    }
  },
  watch: {
    'options': {
      handler() {
        this.renderChart(this.chartData, this.options)
      },
      deep: true
    }
  },
  mounted () {
    this.renderChart(this.chartData, this.options)
  },
}