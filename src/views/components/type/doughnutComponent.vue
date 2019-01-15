<template>
    <div id="doughnutComponent">
        <doughnut-chart :chart-data="datacollection" :styles="{height: `${ height }px`}" :options="chartOptions"></doughnut-chart>
    </div>
</template>

<script>
    import DoughnutChart from './chart/DoughnutChart.js'
    import { mapState } from 'vuex'

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
                    return this.rows.rows[this.vuerow][this.vuecolumn]['datas']
                }
            },
            options: {
                get() {
                    let option = {
                        responsive: true, 
                        maintainAspectRatio: false,
                    }

                    return option
                }
            },
        },

        watch: {
            titles() {
                this.fillData()
            },

            row: {
                handler(){
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
        },
        
        created() {
            this.$store.dispatch('rows/cekTableOptions', {'row': this.vuerow, 'column': this.vuecolumn})
        }
    }
</script>