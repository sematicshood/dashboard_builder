<template>
    <div id="doughnutComponent">
        <doughnut-chart :chart-data="datacollection" :styles="{height: `${ height }px`}" :options="chartOptions"></doughnut-chart>
    </div>
</template>

<script>
    import DoughnutChart from './chart/DoughnutChart.js'
    import { mapGetters, mapState } from 'vuex'

    export default {
        name: 'doughnut-component',

        components: {
            DoughnutChart
        },

        props: ['vuecolumn', 'vuerow'],

        data () {
            return {
                datacollection: null,
                chartOptions: null,
            }
        },
        mounted() {
            this.fillData()
        },

        computed: {
            ...mapState(['rows', 'data']),

            column: {
                get() {
                    return this.rows.rows[this.vuerow][this.vuecolumn]
                }
            },
            row: {
                get() {
                    return this.rows.rows[this.vuerow]
                }
            },
            height: {
                get() {
                    return this.rows.rows[this.vuerow][0]['height'] - 135
                }
            },
            titles: {
                get() {
                    return this.rows.rows[this.vuerow][this.vuecolumn]['titles']
                }
            },
            datas: {
                get() {
                    // return this.data.data[this.rows.rows[this.vuerow][this.vuecolumn]['model']]
                    return this.rows.rows[this.vuerow][this.vuecolumn]['datas']
                }
            },
            options: {
                get() {
                    let hello  = this.rows.rows[this.vuerow][this.vuecolumn]['options_chart']
                    let option = {
                        responsive: true, 
                        maintainAspectRatio: false,
                        // legend: { 
                        //     display: hello.legend.display
                        // }
                    }

                    return option
                }
            },
        },

        watch: {
            titles(newv, oldv) {
                this.fillData()
            },

            row: {
                handler(val){
                    this.fillData()
                },
                deep: true
            },
        },

        methods: {
            fillData () {
                this.$store.dispatch('chart/renderChartTwo', {'titles': this.titles, 'datas': this.datas})
                    .then(res => {
                        this.datacollection = res
                    })

                this.$store.dispatch('chart/optionsChart', {
                    'options': this.options, 
                    'titles': this.titles,
                    'column': this.column,
                })
                .then(res => {
                    this.$data.chartOptions = res
                })
            },
        }
    }
</script>