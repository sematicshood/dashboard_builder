<template>
    <div id="horizontalComponent">
        <horizontal-chart :chart-data="datacollection" :styles="{height: `${ height }px`}" :options="chartOptions"></horizontal-chart>
    </div>
</template>

<script>
    import HorizontalChart from './chart/HorizontalChart.js'
    import { mapGetters, mapState } from 'vuex'

    export default {
        name: 'horizontal-component',

        components: {
            HorizontalChart
        },

        props: ['vuecolumn', 'vuerow'],

        data () {
            return {
                datacollection: null,
                chartOptions: {
                    responsive: true,
                    maintainAspectRatio: false
                },
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
                    let hello  = this.rows.rows[this.vuerow][this.vuecolumn]['options_chart'],
                        value  = (this.titles[2]) ? this.titles[2]['prop'] : [],
                        type   = (this.titles[2]) ? this.titles[2]['type'] : [],

                        option = {
                            responsive: true, 
                            maintainAspectRatio: false,
                            // legend: { 
                            //     display: hello.legend.display
                            // },
                            scales: {}
                        }

                    return option
                }
            },
        },

        watch: {
            titles(newv, oldv) {
                this.fillData()
            }
        },

        methods: {
            fillData () {
                this.$store.dispatch('chart/renderChartOne', {
                    'titles': this.titles, 
                    'datas': this.datas,
                    'group': this.group
                })
                .then(res => {
                    this.datacollection = res
                })

                // this.$store.dispatch('chart/optionsChart', {'options': this.options, 'titles': this.titles})
                //     .then(res => {
                //         this.$data.chartOptions = res
                //     })
            }
        }
    }
</script>